import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const results = await db.result.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(results)
}

export async function POST(req: Request) {
  const body = await req.json()
  const result = await db.result.create({ data: body })
  return NextResponse.json(result, { status: 201 })
}
