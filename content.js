document.addEventListener('DOMContentLoaded', function () {
    let colorInput = document.getElementById("colorInput");
    let copyButton = document.getElementById("copyButton");
    let buttonWrapper = document.getElementById("buttonWrapper")
    let colorTypeElement = document.getElementById('colorType')
    let color = document.getElementById('color')
    let colorStorage = localStorage.getItem('color') || '#000000'
    let colorType = localStorage.getItem('colorType') || 'hexadecimal'
    colorTypeElement.value = colorType
    colorInput.value = colorStorage
    if (colorTypeElement.value === 'hexadecimal') {
        color.innerHTML = `Color hex: ${colorInput.value}`
    } else if (colorTypeElement.value === 'RGB') {
        const RGBColor = hexToRgb(colorInput.value);
        color.innerHTML = `Color: ${RGBColor}`
    }

    colorInput.addEventListener('input', function () {
        let selectedColor = colorInput.value;
        localStorage.setItem('color', selectedColor)
        if (colorTypeElement.value === 'hexadecimal') {
            color.innerHTML = `Color hex: ${colorInput.value}`
        } else if (colorTypeElement.value === 'RGB') {
            const RGBColor = hexToRgb(colorInput.value);
            color.innerHTML = `Color: ${RGBColor}`
            console.log(RGBColor)
        }
    })

    copyButton.addEventListener('click', function () {
        let selectedColor = colorInput.value;
        navigator.clipboard.writeText(selectedColor)
        if (colorTypeElement.value === 'hexadecimal') {
            navigator.clipboard.writeText(selectedColor)
        } else if (colorTypeElement.value === 'RGB') {
            const RGBColor = hexToRgb(selectedColor);
            navigator.clipboard.writeText(RGBColor)
        }
        buttonWrapper.classList.add('title')
        setTimeout(() => {
            buttonWrapper.classList.remove('title')
        }, 1500)
    });

    colorTypeElement.addEventListener('change', function () {
        localStorage.setItem('colorType', colorTypeElement.value)
        if (colorTypeElement.value === 'hexadecimal') {
            color.innerHTML = `Color hex: ${colorInput.value}`
        } else if (colorTypeElement.value === 'RGB') {
            const RGBColor = hexToRgb(colorInput.value);
            color.innerHTML = `Color: ${RGBColor}`
        }
    })
});

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return 'RGB(' + r + ', ' + g + ', ' + b + ')';
}
