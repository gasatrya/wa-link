// Import style
import '../styles/app.scss'

// Set up variables.
const generateBtn = document.getElementById('generate')
const numberInvalid = document.getElementById('number_invalid')
const messageInvalid = document.getElementById('message_invalid')
const generatedLink = document.getElementById('generated_link')
const clearForm = document.getElementById('clear')
const copyLink = document.getElementById('copy')
const number = document.getElementById('number')
const message = document.getElementById('message')

// Button click event.
generateBtn.addEventListener('click', e => {
  e.preventDefault()

  // Trim spaces
  const trimmedNumber = number.value.trim()
  const trimmedMessage = message.value.trim()

  number.value = trimmedNumber
  message.value = trimmedMessage

  // Set up predefiend message.
  let predefinedMessage = 'https://api.whatsapp.com/send?phone=' + trimmedNumber

  // Check if the number is not empty.
  if (number.value === '') {
    numberInvalid.textContent = 'Phone number is empty.'
    number.classList.add('is-invalid')
    number.focus()
  } else {
    numberInvalid.textContent = ''

    if (validatePhone(number.value) === false) {
      numberInvalid.textContent = 'Please check again your phone number.'
      number.focus()
    } else {
      numberInvalid.textContent = ''
      number.classList.remove('is-invalid')
      number.classList.add('is-valid')
    }
  }

  // Check if message is not empty.
  if (message.value === '') {
    messageInvalid.textContent = 'Predefined message is empty.'
    message.classList.add('is-invalid')
    message.focus()
  } else {
    messageInvalid.textContent = ''
    message.classList.remove('is-invalid')
    message.classList.add('is-valid')
  }

  // Stop event.
  if ((number.value && message.value) === '') {
    number.focus()
    return false
  }

  // Set up predefined message.
  predefinedMessage += '&text=' + encodeURIComponent(escapeHtml(trimmedMessage))

  // Show the generated link.
  generatedLink.value = predefinedMessage

  // Show clear button
  clearForm.classList.add('d-inline-block')
  clearForm.classList.remove('d-none')

  // Show copy button
  copyLink.classList.add('d-inline-block')
  copyLink.classList.remove('d-none')
})

// Clear button
clearForm.addEventListener('click', e => {
  e.preventDefault()

  // Clear number field
  number.value = ''
  number.classList.remove('is-valid')

  // Clear message field
  message.value = ''
  message.classList.remove('is-valid')

  // Clear link field
  generatedLink.value = ''

  // Hide clear button
  clearForm.classList.remove('d-inline-block')
  clearForm.classList.add('d-none')

  // Hide copy button
  copyLink.classList.remove('d-inline-block')
  copyLink.classList.add('d-none')
})

// Validate input
number.addEventListener('keyup', () => {
  if (validatePhone(number.value) === true) {
    number.classList.remove('is-invalid')
    number.classList.remove('is-valid')
    numberInvalid.textContent = ''
  }
})
message.addEventListener('keyup', () => {
  if (escapeHtml(message.value)) {
    message.classList.remove('is-invalid')
    message.classList.remove('is-valid')
    messageInvalid.textContent = ''
  }
})

// Copy link
copyLink.addEventListener('click', e => {
  e.preventDefault()

  if (generatedLink.value === '') {
    alert('Please generate the link first, then try again.')
    return false
  }

  navigator.clipboard.writeText(generatedLink.value).then(() => {
    copyLink.textContent = 'Copied'

    setTimeout(() => {
      copyLink.textContent = 'Copy Link'
    }, 1500)
  })
})

// Phone validation
function validatePhone(num) {
  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g
  return phoneRegex.test(num)
}

// Escape html tag
// https://stackoverflow.com/a/6234804
function escapeHtml(unsafe) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
