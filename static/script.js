const value = document.querySelector("#matrix_value_range");
const input = document.querySelector("#matrix_input");
const matrixForm = document.getElementById("matrix_form");

function print_size_matrix(size) {
  return "Tamaño de la matriz: " + size + "x" + size;
}

function generate_matrix(size) {
  matrixForm.innerHTML = "";
  const table = document.createElement("table");

  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("td");
      const inputCell = document.createElement("input");

      inputCell.type = "number";

      if (i === j) {
        inputCell.value = "0";
        inputCell.disabled = true;
      } else {
        //inputCell.placeholder = `(${i + 1}, ${j + 1})`;

        if (j < i) {
          inputCell.disabled = true;
        }

        inputCell.addEventListener("input", () => {
          if (parseFloat(inputCell.value) < 0) {
            inputCell.value = "";
          }

          if (j > i) {
            const correspondingCell = matrixForm.querySelector(
              `input[data-row="${j}"][data-col="${i}"]`
            );
            if (correspondingCell) {
              correspondingCell.value = inputCell.value;
            }
          }
        });
      }

      inputCell.setAttribute("data-row", i);
      inputCell.setAttribute("data-col", j);

      cell.appendChild(inputCell);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  matrixForm.appendChild(table);
}

function randomizeValues() {
  const inputs = matrixForm.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    if (!input.disabled && input.value === "") {
      const randomValue = Math.floor(Math.random() * 100); 
      input.value = randomValue;
    }
  });
}

value.textContent = print_size_matrix(input.value);
generate_matrix(input.value);

input.addEventListener("input", (event) => {
  const size = event.target.value;
  value.textContent = print_size_matrix(size);
  generate_matrix(size);
});

randomizeButton.addEventListener("click", randomizeValues);