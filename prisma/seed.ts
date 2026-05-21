import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from '../src/generated/prisma'

const connectionString =
  process.env.DATABASE_URL || 'postgresql://root:root@localhost:5432/petshop?schema=public'

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Clearing existing appointments...')
  await prisma.appointment.deleteMany()

  console.log('Seeding 15 appointments...')

  const descriptions = ['Banho', 'Tosa', 'Consulta', 'Banho e Tosa', 'Vacinação', 'Retorno']
  const petNames = ['Rex', 'Mimi', 'Thor', 'Luna', 'Bolinha', 'Mel', 'Bob', 'Nina', 'Zeus', 'Bella']

  const appointments = []

  const timeSlots = [
    // Morning (5)
    { hour: 9, minute: 0 },
    { hour: 9, minute: 30 },
    { hour: 10, minute: 0 },
    { hour: 10, minute: 30 },
    { hour: 11, minute: 0 },
    // Afternoon (5)
    { hour: 13, minute: 0 },
    { hour: 13, minute: 30 },
    { hour: 14, minute: 0 },
    { hour: 14, minute: 30 },
    { hour: 15, minute: 0 },
    // Evening (5)
    { hour: 19, minute: 0 },
    { hour: 19, minute: 30 },
    { hour: 20, minute: 0 },
    { hour: 20, minute: 30 },
    { hour: 21, minute: 0 },
  ]

  for (let i = 0; i < 15; i++) {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(timeSlots[i].hour, timeSlots[i].minute, 0, 0)

    appointments.push({
      tutorName: faker.person.fullName(),
      petName: faker.helpers.arrayElement(petNames),
      phone: faker.phone.number({ style: 'national' }),
      description: faker.helpers.arrayElement(descriptions),
      scheduledAt: date,
    })
  }

  await prisma.appointment.createMany({
    data: appointments,
  })

  console.log('Seeded 15 appointments successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
