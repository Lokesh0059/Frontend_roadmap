/* =============================================
   Accordion Component - JavaScript Functionality
   ============================================= */

/**
 * AccordionComponent Class
 * Manages the functionality of accordion items with proper DOM manipulation,
 * event handling, and accessibility features.
 */
class AccordionComponent {
    /**
     * Constructor - Initialize accordion functionality
     * @param {string} accordionSelector - CSS selector for the accordion container
     */
    constructor(accordionSelector = '.accordion') {
        this.accordion = document.querySelector(accordionSelector);
        this.headers = this.accordion.querySelectorAll('.accordion-header');
        this.panels = this.accordion.querySelectorAll('.accordion-panel');
        this.currentlyOpenPanel = null;

        // Validate that accordion exists
        if (!this.accordion) {
            console.error('Accordion container not found');
            return;
        }

        // Initialize the accordion
        this.init();
    }

    /**
     * Initialize the accordion by setting up event listeners
     */
    init() {
        this.headers.forEach((header, index) => {
            // Add click event listeners
            header.addEventListener('click', (e) => this.handleHeaderClick(e));

            // Add keyboard navigation (Enter and Space keys)
            header.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

            // Set initial ARIA attributes
            header.setAttribute('id', `header-${index}`);
            header.setAttribute('aria-expanded', 'false');

            // Link header to its corresponding panel
            const panelId = header.getAttribute('aria-controls');
            if (panelId) {
                const panel = document.getElementById(panelId);
                if (panel) {
                    panel.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Log initialization
        this.logInfo('Accordion initialized with ' + this.headers.length + ' items');
    }

    /**
     * Handle header click events
     * @param {Event} event - The click event
     */
    handleHeaderClick(event) {
        const header = event.currentTarget;
        const panelId = header.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);

        if (!panel) {
            console.error('Panel with ID ' + panelId + ' not found');
            return;
        }

        // Check if this panel is already open
        const isCurrentlyOpen = header.getAttribute('aria-expanded') === 'true';

        // Close currently open panel if it exists and is not the clicked header
        if (this.currentlyOpenPanel && this.currentlyOpenPanel !== header) {
            this.closePanel(this.currentlyOpenPanel);
        }

        // Toggle the clicked panel
        if (isCurrentlyOpen) {
            this.closePanel(header);
            this.currentlyOpenPanel = null;
        } else {
            this.openPanel(header);
            this.currentlyOpenPanel = header;
        }
    }

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} event - The keyboard event
     */
    handleKeyboardNavigation(event) {
        const key = event.key;

        // Handle Enter and Space keys to open/close accordion
        if (key === 'Enter' || key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
        }

        // Handle Arrow keys for navigation between headers
        if (key === 'ArrowDown' || key === 'ArrowUp') {
            event.preventDefault();
            this.navigateBetweenHeaders(event.currentTarget, key === 'ArrowDown');
        }

        // Handle Home and End keys
        if (key === 'Home') {
            event.preventDefault();
            this.headers[0].focus();
        }

        if (key === 'End') {
            event.preventDefault();
            this.headers[this.headers.length - 1].focus();
        }
    }

    /**
     * Navigate between accordion headers using arrow keys
     * @param {HTMLElement} currentHeader - The currently focused header
     * @param {boolean} moveDown - True to move down, false to move up
     */
    navigateBetweenHeaders(currentHeader, moveDown) {
        const headers = Array.from(this.headers);
        const currentIndex = headers.indexOf(currentHeader);
        let nextIndex;

        if (moveDown) {
            nextIndex = currentIndex < headers.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : headers.length - 1;
        }

        headers[nextIndex].focus();
    }

    /**
     * Open a panel with animation
     * @param {HTMLElement} header - The accordion header element
     */
    openPanel(header) {
        const panelId = header.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);

        if (!panel) return;

        // Update ARIA attributes
        header.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-expanded', 'true');

        // Trigger animation by adding class
        panel.style.maxHeight = panel.scrollHeight + 'px';

        this.logInfo('Opened panel: ' + panelId);
    }

    /**
     * Close a panel with animation
     * @param {HTMLElement} header - The accordion header element
     */
    closePanel(header) {
        const panelId = header.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);

        if (!panel) return;

        // Update ARIA attributes
        header.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-expanded', 'false');

        // Reset the max-height to trigger collapse animation
        panel.style.maxHeight = '0';

        this.logInfo('Closed panel: ' + panelId);
    }

    /**
     * Open a specific accordion item by index
     * @param {number} index - The index of the accordion item (0-based)
     */
    openItem(index) {
        if (index < 0 || index >= this.headers.length) {
            console.error('Invalid accordion item index: ' + index);
            return;
        }

        // Close currently open panel
        if (this.currentlyOpenPanel) {
            this.closePanel(this.currentlyOpenPanel);
        }

        // Open the requested item
        const header = this.headers[index];
        this.openPanel(header);
        this.currentlyOpenPanel = header;
    }

    /**
     * Close all accordion items
     */
    closeAll() {
        this.headers.forEach(header => {
            this.closePanel(header);
        });
        this.currentlyOpenPanel = null;
    }

    /**
     * Get the currently open panel index
     * @returns {number} Index of open panel or -1 if none are open
     */
    getOpenPanelIndex() {
        const openHeader = this.accordion.querySelector('[aria-expanded="true"]');
        if (!openHeader) return -1;
        return Array.from(this.headers).indexOf(openHeader);
    }

    /**
     * Check if a specific panel is open
     * @param {number} index - The index of the panel
     * @returns {boolean} True if the panel is open
     */
    isPanelOpen(index) {
        if (index < 0 || index >= this.headers.length) return false;
        return this.headers[index].getAttribute('aria-expanded') === 'true';
    }

    /**
     * Add a new accordion item dynamically
     * @param {string} headerText - The text for the header
     * @param {string} contentHTML - The HTML content for the panel
     */
    addItem(headerText, contentHTML) {
        const newItemIndex = this.headers.length;
        const newItem = document.createElement('div');
        newItem.className = 'accordion-item';

        const panelId = 'panel-' + (newItemIndex + 1);

        newItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="${panelId}">
                <span class="accordion-header-text">${headerText}</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-panel" id="${panelId}" role="region" aria-labelledby="header-${newItemIndex}">
                <div class="accordion-content">
                    ${contentHTML}
                </div>
            </div>
        `;

        // Append to accordion
        this.accordion.appendChild(newItem);

        // Re-initialize to include the new item
        this.headers = this.accordion.querySelectorAll('.accordion-header');
        this.panels = this.accordion.querySelectorAll('.accordion-panel');
        this.init();

        this.logInfo('Added new accordion item: ' + headerText);
    }

    /**
     * Remove an accordion item by index
     * @param {number} index - The index of the item to remove
     */
    removeItem(index) {
        if (index < 0 || index >= this.headers.length) {
            console.error('Invalid accordion item index: ' + index);
            return;
        }

        const item = this.headers[index].closest('.accordion-item');
        if (item) {
            item.remove();

            // Re-initialize
            this.headers = this.accordion.querySelectorAll('.accordion-header');
            this.panels = this.accordion.querySelectorAll('.accordion-panel');
            this.currentlyOpenPanel = null;
            this.init();

            this.logInfo('Removed accordion item at index: ' + index);
        }
    }

    /**
     * Update accordion item content
     * @param {number} index - The index of the item to update
     * @param {string} headerText - The new header text
     * @param {string} contentHTML - The new content HTML
     */
    updateItem(index, headerText, contentHTML) {
        if (index < 0 || index >= this.headers.length) {
            console.error('Invalid accordion item index: ' + index);
            return;
        }

        const header = this.headers[index];
        const panel = this.panels[index];

        // Update header text
        const headerTextSpan = header.querySelector('.accordion-header-text');
        if (headerTextSpan) {
            headerTextSpan.textContent = headerText;
        }

        // Update panel content
        const contentDiv = panel.querySelector('.accordion-content');
        if (contentDiv) {
            contentDiv.innerHTML = contentHTML;
        }

        this.logInfo('Updated accordion item at index: ' + index);
    }

    /**
     * Utility function for logging (can be disabled)
     * @param {string} message - The message to log
     */
    logInfo(message) {
        console.log('[Accordion] ' + message);
    }

    /**
     * Destroy the accordion and remove all event listeners
     */
    destroy() {
        this.headers.forEach(header => {
            header.removeEventListener('click', this.handleHeaderClick);
            header.removeEventListener('keydown', this.handleKeyboardNavigation);
        });

        this.logInfo('Accordion destroyed');
    }
}

/**
 * Initialize the accordion when the DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create accordion instance
    const accordion = new AccordionComponent('.accordion');

    // Make accordion instance available globally for testing/manipulation
    window.accordion = accordion;

    // Optional: Log available methods
    console.log('Accordion instance created. Available methods:');
    console.log('- accordion.openItem(index)');
    console.log('- accordion.closeAll()');
    console.log('- accordion.getOpenPanelIndex()');
    console.log('- accordion.isPanelOpen(index)');
    console.log('- accordion.addItem(headerText, contentHTML)');
    console.log('- accordion.removeItem(index)');
    console.log('- accordion.updateItem(index, headerText, contentHTML)');
    console.log('- accordion.destroy()');
});

/**
 * Example usage (uncomment to test):
 * 
 * // Open the first item after 1 second
 * setTimeout(() => {
 *     accordion.openItem(0);
 * }, 1000);
 * 
 * // Add a new accordion item dynamically
 * setTimeout(() => {
 *     accordion.addItem(
 *         'New Question?',
 *         '<p>This is a dynamically added accordion item!</p>'
 *     );
 * }, 2000);
 * 
 * // Update an existing item
 * setTimeout(() => {
 *     accordion.updateItem(
 *         0,
 *         'Updated Question?',
 *         '<p>This content has been updated dynamically!</p>'
 *     );
 * }, 3000);
 */
