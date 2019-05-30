let hexCodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
let colors = colorList(6);
let winner = winColor();
let rgbconvert = `rgb(${hexToRgb(winner).r}, ${hexToRgb(winner).g}, ${hexToRgb(winner).b})`;
let colorValue = document.getElementById("colorValue");
const squares = document.querySelectorAll(".sqr");
const header = document.querySelector("header");
const reset = document.getElementById("reset");
const easy = document.getElementById("easy");

//select random element from hexCodes
function randCode() {
  let rCode = Math.floor(Math.random() * hexCodes.length);
  return rCode;
}

//create a random color with 6 random hexCodes
function randColor() {
  let color = "#";
  for(let i = 0; i < 6; i++) {
    color += hexCodes[randCode()];
  }
  return color;
}

//create x amount of random #hex codes
function colorList(x) {
  let list = [];
  for(let i = 0; i < x; i++) {
    list.push(randColor());
  }
  return list;
}

//choose a random winning color from colors array
function winColor() {
  let choose = Math.floor(Math.random() * colors.length);
  return colors[choose];
}

//convert winning color to rgb
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

//display the winning color
colorValue.textContent = winner;

//game logic
for(let i = 0; i < squares.length; i++) {
  //set background of squares
  squares[i].style.backgroundColor = colors[i];

  //add event listeners to all squares
  squares[i].addEventListener("click", function() {
    const clickedColor = this.style.backgroundColor;
    if(clickedColor == rgbconvert) {
      chngbg(clickedColor);
      header.style.backgroundColor = clickedColor;
      colorValue.textContent = "You win!";
    } else {
      this.style.backgroundColor = "transparent";
      this.style.boxShadow = "none";
    }
  })
}

//change bg of sqrs to winning
function chngbg(winco) {
  for(let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = winco;
    squares[i].style.boxShadow = "-4px 4px 8px gray";
  }
}

//add the reset function to button
reset.addEventListener("click", function() {
  colors = colorList(6);
  winner = winColor();
  rgbconvert = `rgb(${hexToRgb(winner).r}, ${hexToRgb(winner).g}, ${hexToRgb(winner).b})`;
  colorValue.textContent = winner;
  for(let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.boxShadow = "-4px 4px 8px gray";
    squares[i].style.display = "block";
  }
  header.style.backgroundColor = "steelblue";
});

//add the easy button
easy.addEventListener("click", function() {
  colors = colorList(3);
  winner = winColor();
  rgbconvert = `rgb(${hexToRgb(winner).r}, ${hexToRgb(winner).g}, ${hexToRgb(winner).b})`;
  for(let i = 0; i < squares.length; i++) {
    colors[i] ? squares[i].style.backgroundColor = colors[i] : squares[i].style.display = "none";
  }
  colorValue.textContent = winner;
  header.style.backgroundColor = "steelblue";
});

