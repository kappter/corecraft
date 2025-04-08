// Earthy chakra colors (same as in script.js)
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

// Load character data from localStorage
const characterData = JSON.parse(localStorage.getItem("characterData"));

// Display character name
document.getElementById("characterName").innerText = characterData.name;

// Display chakra profile
const chakraProfile = document.getElementById("chakraProfile");
const coreSliderValue = characterData.sliderValues[0];
const spectrums = characterData.spectrums;
const points = characterData.points;

// Core (Root Chakra)
chakraProfile.innerHTML += `<p style="color: ${chakraColors[0]}"><strong>${chakraNames[0]}:</strong> ${coreSliderValue < 0 ? "Fearful" : coreSliderValue > 0 ? "Secure" : "Stable"} (${points[0]} points)</p>`;

// Other Chakras
spectrums.forEach((s, i) => {
    chakraProfile.innerHTML += `<p style="color: ${chakraColors[i + 1]}"><strong>${chakraNames[i + 1]}:</strong> ${s.left} to ${s.right}, Balanced at ${s.middle}. Current: ${s.value < 0 ? s.left : s.value > 0 ? s.right : s.middle} (${points[i + 1]} points)</p>`;
});

// Display answers to questions
chakraProfile.innerHTML += `<h3>Character Details</h3>`;
characterData.answers.forEach((answer, index) => {
    if (answer) {
        chakraProfile.innerHTML += `<p><strong>${questions[index]}</strong> ${answer}</p>`;
    }
});

// Handle form submission
document.getElementById("historicalForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const historicalData = {
        region: document.getElementById("region").value,
        yearOfBirth: document.getElementById("yearOfBirth").value,
        motherAge: document.getElementById("motherAge").value,
        fatherAge: document.getElementById("fatherAge").value,
        siblings: document.getElementById("siblings").value,
        education: document.getElementById("education").value,
        lifeEvents: document.getElementById("lifeEvents").value
    };

    // Combine character data with historical data
    const fullCharacterData = {
        ...characterData,
        historicalData
    };

    // Save the full character data (for now, just log it)
    console.log("Full Character Data:", fullCharacterData);
    alert("Character saved successfully!");

    // Optionally, clear localStorage or redirect back to the main page
    localStorage.removeItem("characterData");
    window.location.href = "index.html";
});
