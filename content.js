document.addEventListener("DOMContentLoaded", function () {
  let colorInput = document.getElementById("colorInput")
  let copyButton = document.getElementById("copyButton")
  let buttonWrapper = document.getElementById("buttonWrapper")
  let colorTypeElement = document.getElementById("colorType")
  let color = document.getElementById("color")
  let colorStorage = localStorage.getItem("color") || "#000000"
  let colorType = localStorage.getItem("colorType") || "hexadecimal"
  colorTypeElement.value = colorType
  colorInput.value = colorStorage
  if (colorTypeElement.value === "hexadecimal") {
    const HEXColor = colorInput.value.toUpperCase()
    color.innerHTML = `Color: ${HEXColor}`
  } else if (colorTypeElement.value === "RGB") {
    const RGBColor = hexToRgb(colorInput.value)
    color.innerHTML = `Color: ${RGBColor}`
  } else if (colorTypeElement.value === "HSL") {
    const HSLColor = hexToHsl(colorInput.value)
    color.innerHTML = `Color: ${HSLColor}`
  }

  colorInput.addEventListener("input", function () {
    let selectedColor = colorInput.value.toUpperCase()
    localStorage.setItem("color", selectedColor)
    if (colorTypeElement.value === "hexadecimal") {
      const HEXColor = colorInput.value.toUpperCase()
      color.innerHTML = `Color: ${HEXColor}`
    } else if (colorTypeElement.value === "RGB") {
      const RGBColor = hexToRgb(colorInput.value)
      color.innerHTML = `Color: ${RGBColor}`
    } else if (colorTypeElement.value === "HSL") {
      const HSLColor = hexToHsl(colorInput.value)
      color.innerHTML = `Color: ${HSLColor}`
    }
  })

  copyButton.addEventListener("click", function () {
    let selectedColor = colorInput.value.toUpperCase()
    navigator.clipboard.writeText(selectedColor)
    if (colorTypeElement.value === "hexadecimal") {
      navigator.clipboard.writeText(selectedColor)
    } else if (colorTypeElement.value === "RGB") {
      const RGBColor = hexToRgb(selectedColor)
      navigator.clipboard.writeText(RGBColor)
    } else if (colorTypeElement.value === "HSL") {
      const HSLColor = hexToHsl(selectedColor)
      navigator.clipboard.writeText(HSLColor)
    }
    buttonWrapper.classList.add("title")
    setTimeout(() => {
      buttonWrapper.classList.remove("title")
    }, 1500)
  })

  colorTypeElement.addEventListener("change", function () {
    localStorage.setItem("colorType", colorTypeElement.value)
    if (colorTypeElement.value === "hexadecimal") {
      const HEXColor = colorInput.value.toUpperCase()
      color.innerHTML = `Color: ${HEXColor}`
    } else if (colorTypeElement.value === "RGB") {
      const RGBColor = hexToRgb(colorInput.value)
      color.innerHTML = `Color: ${RGBColor}`
    } else if (colorTypeElement.value === "HSL") {
      const HSLColor = hexToHsl(colorInput.value)
      color.innerHTML = `Color: ${HSLColor}`
    }
  })
})

function hexToRgb(hex) {
  hex = hex.replace("#", "")
  var r = parseInt(hex.substring(0, 2), 16)
  var g = parseInt(hex.substring(2, 4), 16)
  var b = parseInt(hex.substring(4, 6), 16)
  return "RGB(" + r + ", " + g + ", " + b + ")"
}

function hexToHsl(hex) {
  let r = 0,
    g = 0,
    b = 0
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1]
    g = "0x" + hex[2] + hex[2]
    b = "0x" + hex[3] + hex[3]
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2]
    g = "0x" + hex[3] + hex[4]
    b = "0x" + hex[5] + hex[6]
  }
  r /= 255
  g /= 255
  b /= 255
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  if (delta == 0) h = 0
  else if (cmax == r) h = ((g - b) / delta) % 6
  else if (cmax == g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = Math.round(+(s * 100))
  l = Math.round(+(l * 100))

  return "HSL(" + h + "," + s + "%," + l + "%)"
}
