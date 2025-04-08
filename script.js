// Chakra colors
const chakraColors = [
    "#FF0000", // Red (Root Chakra) - Core
    "#FFA500", // Orange (Sacral Chakra)
    "#FFFF00", // Yellow (Solar Plexus Chakra)
    "#008000", // Green (Heart Chakra)
    "#0000FF", // Blue (Throat Chakra)
    "#4B0082", // Indigo (Third Eye Chakra)
    "#EE82EE"  // Violet (Crown Chakra)
];

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

// Initialize user-defined spectrums
function initializeSpectrums() {
    const spectrumInputs = document.getElementById("spectrumInputs");
    for (let i = 0; i < 6; i++) {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>Spectrum ${i + 1}</h3>
            <input type="text" id="left${i}" placeholder="Left End (e.g., Anger)">
            <input type="range" id="slider${i}" min="-100" max="100" value="0">
            <input type="text" id="right${i}" placeholder="Right End (e.g., Calm)">
            <br>
            <input type="text" id="middle${i}" placeholder="Middle (e.g., Tempered)">
        `;
        spectrumInputs.appendChild(div);
    }
}

// Generate a character
function generateCharacter() {
    const name = document.getElementById("charName").value || "Unnamed";
    const coreSlider = document.getElementById("coreSlider").value;

    // Collect user-defined spectrums
    const spectrums = [];
    for (let i = 0; i < 6; i++) {
        const left = document.getElementById(`left${i}`).value || `Left${i}`;
        const right = document.getElementById(`right${i}`).value || `Right${i}`;
        const middle = document.getElementById(`middle${i}`).value || `Middle${i}`;
        const value = document.getElementById(`slider${i}`).value;
        spectrums.push({ left, right, middle, value });
    }

    // Display core visualization
    displayCore(coreSlider, spectrums);
    // Display questions
    displayQuestions(name, spectrums);
}

// Visualize the character's core
function displayCore(coreSlider, spectrums) {
    const viz = document.getElementById("coreViz");
    viz.innerHTML = "";

    // All layers (core + 6 user-defined)
    const layers = [
        { label: `Core: ${coreSlider < 0 ? "Dark" : coreSlider > 0 ? "Light" : "Neutral"}`, value: coreSlider },
        ...spectrums.map((s, i) => ({
            label: `${s.left} - ${s.right}: ${s.value < 0 ? s.left : s.value > 0 ? s.right : s.middle}`,
            value: s.value
        }))
    ];

    layers.forEach((layer, index) => {
        // Base size for each layer
        const baseSize = 400 - (index * 50); // Starting size decreases outward
        // Adjust thickness based on slider value (-100 to 100)
        const thicknessAdjustment = (layer.value / 100) * 40; // Scale thickness
        const size = baseSize + thicknessAdjustment;

        const div = document.createElement("div");
        div.className = "layer";
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        div.style.top = `${(400 - size) / 2}px`;
        div.style.left = `${(400 - size) / 2}px`;
        div.style.backgroundColor = chakraColors[index];
        div.innerText = layer.label;
        viz.appendChild(div);
    });
}

// Display questions and answers section
function displayQuestions(name, spectrums) {
    const details = document.getElementById("questions");
    details.innerHTML = `<h3>${name}'s Core Profile</h3>`;
    spectrums.forEach((s, i) => {
        details.innerHTML += `<p><strong>Spectrum ${i + 1}:</strong> ${s.left} to ${s.right}, Balanced at ${s.middle}. Current: ${s.value}</p>`;
    });
    questions.forEach((q, index) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${q}</strong><br><input type="text" id="answer${index}" placeholder="Type your answer">`;
        details.appendChild(p);
    });
}

// Initialize the app
window.onload = initializeSpectrums;
