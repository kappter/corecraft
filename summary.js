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

// Add after questions section
const historicalInputs = document.getElementById("historicalInputs");
allCharacters.forEach((char, charIdx) => {
    historicalInputs.innerHTML += `
        <h4>${char.name}</h4>
        <label for="region_${charIdx}">Region:</label>
        <input type="text" id="region_${charIdx}" value="${char.historicalData?.region || ''}" placeholder="e.g., North America"><br>
        <label for="yearOfBirth_${charIdx}">Year of Birth:</label>
        <input type="number" id="yearOfBirth_${charIdx}" value="${char.historicalData?.yearOfBirth || ''}" placeholder="e.g., 1990"><br>
        <label for="motherAge_${charIdx}">Mother's Age:</label>
        <input type="number" id="motherAge_${charIdx}" value="${char.historicalData?.motherAge || ''}" placeholder="e.g., 30"><br>
        <label for="fatherAge_${charIdx}">Father's Age:</label>
        <input type="number" id="fatherAge_${charIdx}" value="${char.historicalData?.fatherAge || ''}" placeholder="e.g., 35"><br>
        <label for="siblings_${charIdx}">Siblings:</label>
        <input type="number" id="siblings_${charIdx}" value="${char.historicalData?.siblings || ''}" placeholder="e.g., 2"><br>
        <label for="education_${charIdx}">Education:</label>
        <input type="text" id="education_${charIdx}" value="${char.historicalData?.education || ''}" placeholder="e.g., High School"><br>
        <label for="lifeEvents_${charIdx}">Life Events:</label>
        <textarea id="lifeEvents_${charIdx}" placeholder="e.g., Moved at age 10">${char.historicalData?.lifeEvents || ''}</textarea><br>
    `;
});

const allCharacters = JSON.parse(localStorage.getItem("allCharacters")) || [];

document.getElementById("characterName").innerText = "Multiple Characters";
const chakraProfile = document.getElementById("chakraProfile");
chakraProfile.innerHTML = "";
allCharacters.forEach((char, idx) => {
    chakraProfile.innerHTML += `<h3>${char.name}</h3>`;
    chakraProfile.innerHTML += `<p style="color: ${chakraColors[0]}"><strong>${chakraNames[0]}:</strong> ${char.sliderValues[0] < 0 ? "Fearful" : char.sliderValues[0] > 0 ? "Secure" : "Stable"} (${Math.round(char.points[0])} points)</p>`;
    char.spectrums.forEach((s, i) => {
        chakraProfile.innerHTML += `<p style="color: ${chakraColors[i + 1]}"><strong>${chakraNames[i + 1]}:</strong> ${s.value < 0 ? s.left : s.value > 0 ? s.right : s.middle} (${Math.round(char.points[i + 1])} points)</p>`;
    });
});

const details = document.getElementById("questions");
allCharacters.forEach((char, charIdx) => {
    details.innerHTML += `<h4>${char.name}</h4>`;
    questions.forEach((q, qIdx) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${q}</strong><br><input type="text" id="answer_${charIdx}_${qIdx}" placeholder="Type your answer" value="${char.answers[qIdx] || ''}">`;
        details.appendChild(p);
    });
});

const form = document.getElementById("historicalForm");
form.innerHTML += `<button type="button" onclick="goToScenario()">Generate Scenario</button>`;

// Update form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();
    allCharacters.forEach((char, charIdx) => {
        const historicalData = {
            region: document.getElementById(`region_${charIdx}`).value,
            yearOfBirth: document.getElementById(`yearOfBirth_${charIdx}`).value,
            motherAge: document.getElementById(`motherAge_${charIdx}`).value,
            fatherAge: document.getElementById(`fatherAge_${charIdx}`).value,
            siblings: document.getElementById(`siblings_${charIdx}`).value,
            education: document.getElementById(`education_${charIdx}`).value,
            lifeEvents: document.getElementById(`lifeEvents_${charIdx}`).value
        };
        const answers = questions.map((_, qIdx) => document.getElementById(`answer_${charIdx}_${qIdx}`).value || "");
        char.historicalData = historicalData;
        char.answers = answers;
    });
    localStorage.setItem("allCharacters", JSON.stringify(allCharacters));
    console.log("Saved allCharacters:", allCharacters);
    alert("Characters saved successfully!");
});

function goToScenario() {
    window.location.href = "scenario.html";
}
