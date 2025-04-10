// scenario.js
const allCharacters = JSON.parse(localStorage.getItem("allCharacters")) || [];
const scenarioOutput = document.getElementById("scenarioOutput");

function generateScenario() {
    // Simple scenario logic for now
    const setting = "a dystopian city in 2045 where chakra energy powers society";
    let story = `<h2>Setting: ${setting}</h2>`;
    allCharacters.forEach((char, idx) => {
        story += `<p><strong>${char.name}</strong> (${chakraNames[0]}: ${char.sliderValues[0] < 0 ? "Fearful" : "Secure"}) enters the scene. `;
        story += `Their greatest strength is "${char.answers[0]}", but they’re haunted by "${char.answers[1]}". `;
        story += `Born in ${char.historicalData.region} in ${char.historicalData.yearOfBirth}, they’ve faced ${char.historicalData.lifeEvents}. `;
        story += `They clash with ${allCharacters[(idx + 1) % allCharacters.length].name} over ${char.answers[5]}.</p>`;
    });
    scenarioOutput.innerHTML = story;
}

generateScenario();
