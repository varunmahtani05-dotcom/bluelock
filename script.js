const passwordField = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const usePhrase = document.getElementById("usePhrase");
const phraseInput = document.getElementById("phrase");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

usePhrase.addEventListener("change", () => {
    phraseInput.disabled = !usePhrase.checked;
});

function randomCharacter(characters) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return characters[array[0] % characters.length];
}

function generatePassword() {
    const length = Number(
        document.querySelector('input[name="length"]:checked').value
    );

    const type = document.querySelector(
        'input[name="type"]:checked'
    ).value;

    let characters = "";

    if (type === "letters") {
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else if (type === "numbers") {
        characters = "0123456789";
    } else if (type === "mixed") {
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    } else {
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        password += randomCharacter(characters);
    }

    if (usePhrase.checked && phraseInput.value.trim() !== "") {
        const phrase = phraseInput.value.trim();
        const phrasePart = phrase.substring(0, Math.min(phrase.length, 4));

        password = phrasePart + password.substring(phrasePart.length);
    }

    passwordField.value = password;
    message.textContent = "Password generated successfully!";
    clearBtn.hidden = false;
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async () => {
    if (passwordField.value === "") {
        message.textContent = "Generate a password first.";
        return;
    }

    await navigator.clipboard.writeText(passwordField.value);
    message.textContent = "Password copied!";
});

clearBtn.addEventListener("click", () => {
    passwordField.value = "";
    message.textContent = "";
    clearBtn.hidden = true;
});