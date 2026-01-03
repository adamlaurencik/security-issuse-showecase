# Security Demo Shop

A simple e-commerce application designed for security training demonstrations. This application intentionally contains security vulnerabilities for educational purposes.

**WARNING: This application is intentionally insecure. Do NOT use in production or expose to the internet.**

## Architecture

- **Frontend**: React application (port 3000)
- **Backend**: Node.js/Express API (port 3001)
- **Database**: PostgreSQL (port 5432)

## Quick Start

### Prerequisites

- Docker and Docker Compose installed

### Running the Application

```bash
# Start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Database: localhost:5432

### Stopping the Application

```bash
docker-compose down

# To also remove volumes (database data)
docker-compose down -v
```

## Default Users

| Username   | Password    | Role     |
|------------|-------------|----------|
| admin      | admin123    | admin    |
| john_doe   | password123 | customer |
| jane_smith | jane2024    | customer |

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/search/:query` - Search products

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user

### Users
- `GET /api/users/:id` - Get user profile

### Orders
- `GET /api/orders/user/:userId` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Add review

## Project Structure

```
security-demo-shop/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       └── App.js
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── database/
    └── init.sql
```

## Adding Security Vulnerabilities

This application is designed as a foundation for adding various security issues for training purposes. Some areas to consider:

- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Insecure Direct Object References (IDOR)
- Authentication/Authorization flaws
- Sensitive data exposure
- Security misconfigurations
- And more...

## Development

### Running without Docker

**Database:**
```bash
# Ensure PostgreSQL is running locally
psql -U postgres -f database/init.sql
```

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## License

For educational purposes only.
