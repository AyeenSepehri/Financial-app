# 🧪 Docker Configuration Test

## Prerequisites Check

Before running Docker commands, make sure you have:

1. **Docker Desktop** installed and running
2. **Node.js 18+** installed
3. **Git** installed

## Test Commands

### 1. Check Docker Installation
```bash
docker --version
docker-compose --version
```

### 2. Build Docker Image
```bash
# Build the image
docker build -t financial-app:latest .

# Check if image was created
docker images | grep financial-app
```

### 3. Test Development Environment
```bash
# Start development environment
npm run docker:dev

# Check running containers
docker ps

# Stop development environment
npm run docker:dev:down
```

### 4. Test Production Environment
```bash
# Start production environment
npm run docker:prod

# Check running containers
docker ps

# Stop production environment
npm run docker:prod:down
```

### 5. Test Individual Container
```bash
# Run the container
docker run -p 3000:3000 financial-app:latest

# Test in another terminal
curl http://localhost:3000
```

## Expected Results

1. **Docker build** should complete successfully
2. **Development environment** should start both app and JSON server
3. **Production environment** should start optimized containers
4. **Application** should be accessible at http://localhost:3000

## Troubleshooting

### Common Issues:

1. **Docker not found**: Install Docker Desktop
2. **Port already in use**: Stop other services using port 3000
3. **Build fails**: Check if all files are present
4. **Container won't start**: Check logs with `docker logs <container-id>`

## Next Steps

Once Docker is working:

1. Test Kubernetes deployment
2. Set up CI/CD pipeline
3. Configure production environment 