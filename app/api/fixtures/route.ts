import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const fixtures = await db.fixture.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(fixtures)
}

export async function POST(req: Request) {
  const body = await req.json()
  const fixture = await db.fixture.create({ data: body })
  return NextResponse.json(fixture, { status: 201 })
}
