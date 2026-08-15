export const teams = [
  { id: 1, name: 'Dannaz FC',          shortName: 'DAN', founded: 2023, logo: '/dannaz-badge.webp' },
  { id: 2, name: 'Madux Vision FC',    shortName: 'MDX', founded: 2023, logo: '/madux-badge.webp'  },
  { id: 3, name: 'T & A Legal FC',     shortName: 'TAL', founded: 2024, logo: ''                   },
  { id: 4, name: 'Oguntoyinbo FC',     shortName: 'OGN', founded: 2024, logo: ''                   },
  { id: 5, name: '7Eleven FC',          shortName: '7EL', founded: 2024, logo: ''                   },
  { id: 6, name: 'MOBallers Utd',       shortName: 'MOB', founded: 2024, logo: ''                   },
];

export const fixtures = [
  { id: 1,  homeTeam: 'Dannaz FC',       awayTeam: 'Madux Vision FC',  date: '2026-07-05', time: '15:00', venue: 'Afijio Pitch, Oyo',  status: 'upcoming'  },
  { id: 2,  homeTeam: 'T & A Legal FC',  awayTeam: 'Oguntoyinbo FC',   date: '2026-07-06', time: '16:00', venue: 'Afijio Pitch, Oyo',  status: 'upcoming'  },
  { id: 3,  homeTeam: '7Eleven FC', awayTeam: 'MOBallers Utd',  date: '2026-07-07', time: '14:30', venue: 'Afijio Pitch, Oyo',  status: 'upcoming'  },
  { id: 4,  homeTeam: 'Oguntoyinbo FC',  awayTeam: 'Dannaz FC',        date: '2026-07-09', time: '17:00', venue: 'Afijio Pitch, Oyo',  status: 'upcoming'  },
  { id: 5,  homeTeam: 'MOBallers Utd', awayTeam: 'T & A Legal FC',   date: '2026-07-10', time: '15:30', venue: 'Afijio Pitch, Oyo',  status: 'upcoming'  },
  { id: 6,  homeTeam: 'Madux Vision FC', awayTeam: '7Eleven FC',  date: '2026-07-12', time: '16:00', venue: 'Afijio Pitch, Oyo',  status: 'upcoming'  },
  { id: 7,  homeTeam: 'Dannaz FC',       awayTeam: 'MOBallers Utd',  date: '2026-06-27', time: '15:00', venue: 'Afijio Pitch, Oyo',  status: 'live'      },
  { id: 8,  homeTeam: 'Oguntoyinbo FC',  awayTeam: '7Eleven FC',  date: '2026-06-27', time: '16:30', venue: 'Afijio Pitch, Oyo',  status: 'live'      },
  { id: 9,  homeTeam: 'Dannaz FC',       awayTeam: 'T & A Legal FC',   date: '2026-06-14', time: '15:00', venue: 'Afijio Pitch, Oyo',  status: 'completed' },
  { id: 10, homeTeam: 'Madux Vision FC', awayTeam: 'Oguntoyinbo FC',   date: '2026-06-14', time: '16:00', venue: 'Afijio Pitch, Oyo',  status: 'completed' },
  { id: 11, homeTeam: 'MOBallers Utd', awayTeam: '7Eleven FC',  date: '2026-06-15', time: '14:30', venue: 'Afijio Pitch, Oyo',  status: 'completed' },
  { id: 12, homeTeam: 'T & A Legal FC',  awayTeam: 'Madux Vision FC',  date: '2026-06-07', time: '15:00', venue: 'Afijio Pitch, Oyo',  status: 'completed' },
  { id: 13, homeTeam: '7Eleven FC', awayTeam: 'Dannaz FC',        date: '2026-06-07', time: '16:00', venue: 'Afijio Pitch, Oyo',  status: 'completed' },
  { id: 14, homeTeam: 'Oguntoyinbo FC',  awayTeam: 'MOBallers Utd',  date: '2026-05-31', time: '15:30', venue: 'Afijio Pitch, Oyo',  status: 'completed' },
  { id: 15, homeTeam: 'Madux Vision FC', awayTeam: 'Dannaz FC',        date: '2026-05-24', time: '16:00', venue: 'Afijio Pitch, Oyo',  status: 'completed' },
];

export const results = [
  { id: 1,  homeTeam: 'Dannaz FC',       awayTeam: 'T & A Legal FC',   homeScore: 3, awayScore: 1, date: '2026-06-14' },
  { id: 2,  homeTeam: 'Madux Vision FC', awayTeam: 'Oguntoyinbo FC',   homeScore: 2, awayScore: 2, date: '2026-06-14' },
  { id: 3,  homeTeam: 'MOBallers Utd', awayTeam: '7Eleven FC',  homeScore: 1, awayScore: 0, date: '2026-06-15' },
  { id: 4,  homeTeam: 'T & A Legal FC',  awayTeam: 'Madux Vision FC',  homeScore: 0, awayScore: 2, date: '2026-06-07' },
  { id: 5,  homeTeam: '7Eleven FC', awayTeam: 'Dannaz FC',        homeScore: 1, awayScore: 3, date: '2026-06-07' },
  { id: 6,  homeTeam: 'Oguntoyinbo FC',  awayTeam: 'MOBallers Utd',  homeScore: 2, awayScore: 1, date: '2026-05-31' },
  { id: 7,  homeTeam: 'Madux Vision FC', awayTeam: 'Dannaz FC',        homeScore: 1, awayScore: 1, date: '2026-05-24' },
  { id: 8,  homeTeam: 'MOBallers Utd', awayTeam: 'T & A Legal FC',   homeScore: 0, awayScore: 3, date: '2026-05-24' },
  { id: 9,  homeTeam: 'Dannaz FC',       awayTeam: 'Oguntoyinbo FC',   homeScore: 4, awayScore: 0, date: '2026-05-17' },
  { id: 10, homeTeam: '7Eleven FC', awayTeam: 'Madux Vision FC',  homeScore: 2, awayScore: 2, date: '2026-05-17' },
  { id: 11, homeTeam: 'T & A Legal FC',  awayTeam: '7Eleven FC',  homeScore: 1, awayScore: 0, date: '2026-05-10' },
  { id: 12, homeTeam: 'Oguntoyinbo FC',  awayTeam: 'Dannaz FC',        homeScore: 0, awayScore: 2, date: '2026-05-10' },
];

export const standings = [
  { position: 1, team: 'Dannaz FC',       played: 6, won: 5, drawn: 1, lost: 0, points: 16 },
  { position: 2, team: 'Madux Vision FC', played: 6, won: 4, drawn: 1, lost: 1, points: 13 },
  { position: 3, team: 'T & A Legal FC',  played: 6, won: 3, drawn: 2, lost: 1, points: 11 },
  { position: 4, team: 'Oguntoyinbo FC',  played: 6, won: 2, drawn: 2, lost: 2, points: 8  },
  { position: 5, team: '7Eleven FC', played: 6, won: 1, drawn: 2, lost: 3, points: 5  },
  { position: 6, team: 'MOBallers Utd', played: 6, won: 0, drawn: 2, lost: 4, points: 2  },
];
