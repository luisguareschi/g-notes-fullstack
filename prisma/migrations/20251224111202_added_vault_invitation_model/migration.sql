-- CreateTable
CREATE TABLE "vault_invitation" (
    "id" TEXT NOT NULL,
    "vaultId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "vaultKey" TEXT NOT NULL,

    CONSTRAINT "vault_invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vault_invitation" ADD CONSTRAINT "vault_invitation_vaultId_fkey" FOREIGN KEY ("vaultId") REFERENCES "vault"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
