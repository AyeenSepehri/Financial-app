#!/bin/bash

# Financial App Kubernetes Cleanup Script
set -e

echo "🧹 Starting Financial App Kubernetes Cleanup..."

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

# Check if namespace exists
if kubectl get namespace financial-app &> /dev/null; then
    print_status "Deleting all resources in financial-app namespace..."
    
    # Delete all resources in the namespace
    kubectl delete all --all -n financial-app
    kubectl delete configmap --all -n financial-app
    kubectl delete hpa --all -n financial-app
    kubectl delete ingress --all -n financial-app
    
    # Delete namespace
    print_status "Deleting namespace..."
    kubectl delete namespace financial-app
    
    print_status "✅ Cleanup completed successfully!"
else
    print_warning "Namespace 'financial-app' does not exist. Nothing to clean up."
fi

# Remove Docker image (optional)
if [ "$1" = "--remove-image" ]; then
    print_status "Removing Docker image..."
    docker rmi financial-app:latest 2>/dev/null || print_warning "Docker image not found or already removed."
fi 