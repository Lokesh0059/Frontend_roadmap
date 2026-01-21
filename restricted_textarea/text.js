document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('messageInput');
    const charCountDisplay = document.getElementById('charCount');
    const charCounter = document.querySelector('.char-counter');
    const maxCharacters = 250;

    // Update character count and styling
    function updateCharCount() {
        const currentLength = textarea.value.length;
        charCountDisplay.textContent = currentLength;

        // Check if limit is reached
        if (currentLength >= maxCharacters) {
            textarea.classList.add('limit-reached');
            charCounter.classList.add('limit-reached');
        } else {
            textarea.classList.remove('limit-reached');
            charCounter.classList.remove('limit-reached');
        }
    }

    // Prevent input beyond max limit
    textarea.addEventListener('input', function() {
        if (this.value.length > maxCharacters) {
            this.value = this.value.substring(0, maxCharacters);
        }
        updateCharCount();
    });

    // Initial count on page load
    updateCharCount();
});
