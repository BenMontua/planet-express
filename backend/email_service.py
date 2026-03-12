import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

GMAIL_USER = os.getenv('GMAIL_USER', 'your-email@gmail.com')
GMAIL_APP_PASSWORD = os.getenv('GMAIL_APP_PASSWORD', 'your-app-password')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL', 'recipient@example.com')

async def send_contact_email(name: str, email: str, message: str):
    """
    Send contact form email via Gmail SMTP
    """
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'New Contact Form Submission from {name}'
        msg['From'] = GMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = email
        
        # HTML email body
        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                    <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> {name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="margin: 10px 0;"><strong>Message:</strong></p>
                            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
{message}
                            </p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #888; font-size: 12px;">
                        <p>This email was sent from your Planet Express contact form</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Plain text version
        text_body = f"""
New Contact Form Submission

Name: {name}
Email: {email}

Message:
{message}

---
This email was sent from your Planet Express contact form
        """
        
        # Attach both HTML and plain text versions
        part1 = MIMEText(text_body, 'plain')
        part2 = MIMEText(html_body, 'html')
        
        msg.attach(part1)
        msg.attach(part2)
        
        # Send email via Gmail SMTP
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.send_message(msg)
        
        return {"success": True, "message": "Email sent successfully"}
    
    except smtplib.SMTPAuthenticationError:
        return {
            "success": False, 
            "message": "SMTP Authentication failed. Please check Gmail credentials in .env file"
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Failed to send email: {str(e)}"
        }
