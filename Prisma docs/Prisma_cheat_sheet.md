# Prisma Functions Cheat Sheet

This document provides an overview of commonly used Prisma functions, their descriptions, and scenarios for when to use them.

## Read Operations

### `findMany`
- **Description**: Retrieves multiple records that match specified criteria.
- **When to use**: When you need to fetch a list of records, optionally filtered, sorted, or paginated.
- **Example**:
  ```typescript
  const users = await prisma.user.findMany({
    where: { age: { gte: 18 } },
    orderBy: { name: 'asc' },
    take: 10,
  })
  ```

### `findUnique`
- **Description**: Retrieves a single record based on a unique identifier.
- **When to use**: When you need to fetch a specific record using its unique field (like ID).
- **Example**:
  ```typescript
  const user = await prisma.user.findUnique({
    where: { id: 1 }
  })
  ```

### `findFirst`
- **Description**: Retrieves the first record that matches specified criteria.
- **When to use**: When you need to find a single record that matches certain conditions.
- **Example**:
  ```typescript
  const oldestUser = await prisma.user.findFirst({
    orderBy: { age: 'desc' }
  })
  ```

## Create Operations

### `create`
- **Description**: Creates a new record in the database.
- **When to use**: When you need to add a new entry to a table.
- **Example**:
  ```typescript
  const newUser = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com' }
  })
  ```

### `createMany`
- **Description**: Creates multiple records in a single operation.
- **When to use**: When you need to insert multiple records efficiently.
- **Example**:
  ```typescript
  const newUsers = await prisma.user.createMany({
    data: [
      { name: 'Bob', email: 'bob@example.com' },
      { name: 'Charlie', email: 'charlie@example.com' }
    ]
  })
  ```

## Update Operations

### `update`
- **Description**: Updates a single record based on a unique identifier.
- **When to use**: When you need to modify a specific record.
- **Example**:
  ```typescript
  const updatedUser = await prisma.user.update({
    where: { id: 1 },
    data: { email: 'newemail@example.com' }
  })
  ```

### `updateMany`
- **Description**: Updates multiple records that match specified criteria.
- **When to use**: When you need to modify multiple records based on a condition.
- **Example**:
  ```typescript
  const updatedUsers = await prisma.user.updateMany({
    where: { age: { lt: 18 } },
    data: { status: 'MINOR' }
  })
  ```

## Delete Operations

### `delete`
- **Description**: Deletes a single record based on a unique identifier.
- **When to use**: When you need to remove a specific record.
- **Example**:
  ```typescript
  const deletedUser = await prisma.user.delete({
    where: { id: 1 }
  })
  ```

### `deleteMany`
- **Description**: Deletes multiple records that match specified criteria.
- **When to use**: When you need to remove multiple records based on a condition.
- **Example**:
  ```typescript
  const deletedInactiveUsers = await prisma.user.deleteMany({
    where: { lastLogin: { lt: new Date('2023-01-01') } }
  })
  ```

## Aggregation and Grouping

### `count`
- **Description**: Counts the number of records that match specified criteria.
- **When to use**: When you need to get the total count of records.
- **Example**:
  ```typescript
  const totalUsers = await prisma.user.count()
  ```

### `aggregate`
- **Description**: Performs aggregation operations on a set of records.
- **When to use**: When you need to calculate statistics like average, sum, etc.
- **Example**:
  ```typescript
  const stats = await prisma.order.aggregate({
    _sum: { amount: true },
    _avg: { amount: true },
    where: { status: 'COMPLETED' }
  })
  ```

### `groupBy`
- **Description**: Groups records by one or more fields and performs aggregations.
- **When to use**: When you need to group data and calculate statistics for each group.
- **Example**:
  ```typescript
  const usersByCountry = await prisma.user.groupBy({
    by: ['country'],
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } }
  })
  ```

Remember to always handle potential errors and use appropriate error handling in your actual code.