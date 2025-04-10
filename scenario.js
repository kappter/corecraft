const chakraNames = [
    "Root Chakra (Survival)", "Sacral Chakra (Creativity)", "Solar Plexus Chakra (Power)",
    "Heart Chakra (Love)", "Throat Chakra (Communication)", "Third Eye Chakra (Intuition)",
    "Crown Chakra (Spirituality)"
];
const allCharacters = JSON.parse(localStorage.getItem("allCharacters")) || [];
const scenarioOutput = document.getElementById("scenarioOutput");

function generateScenario() {
    if (!allCharacters.length) {
        scenarioOutput.innerHTML = "<p>No characters found. Please create some first.</p>";
        return;
    }

    const setting = "a dystopian city in 2045 where chakra energy powers society";
    let story = `<h2>Setting: ${setting}</h2>`;
    
    // Ensure all characters have necessary data
    allCharacters.forEach((char, idx) => {
        if (!char.answers || !char.historicalData) {
            story += `<p><strong>${char.name}</strong>: Incomplete data. Please fill out details in the summary.</p>`;
            return;
        }

        story += `<p><strong>${char.name}</strong> (${chakraNames[0]}: ${char.sliderValues[0] < 0 ? "Fearful" : char.sliderValues[0] > 0 ? "Secure" : "Stable"}) steps into the fray. `;
        story += `Their strength, "${char.answers[0]}", drives them, though "${char.answers[1]}" lingers in their shadow. `;
        story += `From ${char.historicalData.region}, born ${char.historicalData.yearOfBirth}, they’ve endured ${char.historicalData.lifeEvents}. `;

        // Interaction with another character
        const otherChar = allCharacters[(idx + 1) % allCharacters.length];
        story += `They confront <strong>${otherChar.name}</strong> over ${char.answers[5]}, `;
        story += `their ${char.spectrums[4].value > 0 ? "Outspoken" : "Silent"} Throat Chakra clashing with ${otherChar.spectrums[2].value > 0 ? "Confident" : "Timid"} energy.`;
        story += `</p>`;
    });

    scenarioOutput.innerHTML = story;
    console.log("Scenario generated with:", allCharacters); // Debug log
}

generateScenario();
