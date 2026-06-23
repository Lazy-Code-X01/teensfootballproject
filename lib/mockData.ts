export const teams = [
  { id: 1, name: 'Lagos FC',          shortName: 'LFC', founded: 2023 },
  { id: 2, name: 'Abuja Stars',       shortName: 'ABJ', founded: 2023 },
  { id: 3, name: 'Ibadan United',     shortName: 'IBU', founded: 2024 },
  { id: 4, name: 'Kano Rangers',      shortName: 'KAN', founded: 2024 },
  { id: 5, name: 'Port Harcourt FC',  shortName: 'PHC', founded: 2024 },
  { id: 6, name: 'Enugu Warriors',    shortName: 'ENU', founded: 2024 },
];

export const fixtures = [
  { id: 1, homeTeam: 'Lagos FC',        awayTeam: 'Abuja Stars',      date: '2026-06-22', time: '15:00', venue: 'Onikan Stadium',              status: 'upcoming' },
  { id: 2, homeTeam: 'Ibadan United',   awayTeam: 'Kano Rangers',     date: '2026-06-25', time: '16:00', venue: 'Lekan Salami Stadium',        status: 'upcoming' },
  { id: 3, homeTeam: 'Port Harcourt FC', awayTeam: 'Enugu Warriors',  date: '2026-06-28', time: '14:30', venue: 'Adokiye Amiesimaka Stadium',  status: 'upcoming' },
];

export const results = [
  { id: 1, homeTeam: 'Lagos FC',      awayTeam: 'Ibadan United',    homeScore: 3, awayScore: 1, date: '2026-06-14' },
  { id: 2, homeTeam: 'Abuja Stars',   awayTeam: 'Kano Rangers',     homeScore: 2, awayScore: 2, date: '2026-06-14' },
  { id: 3, homeTeam: 'Enugu Warriors', awayTeam: 'Port Harcourt FC', homeScore: 1, awayScore: 0, date: '2026-06-15' },
];

export const standings = [
  { position: 1, team: 'Lagos FC',         played: 6, won: 5, drawn: 1, lost: 0, points: 16 },
  { position: 2, team: 'Abuja Stars',      played: 6, won: 4, drawn: 1, lost: 1, points: 13 },
  { position: 3, team: 'Ibadan United',    played: 6, won: 3, drawn: 2, lost: 1, points: 11 },
  { position: 4, team: 'Kano Rangers',     played: 6, won: 2, drawn: 2, lost: 2, points: 8  },
  { position: 5, team: 'Port Harcourt FC', played: 6, won: 1, drawn: 2, lost: 3, points: 5  },
  { position: 6, team: 'Enugu Warriors',   played: 6, won: 0, drawn: 2, lost: 4, points: 2  },
];
