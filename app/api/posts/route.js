import { NextResponse } from "next/server"
import db from "../../../models"

const { Post, User } = db
export async function GET() {
  const posts = await Post.findAll({
    include: {
      model: User, // Ensure this is the correct model name
      attributes: ["id", "email"], // Specify user attributes to include
    },
  })
  return NextResponse.json(posts)
}

export async function POST(request) {
  const { content, userId } = await request.json()
  const newPost = await Post.create({ content, userId })
  return NextResponse.json(newPost)
}
