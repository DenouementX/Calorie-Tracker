import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const macros = await prisma.macros.findMany()
  res.json(macros)
}