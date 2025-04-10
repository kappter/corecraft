document.getElementById('characterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Core Inputs
    const name = document.getElementById('name').value;
    const moralCore = document.getElementById('moralCore').value;
    const history = document.getElementById('history').value;
    const discipline = document.getElementById('discipline').value;

    // Mastery Levels
    const levels = [
        { time: parseInt(document.getElementById('time1').value) || 0, unit: document.getElementById('unit1').value, diff: parseInt(document.getElementById('diff1').value) },
        { time: parseInt(document.getElementById('time2').value) || 0, unit: document.getElementById('unit2').value, diff: parseInt(document.getElementById('diff2').value) },
        { time: parseInt(document.getElementById('time3').value) || 0, unit: document.getElementById('unit3').value, diff: parseInt(document.getElementById('diff3').value) },
        { time: parseInt(document.getElementById('time4').value) || 0, unit: document.getElementById('unit4').value, diff: parseInt(document.getElementById('diff4').value) },
        { time: parseInt(document.getElementById('time5').value) || 0, unit: document.getElementById('unit5').value, diff: parseInt(document.getElementById('diff5').value) },
        { time: parseInt(document.getElementById('time6').value) || 0, unit: document.getElementById('unit6').value, diff: parseInt(document.getElementById('diff6').value) },
        { time: parseInt(document.getElementById('time7').value) || 0, unit: document.getElementById('unit7').value, diff: parseInt(document.getElementById('diff7').value) }
    ];

    // Normalize time to hours
    const normalizeTime = (time, unit) => {
        if (unit === 'days') return time * 24;
        if (unit === 'weeks') return time * 24 * 7;
        return time;
    };

    // Core Visualization
    const coreVisualizer = document.getElementById('coreVisualizer');
    coreVisualizer.innerHTML = `
        <div class="layer crust">${name}'s Persona</div>
        <div class="layer mantle">${history}</div>
        <div class="layer innerCore">${moralCore}</div>
    `;

    // Signature Visualization
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = ['#87CEEB', '#32CD32', '#FFFF00', '#FFA500', '#FF0000', '#800080', '#FFD700'];
    let x = 50;
    const y = 100;
    const maxWidth = 500; // Canvas width minus padding

    // Calculate total normalized time for scaling
    const totalTime = levels.reduce((sum, level) => sum + normalizeTime(level.time, level.unit), 0);
    const scaleFactor = totalTime > 0 ? maxWidth / totalTime : 1;

    levels.forEach((level, i) => {
        const normalizedTime = normalizeTime(level.time, level.unit);
        if (normalizedTime > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            const segmentLength = normalizedTime * scaleFactor;
            ctx.lineTo(x + segmentLength, y);
            ctx.lineWidth = level.diff * 3; // Thickness based on difficulty
            ctx.strokeStyle = colors[i];
            ctx.stroke();
            x += segmentLength + 10; // Space between segments
        }
    });

    // Add discipline label
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(`${discipline} Mastery`, 10, 30);
});
