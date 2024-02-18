const API_URL = "https://api.openai.com/v1/chat/completions";

let API_KEY = `"${document.getElementById('api').value}"`;

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
    API_KEY = `${document.getElementById('api').value}`;
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