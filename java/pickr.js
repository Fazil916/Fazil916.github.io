document.addEventListener('DOMContentLoaded', () => {
  const colorInputs = document.querySelectorAll('.color-input');

  colorInputs.forEach(colorInput => {
    colorInput.addEventListener('click', () => {
      openColorPicker(colorInput);
    });
  });

  function openColorPicker(targetInput) {
    const defaultColor = targetInput.value || '#ffffff';

    // Initialize the Spectrum color picker
    $(targetInput).spectrum({
      type: 'color',
      showInput: true,
      preferredFormat: 'hex',
      showInitial: true,
      allowEmpty: false,
      chooseText: 'Select',
      cancelText: 'Cancel',
      containerClassName: 'color-picker-container',
      showPalette: true,
      palette: [
        ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff'] // Example color palette
      ],
      appendTo: 'body',
      clickoutFiresChange: true,
      move: function(color) {
        // Update the input value as the user selects a color
        targetInput.value = color.toHexString();
      },
      change: function(color) {
        // Update the input value when a color is confirmed
        targetInput.value = color.toHexString();
      }
    });

    // Set the default color by updating the input value
    targetInput.value = defaultColor;
  }
});
