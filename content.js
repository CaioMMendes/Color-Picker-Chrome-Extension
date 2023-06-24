
document.addEventListener('DOMContentLoaded', function () {
    let colorInput = document.getElementById("colorInput");
    let copyButton = document.getElementById("copyButton");
    let element = document.getElementById("bolinha");
    let colorHex = document.getElementById('colorHex')
    let colorStorage = localStorage.getItem('color') || '#000000'
    colorInput.value = colorStorage
    element.style.backgroundColor = `${colorInput.value}`;
    colorHex.innerHTML = `Color hex: ${colorInput.value}`

    colorInput.addEventListener('input', function () {
        let selectedColor = colorInput.value;
        localStorage.setItem('color', selectedColor)
        colorHex.innerHTML = `Color hex: ${colorInput.value}`
        element.style.backgroundColor = `${colorInput.value}`;
    })

    copyButton.addEventListener('click', function () {
        let selectedColor = colorInput.value;
        navigator.clipboard.writeText(selectedColor)
            .then(function () {
                console.log("Cor copiada: " + selectedColor);
            })
            .catch(function (error) {
                console.error("Erro ao copiar cor: ", error);
            });
    });
});