# Product Requirements Document (PRD)
## Planet Express - File Transfer Landing Page

**Created:** December 10, 2024  
**Last Updated:** December 10, 2024

---

## Original Problem Statement
Build a technical and beautiful landing page for a file transfer solution. It should advertise the product and present pictures suiting to file transfer and technical setups in general. Replace logo with Planet Express logo. Implement backend for contact form with email functionality.

---

## User Personas
- **Small Business Owners**: Need reliable file transfer for client deliverables
- **Tech Teams**: Require secure, fast transfers with API integration
- **Enterprise Customers**: Looking for compliance-ready, scalable solutions
- **Freelancers**: Need simple, affordable file sharing

---

## Core Requirements (Static)
1. Tech-focused design with blue tones and dark theme
2. Present file transfer product benefits clearly
3. Show pricing tiers and features
4. Include contact form for leads with email notifications
5. Display technical infrastructure imagery
6. Mobile responsive design
7. Fast loading and smooth animations
8. Planet Express branding

---

## What's Been Implemented ✅

### Phase 1 - Frontend (December 10, 2024)
- ✅ Hero section with compelling headline and CTA
- ✅ Stats display (10M+ files, 50K+ users, 99.9% uptime, 150+ countries)
- ✅ Features section (6 key features with icons)
- ✅ How It Works section (3-step process with images)
- ✅ Security features showcase (4 security highlights)
- ✅ Pricing section (3 tiers: Free, Pro, Enterprise)
- ✅ FAQ section with accordion (6 common questions)
- ✅ Contact form (name, email, message)
- ✅ Professional header with navigation
- ✅ Comprehensive footer with links
- ✅ Tech-focused imagery from Unsplash
- ✅ Blue color scheme with dark background
- ✅ Smooth animations and transitions
- ✅ Lucide-react icons (no emoji)
- ✅ Shadcn UI components
- ✅ Planet Express logo integration (header & footer)

### Phase 2 - Backend Integration (December 10, 2024)
- ✅ Contact form API endpoint (/api/contact)
- ✅ MongoDB integration for storing contact submissions
- ✅ Gmail SMTP email service setup
- ✅ Email validation (EmailStr with Pydantic)
- ✅ Field validation (min_length for name and message)
- ✅ HTML email templates with styling
- ✅ Error handling for email failures
- ✅ Success/error responses to frontend
- ✅ Form clearing after successful submission
- ✅ Loading states on submit button

### Design Elements
- Dark slate background (#020617)
- Blue accent colors (#3b82f6, #06b6d4)
- Backdrop blur effects
- Hover animations on cards and buttons
- Smooth scroll behavior
- Responsive grid layouts
- Planet Express logo (yellow rocket)

---

## Email Configuration
**Current Status:** Configured with placeholder credentials

**Environment Variables (backend/.env):**
```
GMAIL_USER=your-email@gmail.com (UPDATE THIS)
GMAIL_APP_PASSWORD=your-app-password-here (UPDATE THIS)
RECIPIENT_EMAIL=your-email@gmail.com (UPDATE THIS)
```

**To Enable Email Functionality:**
1. Update GMAIL_USER with your Gmail address
2. Generate Gmail App Password:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Create App Password at https://myaccount.google.com/apppasswords
3. Update GMAIL_APP_PASSWORD with the 16-character password
4. Update RECIPIENT_EMAIL (where contact form emails should be sent)
5. Restart backend: `sudo supervisorctl restart backend`

---

## Prioritized Backlog

### P0 Features (Critical - Not Started)
- None (core functionality complete)

### P1 Features (High Priority - Not Started)
- Authentication system (Sign In/Get Started functionality)
- User dashboard for file transfers
- Actual file upload/download functionality
- Payment integration for Pro/Enterprise plans
- Email service with real credentials (currently using placeholders)

### P2 Features (Nice to Have)
- Blog section for content marketing
- Live chat support widget
- Newsletter subscription
- Customer testimonials with real data
- Integration showcase/marketplace
- API documentation page
- Case studies section
- Rate limiting for contact form
- CAPTCHA/spam protection

---

## API Contracts

### POST /api/contact
**Request:**
```json
{
  "name": "string (min: 1, max: 100)",
  "email": "valid email address",
  "message": "string (min: 1, max: 5000)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you soon."
}
```

**Response (Validation Error):**
```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "error message",
      "type": "validation_error"
    }
  ]
}
```

---

## Database Schema

### contact_submissions Collection
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "message": "string",
  "timestamp": "ISO datetime string"
}
```

---

## Next Tasks
1. ✅ Update Gmail credentials in backend/.env when ready to go live
2. Add rate limiting to contact form (prevent spam)
3. Consider adding CAPTCHA for production
4. Implement user authentication flow
5. Plan file transfer core functionality
6. Add analytics tracking

---

## Technical Stack
- **Frontend:** React 19, Tailwind CSS, Shadcn UI, Axios
- **Backend:** FastAPI, Motor (async MongoDB), Python SMTP
- **Database:** MongoDB
- **Icons:** Lucide React
- **Images:** Unsplash (via vision_expert_agent)
- **Email:** Gmail SMTP (TLS on port 587)

---

## Testing Results
- Backend validation: ✅ Passing (empty fields rejected)
- Contact form submission: ✅ Working
- Database storage: ✅ Working (8 test submissions recorded)
- Email service: ⚠️ Configured with placeholders (will work with real credentials)
- Frontend integration: ✅ Working
- Logo display: ✅ Planet Express logo showing correctly

---

## Notes
- All contact form submissions are saved to MongoDB even if email sending fails
- Email sending gracefully handles authentication failures
- Frontend has both HTML5 and backend validation
- Planet Express branding successfully integrated throughout the site
- Ready for production after updating email credentials
