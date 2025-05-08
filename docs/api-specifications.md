# Project Management API Specifications

## Authentication

All API endpoints require JWT authentication using Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## API Endpoints

### Projects

#### GET /api/projects
Lists all projects the authenticated user has access to.

**Query Parameters:**
```typescript
{
  page?: number;       // Default: 1
  limit?: number;      // Default: 20
  status?: string;     // active, completed, archived
  sort?: string;       // created_at, updated_at, name
  order?: string;      // asc, desc
}
```

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "status": "active|completed|archived",
      "start_date": "ISO8601",
      "end_date": "ISO8601",
      "created_at": "ISO8601",
      "updated_at": "ISO8601",
      "members_count": "number",
      "tasks_count": "number"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "total_pages": "number"
  }
}
```

#### POST /api/projects
Creates a new project.

**Request Body:**
```json
{
  "name": "string",           // required
  "description": "string",    // optional
  "start_date": "ISO8601",   // required
  "end_date": "ISO8601",     // optional
  "members": [               // optional
    {
      "user_id": "uuid",
      "role": "owner|admin|member"
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "status": "active",
  "start_date": "ISO8601",
  "end_date": "ISO8601",
  "created_at": "ISO8601",
  "updated_at": "ISO8601"
}
```

### Tasks

#### GET /api/projects/{project_id}/tasks
Lists all tasks in a project.

**Query Parameters:**
```typescript
{
  page?: number;          // Default: 1
  limit?: number;         // Default: 20
  status?: string;        // pending, in_progress, completed
  assignee?: string;      // UUID of assigned user
  priority?: string;      // low, medium, high
  due_date?: string;      // ISO8601
}
```

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "status": "pending|in_progress|completed",
      "priority": "low|medium|high",
      "due_date": "ISO8601",
      "assignee": {
        "id": "uuid",
        "name": "string",
        "email": "string"
      },
      "created_at": "ISO8601",
      "updated_at": "ISO8601"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "total_pages": "number"
  }
}
```

#### POST /api/projects/{project_id}/tasks
Creates a new task in a project.

**Request Body:**
```json
{
  "title": "string",           // required
  "description": "string",     // optional
  "status": "string",         // optional, default: pending
  "priority": "string",       // optional, default: medium
  "due_date": "ISO8601",      // optional
  "assignee_id": "uuid",      // optional
  "parent_task_id": "uuid",   // optional
  "attachments": [           // optional
    {
      "name": "string",
      "url": "string"
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "status": "pending",
  "priority": "medium",
  "due_date": "ISO8601",
  "created_at": "ISO8601",
  "updated_at": "ISO8601"
}
```

### Time Tracking

#### GET /api/projects/{project_id}/time-entries
Lists all time entries for a project.

**Query Parameters:**
```typescript
{
  page?: number;          // Default: 1
  limit?: number;         // Default: 20
  user_id?: string;      // Filter by user
  start_date?: string;   // ISO8601
  end_date?: string;     // ISO8601
  task_id?: string;      // Filter by task
}
```

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "task_id": "uuid",
      "user_id": "uuid",
      "description": "string",
      "start_time": "ISO8601",
      "end_time": "ISO8601",
      "duration": "number",  // in seconds
      "created_at": "ISO8601",
      "updated_at": "ISO8601"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "total_pages": "number"
  }
}
```

#### POST /api/projects/{project_id}/time-entries
Creates a new time entry.

**Request Body:**
```json
{
  "task_id": "uuid",           // required
  "description": "string",     // optional
  "start_time": "ISO8601",    // required
  "end_time": "ISO8601",      // required if not ongoing
  "ongoing": "boolean"        // optional, default: false
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "task_id": "uuid",
  "user_id": "uuid",
  "description": "string",
  "start_time": "ISO8601",
  "end_time": "ISO8601",
  "duration": "number",
  "created_at": "ISO8601",
  "updated_at": "ISO8601"
}
```

### Comments

#### GET /api/tasks/{task_id}/comments
Retrieves comments for a specific task.

**Query Parameters:**
```typescript
{
  page?: number;      // Default: 1
  limit?: number;     // Default: 20
}
```

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "content": "string",
      "user": {
        "id": "uuid",
        "name": "string",
        "avatar_url": "string"
      },
      "attachments": [
        {
          "id": "uuid",
          "name": "string",
          "url": "string",
          "type": "string"
        }
      ],
      "created_at": "ISO8601",
      "updated_at": "ISO8601"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "total_pages": "number"
  }
}
```

#### POST /api/tasks/{task_id}/comments
Creates a new comment on a task.

**Request Body:**
```json
{
  "content": "string",         // required
  "attachments": [           // optional
    {
      "name": "string",
      "file": "binary"
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "content": "string",
  "user": {
    "id": "uuid",
    "name": "string",
    "avatar_url": "string"
  },
  "attachments": [
    {
      "id": "uuid",
      "name": "string",
      "url": "string",
      "type": "string"
    }
  ],
  "created_at": "ISO8601",
  "updated_at": "ISO8601"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "field": [
        "error message"
      ]
    }
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 429 Too Many Requests
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retry_after": 60
  }
}
```

## Rate Limiting

All API endpoints are subject to rate limiting:
- 100 requests per minute per user
- 1000 requests per hour per user
- Rate limit headers are included in all responses:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1620000000
  ```

## Webhooks

### Available Events
- `project.created`
- `project.updated`
- `project.deleted`
- `task.created`
- `task.updated`
- `task.deleted`
- `comment.created`
- `comment.updated`
- `comment.deleted`
- `time_entry.created`
- `time_entry.updated`
- `time_entry.deleted`

### Webhook Payload
```json
{
  "event": "string",
  "timestamp": "ISO8601",
  "data": {
    // Resource specific data
  }
}
```

### Webhook Configuration
Configure webhooks through the API:

#### POST /api/webhooks
```json
{
  "url": "string",
  "events": ["string"],
  "secret": "string"
}
```

## Real-time Updates

Real-time updates are available through WebSocket connections:

```
ws://api.example.com/ws?token=<jwt_token>
```

### Subscribe to Updates
```json
{
  "type": "subscribe",
  "channel": "project.{project_id}"
}
```

### Message Format
```json
{
  "type": "event",
  "event": "task.updated",
  "data": {
    // Resource specific data
  }
}