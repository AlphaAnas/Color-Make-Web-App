//Get a reference to hexInput and inputColor DOM elements
//Create a keyup event handler for hexInput
//Check if hex color is valid
//If hex color is valid, update the background color of inputColor
const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;

  if (!isValidHex(hex)) {
    return;
  }
  const strippedHex = hex.replace("#", "");
  inputColor.style.backgroundColor = "#" + strippedHex;
});

const isValidHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
};

//convert HEX value to RGB

const convertHexToRGB = (hex) => {
  if (!isValidHex(hex)) return null;

  let strippedHex = hex.replace("#", "");

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

// console.log(convertToRGB("ffe"));
const convertRGBToHex = (r, g, b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  const hexVal = "#" + firstPair + secondPair + thirdPair;
  return hexVal;
};

// console.log(convertRGBToHex(0, 255, 255));

//get a reference to the slider and sliderText DOM elements
//create an input event listener for slider element
//display the value of the slider

const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");

slider.addEventListener("input", () => {
  sliderText.textContent = `${slider.value} %`;
});

//Create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value

const alterColor = (hex, percentage) => {
  const { r, g, b } = convertHexToRGB(hex);

  const amount = Math.floor((percentage / 100) * 255);
  const n_red = r + amount;
  const n_blue = b + amount;
  const n_green = g + amount;

  console.log(n_red, n_green, n_blue);
  const hexVal = convertRGBToHex(n_red, n_blue, n_green);
  console.log(hexVal);
  return hexVal;
  

};

// alterColor('ccc',10)
