/* =============================================
   Age Calculator - Main JavaScript Application
   ============================================= */

import { DateTime } from 'luxon';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../src/style.css';

/**
 * AgeCalculator Class
 * Manages the age calculator functionality with Luxon and Flatpickr
 */
class AgeCalculator {
    constructor() {
        // DOM Elements
        this.form = document.getElementById('ageForm');
        this.birthdatePicker = document.getElementById('birthdatePicker');
        this.errorMessage = document.getElementById('errorMessage');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.resetBtn = document.getElementById('resetBtn');

        // Results elements
        this.ageYearsDisplay = document.getElementById('ageYears');
        this.ageMonthsDisplay = document.getElementById('ageMonths');
        this.ageDaysDisplay = document.getElementById('ageDays');
        this.yearsPlural = document.getElementById('yearsPlural');
        this.monthsPlural = document.getElementById('monthsPlural');
        this.daysPlural = document.getElementById('daysPlural');
        this.displayBirthDate = document.getElementById('displayBirthDate');
        this.totalDaysDisplay = document.getElementById('totalDays');
        this.totalHoursDisplay = document.getElementById('totalHours');
        this.nextBirthdayDisplay = document.getElementById('nextBirthday');

        // State
        this.birthDate = null;

        // Initialize
        this.init();
    }

    /**
     * Initialize the age calculator
     */
    init() {
        // Initialize Flatpickr datepicker
        this.initializeDatepicker();

        // Add event listeners
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.resetBtn.addEventListener('click', () => this.resetCalculator());

        console.log('Age Calculator initialized');
    }

    /**
     * Initialize Flatpickr datepicker
     */
    initializeDatepicker() {
        // Set max date to today
        const today = new Date();
        
        flatpickr(this.birthdatePicker, {
            mode: 'single',
            maxDate: today,
            yearRange: [1900, today.getFullYear()],
            altInput: true,
            altFormat: 'F j, Y',
            dateFormat: 'Y-m-d',
            defaultDate: null,
            monthSelectorType: 'static',
            static: true,
            onChange: (selectedDates) => {
                this.clearError();
            },
        });
    }

    /**
     * Handle form submission
     * @param {Event} event - Form submission event
     */
    handleFormSubmit(event) {
        event.preventDefault();

        const birthdateString = this.birthdatePicker.value.trim();

        // Validate input
        if (!birthdateString) {
            this.showError('Please select a birth date');
            return;
        }

        // Parse the date
        const birthDateTime = DateTime.fromISO(birthdateString, { zone: 'system' });

        // Validate date
        if (!birthDateTime.isValid) {
            this.showError('Invalid date format. Please select a valid date.');
            return;
        }

        // Check if date is in the past
        const today = DateTime.now();
        if (birthDateTime >= today) {
            this.showError('Birth date must be in the past.');
            return;
        }

        // Check if date is not unreasonably old
        if (birthDateTime.year < 1900) {
            this.showError('Please enter a valid birth year (1900 or later).');
            return;
        }

        // Store the birth date
        this.birthDate = birthDateTime;

        // Calculate and display age
        this.calculateAndDisplayAge();
    }

    /**
     * Calculate age using Luxon
     */
    calculateAge() {
        const today = DateTime.now();
        
        // Calculate the exact difference
        const diff = today.diff(this.birthDate, ['years', 'months', 'days']);

        return {
            years: Math.floor(diff.years),
            months: Math.floor(diff.months),
            days: Math.floor(diff.days),
            totalDays: Math.floor(today.diff(this.birthDate, 'days').days),
        };
    }

    /**
     * Calculate additional statistics
     */
    calculateStatistics() {
        const today = DateTime.now();
        const ageInfo = this.calculateAge();

        // Total days
        const totalDays = ageInfo.totalDays;

        // Total hours (approximate, using 365.25 days per year)
        const totalHours = Math.floor(totalDays * 24);

        // Next birthday
        let nextBirthday = this.birthDate.set({
            year: today.year,
        });

        if (nextBirthday < today) {
            nextBirthday = nextBirthday.plus({ years: 1 });
        }

        // Days until next birthday
        const daysUntilBirthday = Math.ceil(
            nextBirthday.diff(today, 'days').days
        );

        return {
            totalDays,
            totalHours,
            nextBirthday,
            daysUntilBirthday,
        };
    }

    /**
     * Calculate and display the age
     */
    calculateAndDisplayAge() {
        this.clearError();

        const age = this.calculateAge();
        const stats = this.calculateStatistics();

        // Update age display
        this.ageYearsDisplay.textContent = age.years;
        this.ageMonthsDisplay.textContent = age.months;
        this.ageDaysDisplay.textContent = age.days;

        // Update plural forms
        this.yearsPlural.textContent = age.years === 1 ? '' : 's';
        this.monthsPlural.textContent = age.months === 1 ? '' : 's';
        this.daysPlural.textContent = age.days === 1 ? '' : 's';

        // Update additional info
        const birthDateFormatted = this.birthDate.toFormat('LLLL dd, yyyy');
        this.displayBirthDate.textContent = birthDateFormatted;

        this.totalDaysDisplay.textContent = this.formatNumber(stats.totalDays);
        this.totalHoursDisplay.textContent = this.formatNumber(stats.totalHours);

        // Format next birthday
        const nextBirthdayFormatted = stats.nextBirthday.toFormat('LLLL dd, yyyy');
        const birthdayText =
            `${nextBirthdayFormatted} (${stats.daysUntilBirthday} days away)`;
        this.nextBirthdayDisplay.textContent = birthdayText;

        // Show results container
        this.resultsContainer.classList.remove('hidden');

        // Animate the results
        this.animateResults();

        console.log('Age calculated:', {
            years: age.years,
            months: age.months,
            days: age.days,
            totalDays: stats.totalDays,
        });
    }

    /**
     * Animate the results section
     */
    animateResults() {
        // Trigger animation by accessing the element
        this.resultsContainer.offsetHeight;
    }

    /**
     * Format large numbers with comma separators
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
        this.resultsContainer.classList.add('hidden');
    }

    /**
     * Clear error message
     */
    clearError() {
        this.errorMessage.textContent = '';
        this.errorMessage.classList.remove('show');
    }

    /**
     * Reset the calculator
     */
    resetCalculator() {
        // Clear form
        this.birthdatePicker.value = '';

        // Clear state
        this.birthDate = null;

        // Clear error
        this.clearError();

        // Hide results
        this.resultsContainer.classList.add('hidden');

        // Focus on input
        this.birthdatePicker.focus();

        console.log('Calculator reset');
    }

    /**
     * Validate if the entered date is reasonable
     * @param {DateTime} dateTime - DateTime object to validate
     * @returns {boolean} True if valid
     */
    isValidBirthDate(dateTime) {
        const today = DateTime.now();
        const hundredYearsAgo = today.minus({ years: 150 });

        return dateTime > hundredYearsAgo && dateTime < today;
    }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new AgeCalculator();

    // Make calculator instance available globally for debugging
    window.ageCalculator = calculator;

    console.log('Application loaded. Calculator instance available at window.ageCalculator');
});

/**
 * Example usage in console:
 * 
 * // Reset calculator
 * ageCalculator.resetCalculator();
 * 
 * // Access current birth date (if set)
 * console.log(ageCalculator.birthDate);
 * 
 * // Calculate age for a specific date (for testing)
 * // ageCalculator.birthDate = DateTime.fromISO('1995-05-15');
 * // ageCalculator.calculateAndDisplayAge();
 */
