let totalBalance = Number(localStorage.getItem("balance")) || 0;
let totalSpendings = Number(localStorage.getItem("totalSpending")) || 0;
let totalIncomes = Number(localStorage.getItem("totalIncome")) || 0;
let transactionSearchTerm = "";
let allTransactions = loadTransactions();
let tiger = 0;
let selectedCategory = "";
let categoryMenuOpen = false;

function initializeApp() {
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

    const startButtons = [document.getElementById("getsrt"), document.getElementById("getsrt1")];
    startButtons.forEach((button) => {
        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            landing.classList.add("hidden");
            main.classList.remove("hidden");
        });
    });

    if (home) {
        home.addEventListener("click", (e) => {
            e.preventDefault();
            HomePage();
        });
    }

    const featuresLink = document.querySelector("#features");
    if (featuresLink) {
        featuresLink.addEventListener("click", (e) => {
            e.preventDefault();
            featuresPage();
        });
    }

    const aboutLink = document.querySelector("#about");
    if (aboutLink) {
        aboutLink.addEventListener("click", (e) => {
            e.preventDefault();
            aboutPage();
        });
    }

    if (transactions) {
        transactions.addEventListener("click", (event) => {
            const deleteButton = event.target.closest("[data-delete-id]");
            if (!deleteButton) {
                return;
            }

            deleteTransaction(deleteButton.dataset.deleteId);
        });
    }
}

initializeApp();
