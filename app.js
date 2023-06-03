let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const dueDate = document.getElementById("date-due");
const paymentDate = document.getElementById("payment-date");
const category = document.getElementById("Category");
const productTitle = document.getElementById("product-title");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;
let expenses = [];

totalAmountButton.addEventListener("click", function () {
  tempAmount = totalAmount.value;
  if (tempAmount === "" || tempAmount < 0) {
    alert("Amount should not be empty or negative.");
  } else {
    amount.innerHTML = tempAmount;
    updateExpenseValues();
    totalAmount.value = "";
  }
});

checkAmountButton.addEventListener("click", function () {
  if (dueDate.value === "" || userAmount.value === "" || productTitle.value === "" || paymentDate.value === "") {
    alert("Please fill in all the required fields.");
    return;
  }

  const expense = {
    dueDate: dueDate.value,
    amount: userAmount.value,
    category: category.value,
    title: productTitle.value,
    paymentDate: paymentDate.value,
  };

  expenses.push(expense);
  updateExpenseValues();
  
  dueDate.value = "";
  userAmount.value = "";
  category.value = "";
  productTitle.value = "";
  paymentDate.value = "";

  displayExpenses();
});

function displayExpenses() {
  list.innerHTML = "";

  expenses.forEach(function (expense) {
    const item = document.createElement("div");
    item.classList.add("list-item");

    const dueDateElement = document.createElement("span");
    dueDateElement.textContent = expense.dueDate;
    item.appendChild(dueDateElement);

    const amountElement = document.createElement("span");
    amountElement.textContent = expense.amount;
    item.appendChild(amountElement);

    const categoryElement = document.createElement("span");
    categoryElement.textContent = expense.category;
    item.appendChild(categoryElement);

    const titleElement = document.createElement("span");
    titleElement.textContent = expense.title;
    item.appendChild(titleElement);

    const paymentDateElement = document.createElement("span");
    paymentDateElement.textContent = expense.paymentDate;
    item.appendChild(paymentDateElement);

    const updateButton = document.createElement("button");
    updateButton.classList.add("update-button");
    updateButton.textContent = "Update";
    item.appendChild(updateButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    item.appendChild(deleteButton);

    list.appendChild(item);

    updateButton.addEventListener("click", function () {
      const index = expenses.indexOf(expense);
      if (index > -1) {
        expenses.splice(index, 1);
      }
      displayExpenses();
      updateExpenseValues();

      dueDate.value = expense.dueDate;
      userAmount.value = expense.amount;
      category.value = expense.category;
      productTitle.value = expense.title;
      paymentDate.value = expense.paymentDate;
    });

    deleteButton.addEventListener("click", function () {
      const index = expenses.indexOf(expense);
      if (index > -1) {
        expenses.splice(index, 1);
      }
      displayExpenses();
      updateExpenseValues();
    });
  });
}

let expenseValue = 0;
function updateExpenseValues() {
expenseValue = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
expenditureValue.innerText = expenseValue.toFixed(2);
balanceValue.innerText = (amount.textContent - expenseValue).toFixed(2);
}