import { NextResponse } from "next/server"
import db from "../../../models"

const { Post, User } = db
export async function GET() {
  const posts = await Post.findAll({
    include: {
      model: User,
      attributes: ["id", "email"],
    },
  })
  return NextResponse.json(posts)
}

export async function POST(request) {
  const { content, userId } = await request.json()
  const newPost = await Post.create({ content, userId })
  return NextResponse.json(newPost)
}
