<!-- # Swagger Basics and API Documentation -->

## Lesson Overview :pencil2:

In this lesson, you will learn how to document a **Node.js + Express** API using **Swagger UI** and **OpenAPI 3.0**. Swagger UI lets you visualize and interact with an API from an OpenAPI definition, and `swagger-jsdoc` can generate that definition from JSDoc comments in your code. 

We will keep everything in **JavaScript** and use **ES modules**. You will configure Swagger UI in an Express project, document a couple of routes, and expose interactive API docs in the browser.

<br>  <!-- don't remove -->

## Learning Objectives :notebook:

By the end of this lesson, you will be able to:

1. Understand what **Swagger** and the **OpenAPI Specification** are.
2. Set up **Swagger UI** in a Node.js + Express project.
3. Document API routes using **JSDoc comments** and **OpenAPI 3.0**.
4. Document request bodies, path parameters, and responses.
5. Expose interactive API documentation at a dedicated route such as `/api-docs`.

<br>

## Key Definitions and Examples :key:

### What is Swagger and OpenAPI? :thinking:

**Swagger** is a set of tools used to design, document, and visualize APIs, and **Swagger UI** renders an interactive interface from an OpenAPI definition. The **OpenAPI Specification (OAS)** is the standard format used to describe REST APIs.  
### Benefits of API Documentation :page_facing_up:

- **Clarity:** helps developers understand available endpoints and payloads
- **Collaboration:** gives teams a shared API contract
- **Testing:** Swagger UI allows interactive testing in the browser
- **Consistency:** OpenAPI creates a standard structure for documentation

<br>

## Setting Up Swagger in a Node.js Project :building_construction:

### Step 1: Initialize a New Node.js Project

Create a new project and initialize npm:

```bash
mkdir swagger-api-doc
cd swagger-api-doc
npm init -y
```

This creates a `package.json` file for the project.

<br>

### Step 2: Configure ESM in `package.json`

We will use **JavaScript with ES modules**.

```json
{
  "name": "swagger-api-doc",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  }
}
```

- `"type": "module"` enables `import` / `export`
- `"start": "node server.js"` starts the application

<br>

### Step 3: Install Dependencies

Install the required packages:

```bash
npm install express swagger-ui-express swagger-jsdoc
```

- `express` → web framework for building the API
- `swagger-ui-express` → serves Swagger UI from an Express app.  
- `swagger-jsdoc` → generates an OpenAPI specification from JSDoc comments.  

<br>

### Step 4: Create the Express Server

Create a `server.js` file:

```js
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js";

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe and User API",
      version: "1.0.0",
      description: "API documentation for users and recipes",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### What this does

- creates an Express app
- parses JSON bodies
- configures Swagger with **OpenAPI 3.0**
- tells `swagger-jsdoc` to scan files in `./routes/*.js`
- serves the docs at:

```text
http://localhost:3000/api-docs
```

<br>

### Step 5: Create a User Route Example

Create a folder called `routes`, then create:

```text
routes/users.js
```

```js
import express from "express";

const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ]);
});

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *       404:
 *         description: User not found
 */
router.get("/:id", (req, res) => {
  res.json({
    id: Number(req.params.id),
    name: "Alice",
    email: "alice@example.com"
  });
});

export default router;
```

### What this shows

- how to document a **GET collection route**
- how to document a **GET by ID route**
- how to define a **path parameter**

<br>

### Step 6: Create a Recipe Route Example

Create:

```text
routes/recipes.js
```

```js
import express from "express";

const router = express.Router();

/**
 * @openapi
 * /recipes:
 *   get:
 *     summary: Retrieve a list of recipes
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: A list of recipes
 */
router.get("/", (req, res) => {
  res.json([
    { id: 1, title: "Pasta Carbonara", difficulty: "medium" },
    { id: 2, title: "Avocado Toast", difficulty: "easy" }
  ]);
});

/**
 * @openapi
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags:
 *       - Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - difficulty
 *             properties:
 *               title:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 example: easy
 *     responses:
 *       201:
 *         description: Recipe created successfully
 */
router.post("/", (req, res) => {
  res.status(201).json({
    message: "Recipe created",
    recipe: req.body
  });
});

export default router;
```

### What this shows

- how to document a **GET route**
- how to document a **POST route**
- how to define a **request body schema**

<br>

### Step 7: Run the Project

Start the server:

```bash
npm start
```

Then open:

```text
http://localhost:3000/api-docs
```

You should now see interactive Swagger documentation for:

- `/users`
- `/users/{id}`
- `/recipes`
- `POST /recipes`

<br>

## Good Documentation Practices :white_check_mark:

When documenting APIs with OpenAPI:

- use a clear `summary`
- group routes with `tags`
- document all required parameters
- describe request bodies accurately
- include expected response codes
- keep the documentation updated when routes change

<br>

## Additional Resources :clipboard:

- Swagger Docs
- OpenAPI Specification
- Express Documentation
- `swagger-ui-express` npm package
- `swagger-jsdoc` npm package

Official references used for this lesson: Swagger UI renders interactive API documentation from an OpenAPI definition, and `swagger-jsdoc` generates an OpenAPI specification from JSDoc comments.  [oai_citation:4‡Swagger](https://swagger.io/tools/swagger-ui/?utm_source=chatgpt.com)