// Sample versatile words
const versatileWords = ["Strength", "Shadow", "Heat", "Flow", "Core", "Fracture", "Light"];

// Core questions to reveal character
const questions = [
    "What is their greatest strength?",
    "What haunts them from their past?",
    "Have they ever been abused or hurt others?",
    "What’s their relationship with money?",
    "Have they faced loss (job, love, health)?",
    "What’s their moral breaking point?",
    "How do they connect with others?"
];

// Generate a random character
function generateCharacter() {
    const name = document.getElementById("charName").value || "Unnamed";
    const traits = [];
    for (let i = 0; i < 3; i++) {
        traits.push(versatileWords[Math.floor(Math.random() * versatileWords.length)]);
    }

    // Display core visualization
    displayCore(traits);
    // Display questions
    displayQuestions(name, traits);
}

// Visualize the character's core
function displayCore(traits) {
    const viz = document.getElementById("coreViz");
    viz.innerHTML = "";
    traits.forEach((trait, index) => {
        const size = 300 - (index * 100); // Layers decrease in size inward
        const layer = document.createElement("div");
        layer.className = "layer";
        layer.style.width = `${size}px`;
        layer.style.height = `${size}px`;
        layer.style.top = `${(300 - size) / 2}px`;
        layer.style.left = `${(300 - size) / 2}px`;
        layer.style.backgroundColor = `hsl(${index * 120}, 50%, 50%)`; // Different colors
        layer.innerText = trait;
        layer.style.display = "flex";
        layer.style.alignItems = "center";
        layer.style.justifyContent = "center";
        layer.style.color = "#fff";
        viz.appendChild(layer);
    });
}

// Display questions and answers section
function displayQuestions(name, traits) {
    const details = document.getElementById("questions");
    details.innerHTML = `<h3>${name}'s Core Traits: ${traits.join(", ")}</h3>`;
    questions.forEach((q, index) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${q}</strong><br><input type="text" id="answer${index}" placeholder="Type your answer">`;
        details.appendChild(p);
    });
}
