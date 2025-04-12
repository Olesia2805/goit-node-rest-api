# goit-node-rest-api

A simple REST API built with Node.js and Express for managing contacts. This project includes CRUD operations for contacts and uses tools like Joi for validation, Morgan for logging, and Nodemon for development.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Examples](#examples)
- [Technologies Used](#technologies-used)

---

## Features
- Create, read, update, and delete contacts.
- Input validation using Joi.
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

## Usage

- Start the server:
    ```bash
    npm start
    ```
- The server will run on `http://localhost:3000` by default.
- You can use tools like Postman or curl to interact with the API.

## API Endpoints


Method | Endpoint | Description
--- | --- | ---
GET | `/api/contacts` | Get all contacts
GET | `/api/contacts/:id` | Get a contact by ID
POST | `/api/contacts` | Create a new contact
PUT | `/api/contacts/:id` | Update a contact by ID
DELETE | `/api/contacts/:id` | Delete a contact by ID

### Examples
- **Get all contacts**:
    ```bash
    curl -X GET http://localhost:3000/api/contacts
    ```
- **Get a contact by ID**:
    ```bash
    curl -X GET http://localhost:3000/api/contacts/rsKkOQUi80UsgVPCcLZZW
    ```
- **Create a new contact**:
    ```bash
    curl -X POST http://localhost:3000/api/contacts \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Bob",
        "email": "bob@example.com",
        "phone": "(987) 654-3210"
    }'
    ```
- **Update a contact**:
    ```bash
    curl -X PUT http://localhost:3000/api/contacts/rsKkOQUi80UsgVPCcLZZW \
    -H "Content-Type: application/json" \
    -d '{
        "email": "new-email@example.com"
    }'
    ```
- **Delete a contact**:
    ```bash
    curl -X DELETE http://localhost:3000/api/contacts/rsKkOQUi80UsgVPCcLZZW
    ```

## Technologies Used
- `Node.js`: JavaScript runtime for server-side development.
- `Express`: Web framework for building APIs.
- `Joi`: Schema validation library for input validation.
- `Morgan`: HTTP request logger middleware for Node.js.
- `Nodemon`: Development tool for auto-restarting the server on file changes.
- `Nanoid`: Unique ID generator for creating random IDs.