const { PrismaClient } = require("@prisma/client");

// Cria uma única instância do Prisma para usar no projeto todo
const prisma = new PrismaClient();

module.exports = prisma;