document.title = "Unusual Calculator";

// Set foreground and background colors of textfields
function setColors() {
  var foregroundColor = document.getElementById("foregroundColorInput").value;
  var backgroundColor = document.getElementById("backgroundColorInput").value;

  var textfields = document.querySelectorAll("input[type='text']");
  textfields.forEach(function (textfield) {
    textfield.style.color = foregroundColor;
    textfield.style.backgroundColor = backgroundColor;
  });
}

// Launch button click event handler
document.getElementById("launchButton").addEventListener("click", function () {
  var argumentsInput = document.getElementById("argumentsInput").value;
  var operationSelect = document.getElementById("operationSelect").value;
  var numbers = argumentsInput.split(" ").map(Number);

  var result;
  if (operationSelect === "sum") {
    result = numbers.reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  } else if (operationSelect === "product") {
    result = numbers.reduce(function (acc, curr) {
      return acc * curr;
    }, 1);
  } else if (operationSelect === "maximum") {
    result = Math.max.apply(null, numbers);
  } else if (operationSelect === "minimum") {
    result = Math.min.apply(null, numbers);
  }

  document.getElementById("resultInput").value = result;
});

// Randomize button click event handler
document
  .getElementById("randomizeButton")
  .addEventListener("click", function () {
    var randomNumbers = Array.from({ length: 10 }, function () {
      return Math.floor(Math.random() * 10);
    });

    document.getElementById("argumentsInput").value = randomNumbers.join(" ");
  });

// Foreground and background color change event handlers
document
  .getElementById("foregroundColorInput")
  .addEventListener("input", setColors);
document
  .getElementById("backgroundColorInput")
  .addEventListener("input", setColors);

setColors(); // Set initial colors

// Function to download data as a file
function downloadData(filename, data) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(data)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Save button click event handler
document.getElementById("saveButton").addEventListener("click", function () {
  var argumentsInput = document.getElementById("argumentsInput").value;
  var operationSelect = document.getElementById("operationSelect").value;
  var resultInput = document.getElementById("resultInput").value;

  var filename = prompt("Enter a filename to save the data", "data.txt");
  if (filename) {
    var data = "Arguments: " + argumentsInput + "\n";
    data += "Operation: " + operationSelect + "\n";
    data += "Result: " + resultInput;

    downloadData(filename, data);
  }
});
