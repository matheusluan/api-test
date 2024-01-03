# Node.js TypeScript CRUD API

This is a development test project for a Node.js API using TypeScript, serving as a CRUD (Create, Read, Update, Delete) application to manage users and companies for a mobile app.

## Prerequisites

- Node.js installed (version X.X.X)
- npm (Node Package Manager) installed

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/matheusluan/api-test

2. **Navigate to the project directory**

   ```bash
   cd api-test

3. **Install dependencies**

   ```bash
   npm install   

4. **Build the TypeScript code**

   ```bash
   npm run build

5. **Start Application**

   ```bash
   npm start  

## API Endpoints   

- GET /user: Get a list of all users.

- GET /user/:id: Get details of a specific user.

- POST /user: Create a new user.

- PUT /user/:id: Update details of a specific user.


- GET /companies: Get a list of all companies.

- GET /companies/:id: Get details of a specific company.

- POST /companies: Create a new company.

- PUT /companies/:id: Update details of a specific company.

## Testing  
# Example: Get all users
curl http://localhost:3333/v1/user