import model from "./model";
import { marked } from "marked";

async function GenerateTextGemini({ chatHistory = [], prompt }) {
    const history = chatHistory.length ? chatHistory.map(chat => {
        return { role: chat?.sender, parts: [{ text: chat?.message }] }
    }) : []

    const chat = model.startChat({
        history,
    })

    const result = await chat.sendMessage(prompt.toString())
    return marked(result.response.text())
}


export default GenerateTextGemini