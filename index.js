//Get a reference to hexInput and inputColor DOM elements
//Create a keyup event handler for hexInput
//Check if hex color is valid
//If hex color is valid, update the background color of inputColor
const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const inputColorText = document.getElementById("inputColorText");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");

const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", () => {
  if (toggleButton.classList.contains("toggled")) {
    toggleButton.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else {
    toggleButton.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
  resetHandler();
});

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;

  if (!isValidHex(hex)) {
    return;
  }
  const strippedHex = hex.replace("#", "");
  inputColor.style.backgroundColor = "#" + strippedHex;
  inputColorText.innerText = `Original Color ${hex}`;

  resetHandler();
});

const isValidHex = (hex) => {
  if (!hex) return false;
  const validator = new RegExp(/^[0-9a-fA-F]+$/);
  const strippedHex = hex.replace("#", "");
  if (!validator.test(strippedHex)) return false;
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

//Create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value

const alterColor = (hex, percentage) => {
  const { r, g, b } = convertHexToRGB(hex);

  const amount = Math.floor((percentage / 100) * 255);
  const n_red = increaseWithin0To255(r, amount);
  const n_blue = increaseWithin0To255(b, amount);
  const n_green = increaseWithin0To255(g, amount);

  console.log(n_red, n_green, n_blue);
  const hexVal = convertRGBToHex(n_red, n_blue, n_green);
  console.log(hexVal);
  return hexVal;
};
const increaseWithin0To255 = (value, amount) => {
  return Math.max(0, Math.min(255, value + amount));
};

// alterColor('000',-10)
slider.addEventListener("input", () => {
  //check if the hex is valid
  if (!isValidHex(hexInput.value)) return;
  sliderText.textContent = `${slider.value} %`;

  //get the altered hex value;
  const input = hexInput.value;
  const percentage = toggleButton.classList.contains("toggled")
    ? -slider.value
    : slider.value;
  const alteredHexValue = alterColor(input, percentage);
  // update the value
  alteredColor.style.backgroundColor = alteredHexValue;
  alteredColorText.innerText = `Altered Color ${alteredHexValue}`;
});

const resetHandler = () => {
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`;
  sliderText.textContent = `0 %`;
  slider.value = 0;
};
