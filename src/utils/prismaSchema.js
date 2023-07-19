const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const userTable = prisma.user;

module.exports = {
    prisma,
    userTable
}
