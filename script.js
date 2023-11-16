let inventory = [];

document
  .getElementById("itemForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("itemName").value;
    let quantity = document.getElementById("itemQuantity").value;
    let price = document.getElementById("itemPrice").value;
    let category = document.getElementById("itemCategory").value;

    let item = {
      name: name,
      quantity: quantity,
      price: price,
      category: category,
    };

    inventory.push(item);

    document.getElementById("itemName").value = "";
    document.getElementById("itemQuantity").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemCategory").value = "";

    updateTable();
    updateSummary();
  });

function updateTable() {
  let tableBody = document
    .getElementById("itemTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  inventory.forEach((item, index) => {
    let row = tableBody.insertRow();

    let nameCell = row.insertCell(0);
    let quantityCell = row.insertCell(1);
    let priceCell = row.insertCell(2);
    let categoryCell = row.insertCell(3);
    let actionCell = row.insertCell(4);

    nameCell.textContent = item.name;
    quantityCell.textContent = item.quantity;
    priceCell.textContent = item.price;
    categoryCell.textContent = item.category;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      inventory.splice(index, 1);
      updateTable();
      updateSummary();
    });

    actionCell.appendChild(deleteButton);
  });
}

function updateSummary() {
  let totalItems = inventory.length;
  let totalValue = inventory.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  let lowStockItems = inventory.filter((item) => item.quantity < 5).length;

  document
    .getElementById("filterName")
    .addEventListener("input", function (event) {
      let filterValue = event.target.value.toLowerCase();
      let filteredInventory = inventory.filter((item) =>
        item.name.toLowerCase().includes(filterValue)
      );
      updateTable(filteredInventory);
    });

  document
    .getElementById("filterCategory")
    .addEventListener("input", function (event) {
      let filterValue = event.target.value.toLowerCase();
      let filteredInventory = inventory.filter((item) =>
        item.category.toLowerCase().includes(filterValue)
      );
      updateTable(filteredInventory);
    });

  document
    .getElementById("filterPrice")
    .addEventListener("change", function (event) {
      let filterValue = event.target.value;
      let filteredInventory = inventory.filter(
        (item) => item.price > filterValue
      );
      updateTable(filteredInventory);
    });
}

document
  .getElementById("searchField")
  .addEventListener("input", function (event) {
    let searchValue = event.target.value.toLowerCase();

    let filteredInventory = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    updateTable(filteredInventory);
  });

document
  .getElementById("filterField")
  .addEventListener("change", function (event) {
    let filterValue = event.target.value;

    let filteredInventory = inventory.filter(
      (item) => item.category === filterValue
    );

    updateTable(filteredInventory);
  });

function updateTable(inventoryItems = inventory) {
  let tableContainer = document.getElementById("itemTable");
  tableContainer.innerHTML = "";

  inventoryItems.forEach((item, index) => {
    let itemDiv = document.createElement("div");
    itemDiv.className = "item";

    itemDiv.innerHTML = `
            <div><strong>Name:</strong> ${item.name}</div>
            <div><strong>Quantity:</strong> ${item.quantity}</div>
            <div><strong>Price:</strong> ${item.price}</div>
            <div><strong>Category:</strong> ${item.category}</div>
        `;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      inventory.splice(index, 1);
      updateTable();
      updateSummary();
    });

    itemDiv.appendChild(deleteButton);
    tableContainer.appendChild(itemDiv);
  });
}

function updateCategoryFilter() {
  let categories = [...new Set(inventory.map((item) => item.category))];
  let filterCategory = document.getElementById("filterCategory");
  filterCategory.innerHTML = '<option value="">All</option>';

  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterCategory.appendChild(option);
  });
}
