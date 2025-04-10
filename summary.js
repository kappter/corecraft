// In summary.js
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

// Display questions for each character
const details = document.getElementById("questions");
allCharacters.forEach((char, charIdx) => {
    details.innerHTML += `<h4>${char.name}</h4>`;
    questions.forEach((q, qIdx) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${q}</strong><br><input type="text" id="answer_${charIdx}_${qIdx}" placeholder="Type your answer">`;
        details.appendChild(p);
    });
});

// Add scenario button
const form = document.getElementById("historicalForm");
form.innerHTML += `<button type="button" onclick="goToScenario()">Generate Scenario</button>`;

// Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();
    allCharacters.forEach((char, charIdx) => {
        const historicalData = {
            region: document.getElementById("region").value, // Could make these per-character if UI expanded
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
    alert("Characters saved successfully!");
});

function goToScenario() {
    window.location.href = "scenario.html";
}
