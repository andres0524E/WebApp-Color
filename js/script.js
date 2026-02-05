document.addEventListener('DOMContentLoaded', () => {
    
    // --- REFERENCIAS DOM ---
    const rangeRed = document.getElementById('rangeRed');
    const rangeGreen = document.getElementById('rangeGreen');
    const rangeBlue = document.getElementById('rangeBlue');

    const numberRed = document.getElementById('numberRed');
    const numberGreen = document.getElementById('numberGreen');
    const numberBlue = document.getElementById('numberBlue');

    const colorBox = document.getElementById('colorBox');
    const hexCode = document.getElementById('hexCode');
    const rgbText = document.getElementById('rgbText');
    const htmlColorPicker = document.getElementById('htmlColorPicker');

    // --- FUNCIONES AUXILIARES ---
    const toHex = (n) => {
        let hex = parseInt(n).toString(16).toUpperCase();
        return hex.length === 1 ? "0" + hex : hex;
    };

    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    };

    // --- ACTUALIZAR UI ---
    const updateAll = () => {
        let r = parseInt(numberRed.value) || 0;
        let g = parseInt(numberGreen.value) || 0;
        let b = parseInt(numberBlue.value) || 0;

        if (r > 255) r = 255; if (r < 0) r = 0;
        if (g > 255) g = 255; if (g < 0) g = 0;
        if (b > 255) b = 255; if (b < 0) b = 0;

        const colorString = `rgb(${r}, ${g}, ${b})`;
        const hexString = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

        // Actualizar visuales
        colorBox.style.backgroundColor = colorString;
        rgbText.textContent = colorString;
        
        // Actualizar texto HEX
        hexCode.textContent = hexString;
        hexCode.style.color = colorString; // El texto toma el color seleccionado para efecto visual

        // Sincronizar picker visual
        htmlColorPicker.value = hexString;
    };

    // --- SINCRONIZADORES ---
    function syncSlider(slider, numberInput) {
        numberInput.value = slider.value;
        updateAll();
    }

    function syncInput(numberInput, slider) {
        let val = parseInt(numberInput.value);
        if (val > 255) val = 255;
        if (val < 0) val = 0;
        
        if (!isNaN(val)) {
            slider.value = val;
            updateAll();
        }
    }

    function syncColorPicker() {
        const hex = htmlColorPicker.value;
        const rgb = hexToRgb(hex);
        numberRed.value = rgb.r; numberGreen.value = rgb.g; numberBlue.value = rgb.b;
        rangeRed.value = rgb.r; rangeGreen.value = rgb.g; rangeBlue.value = rgb.b;
        updateAll();
    }

    // --- LISTENERS ---
    rangeRed.addEventListener('input', () => syncSlider(rangeRed, numberRed));
    numberRed.addEventListener('input', () => syncInput(numberRed, rangeRed));

    rangeGreen.addEventListener('input', () => syncSlider(rangeGreen, numberGreen));
    numberGreen.addEventListener('input', () => syncInput(numberGreen, rangeGreen));

    rangeBlue.addEventListener('input', () => syncSlider(rangeBlue, numberBlue));
    numberBlue.addEventListener('input', () => syncInput(numberBlue, rangeBlue));

    htmlColorPicker.addEventListener('input', syncColorPicker);

    updateAll();
});