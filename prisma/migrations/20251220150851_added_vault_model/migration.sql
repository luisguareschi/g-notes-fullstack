-- CreateTable
CREATE TABLE "vault" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VaultMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VaultMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "vault_name_ownerId_key" ON "vault"("name", "ownerId");

-- CreateIndex
CREATE INDEX "_VaultMembers_B_index" ON "_VaultMembers"("B");

-- AddForeignKey
ALTER TABLE "vault" ADD CONSTRAINT "vault_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VaultMembers" ADD CONSTRAINT "_VaultMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VaultMembers" ADD CONSTRAINT "_VaultMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "vault"("id") ON DELETE CASCADE ON UPDATE CASCADE;
