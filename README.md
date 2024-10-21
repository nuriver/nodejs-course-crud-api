# nodejs-course-crud-api
This repository contains a Node.js application implementing a basic CRUD (Create, Read, Update, Delete) API for managing users.

**Features:**
- **CRUD Operations and endpoints:**
    - **GET /api/users:** Retrieves all users.
    - **GET /api/users/:userId:** Retrieves a specific user by ID.
    - **POST /api/users:** Creates a new user.
    - **PUT /api/users/:userId:** Updates an existing user.
    - **DELETE /api/users/:userId:** Deletes a user.
- **User Model:**
    - `id` (unique string identifier, UUID).
    - `username` (string, required).
    - `age` (number, required).
    - `hobbies` (array of strings, required).
      
**Installation:**
1. Clone this repository:
   ```
   git clone https://github.com/nuriver/nodejs-course-crud-api.git
2. Navigate to the project directory:
   ```
   cd nodejs-course-crud-api
3. Go to development branch:
   ```
   git checkout develop
4. Install dependencies:
   ```
   npm install

**Environment Variables:**
- The application reads the port number on which it should run from a .env file.
- Create a .env file in the project root directory with the following content:
  ```
  PORT=3000  # Replace with your desired port number
   
**Running the Application:**
1. Development Mode (Recommended for Development)
   - Starts the application with automatic code reloading on changes using nodemon
   ```
   npm run start:dev
2. Production Mode (For Deployment)
   - Compiles the TypeScript code into JavaScript and runs the bundled application. This is recommended for deployment to production environments.
   ```
   npm run start:prod

**Using the Application:**
- Use Postman or a similar application to send requests to the listed endpoints.
