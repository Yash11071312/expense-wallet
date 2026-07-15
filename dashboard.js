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

    renderAnalytics();
}

function getTransactionDateValue(item) {
    const parsedDate = new Date(item.date);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function isCurrentMonthTransaction(item) {
    const parsedDate = getTransactionDateValue(item);
    if (!parsedDate) {
        return false;
    }

    const now = new Date();
    return (
        parsedDate.getFullYear() === now.getFullYear() &&
        parsedDate.getMonth() === now.getMonth()
    );
}

function renderMetricValue(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
}

function renderAnalytics() {
    const analyticsRoot = document.querySelector("#analyticsRoot");
    if (!analyticsRoot) {
        return;
    }

    const currentMonthTransactions = allTransactions.filter(isCurrentMonthTransaction);
    const monthlyIncome = currentMonthTransactions
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const monthlyExpenses = currentMonthTransactions
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const savingsAmount = monthlyIncome - monthlyExpenses;
    const savingsPercentage = monthlyIncome > 0 ? Math.max(0, Math.round((savingsAmount / monthlyIncome) * 100)) : 0;

    const expenseByCategory = currentMonthTransactions
        .filter((item) => item.type === "expense")
        .reduce((accumulator, item) => {
            const category = item.category || "Other";
            accumulator[category] = (accumulator[category] || 0) + (Number(item.amount) || 0);
            return accumulator;
        }, {});

    const categoryEntries = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1]);
    const highestCategory = categoryEntries[0] || null;
    const biggestExpense = currentMonthTransactions
        .filter((item) => item.type === "expense")
        .reduce((maxItem, item) => {
            if (!maxItem || (Number(item.amount) || 0) > (Number(maxItem.amount) || 0)) {
                return item;
            }
            return maxItem;
        }, null);
    const biggestIncome = currentMonthTransactions
        .filter((item) => item.type === "income")
        .reduce((maxItem, item) => {
            if (!maxItem || (Number(item.amount) || 0) > (Number(maxItem.amount) || 0)) {
                return item;
            }
            return maxItem;
        }, null);

    renderMetricValue("#monthlyExpenses", `₹${monthlyExpenses}`);
    renderMetricValue("#monthlyIncome", `₹${monthlyIncome}`);
    renderMetricValue("#savingsAmount", `₹${savingsAmount}`);
    renderMetricValue("#savingsPercentage", `${savingsPercentage}%`);
    renderMetricValue("#transactionCount", String(currentMonthTransactions.length));
    renderMetricValue("#biggestExpense", biggestExpense ? `₹${biggestExpense.amount}` : "₹0");
    renderMetricValue("#biggestIncome", biggestIncome ? `₹${biggestIncome.amount}` : "₹0");
    renderMetricValue("#highestCategory", highestCategory ? highestCategory[0] : "None");

    const categoryList = document.querySelector("#categoryAnalyticsList");
    if (categoryList) {
        if (!categoryEntries.length) {
            categoryList.innerHTML = '<p class="analytics-empty">No expense data yet for this month.</p>';
        } else {
            const maxCategoryAmount = categoryEntries[0][1];
            categoryList.innerHTML = categoryEntries.map(([category, amount]) => {
                const share = monthlyExpenses > 0 ? Math.round((amount / monthlyExpenses) * 100) : 0;
                const width = maxCategoryAmount > 0 ? Math.max(6, Math.round((amount / maxCategoryAmount) * 100)) : 0;

                return `
                    <div class="analytics-category-item">
                        <div class="analytics-category-row">
                            <span class="analytics-category-name">${category}</span>
                            <span class="analytics-category-value">₹${amount} · ${share}%</span>
                        </div>
                        <div class="analytics-progress">
                            <div class="analytics-progress-fill" style="width:${width}%"></div>
                        </div>
                    </div>
                `;
            }).join("");
        }
    }

    const notifications = [];
    if (highestCategory) {
        notifications.push(`You spent ₹${highestCategory[1]} on ${highestCategory[0]} this month.`);
        notifications.push(`${highestCategory[0]} is your highest spending category.`);
    }

    if (monthlyIncome > 0) {
        notifications.push(`You saved ${savingsPercentage}% of your income this month.`);
    }

    const notificationList = document.querySelector("#analyticsNotifications");
    if (notificationList) {
        notificationList.innerHTML = notifications.length
            ? notifications.map((message) => `<li>${message}</li>`).join("")
            : '<li>No analytics yet. Add income and expenses to see insights.</li>';
    }
}
