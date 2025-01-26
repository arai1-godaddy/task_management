# Task Management Application - API Documentation

This document provides a comprehensive guide to the API endpoints for the **Task Management Application**. These endpoints allow users to manage their tasks, including creating an account, logging in, creating tasks, viewing tasks, and deleting tasks.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [API Endpoints](#api-endpoints)
3. [Docker Setup](#Docker-setup)

---

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Install the required dependencies using `bundle install`.
3. Start the server: `rails s`.
4. Use the provided endpoints to interact with the application.

Base URL: `http://localhost:3000`

---

## API Endpoints

### **1. Sign Up**
- **Endpoint**: `POST /sign_up/`
- **Description**: Create a new user account.
- **Request Body**:
    ```json
    {
        "user": {
            "name": "Ashutosh Rai",
            "email": "dummy@gmail.com",
            "password": "1234567890asdf",
            "password_confirmation": "1234567890asdf"
        }
    }
    ```
- After making POST get back to the rails console and click on the link present their to verify your email.


### **2. Login**
- **Endpoint**: `POST /login/`
- **Description**: Log in an existing user.
- **Request Body**:
    ```json
    {
        "user": {
            "email": "dummy@gmail.com",
            "password": "1234567890asdf"
        }
    }
    ```


### **3. Create Task**
- **Endpoint**: `POST /api/tasks/`
- **Description**: Create a new task.
- **Request Body**:
    ```json
    {
        "task": {
            "title": "Hello worldssssss22222!",
            "priority": 1,
            "status": 1
        }
    }
    ```

### **4. Get All Tasks**
- **Endpoint**: `GET /api/tasks/`
- **Description**: Retrieve all tasks for the logged-in user.
- 

### **5. Update Task**
- **Endpoint**: `PUT /api/tasks/:id`
- **Description**: Update an existing task by its ID.
- **Example**: `PUT /api/tasks/4`
- **Request Body**:
    ```json
    {
        "task": {
            "id": 4,
            "title": "Hello worldssssss22222! This is update",
            "priority": 1,
            "status": 2
        }
    }
    ```

### **6. Delete Task**
- **Endpoint**: `DELETE /api/tasks/:id`
- **Description**: Delete a task by its ID.
- **Example**: `DELETE /api/tasks/5`

---
## Docker Setup
Run the application using `docker-compose`:
```bash
docker-compose up
```
If you encounter any migration duplicate errors, use the following commands to resolve them:
1. ```  docker exec task_management-app-1 rails db:rollback ```
2. ```  docker exec task_management-app-1 rails db:migrate  ```
