-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cake" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "originalPrice" REAL,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Cake" ("createdAt", "description", "id", "image", "name", "originalPrice", "price", "updatedAt") SELECT "createdAt", "description", "id", "image", "name", "originalPrice", "price", "updatedAt" FROM "Cake";
DROP TABLE "Cake";
ALTER TABLE "new_Cake" RENAME TO "Cake";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
