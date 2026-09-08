import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const all = searchParams.get('all') === '1'

  const articles = await db.article.findMany({
    where: all ? undefined : { published: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(articles)
}

export async function POST(req: Request) {
  const body = await req.json()
  const article = await db.article.create({ data: body })
  return NextResponse.json(article, { status: 201 })
}
