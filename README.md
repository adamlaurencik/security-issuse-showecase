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

## Security Issues for Training

This application contains intentional security vulnerabilities for educational purposes. Below is a documented list of issues to explore during security training.

---

### 1. Leaking Secrets

**Severity:** Critical

**Description:**
Sensitive credentials and API keys are committed directly to the repository, making them accessible to anyone with repository access.

**Locations:**

- `environment-variables/prod.env` - Contains production secrets committed to git:
  - Database credentials (`DB_PASSWORD=Pr0d_P@ssw0rd_2024!`)
  - Payment API keys (Stripe, PayPal)
  - AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
  - JWT signing secret
  - Email service credentials (SendGrid, SMTP)
  - Third-party API keys (Google Maps, Twilio)

- `docker-compose.yml` - Database credentials in plain text:
  ```yaml
  POSTGRES_PASSWORD: shoppass
  DB_PASSWORD: shoppass
  ```

- `database/init.sql` - Hardcoded passwords in seed data:
  ```sql
  INSERT INTO users (username, email, password, role) VALUES
  ('admin', 'admin@shop.local', 'admin123', 'admin')
  ```

**Weak Credentials:**

| Username | Password | Risk |
|----------|----------|------|
| admin | admin123 | Default admin with trivially guessable password |
| john_doe | password123 | Common password pattern |
| jane_smith | jane2024 | Predictable password with username + year |

**Impact:**
- Unauthorized access to production systems
- Data breaches
- Financial fraud via payment API compromise
- AWS account takeover
- Complete application compromise

**How to Detect:**
- Use tools like `git-secrets`, `trufflehog`, or `gitleaks` to scan repositories
- Review `.gitignore` to ensure sensitive files are excluded
- Audit committed history for accidentally pushed secrets

**Remediation:**
- Never commit secrets to version control
- Use environment variables injected at runtime
- Use secret management tools (AWS Secrets Manager, HashiCorp Vault, etc.)
- Rotate all exposed credentials immediately
- Add pre-commit hooks to prevent secret commits
- Enforce strong password policies

---

### 2. [Placeholder for next security issue]

*To be added...*

---

## Adding More Security Vulnerabilities

Additional areas to explore for future training modules:

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
