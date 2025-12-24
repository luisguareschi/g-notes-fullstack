-- CreateTable
CREATE TABLE "account_credentials" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "password" TEXT,
    "notes" TEXT,
    "vaultId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_account" (
    "id" TEXT NOT NULL,
    "bankName" TEXT,
    "owners" TEXT[],
    "beneficiaries" TEXT[],
    "accountNumber" TEXT,
    "aba" TEXT,
    "swift" TEXT,
    "bankAddress" TEXT,
    "beneficiaryAddress" TEXT,
    "accountCredentialsId" TEXT NOT NULL,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bank_account_accountCredentialsId_key" ON "bank_account"("accountCredentialsId");

-- AddForeignKey
ALTER TABLE "account_credentials" ADD CONSTRAINT "account_credentials_vaultId_fkey" FOREIGN KEY ("vaultId") REFERENCES "vault"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_accountCredentialsId_fkey" FOREIGN KEY ("accountCredentialsId") REFERENCES "account_credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
