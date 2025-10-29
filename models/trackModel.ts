model User {
  id       String  @id @default(cuid())
  email    String  @unique
 password String
  name     String?
  posts    Post[]
}

// Define the `Track` table in the database
model Track {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  title     String
  content   String?
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}
