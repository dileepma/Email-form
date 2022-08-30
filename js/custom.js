const form = document.querySelector("form[name='email-form']")
const firstName = document.querySelector("input[name='fname']")
const lastName = document.querySelector("input[name='lname']")
const emailInput = document.querySelector("input[name='email']")
const messageInput = document.querySelector("textarea[name='message']")
const submitBtn = document.querySelector('.btn-submit')
const valMsg = document.querySelector('.val-msg')
const imageUpload = document.querySelector("input[name='fupload']")

firstName.isValid = () => !!firstName.value
lastName.isValid = () => !!lastName.value
emailInput.isValid = () => isValidEmail(emailInput.value)
messageInput.isValid = () => !!messageInput.value
imageUpload.isValid = () => !!imageUpload.value

const inputFields = [firstName, emailInput, lastName, messageInput, imageUpload]

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

let shouldValidate = false
let isFormValid = false

const validateInputs = () => {
  if (!shouldValidate) return
  submitBtn.classList.add('active')

  isFormValid = true
  inputFields.forEach((input) => {
    input.classList.remove('invalid')
    input.nextElementSibling.classList.add('hide')
    valMsg.innerHTML = ''

    if (!input.isValid()) {
      input.classList.add('invalid')
      isFormValid = false
      input.nextElementSibling.classList.remove('hide')
      submitBtn.classList.remove('active')
      valMsg.innerHTML = `<div class="alert alert-danger" role="alert">
       Please fix the below errors
      </div>
    `
    }
  })
}

function fileValidation() {
  let filePath = imageUpload.value

  // Allowing file type
  let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i

  if (!allowedExtensions.exec(filePath)) {
    alert('Invalid file type')
    imageUpload.value = ''
    return false
  } else {
    // Image preview
    if (imageUpload.files && imageUpload.files[0]) {
      let reader = new FileReader()
      reader.onload = function (e) {
        document.querySelector('.image-preview').innerHTML =
          '<img src="' + e.target.result + '"/>'
      }
      reader.readAsDataURL(imageUpload.files[0])
    }
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  shouldValidate = true
  validateInputs()
  if (isFormValid) {
    valMsg.innerHTML = `<div class="alert alert-success" role="alert">
     Email sent successfully
    </div>
  `
  }
})

inputFields.forEach((input) => input.addEventListener('input', validateInputs))
