// Declaramos constantes
const value = document.querySelector("#matrix_value_range");
const input = document.querySelector("#matrix_input");
const matrixForm = document.getElementById("matrix_form");
const randomizeButton = document.querySelector("#randomize_button");
const resetButton = document.querySelector("#reset_button");

// Función para imprimir el tamaño de la matriz
function printSizeMatrix(size) {
  return `Tamaño de la matriz: ${size}x${size}`;
}

// Función para generar la matriz
function generateMatrix(size) {
  matrixForm.innerHTML = "";
  const table = document.createElement("table");
  const matrixData = [];

  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    matrixData[i] = [];

    for (let j = 0; j < size; j++) {
      const cell = document.createElement("td");
      const inputCell = document.createElement("input");

      inputCell.type = "number";
      inputCell.setAttribute("data-row", i);
      inputCell.setAttribute("data-col", j);

      if (i === j) {
        inputCell.value = 0;
        inputCell.disabled = true;
      } else if (j < i) {
        inputCell.disabled = true;
      } else {
        inputCell.addEventListener("input", () => {
          updateCorrespondingCell(inputCell);
          updateMatrixData(matrixData);
          sendMatrixDebounced(matrixData); // Llamada con debounce
        });
      }

      cell.appendChild(inputCell);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  matrixForm.appendChild(table);
  sendMatrix(matrixData);
}

// Función para copiar valores
function updateCorrespondingCell(inputCell) {
  if (parseFloat(inputCell.value) < 0) {
    inputCell.value = "";
  } else {
    const row = parseInt(inputCell.getAttribute("data-row"));
    const col = parseInt(inputCell.getAttribute("data-col"));
    const correspondingCell = matrixForm.querySelector(
      `input[data-row="${col}"][data-col="${row}"]`
    );
    if (correspondingCell) {
      correspondingCell.value = inputCell.value;
    }
  }
}

function updateMatrixData(matrixData) {
  const inputs = matrixForm.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    const row = parseInt(input.getAttribute("data-row"));
    const col = parseInt(input.getAttribute("data-col"));
    if (!matrixData[row]) {
      matrixData[row] = [];
    }
    matrixData[row][col] = input.value ? parseInt(input.value) : null; // Maneja el caso de inputs vacíos
  });
}

// Función para enviar la matriz
function sendMatrix(matrixData) {
  fetch("/matrix", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matrix: matrixData }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Matriz exportada:", data);
    })
    .catch((error) => {
      console.error("Error al exportar la matriz:", error);
    });
}

// Función de debounce
let debounceTimer;
function sendMatrixDebounced(matrixData) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    sendMatrix(matrixData);
  }, 300); // Espera 300 ms antes de enviar
}

function randomizeValues() {
  const inputs = matrixForm.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    if (!input.disabled && input.value === "") {
      const randomValue = Math.floor(Math.random() * 100);
      input.value = randomValue;
      updateCorrespondingCell(input);
    }
  });
  const matrixData = [];
  updateMatrixData(matrixData);
  sendMatrixDebounced(matrixData); // Llamada con debounce
}

function updateMatrix() {
  const size = parseInt(input.value);
  value.textContent = printSizeMatrix(size);
  generateMatrix(size);
}

function resetMatrix() {
  const inputs = matrixForm.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    const row = parseInt(input.getAttribute("data-row"));
    const col = parseInt(input.getAttribute("data-col"));
    if (row !== col) {
      input.value = "";
    }
  });
  const matrixData = [];
  updateMatrixData(matrixData);
  sendMatrixDebounced(matrixData); // Llamada con debounce
}



input.addEventListener("input", updateMatrix);
randomizeButton.addEventListener("click", randomizeValues);
resetButton.addEventListener("click", resetMatrix);

updateMatrix();
