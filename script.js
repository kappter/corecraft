let characterCount = 0;
const maxCharacters = 5;
let allCharacters = JSON.parse(localStorage.getItem("allCharacters")) || [];
const TOTAL_POINTS = 100; // Example value, adjust as needed

function sliderToWeight(sliderValue) {
    return Math.abs(sliderValue); // Example conversion, adjust as needed
}

function updateSliders() {
    const sliders = [
        document.getElementById("coreSlider"),
        document.getElementById("slider0"),
        document.getElementById("slider1"),
        document.getElementById("slider2"),
        document.getElementById("slider3"),
        document.getElementById("slider4"),
        document.getElementById("slider5")
    ];
    const sliderValues = sliders.map(slider => slider.value);
    const spectrums = [];
    for (let i = 0; i < 6; i++) {
        const left = document.getElementById(`left${i}`).value || `Left${i}`;
        const right = document.getElementById(`right${i}`).value || `Right${i}`;
        const middle = document.getElementById(`middle${i}`).value || `Middle${i}`;
        const value = document.getElementById(`slider${i}`).value;
        spectrums.push({ left, right, middle, value });
    }
    updateChakraViz({ sliderValues, spectrums });
}

function generateCharacter() {
    updateSliders();
    document.getElementById("continueButton").disabled = false;
}

function goToSummary() {
    const name = document.getElementById("charName").value || `Character ${characterCount + 1}`;
    const sliders = [
        document.getElementById("coreSlider"),
        document.getElementById("slider0"),
        document.getElementById("slider1"),
        document.getElementById("slider2"),
        document.getElementById("slider3"),
        document.getElementById("slider4"),
        document.getElementById("slider5")
    ];
    const sliderValues = sliders.map(slider => slider.value);
    const weights = sliderValues.map(sliderToWeight);
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    const points = totalWeight === 0 ? new Array(7).fill(TOTAL_POINTS / 7) : weights.map(weight => (weight / totalWeight) * TOTAL_POINTS);

    const spectrums = [];
    for (let i = 0; i < 6; i++) {
        const left = document.getElementById(`left${i}`).value || `Left${i}`;
        const right = document.getElementById(`right${i}`).value || `Right${i}`;
        const middle = document.getElementById(`middle${i}`).value || `Middle${i}`;
        const value = document.getElementById(`slider${i}`).value;
        spectrums.push({ left, right, middle, value });
    }

    const characterData = {
        name,
        sliderValues,
        points,
        spectrums,
        answers: []
    };

    allCharacters.push(characterData);
    localStorage.setItem("allCharacters", JSON.stringify(allCharacters));
    characterCount++;
    document.getElementById("characterCount").innerText = `Characters Created: ${characterCount} / 5`;

    console.log("Current allCharacters:", allCharacters);

    if (characterCount < maxCharacters && confirm(`Character ${characterCount} saved. Add another? (Up to ${maxCharacters})`)) {
        document.getElementById("charName").value = "";
        sliders.forEach(slider => slider.value = 0);
        updateSliders();
    } else {
        window.location.href = "summary.html";
    }
}

// Initialize visualization
updateChakraViz();
