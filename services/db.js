import { PrismaClient } from '@prisma/client';
// Connects to DB usine .env config
let client = new PrismaClient();
console.log("[DEBUG] Connected to DB");
// Returns a PrismaClient instance that is cached
export const prisma = client;