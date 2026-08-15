import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const settings = await db.settings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  })
  return NextResponse.json(settings)
}

export async function PUT(req: Request) {
  const body = await req.json()
  const settings = await db.settings.upsert({
    where: { id: 1 },
    update: body,
    create: { id: 1, ...body },
  })
  return NextResponse.json(settings)
}
