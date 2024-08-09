import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"

export function authenticateToken(request) {
  //checking token from header  for securing routes
  const authHeader = request.headers.get("authorization")
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return { valid: false, error: "Token not provided" }
  }

  try {
    const user = jwt.verify(token, SECRET_KEY)
    return { valid: true, user }
  } catch (error) {
    return { valid: false, error: "Invalid token" }
  }
}
