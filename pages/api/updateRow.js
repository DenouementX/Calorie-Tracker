import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
    var data = req.body;
    const macro = await prisma.macros.updateMany({
        where: {
            AND: [
                {
                    date: data.date
                },
                {
                    index: data.index
                }
            ]
        },
        data: {
            food: data.food,
            protein: data.protein,
            calories: data.calories
        },
      })
    res.json(macro);
}