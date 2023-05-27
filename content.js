
document.addEventListener('DOMContentLoaded', function () {
    var colorInput = document.getElementById("colorInput");
    var copyButton = document.getElementById("copyButton");
    var element = document.getElementById("bolinha");
    copyButton.addEventListener('click', function () {
        var selectedColor = colorInput.value;

        element.style.backgroundColor = `${colorInput.value}`;
        navigator.clipboard.writeText(selectedColor)
            .then(function () {
                console.log("Cor copiada: " + selectedColor);
            })
            .catch(function (error) {
                console.error("Erro ao copiar cor: ", error);
            });
    });
});