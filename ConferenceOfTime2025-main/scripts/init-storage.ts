import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json")

async function initializeStorage() {
  try {
    console.log("Initializing conference data storage...")

    // Create data directory if it doesn't exist
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
      console.log("✅ Created data directory")
    }

    // Create empty registrations file if it doesn't exist
    if (!existsSync(REGISTRATIONS_FILE)) {
      await writeFile(REGISTRATIONS_FILE, JSON.stringify([], null, 2))
      console.log("✅ Created registrations.json file")
    }

    console.log("🎉 Storage initialization complete!")
    console.log(`📁 Data directory: ${DATA_DIR}`)
    console.log(`📄 Registrations file: ${REGISTRATIONS_FILE}`)
  } catch (error) {
    console.error("❌ Error initializing storage:", error)
    process.exit(1)
  }
}

initializeStorage()
