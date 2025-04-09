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

// Total points (volume) of the sphere
const TOTAL_POINTS = 700;

// Convert slider value (-100 to 100) to a weight (0 to 200)
function sliderToWeight(value) {
    return parseInt(value) + 100; // -100 -> 0, 0 -> 100, 100 -> 200
}

// Update sliders to balance points like a sphere
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

    // Calculate weights from slider values
    const weights = sliders.map(slider => sliderToWeight(slider.value));
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    // Normalize weights to distribute points (total = 700)
    let points = [];
    if (totalWeight === 0) {
        // If all sliders are at -100, distribute equally
        points = new Array(7).fill(TOTAL_POINTS / 7);
    } else {
        points = weights.map(weight => (weight / totalWeight) * TOTAL_POINTS);
    }

    // Adjust sliders to reflect the normalized points
    const activeSlider = document.activeElement;
    sliders.forEach((slider, index) => {
        if (slider !== activeSlider) {
            const newWeight = (points[index] / TOTAL_POINTS) * totalWeight;
            slider.value = Math.round(newWeight - 100);
        }
    });

    // Update visualization
    const name = document.getElementById("charName").value || "Unnamed";
    const spectrums = [];
    for (let i = 0; i < 6; i++) {
        const left = document.getElementById(`left${i}`).value || `Left${i}`;
        const right = document.getElementById(`right${i}`).value || `Right${i}`;
        const middle = document.getElementById(`middle${i}`).value || `Middle${i}`;
        const value = document.getElementById(`slider${i}`).value;
        spectrums.push({ left, right, middle, value });
    }
    displayCore(sliders[0].value, spectrums, points);
}

// Generate a character
function generateCharacter() {
    updateSliders();
    document.getElementById("continueButton").disabled = false;
}

// Visualize the character's core as a sphere with a cutout
function displayCore(coreSliderValue, spectrums, points) {
    const viz = document.getElementById("coreViz");
    viz.innerHTML = "";

    // All layers (core + 6 user-defined)
    const layers = [
        { points: points[0] },
        ...spectrums.map((s, i) => ({
            points: points[i + 1]
        }))
    ];

    // Display the layers
    layers.forEach((layer, index) => {
        const baseSize = 400;
        const minSize = 50;
        const sizeRange = (baseSize - minSize) / 7;
        const baseLayerSize = minSize + (index * sizeRange);
        const scaleFactor = layer.points / 100;
        const minLayerSize = 20;
        const size = Math.max(minLayerSize, baseLayerSize * (scaleFactor / 2)); // Adjust scale for sphere

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
    localStorage.setItem("characterData", JSON.stringify(characterData));
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
