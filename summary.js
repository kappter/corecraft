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

// Display questions for user input
const details = document.getElementById("questions");
questions.forEach((q, index) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${q}</strong><br><input type="text" id="answer${index}" placeholder="Type your answer">`;
    details.appendChild(p);
});

// Function to generate random defaults for historical information
function generateRandomDefaults() {
    const regions = [
        "North America", "South America", "Europe", "Africa", "Asia", "Australia", "Antarctica",
        "Southeast Asia", "Western Europe", "East Africa", "Central America", "Middle East"
    ];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    document.getElementById("region").value = randomRegion;

    const yearOfBirth = Math.floor(Math.random() * (2025 - 1900 + 1)) + 1900;
    document.getElementById("yearOfBirth").value = yearOfBirth;

    const motherAge = Math.floor(Math.random() * (45 - 18 + 1)) + 18;
    document.getElementById("motherAge").value = motherAge;

    const fatherAge = Math.floor(Math.random() * (50 - 18 + 1)) + 18;
    document.getElementById("fatherAge").value = fatherAge;

    const siblings = Math.floor(Math.random() * 6);
    document.getElementById("siblings").value = siblings;

    const educationLevels = [
        "None", "Elementary School", "High School", "College Degree", "Advanced Degree"
    ];
    const randomEducation = educationLevels[Math.floor(Math.random() * educationLevels.length)];
    document.getElementById("education").value = randomEducation;

    const lifeEvents = [
        `Moved to a new city at age ${Math.floor(Math.random() * 20) + 5}`,
        `Lost a parent at age ${Math.floor(Math.random() * 20) + 5}`,
        `Won a scholarship at age ${Math.floor(Math.random() * 10) + 15}`,
        `Survived a natural disaster at age ${Math.floor(Math.random() * 20) + 5}`,
        `Started a business at age ${Math.floor(Math.random() * 20) + 20}`,
        `Experienced a major illness at age ${Math.floor(Math.random() * 30) + 10}`
    ];
    const numEvents = Math.floor(Math.random() * 2) + 1;
    const randomEvents = [];
    for (let i = 0; i < numEvents; i++) {
        const event = lifeEvents[Math.floor(Math.random() * lifeEvents.length)];
        if (!randomEvents.includes(event)) {
            randomEvents.push(event);
        }
    }
    document.getElementById("lifeEvents").value = randomEvents.join("\n");
}

// Call the function to populate defaults
generateRandomDefaults();

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

    // Collect answers to questions
    const answers = [];
    questions.forEach((_, index) => {
        const answer = document.getElementById(`answer${index}`)?.value || "";
        answers.push(answer);
    });

    // Combine character data with historical data and answers
    const fullCharacterData = {
        ...characterData,
        historicalData,
        answers
    };

    console.log("Full Character Data:", fullCharacterData);
    alert("Character saved successfully!");

    localStorage.removeItem("characterData");
    window.location.href = "index.html";
});

// Menu Strip Functions
function toggleLightMode() {
    document.body.classList.toggle("light-mode");
}

function changeStyle(style) {
    document.body.classList.remove("minimal", "retro");
    if (style !== "default") {
        document.body.classList.add(style);
    }
}
