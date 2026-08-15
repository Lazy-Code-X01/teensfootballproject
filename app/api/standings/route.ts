import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const standings = await db.standing.findMany({ orderBy: { position: 'asc' } })
  return NextResponse.json(standings)
}

export async function POST(req: Request) {
  const body = await req.json()
  const standing = await db.standing.upsert({
    where: { team: body.team },
    update: body,
    create: body,
  })
  return NextResponse.json(standing, { status: 201 })
}
