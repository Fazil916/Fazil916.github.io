document.addEventListener('DOMContentLoaded', function () {
    // Get the buttons and the containers
    var reportButton = document.getElementById('luxreport');
    var quotationButton = document.getElementById('quotation');
    var reportContainer = document.getElementById('room-reports-container');
    var quotationsContainer = document.getElementById('quotations-container');

    // Add click event listeners
    reportButton.addEventListener('click', function () {
        reportContainer.style.display = 'block'; // Show the report container
        quotationsContainer.style.display = 'none'; // Hide the quotations container
    });

    quotationButton.addEventListener('click', function () {
        reportContainer.style.display = 'none'; // Hide the report container
        quotationsContainer.style.display = 'block'; // Show the quotations container
    });

    // Rest of your code...
});
