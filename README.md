# TaskFlow Backend

TaskFlow is a multi-tenant project and task management backend built with Node.js, TypeScript, Express, PostgreSQL, Prisma, Redis, and BullMQ.

The system supports authentication, organizations, organization members, projects, tasks, comments, background jobs, and email notifications.

---

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

---

## Features

### Authentication

- User registration
- User login
- JWT access token
- JWT refresh token
- HTTP-only cookies
- Password hashing using bcrypt
- Refresh token persistence
- Logout
- Logout from all devices

### Organizations

- Create organization
- Organization membership
- Organization roles
- Organization admin
- Organization member
- Organization-level access control

### Projects

- Create project
- Get projects
- Get project
- Update project
- Delete project
- Organization-based project isolation

### Tasks

- Create task
- Get tasks
- Get task
- Update task
- Delete task
- Task assignment
- Task priority
- Task status
- Organization membership validation

### Comments

- Add comments to tasks
- Get task comments
- Organization-level access control

### Background Jobs

BullMQ and Redis are used for background processing.

Examples:

- Welcome emails
- Organization membership emails
- Task assignment emails
- Other asynchronous jobs

### Testing

- Unit tests
- Integration tests
- Authentication tests
- Task assignment validation tests
- Pagination tests
- Cross-tenant access tests

---

# Project Structure

```text
taskflow/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   │
│   ├── config/
│   │   ├── env.config.ts
│   │   ├── redis.config.ts
│   │   └── mail.config.ts
│   │
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   ├── organization.controller.ts
│   │   ├── project.controller.ts
│   │   ├── task.controller.ts
│   │   └── comment.controller.ts
│   │
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── organization.service.ts
│   │   ├── project.service.ts
│   │   ├── task.service.ts
│   │   └── comment.service.ts
│   │
│   ├── routes/
│   │   ├── user.route.ts
│   │   ├── organization.route.ts
│   │   ├── project.route.ts
│   │   └── task.route.ts
│   │
│   ├── schemas/
│   │   ├── user.schema.ts
│   │   ├── organization.schema.ts
│   │   ├── project.schema.ts
│   │   └── task.schema.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── asyncHandler.ts
│   │   └── validate.middleware.ts
│   │
│   ├── queues/
│   │   ├── mail.queue.ts
│   │   └── task.queue.ts
│   │
│   ├── workers/
│   │   ├── mail.worker.ts
│   │   └── task.worker.ts
│   │
│   ├── libs/
│   │   └── prisma.ts
│   │
│   ├── errors/
│   │   └── AppError.ts
│   │
│   ├── utils/
│   │   ├── password.ts
│   │   ├── token.ts
│   │   └── pagination.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
│   ├── helpers/
│   │   └── auth.ts
│   │
│   ├── unit/
│   │   ├── auth.test.ts
│   │   ├── task-assignment.test.ts
│   │   └── pagination.test.ts
│   │
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
