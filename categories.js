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
