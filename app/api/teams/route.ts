import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const teams = await db.team.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(teams)
}

export async function POST(req: Request) {
  const body = await req.json()
  const team = await db.team.create({ data: body })
  return NextResponse.json(team, { status: 201 })
}
