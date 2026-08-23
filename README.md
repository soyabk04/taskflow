# TaskFlow Backend

TaskFlow is a multi-tenant project and task management backend built with Node.js, TypeScript, Express, PostgreSQL, Prisma, Redis, and BullMQ.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Redis
- BullMQ
- JWT
- bcrypt
- Zod
- Nodemailer
- Vitest
- Supertest
- Docker

## Features

### Authentication
- User registration
- User login
- JWT access and refresh tokens
- HTTP-only cookies
- bcrypt password hashing
- Refresh-token persistence
- Logout
- Logout from all devices

### Organizations
- Create organizations
- Organization membership
- `org_admin` and `member` roles
- Organization-level access control

### Projects
- Create, read, update, and delete projects
- Projects scoped to organizations

### Tasks
- Create, read, update, and delete tasks
- Task assignment
- Task priority and status
- Organization membership validation

### Comments
- Add comments to tasks
- Get task comments
- Organization-level access control

### Background Jobs
BullMQ and Redis are used for asynchronous jobs such as:
- Welcome emails
- Organization membership emails
- Task assignment emails
- Other background processing

### Testing
- Unit tests
- Integration tests
- Authentication tests
- Task-assignment validation
- Pagination tests
- Cross-tenant access tests
- Validation and error tests

---

## Project Structure

```text
taskflow/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   ├── env.config.ts
│   │   ├── redis.config.ts
│   │   └── mail.config.ts
│   │
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── schemas/
│   ├── middleware/
│   ├── queues/
│   ├── workers/
│   ├── libs/
│   ├── errors/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── tests/
│   ├── helpers/
│   │   └── auth.ts
│   ├── unit/
│   │   ├── auth.test.ts
│   │   ├── task-assignment.test.ts
│   │   └── pagination.test.ts
│   └── integration/
│       ├── auth.test.ts
│       └── project.test.ts
│
├── docker-compose.yml
├── Dockerfile
├── .env
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## Requirements

Install:

- Node.js 20+
- Docker
- Docker Compose
- npm

---

## Installation

```bash
git clone <repository-url>
cd taskflow
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskflow"

REDIS_URL="redis://localhost:6379"

ATJWTKEY="your-access-token-secret"
RTJWTKEY="your-refresh-token-secret"

SMTP_HOST="smtp-relay.brevo.com"
SMTP_PORT="587"
SMTP_USER="your-smtp-user"
SMTP_PASSWORD="your-smtp-password"
MAIL_FROM="TaskFlow <your-email@example.com>"
```

Do not commit `.env`.

---

## Docker Setup

PostgreSQL and Redis run with Docker Compose.

Start:

```bash
docker compose up -d
```

Check:

```bash
docker ps
```

Stop:

```bash
docker compose down
```

View logs:

```bash
docker compose logs
```

---

## PostgreSQL

Default development configuration:

```text
Host: localhost
Port: 5432
Database: taskflow
User: postgres
Password: postgres
```

Connection string:

```text
postgresql://postgres:postgres@localhost:5432/taskflow
```

Check PostgreSQL:

```bash
docker exec -it taskflow-postgres pg_isready -U postgres
```

---

## Redis

Redis runs on:

```text
localhost:6379
```

Test Redis:

```bash
docker exec -it taskflow-redis redis-cli ping
```

Expected:

```text
PONG
```

---

## Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Create a migration:

```bash
npx prisma migrate dev --name your_migration_name
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## Development

Start the API:

```bash
npm run dev
```

API:

```text
http://localhost:3000
```

Start the BullMQ worker in another terminal:

```bash
npm run worker
```

Development setup:

```text
Terminal 1:
npm run dev

Terminal 2:
npm run worker
```

---

## Authentication

Authentication uses JWT tokens stored in HTTP-only cookies.

Cookies:

```text
accesstoken
refreshtoken
```

Access tokens are short-lived.

Refresh tokens are long-lived, persisted in PostgreSQL, and can be revoked.

### Authentication endpoints

```http
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/logout-all
POST /auth/refresh
```

### Register

```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }
}
```

### Login

```json
{
  "user": {
    "email": "john@example.com",
    "password": "Password123"
  }
}
```

---

## Organizations

Organizations provide the tenant boundary.

Example:

```http
POST /api/organizations
```

Request:

```json
{
  "orgName": "Acme"
}
```

An organization member has one of these roles:

```text
org_admin
member
```

---

## Projects

Projects belong to an organization.

```http
POST   /api/organizations/:organizationId/projects
GET    /api/organizations/:organizationId/projects
GET    /api/organizations/:organizationId/projects/:projectId
PATCH  /api/organizations/:organizationId/projects/:projectId
DELETE /api/organizations/:organizationId/projects/:projectId
```

Example:

```json
{
  "projectData": {
    "name": "TaskFlow Backend",
    "description": "Backend development project"
  }
}
```

---

## Tasks

Tasks belong to projects.

```http
POST   /api/organizations/:organizationId/projects/:projectId/tasks
GET    /api/organizations/:organizationId/projects/:projectId/tasks
GET    /api/organizations/:organizationId/projects/:projectId/tasks/:taskId
PATCH  /api/organizations/:organizationId/projects/:projectId/tasks/:taskId
DELETE /api/organizations/:organizationId/projects/:projectId/tasks/:taskId
```

Example:

```json
{
  "taskData": {
    "title": "Implement authentication",
    "description": "Implement JWT authentication",
    "priority": "high",
    "assigneeId": "user-id"
  }
}
```

When a task is assigned, a BullMQ notification job can be queued for the assignee.

---

## Comments

Comments belong to tasks.

```http
POST /api/organizations/:organizationId/projects/:projectId/tasks/:taskId/comments
GET  /api/organizations/:organizationId/projects/:projectId/tasks/:taskId/comments
```

Example:

```json
{
  "content": "This task is ready for review."
}
```

---

## Background Email Jobs

Email notifications are processed asynchronously.

```text
Task/User action
      ↓
Create database record
      ↓
BullMQ
      ↓
Redis
      ↓
Mail Worker
      ↓
Nodemailer
      ↓
SMTP provider
      ↓
Email
```

Examples:

```text
User registered
    → Welcome email

User added to organization
    → Organization membership email

Task assigned
    → Task assignment email
```

---

## Testing

The project uses Vitest and Supertest.

Run tests in watch mode:

```bash
npm test
```

Run tests once:

```bash
npm run test:run
```

Run coverage:

```bash
npm run test:coverage
```

### Test structure

```text
tests/
├── helpers/
│   └── auth.ts
│
├── unit/
│   ├── auth.test.ts
│   ├── task-assignment.test.ts
│   └── pagination.test.ts
│
└── integration/
    ├── auth.test.ts
    └── project.test.ts
```

Integration tests use Supertest.

Authentication tests can:

```text
Register
   ↓
Login
   ↓
Get authentication cookies
   ↓
Use cookies for protected endpoints
```

---

## Testing Strategy

### Unit Tests

Test individual pieces of logic:

```text
- Password hashing
- Password comparison
- Authentication logic
- Task assignment validation
- Pagination
- Zod schemas
```

### Integration Tests

Test the complete API:

```text
- Register
- Login
- Refresh token
- Logout
- Organization CRUD
- Member management
- Project CRUD
- Task CRUD
- Comments
- Task assignment
- Validation
- Error responses
- Cross-tenant security
```

### Cross-Tenant Security

Every organization-owned resource must be scoped to its organization.

Example:

```text
Organization A
 ├── Project A
 │    └── Task A
 │
 └── Members

Organization B
 ├── Project B
 │    └── Task B
 │
 └── Members
```

A member of Organization B must not be able to access resources belonging to Organization A.

Expected response:

```json
{
  "success": false,
  "message": "Forbidden",
  "errorCode": "FORBIDDEN"
}
```

with HTTP status:

```text
403
```

---

## Error Handling

The application uses centralized error handling through `AppError` and error middleware.

Example:

```ts
throw new AppError(
  "Project not found",
  404,
  "PROJECT_NOT_FOUND"
);
```

Response:

```json
{
  "success": false,
  "message": "Project not found",
  "errorCode": "PROJECT_NOT_FOUND"
}
```

---

## Useful Commands

### Docker

```bash
docker compose up -d
docker compose down
docker compose logs
docker ps
```

### PostgreSQL

```bash
docker exec -it taskflow-postgres pg_isready -U postgres
```

### Redis

```bash
docker exec -it taskflow-redis redis-cli ping
```

### Development

```bash
npm run dev
npm run worker
```

### Prisma

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

### Testing

```bash
npm test
npm run test:run
npm run test:coverage
```

---

## Production Considerations

Before production deployment:

- Use strong JWT secrets
- Use HTTPS
- Use secure HTTP-only cookies
- Use managed PostgreSQL
- Use managed Redis
- Do not expose Redis publicly
- Configure production SMTP
- Do not commit environment variables
- Run Prisma migrations during deployment
- Run workers separately from the API
- Add structured logging
- Add monitoring and health checks

---

## License

This project is developed as part of a backend development assignment.
