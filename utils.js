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
