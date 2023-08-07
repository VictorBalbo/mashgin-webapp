import {config} from "dotenv"

config()

export const serverUri = process.env.SERVER_URI ?? 'http://localhost:3000'