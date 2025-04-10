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

form.addEventListener("submit", function(event) {
    event.preventDefault();
    allCharacters.forEach((char, charIdx) => {
        const historicalData = {
            region: document.getElementById("region").value,
            yearOfBirth: document.getElementById("yearOfBirth").value,
            motherAge: document.getElementById("motherAge").value,
            fatherAge: document.getElementById("fatherAge").value,
            siblings: document.getElementById("siblings").value,
            education: document.getElementById("education").value,
            lifeEvents: document.getElementById("lifeEvents").value
        };
        const answers = questions.map((_, qIdx) => document.getElementById(`answer_${charIdx}_${qIdx}`).value || "");
        char.historicalData = historicalData;
        char.answers = answers;
    });
    localStorage.setItem("allCharacters", JSON.stringify(allCharacters));
    console.log("Saved allCharacters:", allCharacters); // Debug log
    alert("Characters saved successfully!");
});

function goToScenario() {
    window.location.href = "scenario.html";
}
