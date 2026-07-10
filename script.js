// DECLARATIONS----------------------------------
let totalBalance = Number(localStorage.getItem("balance")) || 0;
let totalSpendings = Number(localStorage.getItem("totalSpending")) || 0;
let totalIncomes = Number(localStorage.getItem("totalIncome")) || 0;

let balance = document.querySelector("#balance");
let totalIncome = document.querySelector("#totalIncome");
let totalSpending = document.querySelector("#totalSpending");
let landing = document.querySelector(".page1");
let reasonInput = document.querySelector("#reason");
let customReasonField = document.querySelector("#customReasonField");
let categoryPicker = document.querySelector("#categoryPicker");
let categoryTrigger = document.querySelector("#categoryTrigger");
let categoryTriggerText = document.querySelector("#categoryTriggerText");
let categoryMenu = document.querySelector("#categoryMenu");
let transactionForm = document.querySelector("#transactionForm");
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
let selectedCategory = "";
let categoryMenuOpen = false;
let transaction = "None";
let transactionfirst = 0;

const CATEGORY_OPTIONS = {
    expense: [
        { value: "Food", label: "Food", icon: "🍔" },
        { value: "Shopping", label: "Shopping", icon: "🛍" },
        { value: "Transport", label: "Transport", icon: "🚗" },
        { value: "Bills", label: "Bills", icon: "💡" },
        { value: "Entertainment", label: "Entertainment", icon: "🎮" },
        { value: "Health", label: "Health", icon: "❤️" },
        { value: "Education", label: "Education", icon: "📚" },
        { value: "Other", label: "Other", icon: "📦" }
    ],
    income: [
        { value: "Salary", label: "Salary", icon: "💼" },
        { value: "Freelance", label: "Freelance", icon: "💻" },
        { value: "Gift", label: "Gift", icon: "🎁" },
        { value: "Investment", label: "Investment", icon: "📈" },
        { value: "Refund", label: "Refund", icon: "💸" },
        { value: "Other", label: "Other", icon: "📦" }
    ]
};

function getTransactionType() {
    return tiger === 1 ? "income" : "expense";
}

function getCategoryOptions(type) {
    return CATEGORY_OPTIONS[type] || CATEGORY_OPTIONS.expense;
}

function getActiveCategoryOptions() {
    return getCategoryOptions(getTransactionType());
}

function getSelectedCategoryOption() {
    return getActiveCategoryOptions().find((option) => option.value === selectedCategory) || null;
}

function getCategoryLabel(type, category) {
    const options = getCategoryOptions(type);
    const match = options.find((option) => option.value === category);
    return match ? match.label : "Other";
}

function getCategoryBadgeClass(type, category) {
    const normalized = String(category || "Other").toLowerCase();
    return `category-badge ${type} category-${normalized}`;
}

function renderCategoryMenu() {
    if (!categoryMenu) {
        return;
    }

    const options = getActiveCategoryOptions();
    categoryMenu.innerHTML = options.map((option, index) => {
        const isSelected = option.value === selectedCategory;

        return `
            <button
                type="button"
                class="category-option${isSelected ? " selected" : ""}"
                role="option"
                aria-selected="${isSelected}"
                data-category-value="${option.value}"
                data-category-index="${index}"
            >
                <span class="category-option__icon">${option.icon}</span>
                <span class="category-option__label">${option.label}</span>
            </button>
        `;
    }).join("");
}

function syncCategoryTrigger() {
    if (!categoryTriggerText || !categoryTrigger) {
        return;
    }

    const selectedOption = getSelectedCategoryOption();

    if (selectedOption) {
        categoryTriggerText.innerHTML = `
            <span class="category-trigger__emoji">${selectedOption.icon}</span>
            <span>${selectedOption.label}</span>
        `;
        categoryTrigger.classList.add("has-value");
    } else {
        categoryTriggerText.textContent = "Select category";
        categoryTrigger.classList.remove("has-value");
    }
}

function updateCustomReasonVisibility() {
    if (!customReasonField) {
        return;
    }

    const showCustomReason = selectedCategory === "Other";
    customReasonField.classList.toggle("visible", showCustomReason);

    if (!showCustomReason && reasonInput) {
        reasonInput.value = "";
    }
}

function closeCategoryMenu() {
    if (!categoryPicker || !categoryTrigger) {
        return;
    }

    categoryPicker.classList.remove("open");
    categoryTrigger.setAttribute("aria-expanded", "false");
    categoryMenuOpen = false;
}

function openCategoryMenu() {
    if (!categoryPicker || !categoryTrigger || !categoryMenu) {
        return;
    }

    renderCategoryMenu();
    categoryPicker.classList.add("open");
    categoryTrigger.setAttribute("aria-expanded", "true");
    categoryMenuOpen = true;

    const selectedButton = categoryMenu.querySelector(".category-option.selected");
    const firstButton = categoryMenu.querySelector(".category-option");
    (selectedButton || firstButton)?.focus();
}

function toggleCategoryMenu() {
    if (categoryMenuOpen) {
        closeCategoryMenu();
        return;
    }

    openCategoryMenu();
}

function setSelectedCategory(value, options = {}) {
    const { closeMenu = true } = options;
    selectedCategory = value || "";
    renderCategoryMenu();
    syncCategoryTrigger();
    updateCustomReasonVisibility();

    if (selectedCategory !== "Other" && reasonInput) {
        reasonInput.value = "";
    }

    if (closeMenu) {
        closeCategoryMenu();
        categoryTrigger?.focus();
    }
}

updateDashboard();
renderCategoryMenu();
syncCategoryTrigger();
updateCustomReasonVisibility();
renderTransactions(getFilteredTransactions());

if (transactionSearch) {
    transactionSearch.addEventListener("input", (event) => {
        transactionSearchTerm = event.target.value.toLowerCase().trim();
        renderTransactions(getFilteredTransactions());
    });
}

if (categoryTrigger) {
    categoryTrigger.addEventListener("click", () => {
        toggleCategoryMenu();
    });

    categoryTrigger.addEventListener("keydown", (event) => {
        const openKeys = ["Enter", " ", "ArrowDown", "ArrowUp"];

        if (!openKeys.includes(event.key)) {
            return;
        }

        event.preventDefault();

        if (!categoryMenuOpen) {
            openCategoryMenu();
        }

        const buttons = Array.from(categoryMenu?.querySelectorAll(".category-option") || []);
        if (!buttons.length) {
            return;
        }

        if (event.key === "ArrowUp") {
            buttons[buttons.length - 1].focus();
        } else {
            buttons[0].focus();
        }
    });
}

if (categoryMenu) {
    categoryMenu.addEventListener("click", (event) => {
        const button = event.target.closest("[data-category-value]");
        if (!button) {
            return;
        }

        setSelectedCategory(button.dataset.categoryValue || "");
    });

    categoryMenu.addEventListener("keydown", (event) => {
        const buttons = Array.from(categoryMenu.querySelectorAll(".category-option"));
        const currentIndex = buttons.indexOf(document.activeElement);

        if (!buttons.length || currentIndex === -1) {
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            buttons[(currentIndex + 1) % buttons.length].focus();
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            buttons[(currentIndex - 1 + buttons.length) % buttons.length].focus();
            return;
        }

        if (event.key === "Home") {
            event.preventDefault();
            buttons[0].focus();
            return;
        }

        if (event.key === "End") {
            event.preventDefault();
            buttons[buttons.length - 1].focus();
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            buttons[currentIndex].click();
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            closeCategoryMenu();
            categoryTrigger?.focus();
        }
    });
}

document.addEventListener("pointerdown", (event) => {
    if (!categoryPicker || categoryPicker.contains(event.target)) {
        return;
    }

    closeCategoryMenu();
});

if (transactionForm) {
    transactionForm.addEventListener("submit", Addbtn);
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
        const category = String(item.category || "").toLowerCase();
        const amount = String(item.amount || "");
        const date = String(item.date || "").toLowerCase();

        return (
            reason.includes(transactionSearchTerm) ||
            type.includes(transactionSearchTerm) ||
            category.includes(transactionSearchTerm) ||
            amount.includes(transactionSearchTerm) ||
            date.includes(transactionSearchTerm)
        );
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
    const categoryLabel = getCategoryLabel(item.type, item.category);

    return `
        <div class="transaction" data-id="${item.id}">
            <div class="transaction-main">
                <h4>${isIncome ? "💰" : "🛒"} ${item.reason}</h4>
                <small>${item.date}</small>
                <span class="${getCategoryBadgeClass(item.type, categoryLabel)}">Category: ${categoryLabel}</span>
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
                   <span style="font-size:xx-large;">
-
</span>
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
function openTransactionForm(type) {
    AddIncomeBox.classList.remove("none");
    tiger = type === "income" ? 1 : 0;
    amountInput.value = "";
    reasonInput.value = "";
    selectedCategory = "";
    closeCategoryMenu();
    renderCategoryMenu();
    syncCategoryTrigger();
    updateCustomReasonVisibility();
    amountInput.focus();
}

function AddIncome() {
    openTransactionForm("income");
}

function Expensededuct() {
    openTransactionForm("expense");
}

function addTransaction(type, amount, reason, category) {
    const date = new Date().toLocaleDateString();
    const transactionItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type,
        amount,
        reason,
        category,
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

    const category = selectedCategory || "Other";
    let reason = category === "Other" ? reasonInput.value.trim() : category;

    if (tiger === 1) {
        totalBalance += amount;
        totalIncomes += amount;

        if (reason === "") {
            reason = "Other";
        }

        updateDashboard();
        localStorage.setItem("balance", totalBalance);
        localStorage.setItem("totalIncome", totalIncomes);
        addTransaction("income", amount, reason, category);
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
        reason = "Other";
    }

    updateDashboard();
    localStorage.setItem("balance", totalBalance);
    localStorage.setItem("totalSpending", totalSpendings);
    addTransaction("expense", amount, reason, category);
    closeTransactionForm();
}

function closeTransactionForm() {
    amountInput.value = "";
    reasonInput.value = "";
    selectedCategory = "";
    renderCategoryMenu();
    syncCategoryTrigger();
    closeCategoryMenu();
    updateCustomReasonVisibility();
    AddIncomeBox.classList.add("none");
}

function CancelBtn() {
    closeTransactionForm();
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
