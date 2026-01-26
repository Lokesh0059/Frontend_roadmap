/* ========================================
   Dropdown Menu JavaScript
   Handles DOM manipulation, event handling,
   and interactive functionality
   ======================================== */

class DropdownMenu {
    constructor(dropdownElement) {
        this.dropdown = dropdownElement;
        this.trigger = this.dropdown.querySelector('.dropdown-trigger');
        this.menu = this.dropdown.querySelector('.dropdown-menu');
        this.items = this.dropdown.querySelectorAll('.dropdown-item');
        this.text = this.dropdown.querySelector('.dropdown-text');
        this.icon = this.dropdown.querySelector('.dropdown-icon');
        this.isOpen = false;
        this.selectedValue = null;

        this.init();
    }

    /**
     * Initialize event listeners
     */
    init() {
        // Toggle dropdown when trigger is clicked
        this.trigger.addEventListener('click', () => this.toggleDropdown());

        // Handle item selection
        this.items.forEach((item) => {
            item.addEventListener('click', (e) => this.selectItem(e));
            item.addEventListener('keydown', (e) => this.handleItemKeydown(e));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => this.handleClickOutside(e));

        // Keyboard navigation
        this.trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));
    }

    /**
     * Toggle dropdown open/close state
     */
    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    /**
     * Open the dropdown menu
     */
    openDropdown() {
        this.isOpen = true;
        this.dropdown.classList.add('open');
        this.trigger.setAttribute('aria-expanded', 'true');
        this.menu.setAttribute('role', 'listbox');

        // Set focus to first item or selected item
        const firstItem = this.items[0];
        if (firstItem) {
            firstItem.focus();
        }
    }

    /**
     * Close the dropdown menu
     */
    closeDropdown() {
        this.isOpen = false;
        this.dropdown.classList.remove('open');
        this.trigger.setAttribute('aria-expanded', 'false');
        this.trigger.focus();
    }

    /**
     * Select an item from the dropdown
     * @param {Event} e - Click event
     */
    selectItem(e) {
        const selectedItem = e.currentTarget;
        const value = selectedItem.getAttribute('data-value');
        const label = selectedItem.textContent.trim();

        // Remove selected class from all items
        this.items.forEach((item) => {
            item.classList.remove('selected');
        });

        // Add selected class to clicked item
        selectedItem.classList.add('selected');

        // Update dropdown text
        this.text.textContent = label;
        this.selectedValue = value;

        // Update info text if exists
        this.updateSelectionInfo(label);

        // Close dropdown
        this.closeDropdown();

        // Emit custom event
        this.emitChangeEvent(value, label);
    }

    /**
     * Update selection info display
     * @param {string} label - Selected item label
     */
    updateSelectionInfo(label) {
        const info = this.dropdown.parentElement.querySelector('.selection-info');
        if (info) {
            info.textContent = `Selected: ${label}`;
            info.classList.add('has-selection');
        }
    }

    /**
     * Emit custom change event
     * @param {string} value - Selected value
     * @param {string} label - Selected label
     */
    emitChangeEvent(value, label) {
        const event = new CustomEvent('dropdown-change', {
            detail: { value, label },
            bubbles: true
        });
        this.dropdown.dispatchEvent(event);
    }

    /**
     * Handle keyboard navigation in trigger button
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleTriggerKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleDropdown();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.openDropdown();
        }
    }

    /**
     * Handle keyboard navigation in menu items
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleItemKeydown(e) {
        const items = Array.from(this.items);
        const currentIndex = items.indexOf(e.currentTarget);

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.selectItem(e);
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < items.length - 1) {
                    items[currentIndex + 1].focus();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    items[currentIndex - 1].focus();
                }
                break;
            case 'Escape':
                e.preventDefault();
                this.closeDropdown();
                break;
            case 'Home':
                e.preventDefault();
                items[0]?.focus();
                break;
            case 'End':
                e.preventDefault();
                items[items.length - 1]?.focus();
                break;
            default:
                // Search for items starting with typed letter
                this.handleTypeSearch(e);
        }
    }

    /**
     * Handle type-to-search functionality
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleTypeSearch(e) {
        const char = e.key.toLowerCase();
        if (/^[a-z]$/.test(char)) {
            const items = Array.from(this.items);
            const match = items.find(
                (item) =>
                    item.textContent
                        .toLowerCase()
                        .startsWith(char)
            );
            if (match) {
                match.focus();
            }
        }
    }

    /**
     * Handle clicks outside the dropdown
     * @param {Event} e - Click event
     */
    handleClickOutside(e) {
        if (!this.dropdown.contains(e.target) && this.isOpen) {
            this.closeDropdown();
        }
    }

    /**
     * Get the selected value
     * @returns {string|null} Selected value
     */
    getSelectedValue() {
        return this.selectedValue;
    }

    /**
     * Set a value programmatically
     * @param {string} value - Value to select
     */
    setValue(value) {
        const item = Array.from(this.items).find(
            (item) => item.getAttribute('data-value') === value
        );
        if (item) {
            item.click();
        }
    }

    /**
     * Reset dropdown to default state
     */
    reset() {
        this.items.forEach((item) => {
            item.classList.remove('selected');
        });
        this.text.textContent = 'Select an Item';
        this.selectedValue = null;
        this.closeDropdown();

        const info = this.dropdown.parentElement.querySelector('.selection-info');
        if (info) {
            info.textContent = 'No item selected';
            info.classList.remove('has-selection');
        }
    }
}

/**
 * Initialize all dropdowns on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown) => {
        new DropdownMenu(dropdown);
    });
});

/**
 * Example: Listen for dropdown changes
 * Uncomment below to see custom events in action
 */
/*
document.querySelectorAll('.dropdown').forEach((dropdown) => {
    dropdown.addEventListener('dropdown-change', (e) => {
        console.log('Selected:', e.detail.label, 'Value:', e.detail.value);
    });
});
*/
