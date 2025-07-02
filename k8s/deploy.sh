#!/bin/bash

# Financial App Kubernetes Deployment Script
set -e

echo "🚀 Starting Financial App Kubernetes Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

# Build Docker image
print_status "Building Docker image..."
docker build -t financial-app:latest .

# Load image into kind cluster (if using kind)
if kubectl config current-context | grep -q "kind"; then
    print_status "Loading image into kind cluster..."
    kind load docker-image financial-app:latest
fi

# Create namespace
print_status "Creating namespace..."
kubectl apply -f namespace.yaml

# Apply ConfigMaps
print_status "Applying ConfigMaps..."
kubectl apply -f configmap.yaml
kubectl apply -f db-configmap.yaml
kubectl apply -f headers-configmap.yaml

# Deploy JSON Server
print_status "Deploying JSON Server..."
kubectl apply -f json-server-deployment.yaml
kubectl apply -f json-server-service.yaml

# Wait for JSON Server to be ready
print_status "Waiting for JSON Server to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/json-server-deployment -n financial-app

# Deploy main application
print_status "Deploying Financial App..."
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml

# Wait for main app to be ready
print_status "Waiting for Financial App to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/financial-app-deployment -n financial-app

# Apply HPA
print_status "Applying Horizontal Pod Autoscaler..."
kubectl apply -f hpa.yaml

# Apply Ingress (optional - requires ingress controller)
if [ "$1" = "--with-ingress" ]; then
    print_status "Applying Ingress..."
    kubectl apply -f ingress.yaml
    print_warning "Make sure you have an ingress controller installed (like nginx-ingress)"
fi

# Show deployment status
print_status "Deployment completed! Checking status..."
kubectl get all -n financial-app

# Show service URLs
print_status "Service URLs:"
kubectl get svc -n financial-app

print_status "🎉 Deployment completed successfully!"
print_status "To access the application:"
print_status "  - Port forward: kubectl port-forward svc/financial-app-service 3000:80 -n financial-app"
print_status "  - Then visit: http://localhost:3000" 