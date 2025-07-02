# 🚀 Financial App Deployment Guide

This guide covers Docker containerization and Kubernetes deployment for the Financial App.

## 📋 Prerequisites

- Docker Desktop installed and running
- Node.js 18+ (for local development)
- kubectl (for Kubernetes deployment)
- Kubernetes cluster (minikube, kind, or cloud provider)

## 🐳 Docker Deployment

### Development Environment

1. **Start development environment:**
   ```bash
   npm run docker:dev
   ```
   This will start both the Next.js app and JSON server in development mode.

2. **Stop development environment:**
   ```bash
   npm run docker:dev:down
   ```

### Production Environment

1. **Build and start production environment:**
   ```bash
   npm run docker:prod
   ```

2. **Stop production environment:**
   ```bash
   npm run docker:prod:down
   ```

### Manual Docker Commands

1. **Build Docker image:**
   ```bash
   npm run docker:build
   ```

2. **Run Docker container:**
   ```bash
   npm run docker:run
   ```

3. **Clean up Docker resources:**
   ```bash
   npm run docker:clean
   ```

## ☸️ Kubernetes Deployment

### Quick Start

1. **Deploy to Kubernetes:**
   ```bash
   npm run k8s:deploy
   ```

2. **Deploy with Ingress (requires ingress controller):**
   ```bash
   npm run k8s:deploy:ingress
   ```

3. **Clean up Kubernetes resources:**
   ```bash
   npm run k8s:cleanup
   ```

4. **Clean up everything including Docker image:**
   ```bash
   npm run k8s:cleanup:all
   ```

### Manual Kubernetes Commands

1. **Create namespace:**
   ```bash
   kubectl apply -f k8s/namespace.yaml
   ```

2. **Apply ConfigMaps:**
   ```bash
   kubectl apply -f k8s/configmap.yaml
   kubectl apply -f k8s/db-configmap.yaml
   kubectl apply -f k8s/headers-configmap.yaml
   ```

3. **Deploy JSON Server:**
   ```bash
   kubectl apply -f k8s/json-server-deployment.yaml
   kubectl apply -f k8s/json-server-service.yaml
   ```

4. **Deploy main application:**
   ```bash
   kubectl apply -f k8s/app-deployment.yaml
   kubectl apply -f k8s/app-service.yaml
   ```

5. **Apply Horizontal Pod Autoscaler:**
   ```bash
   kubectl apply -f k8s/hpa.yaml
   ```

6. **Apply Ingress (optional):**
   ```bash
   kubectl apply -f k8s/ingress.yaml
   ```

### Accessing the Application

1. **Port forwarding:**
   ```bash
   kubectl port-forward svc/financial-app-service 3000:80 -n financial-app
   ```

2. **Access the application:**
   - Open browser and go to: `http://localhost:3000`

### Monitoring and Debugging

1. **Check pod status:**
   ```bash
   kubectl get pods -n financial-app
   ```

2. **View logs:**
   ```bash
   kubectl logs -f deployment/financial-app-deployment -n financial-app
   kubectl logs -f deployment/json-server-deployment -n financial-app
   ```

3. **Check services:**
   ```bash
   kubectl get svc -n financial-app
   ```

4. **Check HPA status:**
   ```bash
   kubectl get hpa -n financial-app
   ```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Environment (development/production)
- `NEXT_TELEMETRY_DISABLED`: Disable Next.js telemetry
- `API_BASE_URL`: JSON Server API URL

### Resource Limits

**Financial App:**
- CPU: 250m request, 500m limit
- Memory: 256Mi request, 512Mi limit

**JSON Server:**
- CPU: 50m request, 100m limit
- Memory: 64Mi request, 128Mi limit

### Scaling

The application uses Horizontal Pod Autoscaler (HPA) with:
- Minimum replicas: 2
- Maximum replicas: 10
- CPU target: 70%
- Memory target: 80%

## 🛠️ Troubleshooting

### Common Issues

1. **Image not found:**
   ```bash
   # Rebuild and load image
   docker build -t financial-app:latest .
   kind load docker-image financial-app:latest  # if using kind
   ```

2. **Port already in use:**
   ```bash
   # Check what's using the port
   lsof -i :3000
   # Kill the process or use different port
   ```

3. **JSON Server not accessible:**
   ```bash
   # Check if JSON Server is running
   kubectl get pods -n financial-app -l app=json-server
   # Check logs
   kubectl logs -f deployment/json-server-deployment -n financial-app
   ```

4. **Ingress not working:**
   ```bash
   # Check if ingress controller is installed
   kubectl get pods -n ingress-nginx
   # Install nginx-ingress if needed
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
   ```

### Health Checks

The application includes health checks:

- **Liveness Probe:** Checks if the application is running
- **Readiness Probe:** Checks if the application is ready to serve traffic

### Logs and Monitoring

1. **View application logs:**
   ```bash
   kubectl logs -f deployment/financial-app-deployment -n financial-app
   ```

2. **View JSON Server logs:**
   ```bash
   kubectl logs -f deployment/json-server-deployment -n financial-app
   ```

3. **Check resource usage:**
   ```bash
   kubectl top pods -n financial-app
   ```

## 🔒 Security Considerations

1. **Non-root user:** Containers run as non-root user (UID 1001)
2. **Security context:** Privilege escalation disabled
3. **Capabilities:** All Linux capabilities dropped
4. **Network policies:** Consider implementing network policies for production

## 📈 Production Recommendations

1. **Use a proper database:** Replace JSON Server with a production database
2. **Implement monitoring:** Add Prometheus and Grafana
3. **Set up logging:** Use ELK stack or similar
4. **Configure backups:** Regular database backups
5. **SSL/TLS:** Configure HTTPS with proper certificates
6. **CDN:** Use a CDN for static assets
7. **Load balancer:** Use a proper load balancer in production

## 🎯 Next Steps

1. Set up CI/CD pipeline
2. Implement proper monitoring and alerting
3. Configure production database
4. Set up SSL certificates
5. Implement backup strategies
6. Configure auto-scaling policies 