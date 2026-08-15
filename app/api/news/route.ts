import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const news = await db.newsItem.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(news)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await db.newsItem.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
