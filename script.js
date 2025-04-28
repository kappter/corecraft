let characterCount = 0;
const maxCharacters = 5;
let allCharacters = JSON.parse(localStorage.getItem("allCharacters")) || [];
const TOTAL_POINTS = 100;

function sliderToWeight(sliderValue) {
    return Math.abs(sliderValue);
}

function updateSliders() {
    try {
        const sliders = [
            document.getElementById("coreSlider"),
            document.getElementById("slider0"),
            document.getElementById("slider1"),
            document.getElementById("slider2"),
            document.getElementById("slider3"),
            document.getElementById("slider4"),
            document.getElementById("slider5")
        ];
        const sliderValues = sliders.map(slider => slider ? slider.value : 0);
        const spectrums = [];
        for (let i = 0; i < 6; i++) {
            const left = document.getElementById(`left${i}`)?.value || `Left${i}`;
            const right = document.getElementById(`right${i}`)?.value || `Right${i}`;
            const middle = document.getElementById(`middle${i}`)?.value || `Middle${i}`;
            const value = document.getElementById(`slider${i}`)?.value || 0;
            spectrums.push({ left, right, middle, value });
        }
        updateChakraViz({ sliderValues, spectrums });
    } catch (error) {
        console.error("Error in updateSliders:", error);
    }
}

function generateCharacter() {
    try {
        updateSliders();
        const sliders = [
            document.getElementById("coreSlider"),
            document.getElementById("slider0"),
            document.getElementById("slider1"),
            document.getElementById("slider2"),
            document.getElementById("slider3"),
            document.getElementById("slider4"),
            document.getElementById("slider5")
        ];
        const hasNonZero = sliders.some(slider => slider && parseInt(slider.value) !== 0);
        if (hasNonZero) {
            document.getElementById("continueButton").disabled = false;
        } else {
            alert("Please adjust at least one chakra slider to generate a character.");
        }
    } catch (error) {
        console.error("Error in generateCharacter:", error);
        alert("Failed to generate character. Check console for details.");
    }
}

function goToSummary() {
    try {
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
        const sliderValues = sliders.map(slider => slider ? slider.value : 0);
        const weights = sliderValues.map(sliderToWeight);
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        const points = totalWeight === 0 ? new Array(7).fill(TOTAL_POINTS / 7) : weights.map(weight => (weight / totalWeight) * TOTAL_POINTS);

        const spectrums = [];
        for (let i = 0; i < 6; i++) {
            const left = document.getElementById(`left${i}`)?.value || `Left${i}`;
            const right = document.getElementById(`right${i}`)?.value || `Right${i}`;
            const middle = document.getElementById(`middle${i}`)?.value || `Middle${i}`;
            const value = document.getElementById(`slider${i}`)?.value || 0;
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
            sliders.forEach(slider => { if (slider) slider.value = 0; });
            updateSliders();
            document.getElementById("continueButton").disabled = true;
        } else {
            window.location.href = "summary.html";
        }
    } catch (error) {
        console.error("Error in goToSummary:", error);
        alert("Failed to save character. Check console for details.");
    }
}

// Initialize visualization
document.addEventListener("DOMContentLoaded", () => {
    try {
        updateChakraViz();
    } catch (error) {
        console.error("Error initializing visualization in script.js:", error);
    }
});
