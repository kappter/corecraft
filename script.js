const TOTAL_POINTS = 100;

function sliderToWeight(sliderValue) {
    return Math.abs(sliderValue);
}

function updateSliders() {
    console.log("updateSliders called");
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
        if (typeof updateChakraViz === "function") {
            updateChakraViz({ sliderValues, spectrums });
        } else {
            console.warn("updateChakraViz is not defined, skipping visualization");
        }
    } catch (error) {
        console.error("Error in updateSliders:", error);
    }
}

function generateCharacter() {
    console.log("generateCharacter called");
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
            console.log("Continue button enabled");
        } else {
            alert("Please adjust at least one chakra slider to generate a character.");
        }
    } catch (error) {
        console.error("Error in generateCharacter:", error);
        alert("Failed to generate character. Check console for details.");
    }
}

function goToSummary() {
    console.log("goToSummary called");
    try {
        const name = document.getElementById("charName").value || "Character";
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

        localStorage.setItem("character", JSON.stringify(characterData));
        console.log("Character saved:", characterData);
        window.location.href = "summary.html";
    } catch (error) {
        console.error("Error in goToSummary:", error);
        alert("Failed to save character. Check console for details.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js loaded and initializing");
    try {
        if (typeof updateChakraViz === "function") {
            updateChakraViz();
        } else {
            console.warn("updateChakraViz is not defined during initialization");
        }
    } catch (error) {
        console.error("Error initializing visualization in script.js:", error);
    }
});
