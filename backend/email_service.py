import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from typing import Optional
import logging

logger = logging.getLogger(__name__)

def send_appointment_email(
    recipient_email: str,
    appointment_data: dict
) -> bool:
    """
    Envía un email de notificación de cita usando Gmail SMTP
    
    Args:
        recipient_email: Email del destinatario (veterinaria)
        appointment_data: Datos de la cita solicitada
    
    Returns:
        bool: True si se envió correctamente, False si falló
    """
    # Obtener credenciales de .env
    smtp_email = os.getenv('SMTP_EMAIL', '')
    smtp_password = os.getenv('SMTP_PASSWORD', '')
    
    # Si no hay credenciales configuradas, solo loguear
    if not smtp_email or not smtp_password:
        logger.warning("SMTP credentials not configured. Email notification skipped.")
        logger.info(f"Appointment request: {appointment_data}")
        return True  # Retornar True para no bloquear el flujo
    
    try:
        # Crear el mensaje
        message = MIMEMultipart('alternative')
        message['From'] = smtp_email
        message['To'] = recipient_email
        message['Subject'] = f"Nueva Solicitud de Cita - {appointment_data.get('owner_name', 'Cliente')}"
        
        # Crear el cuerpo del email en HTML
        html_body = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #2563eb; }}
                .value {{ margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #2563eb; }}
                .footer {{ background-color: #f1f1f1; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🐾 Nueva Solicitud de Cita</h2>
                    <p>Veterinaria Calidad Sin Frontera</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">👤 Nombre del Dueño:</div>
                        <div class="value">{appointment_data.get('owner_name', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">🐶 Nombre de la Mascota:</div>
                        <div class="value">{appointment_data.get('pet_name', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📞 Teléfono:</div>
                        <div class="value">{appointment_data.get('phone', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📧 Email:</div>
                        <div class="value">{appointment_data.get('email', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📍 Clínica Preferida:</div>
                        <div class="value">{appointment_data.get('location', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📅 Fecha Preferida:</div>
                        <div class="value">{appointment_data.get('preferred_date', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">💬 Descripción del Problema:</div>
                        <div class="value">{appointment_data.get('description', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">🕐 Fecha de Solicitud:</div>
                        <div class="value">{appointment_data.get('created_at', 'Ahora')}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>Este es un email automático generado por el sistema de citas online.</p>
                    <p>Por favor, contacta al cliente para confirmar la cita.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Adjuntar el HTML al mensaje
        html_part = MIMEText(html_body, 'html')
        message.attach(html_part)
        
        # Conectar al servidor SMTP de Gmail
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(smtp_email, smtp_password)
            server.send_message(message)
        
        logger.info(f"Email sent successfully to {recipient_email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False


def send_confirmation_email(
    client_email: str,
    appointment_data: dict
) -> bool:
    """
    Envía un email de confirmación al cliente
    """
    smtp_email = os.getenv('SMTP_EMAIL', '')
    smtp_password = os.getenv('SMTP_PASSWORD', '')
    
    if not smtp_email or not smtp_password or not client_email:
        logger.warning("Email confirmation skipped - credentials not configured or no client email")
        return True
    
    try:
        message = MIMEMultipart('alternative')
        message['From'] = smtp_email
        message['To'] = client_email
        message['Subject'] = "Confirmación de Solicitud de Cita - Calidad Sin Frontera"
        
        html_body = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
                .message {{ background-color: white; padding: 15px; border-left: 3px solid #2563eb; margin: 20px 0; }}
                .footer {{ background-color: #f1f1f1; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>✅ Solicitud de Cita Recibida</h2>
                    <p>Veterinaria Calidad Sin Frontera</p>
                </div>
                <div class="content">
                    <div class="message">
                        <p>Hola <strong>{appointment_data.get('owner_name', 'Cliente')}</strong>,</p>
                        <p>Hemos recibido tu solicitud de cita para <strong>{appointment_data.get('pet_name', 'tu mascota')}</strong>.</p>
                        <p>Nos pondremos en contacto contigo en las próximas horas al número <strong>{appointment_data.get('phone')}</strong> para confirmar la fecha y hora.</p>
                        <p><em>Somos una familia, somos Calidad sin Frontera</em> 🐾</p>
                    </div>
                    <p style="margin-top: 20px;"><strong>Tus datos:</strong></p>
                    <ul>
                        <li><strong>Mascota:</strong> {appointment_data.get('pet_name', 'No especificado')}</li>
                        <li><strong>Teléfono:</strong> {appointment_data.get('phone')}</li>
                        <li><strong>Clínica:</strong> {appointment_data.get('location', 'No especificado')}</li>
                        <li><strong>Fecha preferida:</strong> {appointment_data.get('preferred_date', 'No especificado')}</li>
                    </ul>
                </div>
                <div class="footer">
                    <p>Si tienes alguna pregunta, no dudes en llamarnos o escribirnos por WhatsApp.</p>
                    <p><strong>Gracias por confiar en nosotros</strong> ❤️</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        html_part = MIMEText(html_body, 'html')
        message.attach(html_part)
        
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(smtp_email, smtp_password)
            server.send_message(message)
        
        logger.info(f"Confirmation email sent to {client_email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {str(e)}")
        return False
