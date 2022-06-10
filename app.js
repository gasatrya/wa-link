(() => {
  // Set up variables.
  const generateBtn = document.getElementById('generate_link');
  const numberInvalid = document.getElementById('number_invalid');
  const messageInvalid = document.getElementById('message_invalid');
  const generatedLink = document.getElementById('generated_link');

  // Button click event.
  generateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Set up link generator variables.
    const number = document.getElementById('number');
    const message = document.getElementById('message');
    let predefinedMessage =
      'https://api.whatsapp.com/send?phone=' + number.value;

    // Check if the number is not empty.
    if (number.value === '') {
      numberInvalid.textContent = 'Phone number is empty.';
      number.classList.add('is-invalid');
      number.focus();
    } else {
      numberInvalid.textContent = '';

      if (validatePhone(number.value) === false) {
        numberInvalid.textContent = 'Please check again your phone number.';
        number.focus();
      } else {
        numberInvalid.textContent = '';
        number.classList.remove('is-invalid');
        number.classList.add('is-valid');
      }
    }

    // Check if message is not empty.
    if (message.value === '') {
      messageInvalid.textContent = 'Predefined message is empty.';
      message.classList.add('is-invalid');
      message.focus();
    } else {
      messageInvalid.textContent = '';
      message.classList.remove('is-invalid');
      message.classList.add('is-valid');
    }

    // Stop event.
    if ((number.value && message.value) === '') {
      number.focus();
      return false;
    }

    // Set up predefined message.
    predefinedMessage +=
      '&text=' + encodeURIComponent(escapeHtml(message.value));

    // Show the generated link.
    generatedLink.textContent = predefinedMessage;
  });

  // Phone validation
  function validatePhone(num) {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return phoneRegex.test(num);
  }

  // Escape html tag
  // https://stackoverflow.com/a/6234804
  function escapeHtml(unsafe) {
    return unsafe
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
})();
