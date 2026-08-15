import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter } as never)

async function main() {
  await prisma.team.createMany({
    data: [
      { name: 'Dannaz FC',       shortName: 'DAN', founded: 2023, logo: '/dannaz-badge.webp' },
      { name: 'Madux Vision FC', shortName: 'MDX', founded: 2023, logo: '/madux-badge.webp' },
      { name: 'T & A Legal FC',  shortName: 'TAL', founded: 2024, logo: '' },
      { name: 'Oguntoyinbo FC',  shortName: 'OGN', founded: 2024, logo: '' },
      { name: '7Eleven FC',      shortName: '7EL', founded: 2024, logo: '' },
      { name: 'MOBallers Utd',   shortName: 'MOB', founded: 2024, logo: '' },
    ],
    skipDuplicates: true,
  })

  await prisma.fixture.createMany({
    data: [
      { homeTeam: 'Dannaz FC',       awayTeam: 'Madux Vision FC',  date: '2026-07-05', time: '15:00', venue: 'Afijio Pitch, Oyo', status: 'upcoming' },
      { homeTeam: 'T & A Legal FC',  awayTeam: 'Oguntoyinbo FC',   date: '2026-07-06', time: '16:00', venue: 'Afijio Pitch, Oyo', status: 'upcoming' },
      { homeTeam: '7Eleven FC',      awayTeam: 'MOBallers Utd',    date: '2026-07-07', time: '14:30', venue: 'Afijio Pitch, Oyo', status: 'upcoming' },
      { homeTeam: 'Oguntoyinbo FC',  awayTeam: 'Dannaz FC',        date: '2026-07-09', time: '17:00', venue: 'Afijio Pitch, Oyo', status: 'upcoming' },
      { homeTeam: 'MOBallers Utd',   awayTeam: 'T & A Legal FC',   date: '2026-07-10', time: '15:30', venue: 'Afijio Pitch, Oyo', status: 'upcoming' },
      { homeTeam: 'Madux Vision FC', awayTeam: '7Eleven FC',       date: '2026-07-12', time: '16:00', venue: 'Afijio Pitch, Oyo', status: 'upcoming' },
      { homeTeam: 'Dannaz FC',       awayTeam: 'MOBallers Utd',    date: '2026-06-27', time: '15:00', venue: 'Afijio Pitch, Oyo', status: 'live' },
      { homeTeam: 'Oguntoyinbo FC',  awayTeam: '7Eleven FC',       date: '2026-06-27', time: '16:30', venue: 'Afijio Pitch, Oyo', status: 'live' },
      { homeTeam: 'Dannaz FC',       awayTeam: 'T & A Legal FC',   date: '2026-06-14', time: '15:00', venue: 'Afijio Pitch, Oyo', status: 'completed' },
      { homeTeam: 'Madux Vision FC', awayTeam: 'Oguntoyinbo FC',   date: '2026-06-14', time: '16:00', venue: 'Afijio Pitch, Oyo', status: 'completed' },
      { homeTeam: 'MOBallers Utd',   awayTeam: '7Eleven FC',       date: '2026-06-15', time: '14:30', venue: 'Afijio Pitch, Oyo', status: 'completed' },
      { homeTeam: 'T & A Legal FC',  awayTeam: 'Madux Vision FC',  date: '2026-06-07', time: '15:00', venue: 'Afijio Pitch, Oyo', status: 'completed' },
      { homeTeam: '7Eleven FC',      awayTeam: 'Dannaz FC',        date: '2026-06-07', time: '16:00', venue: 'Afijio Pitch, Oyo', status: 'completed' },
      { homeTeam: 'Oguntoyinbo FC',  awayTeam: 'MOBallers Utd',    date: '2026-05-31', time: '15:30', venue: 'Afijio Pitch, Oyo', status: 'completed' },
      { homeTeam: 'Madux Vision FC', awayTeam: 'Dannaz FC',        date: '2026-05-24', time: '16:00', venue: 'Afijio Pitch, Oyo', status: 'completed' },
    ],
    skipDuplicates: true,
  })

  await prisma.result.createMany({
    data: [
      { homeTeam: 'Dannaz FC',       awayTeam: 'T & A Legal FC',  homeScore: 3, awayScore: 1, date: '2026-06-14' },
      { homeTeam: 'Madux Vision FC', awayTeam: 'Oguntoyinbo FC',  homeScore: 2, awayScore: 2, date: '2026-06-14' },
      { homeTeam: 'MOBallers Utd',   awayTeam: '7Eleven FC',      homeScore: 1, awayScore: 0, date: '2026-06-15' },
      { homeTeam: 'T & A Legal FC',  awayTeam: 'Madux Vision FC', homeScore: 0, awayScore: 2, date: '2026-06-07' },
      { homeTeam: '7Eleven FC',      awayTeam: 'Dannaz FC',       homeScore: 1, awayScore: 3, date: '2026-06-07' },
      { homeTeam: 'Oguntoyinbo FC',  awayTeam: 'MOBallers Utd',   homeScore: 2, awayScore: 1, date: '2026-05-31' },
      { homeTeam: 'Madux Vision FC', awayTeam: 'Dannaz FC',       homeScore: 1, awayScore: 1, date: '2026-05-24' },
      { homeTeam: 'MOBallers Utd',   awayTeam: 'T & A Legal FC',  homeScore: 0, awayScore: 3, date: '2026-05-24' },
      { homeTeam: 'Dannaz FC',       awayTeam: 'Oguntoyinbo FC',  homeScore: 4, awayScore: 0, date: '2026-05-17' },
      { homeTeam: '7Eleven FC',      awayTeam: 'Madux Vision FC', homeScore: 2, awayScore: 2, date: '2026-05-17' },
      { homeTeam: 'T & A Legal FC',  awayTeam: '7Eleven FC',      homeScore: 1, awayScore: 0, date: '2026-05-10' },
      { homeTeam: 'Oguntoyinbo FC',  awayTeam: 'Dannaz FC',       homeScore: 0, awayScore: 2, date: '2026-05-10' },
    ],
    skipDuplicates: true,
  })

  await prisma.standing.createMany({
    data: [
      { team: 'Dannaz FC',       position: 1, played: 6, won: 5, drawn: 1, lost: 0, points: 16 },
      { team: 'Madux Vision FC', position: 2, played: 6, won: 4, drawn: 1, lost: 1, points: 13 },
      { team: 'T & A Legal FC',  position: 3, played: 6, won: 3, drawn: 2, lost: 1, points: 11 },
      { team: 'Oguntoyinbo FC',  position: 4, played: 6, won: 2, drawn: 2, lost: 2, points: 8 },
      { team: '7Eleven FC',      position: 5, played: 6, won: 1, drawn: 2, lost: 3, points: 5 },
      { team: 'MOBallers Utd',   position: 6, played: 6, won: 0, drawn: 2, lost: 4, points: 2 },
    ],
    skipDuplicates: true,
  })

  await prisma.sponsor.createMany({
    data: [
      { name: 'Oguntoyinbo Foundation', tier: 'Gold',   logo: '/og-foundation-logo.webp', website: '', since: '2024' },
      { name: '7Eleven Foundation',     tier: 'Gold',   logo: '/7eleven-logo.webp',        website: '', since: '2024' },
      { name: 'Madux Vision FC',        tier: 'Silver', logo: '/madux-badge.webp',         website: '', since: '2023' },
      { name: 'Dannaz FC',              tier: 'Silver', logo: '/dannaz-badge.webp',        website: '', since: '2023' },
    ],
    skipDuplicates: true,
  })

  await prisma.settings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      siteName: 'Teens Football Project',
      tagline: 'PLAY. RISE. REPEAT.',
      email: 'info@tfp.ng',
      phone: '+234 800 000 0000',
      addressIbadan: 'Ibadan, Oyo State',
      addressOyo: 'Afijio, Oyo State',
      leagueName: 'Afijio Teens Football League',
      season: '2026',
    },
    update: {},
  })

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => pool.end())
