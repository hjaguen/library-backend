# Library Management System - Backend

A Node.js backend for the library management system, built with Express, TypeScript, and SQLite database.

## Prerequisites

### Database
- SQLite3
- The database schema includes tables for:
  - Members (id, name, email, membershipStatus)
  - Books (id, title, author, isbn, available)
  - Checkouts (id, bookId, memberId, checkoutDate, dueDate, returnDate)

### Backend
- Node.js 18.x or later
- NPM 9.x or later
- TypeScript 5.x or later

### Frontend (React)
- Node.js 18.x or later
- NPM 9.x or later

## Setup Instructions

### 1. Database Setup
The SQLite database will be created automatically when you start the application for the first time. The schema is managed through TypeORM entities.

### 2. Backend Setup
1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following configuration:
```env
PORT=3000
DATABASE_TYPE=sqlite
DATABASE_NAME=library.db
```

3. Build the TypeScript code:
```bash
npm run build
```

## Running the Application

### Backend
Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm run start
```

The backend server will run on http://localhost:3000 by default.

## API Specification

### Members API

#### Register New Member
```http
POST /api/members
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "address": "string"
}
```

#### Get Member Details
```http
GET /api/members/{id}
```

### Books API

#### Checkout Book
```http
POST /api/books/checkout
Content-Type: application/json

{
  "memberId": "number",
  "bookId": "number",
  "checkoutDate": "date",
  "dueDate": "date"
}
```

#### Return Book
```http
POST /api/books/return
Content-Type: application/json

{
  "checkoutId": "number",
  "returnDate": "date"
}
```

### Error Responses
All endpoints return standard error responses:
```json
{
  "error": "string",
  "message": "string",
  "statusCode": "number"
}
```

## Testing

The system includes comprehensive test cases covering:
- Member registration flow
- Book checkout process
- Return handling with late fee calculation
- Edge cases and error conditions
- Performance testing scenarios
- Security validation
- Accessibility compliance

Detailed test cases are documented in `docs/manual-test-cases.md`.

## Future Enhancements

1. Authentication & Authorization
   - Implement JWT-based authentication
   - Role-based access control
   - Session management

2. Advanced Features
   - Book reservation system
   - Automatic email notifications
   - Payment gateway integration for late fees
   - QR code generation for books

3. Performance Optimizations
   - Request caching
   - Query optimization
   - Database indexing

4. Monitoring & Logging
   - Centralized logging system
   - Performance metrics collection
   - Real-time monitoring dashboard

5. Additional Integrations
   - External book databases
   - Mobile app development
   - Barcode scanner integration
   - Report generation system

## Project Structure
```
library-backend/
├── src/              # Source code
│   ├── controllers/  # Route controllers
│   ├── models/       # TypeORM entities
│   ├── routes/       # Express routes
│   ├── data-source.ts# Database configuration
│   └── server.ts     # Main application file
├── tests/            # Test files
│   └── api.test.js   # API integration tests
├── docs/             # Documentation files
│   └── manual-test-cases.md  # Manual test scenarios
├── .env              # Environment variables
├── .env.example      # Example environment variables
├── .gitignore        # Git ignore rules
├── library.sqlite    # SQLite database file
├── package.json      # Node.js dependencies and scripts
├── package-lock.json # Locked dependencies versions
├── tsconfig.json     # TypeScript configuration
└── README.md        # Project documentation
```
