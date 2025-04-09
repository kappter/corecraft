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

// Total points to distribute across all layers
const TOTAL_POINTS = 700;

// Convert slider value (-100 to 100) to points (0 to 200)
function sliderToPoints(value) {
    return parseInt(value) + 100; // -100 -> 0, 0 -> 100, 100 -> 200
}

// Update sliders to balance points
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

    // Calculate current total points
    let totalPoints = 0;
    const points = sliders.map(slider => sliderToPoints(slider.value));
    totalPoints = points.reduce((sum, p) => sum + p, 0);

    // If total points exceed 700, redistribute the excess
    if (totalPoints !== TOTAL_POINTS) {
        const excess = totalPoints - TOTAL_POINTS;
        const numSliders = sliders.length;
        const adjustment = excess / (numSliders - 1); // Distribute among other sliders

        // Adjust all sliders except the one that triggered the change
        const activeSlider = document.activeElement;
        sliders.forEach((slider, index) => {
            if (slider !== activeSlider) {
                let newPoints = points[index] - adjustment;
                newPoints = Math.max(0, Math.min(200, newPoints)); // Clamp between 0 and 200
                slider.value = newPoints - 100; // Convert back to slider value
            }
        });
    }

    // Update visualization (but don’t enable Continue button yet)
    const name = document.getElementById("charName").value || "Unnamed";
    const spectrums = [];
    for (let i = 0; i < 6; i++) {
        const left = document.getElementById(`left${i}`).value || `Left${i}`;
        const right = document.getElementById(`right${i}`).value || `Right${i}`;
        const middle = document.getElementById(`middle${i}`).value || `Middle${i}`;
        const value = document.getElementById(`slider${i}`).value;
        spectrums.push({ left, right, middle, value });
    }
    displayCore(sliders[0].value, spectrums);
}

// Generate a character
function generateCharacter() {
    updateSliders();
    // Enable the Continue button after generating
    document.getElementById("continueButton").disabled = false;
}

// Visualize the character's core
function displayCore(coreSliderValue, spectrums) {
    const viz = document.getElementById("coreViz");
    viz.innerHTML = "";

    // Calculate points for each layer
    const sliderValues = [
        coreSliderValue,
        ...spectrums.map(s => s.value)
    ].map(value => parseInt(value));

    const points = sliderValues.map(sliderToPoints);

    // All layers (core + 6 user-defined)
    const layers = [
        { points: points[0] },
        ...spectrums.map((s, i) => ({
            points: points[i + 1]
        }))
    ];

    // Display the layers
    layers.forEach((layer, index) => {
        // Scale the layer size based on points (0 to 200 points)
        const baseSize = 400;
        const minSize = 50;
        const sizeRange = (baseSize - minSize) / 7;
        const baseLayerSize = minSize + (index * sizeRange);
        const scaleFactor = layer.points / 100;
        const minLayerSize = 20;
        const size = Math.max(minLayerSize, baseLayerSize * scaleFactor);

        const div = document.createElement("div");
        div.className = "layer";
        if (index === 0) {
            div.classList.add("core-glow");
        }
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        div.style.top = `${(400 - size) / 2}px`;
        div.style.left = `${(400 - size) / 2}px`;
        div.style.backgroundColor = chakraColors[index];
        div.style.zIndex = 7 - index;

        viz.appendChild(div);
    });
}

// Function to navigate to the summary page
function goToSummary() {
    const name = document.getElementById("charName").value || "Unnamed";
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
    const points = sliderValues.map(sliderToPoints);

    const spectrums = [];
    for (let i = 0; i < 6; i++) {
        const left = document.getElementById(`left${i}`).value || `Left${i}`;
        const right = document.getElementById(`right${i}`).value || `Right${i}`;
        const middle = document.getElementById(`middle${i}`).value || `Middle${i}`;
        const value = document.getElementById(`slider${i}`).value;
        spectrums.push({ left, right, middle, value });
    }

    // Store character data in localStorage
    const characterData = {
        name,
        sliderValues,
        points,
        spectrums,
        answers: [] // Empty since questions are moved to summary page
    };
    localStorage.setItem("characterData", JSON.stringify(characterData));

    // Navigate to the summary page
    window.location.href = "summary.html";
}

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
