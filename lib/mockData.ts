export const teams = [
  { id: 1, name: 'Lagos FC',          shortName: 'LFC', founded: 2023 },
  { id: 2, name: 'Abuja Stars',       shortName: 'ABJ', founded: 2023 },
  { id: 3, name: 'Ibadan United',     shortName: 'IBU', founded: 2024 },
  { id: 4, name: 'Kano Rangers',      shortName: 'KAN', founded: 2024 },
  { id: 5, name: 'Port Harcourt FC',  shortName: 'PHC', founded: 2024 },
  { id: 6, name: 'Enugu Warriors',    shortName: 'ENU', founded: 2024 },
];

export const fixtures = [
  { id: 1,  homeTeam: 'Lagos FC',         awayTeam: 'Abuja Stars',      date: '2026-07-05', time: '15:00', venue: 'Onikan Stadium',               status: 'upcoming'  },
  { id: 2,  homeTeam: 'Ibadan United',    awayTeam: 'Kano Rangers',     date: '2026-07-06', time: '16:00', venue: 'Lekan Salami Stadium',         status: 'upcoming'  },
  { id: 3,  homeTeam: 'Port Harcourt FC', awayTeam: 'Enugu Warriors',   date: '2026-07-07', time: '14:30', venue: 'Adokiye Amiesimaka Stadium',   status: 'upcoming'  },
  { id: 4,  homeTeam: 'Kano Rangers',     awayTeam: 'Lagos FC',         date: '2026-07-09', time: '17:00', venue: 'Sani Abacha Stadium',          status: 'upcoming'  },
  { id: 5,  homeTeam: 'Enugu Warriors',   awayTeam: 'Ibadan United',    date: '2026-07-10', time: '15:30', venue: 'Nnamdi Azikiwe Stadium',       status: 'upcoming'  },
  { id: 6,  homeTeam: 'Abuja Stars',      awayTeam: 'Port Harcourt FC', date: '2026-07-12', time: '16:00', venue: 'Area 3 Sports Complex',        status: 'upcoming'  },
  { id: 7,  homeTeam: 'Lagos FC',         awayTeam: 'Enugu Warriors',   date: '2026-06-27', time: '15:00', venue: 'Onikan Stadium',               status: 'live'      },
  { id: 8,  homeTeam: 'Kano Rangers',     awayTeam: 'Port Harcourt FC', date: '2026-06-27', time: '16:30', venue: 'Sani Abacha Stadium',          status: 'live'      },
  { id: 9,  homeTeam: 'Lagos FC',         awayTeam: 'Ibadan United',    date: '2026-06-14', time: '15:00', venue: 'Onikan Stadium',               status: 'completed' },
  { id: 10, homeTeam: 'Abuja Stars',      awayTeam: 'Kano Rangers',     date: '2026-06-14', time: '16:00', venue: 'Area 3 Sports Complex',        status: 'completed' },
  { id: 11, homeTeam: 'Enugu Warriors',   awayTeam: 'Port Harcourt FC', date: '2026-06-15', time: '14:30', venue: 'Nnamdi Azikiwe Stadium',       status: 'completed' },
  { id: 12, homeTeam: 'Ibadan United',    awayTeam: 'Abuja Stars',      date: '2026-06-07', time: '15:00', venue: 'Lekan Salami Stadium',         status: 'completed' },
  { id: 13, homeTeam: 'Port Harcourt FC', awayTeam: 'Lagos FC',         date: '2026-06-07', time: '16:00', venue: 'Adokiye Amiesimaka Stadium',   status: 'completed' },
  { id: 14, homeTeam: 'Kano Rangers',     awayTeam: 'Enugu Warriors',   date: '2026-05-31', time: '15:30', venue: 'Sani Abacha Stadium',          status: 'completed' },
  { id: 15, homeTeam: 'Abuja Stars',      awayTeam: 'Lagos FC',         date: '2026-05-24', time: '16:00', venue: 'Area 3 Sports Complex',        status: 'completed' },
];

export const results = [
  { id: 1,  homeTeam: 'Lagos FC',         awayTeam: 'Ibadan United',    homeScore: 3, awayScore: 1, date: '2026-06-14' },
  { id: 2,  homeTeam: 'Abuja Stars',      awayTeam: 'Kano Rangers',     homeScore: 2, awayScore: 2, date: '2026-06-14' },
  { id: 3,  homeTeam: 'Enugu Warriors',   awayTeam: 'Port Harcourt FC', homeScore: 1, awayScore: 0, date: '2026-06-15' },
  { id: 4,  homeTeam: 'Ibadan United',    awayTeam: 'Abuja Stars',      homeScore: 0, awayScore: 2, date: '2026-06-07' },
  { id: 5,  homeTeam: 'Port Harcourt FC', awayTeam: 'Lagos FC',         homeScore: 1, awayScore: 3, date: '2026-06-07' },
  { id: 6,  homeTeam: 'Kano Rangers',     awayTeam: 'Enugu Warriors',   homeScore: 2, awayScore: 1, date: '2026-05-31' },
  { id: 7,  homeTeam: 'Abuja Stars',      awayTeam: 'Lagos FC',         homeScore: 1, awayScore: 1, date: '2026-05-24' },
  { id: 8,  homeTeam: 'Enugu Warriors',   awayTeam: 'Ibadan United',    homeScore: 0, awayScore: 3, date: '2026-05-24' },
  { id: 9,  homeTeam: 'Lagos FC',         awayTeam: 'Kano Rangers',     homeScore: 4, awayScore: 0, date: '2026-05-17' },
  { id: 10, homeTeam: 'Port Harcourt FC', awayTeam: 'Abuja Stars',      homeScore: 2, awayScore: 2, date: '2026-05-17' },
  { id: 11, homeTeam: 'Ibadan United',    awayTeam: 'Port Harcourt FC', homeScore: 1, awayScore: 0, date: '2026-05-10' },
  { id: 12, homeTeam: 'Kano Rangers',     awayTeam: 'Lagos FC',         homeScore: 0, awayScore: 2, date: '2026-05-10' },
];

export const standings = [
  { position: 1, team: 'Lagos FC',         played: 6, won: 5, drawn: 1, lost: 0, points: 16 },
  { position: 2, team: 'Abuja Stars',      played: 6, won: 4, drawn: 1, lost: 1, points: 13 },
  { position: 3, team: 'Ibadan United',    played: 6, won: 3, drawn: 2, lost: 1, points: 11 },
  { position: 4, team: 'Kano Rangers',     played: 6, won: 2, drawn: 2, lost: 2, points: 8  },
  { position: 5, team: 'Port Harcourt FC', played: 6, won: 1, drawn: 2, lost: 3, points: 5  },
  { position: 6, team: 'Enugu Warriors',   played: 6, won: 0, drawn: 2, lost: 4, points: 2  },
];
