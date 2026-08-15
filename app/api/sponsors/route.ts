import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const sponsors = await db.sponsor.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(sponsors)
}

export async function POST(req: Request) {
  const body = await req.json()
  const sponsor = await db.sponsor.create({ data: body })
  return NextResponse.json(sponsor, { status: 201 })
}
