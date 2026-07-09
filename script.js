// DECLARATIONS----------------------------------
let totalBalance = Number(localStorage.getItem("balance")) || 0;
let totalSpendings = Number(localStorage.getItem("totalSpending")) || 0;
let totalIncomes = Number(localStorage.getItem("totalIncome")) || 0;

let balance = document.querySelector("#balance");
let totalIncome = document.querySelector("#totalIncome");
let totalSpending = document.querySelector("#totalSpending");

balance.innerText = `₹${totalBalance}`;
totalIncome.innerText = `₹${totalIncomes}`;
totalSpending.innerText = `₹${totalSpendings}`;

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
let allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
let tiger = 0;
let transaction = "None";
let transactionfirst = 0;
let transactionSearchTerm = "";

renderTransactions(allTransactions);

if (transactionSearch) {
    transactionSearch.addEventListener("input", (event) => {
        transactionSearchTerm = event.target.value.toLowerCase().trim();
        renderTransactions(getFilteredTransactions());
    });
}

// HIDE PAGE FUNCTION
function hideAllPages() {
    landing.classList.add("hidden");
    main.classList.add("hidden");
    about.classList.add("hidden");
    features.classList.add("hidden");
}

// NAVIGATE PAGES
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

// MAIN PAGE
function AddIncome() {
    AddIncomeBox.classList.remove("none");
    tiger = 1;
    amountInput.value = "";
    reasonInput.value = "";
    amountInput.focus();
}

function Addbtn(e) {
    e.preventDefault();

    let amount = Number(amountInput.value);
    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    let reason = reasonInput.value.trim();

    if (tiger === 1) {
        totalBalance += amount;
        totalIncomes += amount;

        balance.innerText = `₹${totalBalance}`;
        totalIncome.innerText = `₹${totalIncomes}`;

        localStorage.setItem("balance", totalBalance);
        localStorage.setItem("totalIncome", totalIncomes);

        if (reason === "") {
            reason = "Income";
        }

        allTransactions.push({
            type: "income",
            amount: amount,
            reason: reason,
            date: new Date().toLocaleDateString()
        });

        localStorage.setItem("transactions", JSON.stringify(allTransactions));
        renderTransactions(getFilteredTransactions());

        amountInput.value = "";
        reasonInput.value = "";
        AddIncomeBox.classList.add("none");
    } else {
        if (amount <= totalBalance) {
            totalBalance -= amount;
            totalSpendings += amount;

            balance.innerText = `₹${totalBalance}`;
            totalSpending.innerText = `₹${totalSpendings}`;

            localStorage.setItem("balance", totalBalance);
            localStorage.setItem("totalSpending", totalSpendings);

            if (reason === "") {
                reason = "Expense";
            }

            allTransactions.push({
                type: "expense",
                amount: amount,
                reason: reason,
                date: new Date().toLocaleDateString()
            });

            localStorage.setItem("transactions", JSON.stringify(allTransactions));
            renderTransactions(getFilteredTransactions());

            amountInput.value = "";
            reasonInput.value = "";
            AddIncomeBox.classList.add("none");
        } else {
            alert("Expense is greater than your wallet balance.");
        }
    }
}

function CancelBtn() {
    AddIncomeBox.classList.add("none");
    amountInput.value = "";
    reasonInput.value = "";
}

function Expensededuct() {
    AddIncomeBox.classList.remove("none");
    tiger = 0;
    amountInput.value = "";
    reasonInput.value = "";
    amountInput.focus();
}

function transactionsftn() {
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

        balance.innerText = "₹0";
        totalIncome.innerText = "₹0";
        totalSpending.innerText = "₹0";

        renderTransactions(allTransactions);
    }
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
            : "<p>No transactions yet.</p>";
        return;
    }

    transactions.innerHTML = transactionArray.map((item) => createTransactionCard(item)).join("");
}

function createTransactionCard(item) {
    if (item.type === "income") {
        return `
        <div class="transaction">
            <div>
                <h4>💰 ${item.reason}</h4>
                <small>${item.date}</small>
            </div>
            <span>+ ₹${item.amount}</span>
        </div>`;
    }

    return `
    <div class="transaction">
        <div>
            <h4>🛒 ${item.reason}</h4>
            <small>${item.date}</small>
        </div>
        <span>- ₹${item.amount}</span>
    </div>`;
}
