(function ($) {
  $(function () {
    const btn = $('#generate_link');
    const numberEror = $('#number_invalid');
    const msgEror = $('#msg_invalid');
    const waLink = $('#generated_link');

    btn.on('click', (e) => {
      e.preventDefault();

      // Set up variables.
      const number = $('#number').val();
      const msg = $('#message').val();
      let predefined = 'https://api.whatsapp.com/send?phone=' + number;

      if (number === '') {
        numberEror.text('Phone number is empty.');
        $('#number').focus();
        setTimeout(() => {
          numberEror.text('');
        }, 2000);
        return false;
      } else {
        if (validatePhone(number) === false) {
          numberEror.text('Please check again the phone number.');
          $('#wa_number').focus();
          setTimeout(() => {
            numberEror.text('');
          }, 2000);
          return false;
        }
      }

      if (msg === '') {
        msgEror.text('Predefined message is empty.');
        $('#message').focus();
        setTimeout(() => {
          msgEror.text('');
        }, 2000);
        return false;
      }

      predefined += '&text=' + encodeURIComponent(escapeHtml(msg));

      waLink.text(predefined);
    });

    // Phone validation
    function validatePhone(number) {
      const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
      return phoneRegex.test(number);
    }

    // Escape html tag
    function escapeHtml(msg) {
      return msg
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  });
})(jQuery);
