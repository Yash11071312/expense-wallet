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

function renderTransactions(transactionArray) {
    if (!transactions) {
        return;
    }

    if (!transactionArray.length) {
        transactions.innerHTML = transactionSearchTerm
            ? "<p>No matching transactions found.</p>"
            : "<p>No transactions yet. Start by adding your first transaction.</p>";
        return;
    }

    transactions.innerHTML = transactionArray.map((item) => createTransactionCard(item)).join("");
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
    saveWalletState();
    saveTransactions();
    updateDashboard();
    renderTransactions(getFilteredTransactions());
}
