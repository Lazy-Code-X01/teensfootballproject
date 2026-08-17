import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const highlights = await db.highlight.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(highlights)
}

export async function POST(req: Request) {
  const { title, thumbnail, videoUrl, duration, date } = await req.json()
  if (!title || !date) return NextResponse.json({ error: 'title and date are required' }, { status: 400 })
  const highlight = await db.highlight.create({ data: { title, thumbnail: thumbnail ?? '', videoUrl: videoUrl ?? '', duration: duration ?? '', date } })
  return NextResponse.json(highlight, { status: 201 })
}
