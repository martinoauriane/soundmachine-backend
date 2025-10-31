# SoundMachine Backend

## Prisma

Prisma is an open-source ORM for Node.js and TypeScript. It is used as an alternative to writing plain SQL. Prisma currently supports PostgreSQL, MySQL, SQL Server, SQLite, MongoDB and CockroachDB.

##### 1. Set the database connection

```
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

##### 2. Create two database tables with Prisma Migrate

Prisma Migrate generates SQL migration files. Once the Prisma models are created, it is possible to generate SQL migration files and run them against the database. Run the following commands in your terminal:

```
$ npx prisma migrate dev --name init
```

This prisma migrate dev command generates SQL files and directly runs them against the database.

##### 3. Install and generate Prisma Client

Prisma Client is a type-safe database client that's generated from your Prisma model definition. Because of this approach, Prisma Client can expose CRUD operations that are tailored specifically to your models.
To install Prisma Client in your project, run the following command in your terminal:

$ npm install @prisma/client

##### 4. Use Prisma Client in your NestJS services

You're now able to send database queries with Prisma Client. You can now use CRUD (Create, Read, Update, Delete) operations with your generated Prisma Client API.

##### CREATE

##### READ

Get record by ID or unique identifier

```
const user = await prisma.user.findUnique({
  where: {
    id: 99,
  },
})
```

Get all:

EXEMPLE:

```
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
    },
  },
})
```

EXEMPLE:

```
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
    },
    posts: {
      some: {
        published: false,
      },
    },
  },
})
```

Include related records

EXEMPLE:
The following query returns all ADMIN users and includes each user's posts in the result:

`const users = await prisma.user.findMany({
  where: {
    role: 'ADMIN',
  },
  include: {
    posts: true,
  },
})`

##### UPDATE

Update a single record

EXEMPLE:

The following query uses update() to find and update a single User record by email:

```
const updateUser = await prisma.user.update({
  where: {
    email: 'viola@prisma.io',
  },
  data: {
    name: 'Viola the Magnificent',
  },
})
```

Update multiple records.

EXEMPLE:

The following query uses updateMany() to update all User records that contain prisma.io:

`const updateUsers = await prisma.user.updateMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  data: {
    role: 'ADMIN',
  },
})`
