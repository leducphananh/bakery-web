# Cake Management Feature

## Overview

Complete CRUD (Create, Read, Update, Delete) functionality for managing cakes using Next.js 16 Server Actions and Prisma ORM with SQLite database.

## Technology Stack

- **Next.js 16** - React framework with App Router
- **Prisma 6** - Modern TypeScript ORM
- **SQLite** - Lightweight database (can be switched to PostgreSQL/MySQL)
- **Server Actions** - Type-safe server mutations
- **React Hook Form + Zod** - Form validation
- **Sonner** - Toast notifications

## Database Schema

```prisma
model Cake {
  id            Int      @id @default(autoincrement())
  name          String
  description   String?
  price         Float
  originalPrice Float?
  image         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Project Structure

```
app/
├── admin/
│   └── cakes/
│       ├── page.tsx                 # Server Component (fetches data)
│       ├── actions.ts               # Server Actions (CRUD operations)
│       └── components/
│           ├── CakesClient.tsx      # Client Component (UI state)
│           ├── CakeCard.tsx         # Display cake card
│           ├── CakeFormDialog.tsx   # Create/Edit form
│           ├── DeleteConfirmDialog.tsx
│           ├── EmptyState.tsx
│           └── PageHeader.tsx
lib/
└── prisma.ts                        # Prisma client singleton
prisma/
├── schema.prisma                    # Database schema
├── seed.ts                          # Seed data
└── migrations/                      # Migration history
```

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env`:

```bash
DATABASE_URL="file:./dev.db"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# Seed initial data (optional)
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/admin/cakes` to access the cake management page.

## Features

### ✅ View All Cakes

- Displays all cakes in a responsive grid
- Shows cake image, name, description, price, and original price
- Empty state when no cakes exist

### ✅ Create New Cake

- Form validation with Zod schema
- Image URL preview
- Price formatting with Vietnamese Dong (₫)
- Loading states during submission
- Success/error toast notifications

### ✅ Edit Existing Cake

- Pre-fills form with current data
- Updates database and UI optimistically
- Maintains all validation rules

### ✅ Delete Cake

- Confirmation dialog before deletion
- Removes from database and updates UI
- Toast notification on success/failure

## Server Actions

All CRUD operations are implemented as Next.js Server Actions in `app/admin/cakes/actions.ts`:

### `getCakes()`

Fetches all cakes from database, ordered by creation date (newest first).

### `createCake(data)`

Creates a new cake with validation and revalidates the page cache.

### `updateCake(id, data)`

Updates an existing cake and revalidates the page cache.

### `deleteCake(id)`

Deletes a cake by ID and revalidates the page cache.

## Database Commands

### View data with Prisma Studio

```bash
npx prisma studio
```

Opens a web interface at `http://localhost:5555` to view and edit data.

### Create new migration

```bash
npx prisma migrate dev --name migration_name
```

### Reset database (⚠️ deletes all data)

```bash
npx prisma migrate reset
```

### Deploy migrations to production

```bash
npx prisma migrate deploy
```

## Switching Database Provider

To use PostgreSQL or MySQL instead of SQLite:

1. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // or "mysql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:

```env
# PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/bakery"

# MySQL
DATABASE_URL="mysql://user:password@localhost:3306/bakery"
```

3. Run migration:

```bash
npx prisma migrate dev
```

## API Examples

### Creating a Cake

```typescript
const result = await createCake({
  name: "Chocolate Delight",
  description: "Rich chocolate cake",
  price: 120000,
  originalPrice: 150000,
  image: "https://example.com/image.jpg",
});
```

### Updating a Cake

```typescript
const result = await updateCake(1, {
  name: "Updated Name",
  price: 130000,
});
```

### Deleting a Cake

```typescript
const result = await deleteCake(1);
```

## Form Validation Rules

- **Name**: Required, minimum 1 character
- **Price**: Required, must be greater than 0
- **Original Price**: Optional, must be greater than 0 if provided
- **Image URL**: Optional, must be valid URL format
- **Description**: Optional text

## Toast Notifications

The application uses Sonner for toast notifications:

- ✅ Success: "Đã thêm bánh mới thành công!"
- ✅ Success: "Đã cập nhật bánh thành công!"
- ✅ Success: "Đã xóa bánh thành công!"
- ❌ Error: Custom error messages from server

## Performance Optimizations

1. **Server Components**: Initial data fetching on server
2. **Optimistic Updates**: UI updates before server confirmation
3. **Revalidation**: Automatic cache invalidation with `revalidatePath()`
4. **Singleton Prisma Client**: Prevents connection pool exhaustion in development
5. **Form State Management**: Efficient with React Hook Form

## Troubleshooting

### Prisma Client not generated

```bash
npx prisma generate
```

### Database connection errors

Check your `DATABASE_URL` in `.env` file.

### Migration errors

```bash
npx prisma migrate reset  # ⚠️ This will delete all data
npx prisma migrate dev
```

### Type errors after schema changes

```bash
npx prisma generate
```

## Future Enhancements

- [ ] Image upload to cloud storage (Cloudinary, S3)
- [ ] Pagination for large datasets
- [ ] Search and filter functionality
- [ ] Bulk operations (delete multiple)
- [ ] Categories/tags for cakes
- [ ] Stock inventory management
- [ ] Price history tracking
- [ ] Multi-language support
- [ ] Image optimization with Next.js Image

## Contributing

When adding new fields to the Cake model:

1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add_field_name`
3. Update TypeScript types in components
4. Update form validation schema
5. Update UI components

## License

This project is part of the Bakery Web application.
