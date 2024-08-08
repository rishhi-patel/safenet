import fs from "fs"
import path from "path"

const logFilePath = path.join(__dirname, "audit.log")

export function logAction(action, user) {
  const logEntry = `${new Date().toISOString()} - User: ${
    user.userId
  }, Action: ${action}\n`
  fs.appendFileSync(logFilePath, logEntry)
}
