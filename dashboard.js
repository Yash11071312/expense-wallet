function updateDashboard() {
    if (balance) {
        balance.innerText = `₹${totalBalance}`;
    }

    if (totalIncome) {
        totalIncome.innerText = `₹${totalIncomes}`;
    }

    if (totalSpending) {
        totalSpending.innerText = `₹${totalSpendings}`;
    }
}
