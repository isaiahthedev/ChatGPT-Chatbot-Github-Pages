import { KEY } from "./api.js"

const API_KEY = KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

const promptInput = document.getElementById('prompt-input');

const response = document.getElementById('response');

const gen = document.getElementById('gen-btn');

const prev = document.getElementById('prev');

const generate = async () => {
    if(!promptInput.value) {
        alert("Please enter a prompt.")
        return;
    }
    gen.disabled = true;
    gen.innerText = "Generating...";
    try {
        const gpt = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: `Here is my prompt: "${promptInput.value}" and here is our conversation so far: "${prev.innerText}". You are GPT, and I am User. Do not use any of our previous conversation in your response only answer the prompt without saying User: or GPT:`}]
            })
        });
        const data = await gpt.json()
        const mes = data.choices[0].message.content;
        prev.innerText = prev.innerText + `User: ${promptInput.value}` + "\n" + `GPT: ${mes}` + "\n";
        response.innerText = mes;
        promptInput.value = '';
    } catch(error) {
        response.innerText = "Error occured while generating.";
        console.error("Error: ", error);
    }
    finally {
        gen.disabled = false;
        gen.innerText = "Generate Response";
    }
}

gen.addEventListener('click', generate);