import model from "./model";
import { marked } from "marked";

async function GenerateTextGemini({ chatHistory = [], prompt }) {
    const history = chatHistory.length ? chatHistory.map(chat => {
        return { role: chat?.sender, parts: [{ text: chat?.message }] }
    }) : []

    console.log(chatHistory)

    const chat = model.startChat({
        history,
    })
    console.log(chat)

    const result = await chat.sendMessage(prompt.toString())

    console.log(typeof result.response.text())

    return marked(result.response.text())
}


export default GenerateTextGemini