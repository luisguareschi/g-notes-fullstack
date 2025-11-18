# Next.js BaseApp Fullstack Template

## Description
A frontend template to be used as a starting point for new projects.

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Install dependencies](#install-dependencies)
  - [Setup prisma](#setup-prisma)
- [Usage](#usage)
  - [Dev server](#dev-server)
  - [Build](#build)
  - [Generate OpenAPI definitions and React Query API hooks](#generate-openapi-definitions-and-react-query-api-hooks)
  - [Lint](#lint)
  - [Migrate and apply Prisma changes](#migrate-and-apply-prisma-changes)
  - [Reset the database](#reset-the-database)
  - [Prisma Studio](#prisma-studio)
- [OpenAPI Reference](#openapi-reference)
  - [With Zod Schemas](#with-zod-schemas)
  - [JSDoc Documentation Tags](#jsdoc-documentation-tags)

## Technologies
- Next.js
- TailwindCSS
- TypeScript
- React Query
- react-hot-toast
- Orval for automatically generated API hooks
- Shadcn UI
- Prisma ORM
- Better Auth for authentication

## Installation

### Install dependencies:

```bash
yarn install
```

Copy the `.env.example` file to `.env` and add the necessary variables.

### Setup prisma

```bash
npx prisma migrate dev # run migrations
npx prisma generate # generate the prisma client
```

*Note: Make sure to run `npx prisma migrate dev` after each schema change.*

The table structure is defined in the `prisma/schema.prisma` file.

## Usage

### Dev server:

```bash
yarn dev
```

### Build:

```bash
yarn build
```

### Generate OpenAPI definitions and React Query API hooks:

Note: You can view the API documentation at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

```bash
yarn api
```

### Lint:

```bash
yarn lint:fix
```

### Migrate and apply Prisma changes:

```bash
npx prisma migrate dev
```

### Reset the database:

```bash
npx prisma migrate reset
```

### Prisma Studio:

```bash
npx prisma studio
```

## OpenAPI Reference:

Follow the instructions below to add JSDoc documentation tags to your API routes. After that, run `yarn api` to generate the OpenAPI definitions and React Query API hooks.

### With Zod Schemas

```typescript
// src/app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const ProductParams = z.object({
  id: z.string().describe("Product ID"),
});

export const ProductResponse = z.object({
  id: z.string().describe("Product ID"),
  name: z.string().describe("Product name"),
  price: z.number().positive().describe("Product price"),
});

/**
 * Get product information
 * @description Fetches detailed product information by ID
 * @pathParams ProductParams
 * @response ProductResponse
 * @openapi
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Implementation...
}
```

### JSDoc Documentation Tags

| Tag                    | Description                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `@description`         | Endpoint description                                                                                                     |
| `@pathParams`          | Path parameters type/schema                                                                                              |
| `@params`              | Query parameters type/schema                                                                                             |
| `@body`                | Request body type/schema                                                                                                 |
| `@bodyDescription`     | Request body description                                                                                                 |
| `@response`            | Response type/schema with optional code and description (`User`, `201:User`, `User:Description`, `201:User:Description`) |
| `@responseDescription` | Response description                                                                                                     |
| `@responseSet`         | Override default response set (`public`, `auth`, `none`)                                                                 |
| `@add`                 | Add custom response codes (`409:ConflictResponse`, `429`)                                                                |
| `@contentType`         | Request body content type (`application/json`, `multipart/form-data`)                                                    |
| `@auth`                | Authorization type (`bearer`, `basic`, `apikey`)                                                                         |
| `@tag`                 | Custom tag                                                                                                               |
| `@deprecated`          | Marks the route as deprecated                                                                                            |
| `@openapi`             | Marks the route for inclusion in documentation (if includeOpenApiRoutes is enabled)                                      |


