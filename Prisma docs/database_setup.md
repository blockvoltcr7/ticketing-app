# Prisma Database Setup Guide

This guide provides instructions on how to set up a new database using Prisma and ensure correct configuration for your Next.js project.

## Creating a New Database

1. **Install Prisma CLI**
   If you haven't already, install the Prisma CLI globally:
   ```
   npm install -g prisma
   ```

2. **Initialize Prisma in your project**
   Run the following command in your project root:
   ```
   npx prisma init
   ```
   This will create a `prisma` directory with a `schema.prisma` file and a `.env` file in your project root.

3. **Configure your database connection**
   In the `.env` file, set your `DATABASE_URL`. For a PostgreSQL database, it should look like this:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name?schema=public"
   ```
   Replace `username`, `password`, `localhost`, and `your_database_name` with your actual database credentials.

4. **Define your data model**
   Edit the `prisma/schema.prisma` file to define your data model. For example:
   ```prisma
   model Ticket {
     id          Int      @id @default(autoincrement())
     title       String
     description String?
     status      String
     priority    String
     created_at  DateTime @default(now())
   }
   ```

5. **Generate Prisma Client**
   Run the following command to generate the Prisma Client:
   ```
   npx prisma generate
   ```

6. **Create the database schema**
   Run the following command to create the database schema:
   ```
   npx prisma db push
   ```

## Ensuring Correct Setup

1. **Verify database connection**
   Run the following command to open Prisma Studio and verify your database connection:
   ```
   npx prisma studio
   ```

2. **Create a Prisma Client instance**
   Create a file `lib/prisma.ts` with the following content:
   ```typescript
   import { PrismaClient } from '@prisma/client'

   let prisma: PrismaClient

   if (process.env.NODE_ENV === 'production') {
     prisma = new PrismaClient()
   } else {
     if (!(global as any).prisma) {
       (global as any).prisma = new PrismaClient()
     }
     prisma = (global as any).prisma
   }

   export default prisma
   ```

3. **Use Prisma in your API routes**
   In your API routes, import and use the Prisma Client like this:
   ```typescript
   import prisma from '@/lib/prisma'

   export async function GET() {
     const data = await prisma.yourModel.findMany()
     // ... rest of your code
   }
   ```

4. **Handle database migrations**
   When you make changes to your schema, create and apply migrations:
   ```
   npx prisma migrate dev --name your_migration_name
   ```

5. **Seed your database (optional)**
   Create a `prisma/seed.ts` file to seed your database with initial data:
   ```typescript
   import { PrismaClient } from '@prisma/client'

   const prisma = new PrismaClient()

   async function main() {
     // Your seeding operations
   }

   main()
     .catch((e) => {
       console.error(e)
       process.exit(1)
     })
     .finally(async () => {
       await prisma.$disconnect()
     })
   ```
   Add a script to your `package.json`:
   ```json
   "scripts": {
     "db:seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
   }
   ```
   Run the seed script with:
   ```
   npm run db:seed
   ```

6. **Environment variables**
   Ensure your `.env` file is not committed to version control. Add it to your `.gitignore` file.

7. **Prisma schema synchronization**
   Regularly run `npx prisma generate` after changes to keep your Prisma Client in sync with your schema.

By following these steps, you can ensure a correct setup and smooth operation of your Prisma database in your Next.js project.