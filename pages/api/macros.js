import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  var data = req.query;
  const macros = await prisma.macros.findMany({
    orderBy: [
      {
        index: 'asc',
      }
    ],
    where: {
        AND: [
            {
                date: data.date
            },
            {
                user: data.user
            }
        ]
    },
  })
  res.json(macros)
}