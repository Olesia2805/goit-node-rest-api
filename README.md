A RESTful API built with Node.js and Express for managing contacts. The project uses Sequelize for database interaction and includes features like input validation, error handling, and modular architecture.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Contacts](#contacts)
- [Examples](#examples)
    - [Authentication Examples](#authentication-examples)
    - [Contacts Examples](#contacts-examples)
- [Technologies Used](#technologies-used)

---

## Features
- Create, read, update, and delete contacts.
- Input validation using Joi.
- Database integration with Sequelize and PostgreSQL.
- Error handling with custom HTTP error helpers.
- Modular and scalable project structure.

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Olesia2805/goit-node-rest-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd goit-node-rest-api
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and set up your environment variables. You can use the [`.env.example`](.env.example) file as a reference.
    ```bash
    cp .env.example .env
    ```

## Usage
- Start the server:
    ```bash
    npm start
    ```
- The server will run on `http://localhost:3000` by default.
- You can use tools like Postman or curl to interact with the API.

## API Endpoints

### Authentication
Method | Endpoint | Description
--- | --- | ---
POST | `/api/auth/register` | Register a new user
POST | `/api/auth/login` | Login a user and generate a JWT token
POST | `/api/auth/logout` | Logout a user by invalidating the token
GET | `/api/auth/current` | Get the current user's details
PATCH | `/api/auth/subscription` | Update the user's subscription type

### Contacts
Method | Endpoint | Description
--- | --- | ---
GET | `/api/contacts` | Get all contacts (supports pagination and filtering by favorite status)
GET | `/api/contacts/:id` | Get a contact by ID
POST | `/api/contacts` | Create a new contact
PUT | `/api/contacts/:id` | Update a contact by ID
DELETE | `/api/contacts/:id` | Delete a contact by ID
PATCH | `/api/contacts/:id/favorite` | Update favorite status of a contact by ID

## Examples

### Authentication Examples
- **Register a new user**:
    ```bash
    curl -X POST http://localhost:3000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{
        "email": "example@example.com",
        "password": "examplepassword"
    }'
    ```
- **Log in a user**:
    ```bash
    curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
        "email": "example@example.com",
        "password": "examplepassword"
    }'
    ```
- **Log out a user**:
    ```bash
    curl -X POST http://localhost:3000/api/auth/logout \
   -H "Authorization: Bearer <your_token>"
    ```
- **Get current user**:
    ```bash
    curl -X GET http://localhost:3000/api/auth/current \
    -H "Authorization: Bearer <your_token>"
    ```
- **Update the user's subscription**:
    ```bash
    curl -X PATCH http://localhost:3000/api/auth/subscription \
    -H "Authorization: Bearer <your_token>" \
    -H "Content-Type: application/json" \
    -d '{
        "subscription": "pro"
    }'
    ```

### Contacts Examples
- **Get all contacts**:
    ```bash
    curl -X GET http://localhost:3000/api/contacts?page=1&limit=10&favorite=true \
    -H "Authorization: Bearer <your_token>"
    ```
- **Get a contact by ID**:
    ```bash
    curl -X GET http://localhost:3000/api/contacts/1 \
    -H "Authorization: Bearer <your_token>"
    ```
- **Create a new contact**:
    ```bash
    curl -X POST http://localhost:3000/api/contacts \
    -H "Authorization: Bearer <your_token>" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Bob",
        "email": "bob@example.com",
        "phone": "(987) 654-3210"
    }'
    ```
- **Update a contact**:
    ```bash
    curl -X PUT http://localhost:3000/api/contacts/1 \
    -H "Authorization: Bearer <your_token>" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "new-email@example.com"
    }'
    ```
- **Delete a contact**:
    ```bash
    curl -X DELETE http://localhost:3000/api/contacts/1
    -H "Authorization: Bearer <your_token>" \
    ```
-  **Update favorite status**:
    ```bash
    curl -X PATCH http://localhost:3000/api/contacts/1/favorite \
    -H "Authorization: Bearer <your_token>" \
    -H "Content-Type: application/json" \
    -d '{
        "favorite": true
    }'
    ```

## Technologies Used
- `Node.js`: JavaScript runtime for server-side development.
- `Express`: Web framework for building APIs.
- `Joi`: Schema validation library for input validation.
- `Morgan`: HTTP request logger middleware for Node.js.
- `Nodemon`: Development tool for auto-restarting the server on file changes.
- `Sequelize`: Promise-based Node.js ORM for PostgreSQL.
- `PostgreSQL`: Relational database management system.
- `cors`: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- `bcrypt`: Password hashing.
- `jsonwebtoken`: JWT token generation and validation.
- `dotenv`: Environment variable management.