const chakraColors = [
    "#8B0000", "#E97451", "#DAA520", "#4A7043", "#4682B4", "#2F2F5A", "#836479"
];
const chakraNames = [
    "Root Chakra (Survival)", "Sacral Chakra (Creativity)", "Solar Plexus Chakra (Power)",
    "Heart Chakra (Love)", "Throat Chakra (Communication)", "Third Eye Chakra (Intuition)",
    "Crown Chakra (Spirituality)"
];

const questions = [
    "What is their greatest strength?", "What haunts them from their past?",
    "Have they ever been abused or hurt others?", "What’s their relationship with money?",
    "Have they faced loss (job, love, health)?", "What’s their moral breaking point?",
    "How do they connect with others?"
];

const character = JSON.parse(localStorage.getItem("character")) || null;
const historicalInputs = document.getElementById("historicalInputs");

if (character) {
    historicalInputs.innerHTML = `
        <h4>${character.name}</h4>
        <label for="region">Region:</label>
        <input type="text" id="region" value="${character.historicalData?.region || ''}" placeholder="e.g., North America"><br>
        <label for="yearOfBirth">Year of Birth:</label>
        <input type="number" id="yearOfBirth" value="${character.historicalData?.yearOfBirth || ''}" placeholder="e.g., 1990"><br>
        <label for="motherAge">Mother's Age:</label>
        <input type="number" id="motherAge" value="${character.historicalData?.motherAge || ''}" placeholder="e.g., 30"><br>
        <label for="fatherAge">Father's Age:</label>
        <input type="number" id="fatherAge" value="${character.historicalData?.fatherAge || ''}" placeholder="e.g., 35"><br>
        <label for="siblings">Siblings:</label>
        <input type="number" id="siblings" value="${character.historicalData?.siblings || ''}" placeholder="e.g., 2"><br>
        <label for="education">Education:</label>
        <input type="text" id="education" value="${character.historicalData?.education || ''}" placeholder="e.g., High School"><br>
        <label for="lifeEvents">Life Events:</label>
        <textarea id="lifeEvents" placeholder="e.g., Moved at age 10">${character.historicalData?.lifeEvents || ''}</textarea><br>
    `;
}

document.getElementById("characterName").innerText = character ? character.name : "Character";
const chakraProfile = document.getElementById("chakraProfile");
chakraProfile.innerHTML = "";
if (character) {
    chakraProfile.innerHTML += `<h3>${character.name}</h3>`;
    chakraProfile.innerHTML += `<p style="color: ${chakraColors[0]}"><strong>${chakraNames[0]}:</strong> ${character.sliderValues[0] < 0 ? "Fearful" : character.sliderValues[0] > 0 ? "Secure" : "Stable"} (${Math.round(character.points[0])} points)</p>`;
    character.spectrums.forEach((s, i) => {
        chakraProfile.innerHTML += `<p style="color: ${chakraColors[i + 1]}"><strong>${chakraNames[i + 1]}:</strong> ${s.value < 0 ? s.left : s.value > 0 ? s.right : s.middle} (${Math.round(character.points[i + 1])} points)</p>`;
    });
}

const details = document.getElementById("questions");
if (character) {
    details.innerHTML += `<h4>${character.name}</h4>`;
    questions.forEach((q, qIdx) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${q}</strong><br><input type="text" id="answer_${qIdx}" placeholder="Type your answer" value="${character.answers[qIdx] || ''}">`;
        details.appendChild(p);
    });
}

const form = document.getElementById("historicalForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Historical form submitted");
    try {
        if (character) {
            const historicalData = {
                region: document.getElementById("region")?.value || "",
                yearOfBirth: document.getElementById("yearOfBirth")?.value || "",
                motherAge: document.getElementById("motherAge")?.value || "",
                fatherAge: document.getElementById("fatherAge")?.value || "",
                siblings: document.getElementById("siblings")?.value || "",
                education: document.getElementById("education")?.value || "",
                lifeEvents: document.getElementById("lifeEvents")?.value || ""
            };
            const answers = questions.map((_, qIdx) => document.getElementById(`answer_${qIdx}`)?.value || "");
            character.historicalData = historicalData;
            character.answers = answers;
            localStorage.setItem("character", JSON.stringify(character));
            console.log("Character updated:", character);
            alert("Character saved successfully!");
            updateChakraViz();
        }
    } catch (error) {
        console.error("Error saving character:", error);
        alert("Failed to save character. Check console for details.");
    }
});

function goToScenario() {
    console.log("Navigating to scenario.html");
    window.location.href = "scenario.html";
}

// Initialize visualization
document.addEventListener("DOMContentLoaded", () => {
    console.log("summary.js loaded and initializing visualization");
    try {
        updateChakraViz();
    } catch (error) {
        console.error("Error initializing visualization in summary.js:", error);
    }
});
