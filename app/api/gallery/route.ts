import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const items = await db.galleryItem.findMany({ orderBy: { id: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await db.galleryItem.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
