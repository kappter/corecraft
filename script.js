// Earthy chakra colors
const chakraColors = [
    "#8B0000", // Deep Rust Red (Root Chakra) - Core
    "#E97451", // Burnt Sienna (Sacral Chakra)
    "#DAA520", // Sandy Ochre (Solar Plexus Chakra)
    "#4A7043", // Moss Green (Heart Chakra)
    "#4682B4", // Slate Blue (Throat Chakra)
    "#2F2F5A", // Deep Shale Indigo (Third Eye Chakra)
    "#836479"  // Dusty Mauve (Crown Chakra)
];

// Chakra names for reference
const chakraNames = [
    "Root Chakra (Survival)",
    "Sacral Chakra (Creativity)",
    "Solar Plexus Chakra (Power)",
    "Heart Chakra (Love)",
    "Throat Chakra (Communication)",
    "Third Eye Chakra (Intuition)",
    "Crown Chakra (Spirituality)"
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
        { label: `${chakraNames[0]}: ${coreSlider < 0 ? "Fearful" : coreSlider > 0 ? "Secure" : "Stable"}`, value: coreSlider },
        ...spectrums.map((s, i) => ({
            label: `${chakraNames[i + 1]}: ${s.value < 0 ? s.left : s.value > 0 ? s.right : s.middle}`,
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
        // Add glow effect to the core layer
        if (index === 0) {
            div.classList.add("core-glow");
        }
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
        details.innerHTML += `<p><strong>${chakraNames[i + 1]}:</strong> ${s.left} to ${s.right}, Balanced at ${s.middle}. Current: ${s.value}</p>`;
    });
    questions.forEach((q, index) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${q}</strong><br><input type="text" id="answer${index}" placeholder="Type your answer">`;
        details.appendChild(p);
    });
}
