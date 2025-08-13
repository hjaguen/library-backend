# Library Management System

A full-stack library management system built with SQL Server, .NET, Node.js, and React.

## Prerequisites

### Database (SQL Server)
- SQL Server 2019 or later
- Database name: `library_db`
- The database schema includes tables for:
  - Members (id, name, email, address, created_at)
  - Books (id, title, isbn, quantity, created_at)
  - Checkouts (id, member_id, book_id, checkout_date, due_date, return_date, late_fee)

### Backend (.NET & Node.js)
- .NET 6.0 or later
- Node.js 18.x or later
- NPM 9.x or later
- TypeScript 5.9.2 or later

### Frontend (React)
- Node.js 18.x or later
- NPM 9.x or later

## Setup Instructions

### 1. Database Setup
1. Create a new database named `library_db` in SQL Server
2. Run the schema validation script:
```sql
-- From database/validate-schema.sql
-- This will validate the required tables and constraints
```

### 2. Backend Setup
1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following configuration:
```env
DATABASE_URL=your_database_connection_string
PORT=3000
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
   - Caching layer implementation
   - Query optimization
   - Connection pooling

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
├── backend/            # Backend application code
│   └── tests/         # Backend test files
├── database/          # Database scripts and migrations
│   └── validate-schema.sql
├── docs/             # Documentation files
│   └── manual-test-cases.md
├── frontend/         # React frontend application
│   └── src/         # Frontend source code
├── package.json     # Node.js dependencies and scripts
└── README.md       # Project documentation
```
