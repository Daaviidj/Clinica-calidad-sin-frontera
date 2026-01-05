from fastapi import FastAPI, APIRouter, BackgroundTasks, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime
from models import AppointmentCreate, AppointmentResponse
from email_service import send_appointment_email, send_confirmation_email

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@api_router.get("/")
async def root():
    return {"message": "Veterinaria Calidad Sin Frontera API"}

@api_router.post("/appointments", response_model=AppointmentResponse)
async def create_appointment(
    appointment: AppointmentCreate,
    background_tasks: BackgroundTasks
):
    """
    Crear una nueva solicitud de cita
    """
    try:
        # Preparar datos para guardar
        appointment_dict = appointment.dict()
        appointment_dict['status'] = 'pending'
        appointment_dict['created_at'] = datetime.utcnow()
        
        # Guardar en MongoDB
        result = await db.appointments.insert_one(appointment_dict)
        appointment_dict['id'] = str(result.inserted_id)
        
        # Enviar emails en background
        recipient_email = os.getenv('CLINIC_EMAIL', '')
        if recipient_email:
            background_tasks.add_task(
                send_appointment_email,
                recipient_email,
                {
                    **appointment_dict,
                    'created_at': appointment_dict['created_at'].strftime('%Y-%m-%d %H:%M:%S')
                }
            )
        
        # Enviar confirmación al cliente si proporcionó email
        if appointment.email:
            background_tasks.add_task(
                send_confirmation_email,
                appointment.email,
                {
                    **appointment_dict,
                    'created_at': appointment_dict['created_at'].strftime('%Y-%m-%d %H:%M:%S')
                }
            )
        
        logger.info(f"Appointment created: {appointment_dict['id']}")
        
        return AppointmentResponse(
            id=appointment_dict['id'],
            pet_name=appointment_dict.get('pet_name'),
            owner_name=appointment_dict['owner_name'],
            phone=appointment_dict['phone'],
            email=appointment_dict.get('email'),
            location=appointment_dict.get('location'),
            preferred_date=appointment_dict.get('preferred_date'),
            description=appointment_dict['description'],
            status=appointment_dict['status'],
            created_at=appointment_dict['created_at']
        )
        
    except Exception as e:
        logger.error(f"Error creating appointment: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al crear la cita")

@api_router.get("/appointments")
async def get_appointments(limit: int = 50):
    """
    Obtener lista de citas (para administración)
    """
    try:
        appointments = await db.appointments.find().sort('created_at', -1).limit(limit).to_list(limit)
        
        for appointment in appointments:
            appointment['id'] = str(appointment.pop('_id'))
        
        return {"appointments": appointments, "total": len(appointments)}
        
    except Exception as e:
        logger.error(f"Error fetching appointments: {str(e)}")
        raise HTTPException(status_code=500, detail="Error al obtener las citas")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()