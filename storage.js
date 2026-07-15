function loadTransactions() {
    return (JSON.parse(localStorage.getItem("transactions")) || []).map((item, index) => ({
        ...item,
        id: item.id || `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`
    }));
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(allTransactions));
}

function saveWalletState() {
    localStorage.setItem("balance", totalBalance);
    localStorage.setItem("totalIncome", totalIncomes);
    localStorage.setItem("totalSpending", totalSpendings);
}

function clearWalletStorage() {
    localStorage.removeItem("balance");
    localStorage.removeItem("transactions");
    localStorage.removeItem("totalIncome");
    localStorage.removeItem("totalSpending");
}
