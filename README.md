# Event Management System API

A comprehensive Event Management System API built with Express and MongoDB to perform CRUD operations on users, events, registrations, and feedback. Authentication is implemented using JWT to ensure secure access for users and event organizers.

## Models

### User
- username: String, required, unique
- email: String, required, unique
- password: String, required
- isOrganizer: Boolean, default: false
- createdAt: Date, default: Date.now

### Event
- name: String, required
- description: String, required
- date: Date, required
- location: String, required
- organizer: ObjectId, ref: User, required
- participants: [ObjectId], ref: User, optional
- createdAt: Date, default: Date.now
- updatedAt: Date, default: Date.now

### Registration
- user: ObjectId, ref: User, required
- event: ObjectId, ref: Event, required
- registeredAt: Date, default: Date.now

### Feedback
- content: String, required
- rating: Number, required, min: 1, max: 5
- author: ObjectId, ref: User, required
- event: ObjectId, ref: Event, required
- createdAt: Date, default: Date.now

## Routes

### Auth Routes

#### Register a User
- URL: /auth/register
- Method: POST
- Body Parameters:
  - username: String, required
  - email: String, required
  - password: String, required
  - isOrganizer: Boolean, optional

#### Login a User
- URL: /auth/login
- Method: POST
- Body Parameters:
  - email: String, required
  - password: String, required

### User Routes

#### Get All Users
- URL: /users
- Method: GET
- Headers: Authorization: Bearer <token>

#### Get a User by ID
- URL: /users/:id
- Method: GET
- Headers: Authorization: Bearer <token>

### Event Routes

#### Create an Event
- URL: /events
- Method: POST
- Headers: Authorization: Bearer <token>
- Body Parameters:
  - name: String, required
  - description: String, required
  - date: Date, required
  - location: String, required
  - organizer: ObjectId, required
  - participants: [ObjectId], optional

#### Get All Events
- URL: /events
- Method: GET

#### Get an Event by ID
- URL: /events/:id
- Method: GET

#### Update an Event by ID
- URL: /events/:id
- Method: PUT
- Headers: Authorization: Bearer <token>
- Body Parameters (at least one of the following):
  - name: String, optional
  - description: String, optional
  - date: Date, optional
  - location: String, optional
  - participants: [ObjectId], optional

#### Delete an Event by ID
- URL: /events/:id
- Method: DELETE
- Headers: Authorization: Bearer <token>

### Registration Routes

#### Create a Registration
- URL: /registrations
- Method: POST
- Headers: Authorization: Bearer <token>
- Body Parameters:
  - user: ObjectId, required
  - event: ObjectId, required

#### Get All Registrations
- URL: /registrations
- Method: GET
- Headers: Authorization: Bearer <token>

#### Get a Registration by ID
- URL: /registrations/:id
- Method: GET
- Headers: Authorization: Bearer <token>

#### Delete a Registration by ID
- URL: /registrations/:id
- Method: DELETE
- Headers: Authorization: Bearer <token>

### Feedback Routes

#### Create Feedback
- URL: /feedback
- Method: POST
- Headers: Authorization: Bearer <token>
- Body Parameters:
  - content: String, required
  - rating: Number, required, min: 1, max: 5
  - author: ObjectId, required
  - event: ObjectId, required

#### Get All Feedback
- URL: /feedback
- Method: GET
- Headers: Authorization: Bearer <token>

#### Get Feedback by ID
- URL: /feedback/:id
- Method: GET
- Headers: Authorization: Bearer <token>

#### Delete Feedback by ID
- URL: /feedback/:id
- Method: DELETE
- Headers: Authorization: Bearer <token>