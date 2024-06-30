-- CreateTable
CREATE TABLE "todos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "completed" BOOLEAN DEFAULT false,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
