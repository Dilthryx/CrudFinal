-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT 'https://via.placeholder.com/150',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
