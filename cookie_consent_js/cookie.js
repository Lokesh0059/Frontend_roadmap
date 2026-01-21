document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptBtn');
    const closeBtn = document.getElementById('closeBtn');

    // Function to close the cookie consent
    function closeCookieConsent() {
        cookieConsent.classList.add('hidden');
    }

    // Event listener for accept button
    acceptBtn.addEventListener('click', closeCookieConsent);

    // Event listener for close button
    closeBtn.addEventListener('click', closeCookieConsent);
});
