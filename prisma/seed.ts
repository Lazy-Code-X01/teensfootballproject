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

  await prisma.highlight.createMany({
    data: [
      { title: 'Dannaz FC vs Madux Vision — Full Match Highlights', thumbnail: '/gallery-match-2.webp', videoUrl: '', duration: '5:22', date: '2026-06-14' },
      { title: 'Best Goals of the 2026 Afijio Season',              thumbnail: '/gallery-match-1.webp', videoUrl: '', duration: '4:10', date: '2026-06-07' },
      { title: 'Behind the Scenes — Coaching Day at Afijio',        thumbnail: '/coach-2.webp',         videoUrl: '', duration: '3:45', date: '2026-06-01' },
      { title: 'Afijio 2026 Season Opening Weekend',                thumbnail: '/gallery-lineup.webp',  videoUrl: '', duration: '6:02', date: '2026-05-03' },
    ],
    skipDuplicates: true,
  })

  await prisma.galleryItem.createMany({
    data: [
      { image: '/gallery-lineup.webp',   caption: 'Teams line up before kick-off — Afijio League' },
      { image: '/about-1.webp',          caption: 'Goalkeeper commands the box' },
      { image: '/about-2.webp',          caption: 'Aerial battle — players contest for possession' },
      { image: '/gallery-match-2.webp',  caption: 'Orange vs Black — league matchday action' },
      { image: '/program-2.webp',        caption: 'Midfield duel at the Afijio ground' },
      { image: '/gallery-match-1.webp',  caption: 'Coach briefs the squad at half-time' },
      { image: '/impact-player.webp',    caption: 'A moment of prayer before kick-off' },
      { image: '/story-2.webp',          caption: 'Players gather before the match' },
      { image: '/cta-bg.webp',           caption: 'Young fans cheering from the stands' },
      { image: '/about-3.webp',          caption: 'Coach gives instructions from the touchline' },
      { image: '/program-1.webp',        caption: 'High-knees warm-up before training' },
      { image: '/about-edu.webp',        caption: 'Academic session — life skills in the classroom' },
      { image: '/academy.webp',          caption: 'Life skills workshop for players' },
      { image: '/coach-1.webp',          caption: 'TFP coach ready for the session' },
      { image: '/coach-2.webp',          caption: 'Coach engages players at training' },
      { image: '/gallery-crowd-1.webp',  caption: 'Community day — hundreds turn out at the Afijio ground' },
      { image: '/gallery-official.webp', caption: 'League official follows the action closely' },
      { image: '/coach-4.webp',          caption: 'Head coach addresses the full squad' },
    ],
    skipDuplicates: true,
  })

  await prisma.newsItem.createMany({
    data: [
      { title: 'TFP Secures New Training Ground Partnership',  excerpt: 'Teens Football Project has partnered with local facilities to expand training capacity for the 2026 season.',          image: '/academy.webp',       date: '2026-06-15', category: 'Announcement' },
      { title: 'Three Players Selected for State Trials',      excerpt: 'Following standout performances this season, three TFP players have been invited to state-level trials.',              image: '/program-3.webp',     date: '2026-06-12', category: 'Player News'  },
      { title: 'Dannaz FC Wins Thrilling 3-1 Derby',          excerpt: 'A dominant second-half performance saw Dannaz FC secure a crucial win in this season\'s biggest match.',              image: '/program-2.webp',     date: '2026-06-14', category: 'Match Report' },
      { title: 'Afijio 2026 Season Officially Kicks Off',     excerpt: 'The new Afijio season began with an exciting opening weekend featuring all six clubs in action across Oyo State.',   image: '/league-bg.webp',     date: '2026-05-03', category: 'Announcement' },
      { title: 'TFP Partners with Local Schools Programme',   excerpt: 'TFP has signed an MOU with five secondary schools in Oyo State to identify and develop grassroots talent.',          image: '/about-edu.webp',     date: '2026-06-01', category: 'Club News'    },
      { title: 'Madux Vision Hold Dannaz FC to a Draw',       excerpt: 'A tight midfield battle ended 1-1 as Madux Vision claimed a valuable point against league leaders Dannaz FC.',      image: '/about-2.webp',       date: '2026-05-24', category: 'Match Report' },
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
      phone: '0706 505 0656',
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
