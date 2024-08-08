import { NextResponse } from "next/server"
import Post from "../../../models/post"

export async function GET() {
  const posts = await Post.findAll()
  return NextResponse.json(posts)
}

export async function POST(request) {
  const { content, userId } = await request.json()
  const newPost = await Post.create({ content, userId })
  return NextResponse.json(newPost)
}
