document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-container");
    const thankYouContainer = document.querySelector(".thank-you-container");
    const confirmBtn = document.querySelector(".confirm");
    const continueBtn = document.querySelector(".continue");

    const nameInput = document.getElementById("name");
    const cardNumberInput = document.getElementById("number");
    const monthInput = document.getElementById("exp-date-month");
    const yearInput = document.getElementById("exp-date-year");
    const cvcInput = document.getElementById("card-cvc");

    const cardHolderName = document.getElementById("card-holder-name");
    const cardHolderNumber = document.getElementById("card-holder-number");
    const expiryDate = document.getElementById("date");
    const cvcDisplay = document.getElementById("cvc");

    const errorMessages = document.querySelectorAll(".error-msg");
    const formatErrors = document.querySelectorAll(".format-error");

    function showError(input, errorMsg, clearContent = true) {
        input.classList.add("error-border");
        errorMsg.style.display = "block";
        
        if (clearContent) {
            input.value = "";
        }
    }

    function hideError(input, errorMsg) {
        input.classList.remove("error-border");
        errorMsg.style.display = "none";
    }

    confirmBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let isValid = true;

        // Validate Name
        if (nameInput.value.trim() === "") {
            showError(nameInput, nameInput.nextElementSibling);
            isValid = false;
        } else {
            hideError(nameInput, nameInput.nextElementSibling);
        }

        // Validate Card Number
        const cardNumberValue = cardNumberInput.value.replace(/\s/g, "");

        if (cardNumberValue.trim() === "") {
            showError(cardNumberInput, cardNumberInput.nextElementSibling);
            cardNumberInput.nextElementSibling.nextElementSibling.style.display = "none";
            isValid = false;
        } else if (!/^\d+$/.test(cardNumberValue)) {
            showError(cardNumberInput, cardNumberInput.nextElementSibling.nextElementSibling);
            cardNumberInput.nextElementSibling.style.display = "none";
            isValid = false;
        } else if (!/^\d{16}$/.test(cardNumberValue)) {
            cardNumberInput.classList.add("error-border");
            cardNumberInput.nextElementSibling.style.display = "none";
            cardNumberInput.nextElementSibling.nextElementSibling.style.display = "none";
            isValid = false;
        } else {
            hideError(cardNumberInput, cardNumberInput.nextElementSibling);
            hideError(cardNumberInput, cardNumberInput.nextElementSibling.nextElementSibling);
        }

        // Validate Expiration Date (Month & Year)
        const monthValue = monthInput.value.trim();
        const yearValue = yearInput.value.trim();

        if (monthValue === "" || yearValue === "") {
            showError(monthInput, monthInput.parentElement.nextElementSibling, false);
            showError(yearInput, yearInput.parentElement.nextElementSibling, false);
            isValid = false;
        } else if (!/^\d+$/.test(monthValue) || !/^\d+$/.test(yearValue)) {
            showError(monthInput, monthInput.parentElement.nextElementSibling.nextElementSibling);
            showError(yearInput, yearInput.parentElement.nextElementSibling.nextElementSibling);
            monthInput.value = "";
            yearInput.value = "";
            monthInput.placeholder = "MM";
            yearInput.placeholder = "YY";
            isValid = false;
        } else if (parseInt(monthValue, 10) < 1 || parseInt(monthValue, 10) > 12) {
            monthInput.classList.add("error-border");
            isValid = false;
        } else {
            hideError(monthInput, monthInput.parentElement.nextElementSibling);
            hideError(monthInput, monthInput.parentElement.nextElementSibling.nextElementSibling);
            hideError(yearInput, yearInput.parentElement.nextElementSibling);
            hideError(yearInput, yearInput.parentElement.nextElementSibling.nextElementSibling);
        }

        // Validate CVC
        if (cvcInput.value.trim() === "") {
            showError(cvcInput, cvcInput.nextElementSibling);
            cvcInput.nextElementSibling.nextElementSibling.style.display = "none";
            isValid = false;
        } else if (!/^\d+$/.test(cvcInput.value)) {
            showError(cvcInput, cvcInput.nextElementSibling.nextElementSibling);
            cvcInput.nextElementSibling.style.display = "none";
            isValid = false;
        } else if (cvcInput.value.length < 3 || cvcInput.value.length > 4) {
            cvcInput.classList.add("error-border"); // Ensure red border appears
            cvcInput.nextElementSibling.style.display = "none";
            cvcInput.nextElementSibling.nextElementSibling.style.display = "none";
            isValid = false;
        } else {
            hideError(cvcInput, cvcInput.nextElementSibling);
            hideError(cvcInput, cvcInput.nextElementSibling.nextElementSibling);
        }

        // If all fields are valid, update the card and show the thank-you screen
        if (isValid) {
            cardHolderName.textContent = nameInput.value;
            cardHolderNumber.textContent = cardNumberValue.replace(/(.{4})/g, "$1 ");
            expiryDate.textContent = `${monthValue}/${yearValue}`;
            cvcDisplay.textContent = cvcInput.value;

            form.style.display = "none";
            thankYouContainer.style.display = "flex";
        }
    });

    // Continue button - reset form
    continueBtn.addEventListener("click", function () {
        form.style.display = "flex";
        thankYouContainer.style.display = "none";

        // Reset inputs
        nameInput.value = "";
        cardNumberInput.value = "";
        monthInput.value = "";
        yearInput.value = "";
        cvcInput.value = "";

        // Reset placeholders
        nameInput.placeholder = "e.g. Jane Appleseed";
        cardNumberInput.placeholder = "e.g. 1234 5678 9123 0000";
        monthInput.placeholder = "MM";
        yearInput.placeholder = "YY";
        cvcInput.placeholder = "e.g. 123";

        // Reset displayed card details
        cardHolderName.textContent = "Jane Appleseed";
        cardHolderNumber.textContent = "0000 0000 0000 0000";
        expiryDate.textContent = "00/00";
        cvcDisplay.textContent = "000";

        // Remove error styles
        errorMessages.forEach((msg) => (msg.style.display = "none"));
        formatErrors.forEach((msg) => (msg.style.display = "none"));
        document.querySelectorAll("input").forEach((input) => {
            input.classList.remove("error-border");
        });
    });
});


