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
        saveWalletState();
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
    saveWalletState();
    addTransaction("expense", amount, reason, category);
    closeTransactionForm();
}

function ResetWallet() {
    if (confirm("Are you sure you want to reset your wallet?")) {
        clearWalletStorage();

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
