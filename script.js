// DECLARATIONS----------------------------------
let totalBalance = Number(localStorage.getItem("balance")) || 0;
let totalSpendings = Number(localStorage.getItem("totalSpending")) || 0;
let totalIncomes = Number(localStorage.getItem("totalIncome")) || 0;

let balance = document.querySelector("#balance");
let totalIncome = document.querySelector("#totalIncome");
let totalSpending = document.querySelector("#totalSpending");
let landing = document.querySelector(".page1");
let reasonInput = document.querySelector("#reason");
let main = document.querySelector(".page2");
let about = document.querySelector(".about");
let features = document.querySelector(".features");
let line1 = document.querySelector(".line1");
let line2 = document.querySelector(".line2");
let line3 = document.querySelector(".line3");
let home = document.querySelector("#home");
let AddIncomeBox = document.querySelector(".AddIncomeBox");
let amountInput = document.querySelector("#AmountIp");
let transactions = document.querySelector("#transactions");
let transactionSearch = document.querySelector("#transactionSearch");
let transactionSearchTerm = "";
let allTransactions = loadTransactions();
let tiger = 0;
let transaction = "None";
let transactionfirst = 0;

updateDashboard();
renderTransactions(getFilteredTransactions());

if (transactionSearch) {
    transactionSearch.addEventListener("input", (event) => {
        transactionSearchTerm = event.target.value.toLowerCase().trim();
        renderTransactions(getFilteredTransactions());
    });
}

function loadTransactions() {
    return (JSON.parse(localStorage.getItem("transactions")) || []).map((item, index) => ({
        ...item,
        id: item.id || `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`
    }));
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(allTransactions));
}

function updateDashboard() {
    balance.innerText = `₹${totalBalance}`;
    totalIncome.innerText = `₹${totalIncomes}`;
    totalSpending.innerText = `₹${totalSpendings}`;
}

function getFilteredTransactions() {
    if (!transactionSearchTerm) {
        return allTransactions;
    }

    return allTransactions.filter((item) => {
        const reason = String(item.reason || "").toLowerCase();
        const type = String(item.type || "").toLowerCase();
        return reason.includes(transactionSearchTerm) || type.includes(transactionSearchTerm);
    });
}

function renderTransactions(transactionArray) {
    if (!transactionArray.length) {
        transactions.innerHTML = transactionSearchTerm
            ? "<p>No matching transactions found.</p>"
            : "<p>No transactions yet. Start by adding your first transaction.</p>";
        return;
    }

    transactions.innerHTML = transactionArray.map((item) => createTransactionCard(item)).join("");
}

function createTransactionCard(item) {
    const isIncome = item.type === "income";

    return `
        <div class="transaction" data-id="${item.id}">
            <div class="transaction-main">
                <h4>${isIncome ? "💰" : "🛒"} ${item.reason}</h4>
                <small>${item.date}</small>
            </div>

            <div class="transaction-actions">
                <span class="transaction-amount ${isIncome ? "income" : "expense"}">
                    ${isIncome ? "+" : "-"} ₹${item.amount}
                </span>
                <button
                    type="button"
                    class="transaction-delete"
                    aria-label="Delete transaction"
                    data-delete-id="${item.id}"
                    title="Delete transaction"
                >
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>`;
}

function hideAllPages() {
    landing.classList.add("hidden");
    main.classList.add("hidden");
    about.classList.add("hidden");
    features.classList.add("hidden");
}

function HomePage() {
    hideAllPages();
    main.classList.remove("hidden");

    RemoveClasslistClicked(document.querySelector("#features"));
    RemoveClasslistClicked(document.querySelector("#about"));
    AddClasslist(home);

    AddClasslistHidden(line2);
    AddClasslistHidden(line3);
    RemoveClasslistHidden(line1);
}

function landingPage() {
    hideAllPages();
    landing.classList.remove("hidden");
}

function featuresPage() {
    hideAllPages();
    features.classList.remove("hidden");

    RemoveClasslistClicked(home);
    RemoveClasslistClicked(document.querySelector("#about"));
    AddClasslist(document.querySelector("#features"));

    AddClasslistHidden(line1);
    AddClasslistHidden(line3);
    RemoveClasslistHidden(line2);
}

function aboutPage() {
    hideAllPages();
    about.classList.remove("hidden");

    RemoveClasslistClicked(home);
    RemoveClasslistClicked(document.querySelector("#features"));
    AddClasslist(document.querySelector("#about"));

    AddClasslistHidden(line1);
    AddClasslistHidden(line2);
    RemoveClasslistHidden(line3);
}

function AddClasslist(name) {
    name.classList.add("clicked");
}

function AddClasslistHidden(name) {
    name.classList.add("hidden");
}

function RemoveClasslistHidden(name) {
    name.classList.remove("hidden");
}

function RemoveClasslistClicked(name) {
    name.classList.remove("clicked");
}

// BUTTONS---------------------
document.getElementById("getsrt").addEventListener("click", () => {
    landing.classList.add("hidden");
    main.classList.remove("hidden");
});

document.getElementById("getsrt1").addEventListener("click", () => {
    landing.classList.add("hidden");
    main.classList.remove("hidden");
});

document.querySelector("#home").addEventListener("click", (e) => {
    e.preventDefault();
    HomePage();
});

document.querySelector("#features").addEventListener("click", (e) => {
    e.preventDefault();
    featuresPage();
});

document.querySelector("#about").addEventListener("click", (e) => {
    e.preventDefault();
    aboutPage();
});

// MAIN PAGE -------------
function AddIncome() {
    AddIncomeBox.classList.remove("none");
    tiger = 1;
    amountInput.value = "";
    reasonInput.value = "";
    amountInput.focus();
}

function addTransaction(type, amount, reason) {
    const date = new Date().toLocaleDateString();
    const transactionItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type,
        amount,
        reason,
        date
    };

    allTransactions.push(transactionItem);
    saveTransactions();
    renderTransactions(getFilteredTransactions());
}

function Addbtn(e) {
    e.preventDefault();

    const amount = Number(amountInput.value);
    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    let reason = reasonInput.value.trim();

    if (tiger === 1) {
        totalBalance += amount;
        totalIncomes += amount;

        if (reason === "") {
            reason = "Income";
        }

        updateDashboard();
        localStorage.setItem("balance", totalBalance);
        localStorage.setItem("totalIncome", totalIncomes);
        addTransaction("income", amount, reason);
        closeTransactionForm();
        return;
    }

    if (amount > totalBalance) {
        alert("Expense is greater than your wallet balance.");
        return;
    }

    totalBalance -= amount;
    totalSpendings += amount;

    if (reason === "") {
        reason = "Expense";
    }

    updateDashboard();
    localStorage.setItem("balance", totalBalance);
    localStorage.setItem("totalSpending", totalSpendings);
    addTransaction("expense", amount, reason);
    closeTransactionForm();
}

function closeTransactionForm() {
    amountInput.value = "";
    reasonInput.value = "";
    AddIncomeBox.classList.add("none");
}

function CancelBtn() {
    closeTransactionForm();
}

function Expensededuct() {
    AddIncomeBox.classList.remove("none");
    tiger = 0;
    amountInput.value = "";
    reasonInput.value = "";
    amountInput.focus();
}

function deleteTransaction(id) {
    const transactionIndex = allTransactions.findIndex((item) => item.id === id);

    if (transactionIndex === -1) {
        return;
    }

    const transactionItem = allTransactions[transactionIndex];
    const confirmed = confirm("Are you sure you want to delete this transaction?");

    if (!confirmed) {
        return;
    }

    if (transactionItem.type === "income") {
        totalIncomes -= Number(transactionItem.amount) || 0;
        totalBalance -= Number(transactionItem.amount) || 0;
    } else {
        totalSpendings -= Number(transactionItem.amount) || 0;
        totalBalance += Number(transactionItem.amount) || 0;
    }

    totalBalance = Math.max(0, totalBalance);
    totalIncomes = Math.max(0, totalIncomes);
    totalSpendings = Math.max(0, totalSpendings);

    allTransactions.splice(transactionIndex, 1);
    localStorage.setItem("balance", totalBalance);
    localStorage.setItem("totalIncome", totalIncomes);
    localStorage.setItem("totalSpending", totalSpendings);
    saveTransactions();
    updateDashboard();
    renderTransactions(getFilteredTransactions());
}

function ResetWallet() {
    if (confirm("Are you sure you want to reset your wallet?")) {
        localStorage.removeItem("balance");
        localStorage.removeItem("transactions");
        localStorage.removeItem("totalIncome");
        localStorage.removeItem("totalSpending");

        totalBalance = 0;
        totalIncomes = 0;
        totalSpendings = 0;
        allTransactions = [];
        transactionSearchTerm = "";

        if (transactionSearch) {
            transactionSearch.value = "";
        }

        updateDashboard();
        renderTransactions(allTransactions);
    }
}

transactions.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-id]");
    if (!deleteButton) {
        return;
    }

    deleteTransaction(deleteButton.dataset.deleteId);
});
