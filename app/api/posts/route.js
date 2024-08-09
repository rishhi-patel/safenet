import { NextResponse } from "next/server"
import db from "../../../models"
import { authenticateToken } from "../../../utils/auth"

export async function GET(request) {
  //jwt token verification for authorization
  const authResult = authenticateToken(request)

  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }
  const posts = await db.Post.findAll({
    include: {
      model: db.User,
      attributes: ["id", "email"],
    },
  })
  return NextResponse.json(posts)
}

export async function POST(request) {
  //jwt token verification for authorization
  const authResult = authenticateToken(request)

  if (!authResult.valid) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  const { content } = await request.json()

  try {
    const newPost = await db.Post.create({
      content,
      userId: authResult.user.id,
    })
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    )
  }
}
