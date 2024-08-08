import { NextResponse } from "next/server"
import { Sequelize } from "sequelize"
import db from "../../../models"

export async function POST(request) {
  const { email, password } = await request.json()

  // Intentionally vulnerable to SQL injection
  const query = `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`
  try {
    const user = await db.sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    })

    if (user.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Simulate setting session
    return NextResponse.json(
      { message: "Logged in successfully", user: user[0] },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 })
  }
}
