from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class AppointmentCreate(BaseModel):
    pet_name: Optional[str] = None
    owner_name: str
    phone: str
    email: Optional[EmailStr] = None
    location: Optional[str] = None
    preferred_date: Optional[str] = None
    description: str

class AppointmentResponse(BaseModel):
    id: str
    pet_name: Optional[str]
    owner_name: str
    phone: str
    email: Optional[str]
    location: Optional[str]
    preferred_date: Optional[str]
    description: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
