// Validate phone number using regular expression
function validatePhoneNumber(phoneNumber) {
    // Regular expression pattern for a typical international phone number
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return phoneRegex.test(phoneNumber);
}

// Validate email address using regular expression
function validateEmailAddress(email) {
    // Regular expression pattern for a basic email address validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = {
    validatePhoneNumber,
    validateEmailAddress,
}