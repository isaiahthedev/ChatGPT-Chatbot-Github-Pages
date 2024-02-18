import { KEY } from "./api.js"

const API_KEY = KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

const promptInput = document.getElementById('prompt-input');

const response = document.getElementById('response');

const gen = document.getElementById('gen-btn');

const generate = async () => {
    try {
        const gpt = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: promptInput.value}]
            })
        });
        const data = await gpt.json()
        response.innerText = data.choices[0].message.content;
    } catch(error) {
        console.error("Error: ", error);
    }
}

gen.addEventListener('click', generate);