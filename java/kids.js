var colors = ['red', 'blue', 'green'];
var colorBox = document.getElementById('colorBox');

function setColor(color) {
    if (color === colorBox.style.backgroundColor) {
        alert('Correct!');
        setRandomColor();
    } else {
        alert('Try again!');
    }
}

function setRandomColor() {
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = randomColor;
}

setRandomColor();
