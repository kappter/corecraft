const chakraColors = [
    "#8B0000", "#E97451", "#DAA520", "#4A7043", "#4682B4", "#2F2F5A", "#836479"
];
const chakraNames = [
    "Root Chakra (Survival)", "Sacral Chakra (Creativity)", "Solar Plexus Chakra (Power)",
    "Heart Chakra (Love)", "Throat Chakra (Communication)", "Third Eye Chakra (Intuition)",
    "Crown Chakra (Spirituality)"
];

function updateChakraViz(character = null) {
    const vizContainer = document.getElementById("chakraViz");
    if (!vizContainer) {
        console.error("Chakra visualization container not found");
        return;
    }

    vizContainer.innerHTML = "";
    const allCharacters = JSON.parse(localStorage.getItem("allCharacters")) || [];

    try {
        if (character) {
            // Single character visualization (index.html)
            renderChakraBars(vizContainer, character, "Character");
        } else {
            // Multiple characters (summary.html, scenario.html)
            allCharacters.forEach((char, idx) => {
                renderChakraBars(vizContainer, char, char.name);
            });
        }
    } catch (error) {
        console.error("Error updating chakra visualization:", error);
    }
}

function renderChakraBars(container, character, title) {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${title}</h3>`;
    try {
        character.sliderValues.forEach((value, idx) => {
            const percentage = ((parseInt(value) + 100) / 200) * 100; // Normalize -100 to 100 to 0 to 100%
            const bar = document.createElement("div");
            bar.className = "chakra-bar";
            bar.innerHTML = `
                <span class="chakra-bar-label">${chakraNames[idx]}</span>
                <div class="chakra-bar-track">
                    <div class="chakra-bar-fill" style="width: ${percentage}%; background: ${chakraColors[idx]};"></div>
                </div>
            `;
            div.appendChild(bar);
        });
        container.appendChild(div);
    } catch (error) {
        console.error(`Error rendering chakra bars for ${title}:`, error);
    }
}

function copyCharacterPrompt() {
    const allCharacters = JSON.parse(localStorage.getItem("allCharacters")) || [];
    const questions = [
        "What is their greatest strength?", "What haunts them from their past?",
        "Have they ever been abused or hurt others?", "What’s their relationship with money?",
        "Have they faced loss (job, love, health)?", "What’s their moral breaking point?",
        "How do they connect with others?"
    ];

    let prompt = "CoreCraft Character Summary\n\n";
    try {
        allCharacters.forEach((char, idx) => {
            prompt += `Character ${idx + 1}: ${char.name}\n`;
            prompt += `Chakra Profile:\n`;
            prompt += `${chakraNames[0]}: ${char.sliderValues[0] < 0 ? "Fearful" : char.sliderValues[0] > 0 ? "Secure" : "Stable"} (${Math.round(char.points[0])} points)\n`;
            char.spectrums.forEach((s, i) => {
                prompt += `${chakraNames[i + 1]}: ${s.value < 0 ? s.left : s.value > 0 ? s.right : s.middle} (${Math.round(char.points[i + 1])} points)\n`;
            });
            prompt += `\nDetails:\n`;
            questions.forEach((q, qIdx) => {
                prompt += `${q}: ${char.answers[qIdx] || "Not specified"}\n`;
            });
            prompt += `\nHistorical Data:\n`;
            prompt += `Region: ${char.historicalData?.region || "Not specified"}\n`;
            prompt += `Year of Birth: ${char.historicalData?.yearOfBirth || "Not specified"}\n`;
            prompt += `Mother's Age: ${char.historicalData?.motherAge || "Not specified"}\n`;
            prompt += `Father's Age: ${char.historicalData?.fatherAge || "Not specified"}\n`;
            prompt += `Siblings: ${char.historicalData?.siblings || "Not specified"}\n`;
            prompt += `Education: ${char.historicalData?.education || "Not specified"}\n`;
            prompt += `Life Events: ${char.historicalData?.lifeEvents || "Not specified"}\n\n`;
        });

        navigator.clipboard.writeText(prompt).then(() => {
            alert("Character prompt copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy prompt:", err);
            alert("Failed to copy prompt. Please try again.");
        });
    } catch (error) {
        console.error("Error generating character prompt:", error);
        alert("Failed to generate prompt. Check console for details.");
    }
}

// Update visualization when sliders change
document.addEventListener("input", (e) => {
    if (e.target.type === "range" && e.target.id.includes("slider")) {
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
            console.error("Error updating sliders:", error);
        }
    }
});

// Initialize visualization on page load
document.addEventListener("DOMContentLoaded", () => {
    try {
        updateChakraViz();
    } catch (error) {
        console.error("Error initializing chakra visualization:", error);
    }
});
