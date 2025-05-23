const chakraColors = [
    "#8B0000", "#E97451", "#DAA520", "#4A7043", "#4682B4", "#2F2F5A", "#836479"
];
const chakraNames = [
    "Root Chakra (Survival)", "Sacral Chakra (Creativity)", "Solar Plexus Chakra (Power)",
    "Heart Chakra (Love)", "Throat Chakra (Communication)", "Third Eye Chakra (Intuition)",
    "Crown Chakra (Spirituality)"
];

function updateChakraViz(character = null) {
    console.log("updateChakraViz called with character:", character);
    const vizContainer = document.getElementById("chakraViz");
    if (!vizContainer) {
        console.error("Chakra visualization container not found");
        return;
    }

    vizContainer.innerHTML = "";
    try {
        if (character) {
            renderChakraBars(vizContainer, character, character.name || "Character");
        } else {
            const storedCharacter = JSON.parse(localStorage.getItem("character"));
            if (storedCharacter) {
                renderChakraBars(vizContainer, storedCharacter, storedCharacter.name || "Character");
            }
        }
    } catch (error) {
        console.error("Error updating chakra visualization:", error);
    }
}

function renderChakraBars(container, character, title) {
    console.log(`Rendering chakra bars for ${title}`);
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
    console.log("copyCharacterPrompt called");
    const character = JSON.parse(localStorage.getItem("character"));
    const questions = [
        "What is their greatest strength?", "What haunts them from their past?",
        "Have they ever been abused or hurt others?", "What’s their relationship with money?",
        "Have they faced loss (job, love, health)?", "What’s their moral breaking point?",
        "How do they connect with others?"
    ];

    let prompt = "CoreCraft Character Summary\n\n";
    try {
        if (!character) {
            throw new Error("No character data found");
        }
        prompt += `Character: ${character.name}\n`;
        prompt += `Chakra Profile:\n`;
        prompt += `${chakraNames[0]}: ${character.sliderValues[0] < 0 ? "Fearful" : character.sliderValues[0] > 0 ? "Secure" : "Stable"} (${Math.round(character.points[0])} points)\n`;
        character.spectrums.forEach((s, i) => {
            prompt += `${chakraNames[i + 1]}: ${s.value < 0 ? s.left : s.value > 0 ? s.right : s.middle} (${Math.round(character.points[i + 1])} points)\n`;
        });
        prompt += `\nDetails:\n`;
        questions.forEach((q, qIdx) => {
            prompt += `${q}: ${character.answers[qIdx] || "Not specified"}\n`;
        });
        prompt += `\nHistorical Data:\n`;
        prompt += `Region: ${character.historicalData?.region || "Not specified"}\n`;
        prompt += `Year of Birth: ${character.historicalData?.yearOfBirth || "Not specified"}\n`;
        prompt += `Mother's Age: ${character.historicalData?.motherAge || "Not specified"}\n`;
        prompt += `Father's Age: ${character.historicalData?.fatherAge || "Not specified"}\n`;
        prompt += `Siblings: ${character.historicalData?.siblings || "Not specified"}\n`;
        prompt += `Education: ${character.historicalData?.education || "Not specified"}\n`;
        prompt += `Life Events: ${character.historicalData?.lifeEvents || "Not specified"}\n`;

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

function printCharacter() {
    console.log("printCharacter called");
    const character = JSON.parse(localStorage.getItem("character"));
    const questions = [
        "What is their greatest strength?", "What haunts them from their past?",
        "Have they ever been abused or hurt others?", "What’s their relationship with money?",
        "Have they faced loss (job, love, health)?", "What’s their moral breaking point?",
        "How do they connect with others?"
    ];

    try {
        if (!character) {
            alert("No character data found to print. Please generate a character first.");
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>CoreCraft Character - ${character.name}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { text-align: center; }
                    h2 { margin-top: 20px; }
                    p { margin: 5px 0; }
                    .chakra { color: #333; }
                </style>
            </head>
            <body>
                <h1>CoreCraft Character: ${character.name}</h1>
                <h2>Chakra Profile</h2>
                <p class="chakra">${chakraNames[0]}: ${character.sliderValues[0] < 0 ? "Fearful" : character.sliderValues[0] > 0 ? "Secure" : "Stable"} (${Math.round(character.points[0])} points)</p>
        `);
        character.spectrums.forEach((s, i) => {
            printWindow.document.write(`
                <p class="chakra">${chakraNames[i + 1]}: ${s.value < 0 ? s.left : s.value > 0 ? s.right : s.middle} (${Math.round(character.points[i + 1])} points)</p>
            `);
        });
        printWindow.document.write(`
                <h2>Details</h2>
        `);
        questions.forEach((q, qIdx) => {
            printWindow.document.write(`
                <p><strong>${q}</strong> ${character.answers[qIdx] || "Not specified"}</p>
            `);
        });
        printWindow.document.write(`
                <h2>Historical Data</h2>
                <p><strong>Region:</strong> ${character.historicalData?.region || "Not specified"}</p>
                <p><strong>Year of Birth:</strong> ${character.historicalData?.yearOfBirth || "Not specified"}</p>
                <p><strong>Mother's Age:</strong> ${character.historicalData?.motherAge || "Not specified"}</p>
                <p><strong>Father's Age:</strong> ${character.historicalData?.fatherAge || "Not specified"}</p>
                <p><strong>Siblings:</strong> ${character.historicalData?.siblings || "Not specified"}</p>
                <p><strong>Education:</strong> ${character.historicalData?.education || "Not specified"}</p>
                <p><strong>Life Events:</strong> ${character.historicalData?.lifeEvents || "Not specified"}</p>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    } catch (error) {
        console.error("Error in printCharacter:", error);
        alert("Failed to print character. Check console for details.");
    }
}

document.addEventListener("input", (e) => {
    if (e.target.type === "range" && e.target.id.includes("slider")) {
        console.log("Slider input detected:", e.target.id);
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

document.addEventListener("DOMContentLoaded", () => {
    console.log("utils.js loaded and initializing visualization");
    try {
        updateChakraViz();
    } catch (error) {
        console.error("Error initializing chakra visualization:", error);
    }
});
