# Docker Setup Guide for Planet Express Landing Page

## Quick Start (Recommended)

The easiest way to get started is using the provided setup script:

```bash
./setup.sh
```

This script will:
- Check if Docker and Docker Compose are installed
- Create .env files from examples
- Build Docker images
- Start all services
- Display access URLs

## Manual Setup

If you prefer to set up manually, follow these steps:

### Step 1: Prerequisites

Make sure you have Docker and Docker Compose installed:

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version
```

If not installed:
- Docker: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/

### Step 2: Configure Environment Variables

1. **Backend Configuration:**
   ```bash
   cp backend/.env.example backend/.env
   ```
   
   Edit `backend/.env` and update:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

2. **Frontend Configuration:**
   ```bash
   cp frontend/.env.example frontend/.env
   ```
   
   The default settings should work for local development.

### Step 3: Start Services

Build and start all services:

```bash
docker compose up --build
```

Or run in detached mode (background):

```bash
docker compose up -d
```

### Step 4: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs
- **MongoDB**: mongodb://localhost:27017

## Docker Compose Services

The `docker-compose.yml` defines three services:

### 1. MongoDB (Database)
- **Image**: mongo:7.0
- **Port**: 27017
- **Volume**: mongodb_data (persistent storage)
- **Health Check**: Automatic ping test

### 2. Backend (FastAPI)
- **Build**: From ./backend/Dockerfile
- **Port**: 8001
- **Depends On**: MongoDB (with health check)
- **Hot Reload**: Enabled (code changes auto-reload)

### 3. Frontend (React)
- **Build**: From ./frontend/Dockerfile
- **Port**: 3000
- **Depends On**: Backend
- **Hot Reload**: Enabled (code changes auto-reload)

## Common Commands

### Start Services
```bash
# Start in foreground (see logs)
docker compose up

# Start in background
docker compose up -d

# Rebuild and start
docker compose up --build
```

### Stop Services
```bash
# Stop services (keep data)
docker compose down

# Stop and remove volumes (delete data)
docker compose down -v
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
```

### Restart Services
```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart backend
docker compose restart frontend
```

### Check Status
```bash
# View running containers
docker compose ps

# View resource usage
docker compose stats
```

### Access Container Shell
```bash
# Backend container
docker compose exec backend bash

# Frontend container
docker compose exec frontend sh

# MongoDB container
docker compose exec mongodb mongosh
```

## Troubleshooting

### Port Already in Use

If you get "port already allocated" errors:

```bash
# Check what's using the ports
lsof -i :3000  # Frontend
lsof -i :8001  # Backend
lsof -i :27017 # MongoDB

# Kill the process or change ports in docker-compose.yml
```

### MongoDB Connection Issues

```bash
# Check MongoDB health
docker compose exec mongodb mongosh --eval "db.adminCommand('ping')"

# View MongoDB logs
docker compose logs mongodb
```

### Backend Not Starting

```bash
# View backend logs
docker compose logs backend

# Rebuild backend
docker compose build --no-cache backend
docker compose up backend
```

### Frontend Build Issues

```bash
# Clear and rebuild
docker compose down
docker volume rm $(docker volume ls -q | grep node_modules)
docker compose build --no-cache frontend
docker compose up frontend
```

### Clear Everything and Start Fresh

```bash
# Stop and remove everything
docker compose down -v

# Remove all project containers, volumes, and images
docker compose down -v --rmi all

# Rebuild from scratch
docker compose up --build
```

## Development Workflow

### Hot Reload

Both frontend and backend support hot reload:
- **Backend**: Changes to Python files auto-reload the server
- **Frontend**: Changes to React files trigger automatic rebuild

### Debugging

Add breakpoints and debug:

```bash
# View detailed logs
docker compose logs -f backend

# Add print statements in code
# They will appear in the logs
```

### Database Access

Access MongoDB directly:

```bash
# Open MongoDB shell
docker compose exec mongodb mongosh

# Use the database
use planet_express_db

# View collections
show collections

# Query data
db.contact_submissions.find()
```

## Production Considerations

For production deployment, modify `docker-compose.yml`:

1. **Remove Hot Reload Volumes:**
   ```yaml
   # Remove these lines:
   volumes:
     - ./backend:/app
     - ./frontend:/app
   ```

2. **Build Production Frontend:**
   Update frontend Dockerfile to use production build:
   ```dockerfile
   CMD ["yarn", "build"]
   # Then serve with nginx
   ```

3. **Use Environment-Specific Configs:**
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up
   ```

4. **Secure MongoDB:**
   Add authentication and use external MongoDB service

5. **Use Reverse Proxy:**
   Add nginx for SSL termination and routing

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [FastAPI with Docker](https://fastapi.tiangolo.com/deployment/docker/)
- [React with Docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

---

**Need help? Check the main README.md or open an issue!** 🚀
