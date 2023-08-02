function updateSubtype(value) {
    const subtypeElement = document.getElementById('project-subtype');
    subtypeElement.innerHTML = ''; // Clear current options

    let subtypes = [];
    switch (value) {
        case 'Apartment':
        case 'Villa':
            subtypes = ['Studio', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK', '6BHK', 'Pent House'];
            break;
        case 'Office':
            subtypes = ['Micro Office', 'Small Office', 'One Floor', 'Multiple Floors'];
            break;
        case 'Building':
        case 'External':
            subtypes = ['Small', 'Medium', 'Large'];
            break;
        case 'Roof':
        case 'Service Rooms':
        case 'Mechanical Rooms':
        case 'Plants':
            subtypes = ['Small', 'Medium', 'Large', 'XL'];
            break;
    }

    // Create new options
    for (let subtype of subtypes) {
        const optionElement = document.createElement('option');
        optionElement.value = subtype;
        optionElement.text = subtype;
        subtypeElement.appendChild(optionElement);
    }
}
