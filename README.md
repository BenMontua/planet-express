# Planet Express Landing Page 🚀

A beautiful, Futurama-themed landing page for a file transfer solution, featuring the Planet Express delivery company branding.

## Features

- 🚀 Planet Express themed design with Futurama references
- 📧 Contact form with Gmail SMTP integration
- 🎨 Beautiful UI with amber/gold color scheme
- 📱 Fully responsive design
- 🔒 MongoDB database for storing contact submissions
- ⚡ FastAPI backend with async support
- ⚛️ React frontend with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Shadcn UI
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Email**: Gmail SMTP

## Quick Start with Docker Compose

### Prerequisites
- Docker and Docker Compose installed on your system

### Running the Application

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Start all services:
```bash
docker compose up
```

This will start:
- MongoDB on `localhost:27017`
- Backend API on `localhost:8001`
- Frontend on `localhost:3000`

3. Open your browser and visit: `http://localhost:3000`

### Stopping the Application

```bash
docker compose down
```

To remove volumes as well:
```bash
docker compose down -v
```

## Configuration

### Email Setup

To enable the contact form email functionality, update the environment variables in `docker-compose.yml`:

```yaml
environment:
  - GMAIL_USER=your-actual-email@gmail.com
  - GMAIL_APP_PASSWORD=your-16-char-app-password
  - RECIPIENT_EMAIL=where-to-receive-emails@gmail.com
```

**Getting Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification (if not already enabled)
3. Create App Password for "Mail"
4. Copy the 16-character password

### Environment Variables

**Backend** (`backend/.env`):
```
MONGO_URL=mongodb://mongodb:27017
DB_NAME=planet_express_db
CORS_ORIGINS=*
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here
RECIPIENT_EMAIL=your-email@gmail.com
```

**Frontend** (`frontend/.env`):
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Development

### Running Without Docker

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

**Frontend:**
```bash
cd frontend
yarn install
yarn start
```

**MongoDB:**
```bash
# Install and run MongoDB locally
mongod --dbpath /path/to/data/directory
```

## Project Structure

```
planet-express-landing/
├── backend/
│   ├── server.py           # FastAPI application
│   ├── email_service.py    # Email sending logic
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile         # Backend Docker config
│   └── .env               # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.js      # Main landing page
│   │   │   └── LandingStyles.css
│   │   ├── components/ui/      # Shadcn UI components
│   │   └── data/
│   │       └── mock.js         # Mock data
│   ├── public/
│   │   └── planet-express-logo.png
│   ├── Dockerfile             # Frontend Docker config
│   ├── package.json
│   └── .env                   # Frontend environment variables
├── docker-compose.yml         # Docker Compose configuration
└── README.md
```

## API Endpoints

### Backend API (Port 8001)

- `GET /api/` - Health check
- `POST /api/contact` - Submit contact form
  - Body: `{ "name": "string", "email": "string", "message": "string" }`
  - Returns: `{ "success": boolean, "message": "string" }`

## Features Breakdown

### Landing Page Sections

1. **Hero Section**: Eye-catching headline with Planet Express branding
2. **Features**: 6 key features with icons (Unlimited file size, encryption, speed, etc.)
3. **How It Works**: 3-step delivery process
4. **Security**: 4 security features showcase
5. **Pricing**: 3 pricing tiers (Free, Pro, Enterprise)
6. **FAQ**: Accordion with common questions
7. **Contact Form**: Working contact form with email notifications
8. **Footer**: Company information and links

### Design Elements

- 🎨 Amber/gold color scheme from Planet Express logo
- 🚀 Futurama-themed copy and references
- ✨ Smooth animations and hover effects
- 📱 Fully responsive design
- 🎭 Comic-style visual effects

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
docker compose ps

# View MongoDB logs
docker compose logs mongodb
```

### Backend Not Starting
```bash
# View backend logs
docker compose logs backend

# Restart backend service
docker compose restart backend
```

### Frontend Build Issues
```bash
# Clear node_modules and rebuild
docker compose down
docker compose build --no-cache frontend
docker compose up
```

## Production Deployment

For production deployment:

1. Update `REACT_APP_BACKEND_URL` to your production backend URL
2. Set proper `CORS_ORIGINS` in backend environment
3. Use production-grade MongoDB setup
4. Enable HTTPS
5. Set strong passwords and secrets
6. Configure proper logging and monitoring

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Credits

- Planet Express logo and Futurama references are property of 20th Century Fox
- Built with React, FastAPI, and MongoDB
- UI components from Shadcn UI

---

**"Good news everyone! Your files will be delivered faster than the Planet Express Ship!"** 🚀
