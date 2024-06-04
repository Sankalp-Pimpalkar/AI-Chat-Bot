import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export default model