# Financial App Documentation

A modern, production-ready financial transaction management application built with cutting-edge web technologies and optimized for performance, scalability, and user experience.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Known Issues](#known-issues)

## Overview

Financial App is a comprehensive transaction management system designed to handle large volumes of financial data with real-time updates, advanced filtering capabilities, and seamless offline functionality. The application follows modern web development practices and implements the PRPL (Push, Render, Pre-cache, Lazy-load) pattern for optimal performance.

## Technology Stack

### Frontend Architecture
- **Framework**: Next.js 15.3.3 with App Router
- **Runtime**: React 19 with TypeScript
- **UI Library**: Ant Design (antd) with Tailwind CSS for styling
- **State Management**: Redux Toolkit for global state + React Query (TanStack Query) for server state
- **Type Safety**: Full TypeScript implementation with strict type checking

### Backend & Data
- **API Mock**: JSON Server for development and testing
- **Data Format**: RESTful API with JSON responses
- **Validation**: Client-side validation with React Hook Form

### Performance & Optimization
- **Code Splitting**: Dynamic imports and lazy loading
- **Caching**: Service Worker with intelligent caching strategies
- **Rendering**: Optimized React re-rendering with memoization
- **Bundle Optimization**: Tree shaking and dead code elimination

### Infrastructure
- **Containerization**: Production-ready Docker configuration
- **Orchestration**: Kubernetes deployment with HPA and Ingress
- **Testing**: Jest with React Testing Library (≥80% coverage target)

## Project Structure

```
financial-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── transactions/  # Transaction endpoints
│   │   ├── layout.tsx         # Root layout with PWA setup
│   │   ├── page.tsx           # Main application page
│   │   └── providers.tsx      # Global providers (Redux, React Query)
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Generic UI components
│   │   └── transactions/     # Transaction-specific components
│   │       ├── containers/   # Main container components
│   │       ├── filters/      # Filter components
│   │       ├── table/        # Data table components
│   │       ├── modals/       # Modal dialogs
│   │       └── form/         # Form components
│   ├── features/             # Redux features (domain-driven)
│   │   └── transactions/     # Transaction state management
│   ├── hooks/               # Custom React hooks
│   │   ├── customHooks/     # Business logic hooks
│   │   ├── queries/         # React Query hooks
│   │   └── reduxHooks/      # Redux hooks
│   └── store/               # Redux store configuration
├── public/                  # Static assets
│   ├── sw.js               # Service Worker
│   ├── manifest.json       # PWA manifest
│   └── icons/              # PWA icons
├── k8s/                    # Kubernetes deployment files
├── tests/                  # Test files
└── docker-compose.yml      # Development environment
```

## Key Features

### Progressive Web App (PWA)
- **Service Worker**: Intelligent caching with network-first strategy
- **Offline Support**: Full offline functionality with background sync
- **Install Prompt**: Native app installation experience
- **Push Notifications**: Real-time transaction notifications

### Advanced Data Management
- **Pagination**: Efficient handling of large datasets (1000+ records)
- **Dynamic Sorting**: Multi-column sorting with performance optimization
- **Advanced Filtering**: Comprehensive filtering by:
  - Date range selection
  - Amount range (min/max)
  - Transaction status (completed/pending/failed)
  - Merchant selection
  - Payment method filtering
- **Real-time Updates**: React Query for seamless data synchronization

### User Experience
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Form Validation**: Client-side validation with immediate feedback
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Optimistic UI updates with proper loading indicators

### Performance Optimizations
- **PRPL Pattern**: Push critical resources, render initial route, pre-cache remaining routes, lazy-load other routes
- **Code Splitting**: Dynamic imports for reduced initial bundle size
- **Memoization**: React.memo and useMemo for optimized re-rendering
- **Bundle Optimization**: Tree shaking and dead code elimination

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized development)
- Kubernetes cluster (for production deployment)

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd financial-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Start the JSON Server (in a separate terminal)**
```bash
npm run server
```

5. **Access the application**
   - Frontend: http://localhost:3000
   - API Server: http://localhost:4000

## Development Setup

### Local Development
```bash
# Start development server
npm run dev

# Start JSON Server for API
npm run server

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Docker Development
```bash
# Start development environment with Docker
npm run docker:dev

# Stop development environment
npm run docker:dev:down
```

### Available Scripts
- `npm run dev` - Start Next.js development server
- `npm run server` - Start JSON Server for API
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint

## Production Deployment

### Docker Deployment
```bash
# Build and start production containers
npm run docker:prod

# Stop production containers
npm run docker:prod:down
```

### Kubernetes Deployment
```bash
# Deploy to Kubernetes cluster
npm run k8s:deploy

# Deploy with Ingress
npm run k8s:deploy:ingress

# Clean up deployment
npm run k8s:cleanup
```

### Manual Kubernetes Deployment
```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Apply ConfigMaps
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/db-configmap.yaml
kubectl apply -f k8s/headers-configmap.yaml

# Deploy services
kubectl apply -f k8s/json-server-deployment.yaml
kubectl apply -f k8s/json-server-service.yaml
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/app-service.yaml

# Apply HPA and Ingress
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

## API Documentation

### Transaction Endpoints

#### GET /api/transactions/list
Retrieve paginated transaction list with filtering and sorting.

**Query Parameters:**
- `_page` (number): Page number (default: 1)
- `_limit` (number): Items per page (default: 10)
- `status` (string): Filter by status (completed/pending/failed)
- `merchant` (string): Filter by merchant ID
- `paymentMethod` (string): Filter by payment method
- `amount_gte` (number): Minimum amount filter
- `amount_lte` (number): Maximum amount filter
- `start` (string): Start date (ISO format)
- `end` (string): End date (ISO format)
- `sortBy` (string): Sort field
- `sortOrder` (string): Sort direction (asc/desc)

**Response:**
```json
{
  "data": [Transaction[]],
  "total": number
}
```

#### POST /api/transactions/add
Add a new transaction.

**Request Body:**
```json
{
  "amount": number,
  "currency": string,
  "description": string,
  "merchant": {
    "name": string,
    "id": string
  },
  "payment_method": {
    "type": string,
    "last4": string,
    "brand": string
  }
}
```

### Transaction Data Model
```typescript
interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  description: string;
  merchant: {
    name: string;
    id: string;
  };
  payment_method: {
    type: string;
    last4: string;
    brand: string;
  };
  sender: {
    name: string;
    account_id: string;
  };
  receiver: {
    name: string;
    account_id: string;
  };
  fees: {
    processing_fee: number;
    currency: string;
  };
  metadata: {
    order_id: string;
    customer_id: string;
  };
}
```

## Testing

### Test Coverage
The project maintains comprehensive test coverage with a target of ≥80%:

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Feature testing with Redux and React Query
- **Custom Hooks Testing**: Business logic validation
- **API Testing**: Endpoint functionality verification

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
```
tests/
├── components/          # Component tests
├── features/           # Feature tests
├── hooks/             # Hook tests
└── TransactionsContainer.test.tsx  # Main container test
```

## Known Issues

### JSON Server Syntax Error
**Issue**: JSON Server may fail to start due to syntax errors in db.json file.

**Solution**: Ensure db.json has valid JSON syntax. The file should start with:
```json
{
  "transactions": [
    {
      // transaction objects
    }
  ]
}
```

### Docker Transaction Addition Bug
**Issue**: When running the application via Docker, adding a new transaction may result in a 500 error response while the transaction appears to be added to the table successfully.

**Symptoms:**
- Transaction appears in the UI table
- React Toastify shows error message
- No actual POST request is made to the API
- Request not visible in browser Network tab

**Workaround:**
- This issue does not occur in local development using `npm run dev` or `npm run server`
- For production deployment, use Kubernetes deployment instead of Docker
- The issue is currently under investigation and will be resolved in the next release

**Status**: Under investigation - will be fixed in upcoming release

---

## Contributing

This project follows SOLID principles and clean code practices. When contributing:

1. Follow TypeScript best practices
2. Implement proper error handling
3. Add comprehensive tests for new features
4. Use proper code splitting and lazy loading
5. Maintain performance optimization standards

## License

[License information to be added] 