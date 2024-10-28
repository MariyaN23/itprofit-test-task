import "./style.scss";
import "./modal/modal.scss";
import "./modal/modal.js";
import IMask from "imask";
import "./form/form.scss";

const form = document.getElementById('form')
const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const message = document.getElementById('message')

const errorInResponse = document.getElementById('res-error')
const successInResponse = document.getElementById('res-success')

const validateForm = () => {
    const nameValue = name.value.trim()
    const emailValue = email.value.trim()
    const phoneValue = phone.value.trim()
    const messageValue = message.value.trim()

    !nameValue
        ? setError(name, 'Введите имя')
        : setSuccess(name)

    !emailValue
        ? setError(email, 'Введите email')
        : !validateEmail(emailValue)
            ? setError(email, 'Введите правильный email')
            : setSuccess(email)

    !phoneValue
        ? setError(phone, 'Введите номер телефона')
        : setSuccess(phone)

    const phoneForRequest = phoneValue.replace(/[^\d+]/g, "")

    !messageValue
        ? setError(message, 'Введите сообщение')
        : setSuccess(message)

    return {
        name: nameValue,
        email: emailValue,
        phone: phoneForRequest,
        message: messageValue
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const values = validateForm()
    if (values) {
        try {
            errorInResponse.textContent = ''
            successInResponse.textContent = ''

            //const url = 'http://localhost:9090/form'
            const url = 'https://itprofit-test-task-back.onrender.com/form'

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            if (!response.ok) {
                if (response.status === 400) {
                    const errorData = await response.json()
                    throw new Error(errorData.messages.map(el => el.msg).join(', '))
                }
                if (response.status === 500) {
                    const errorData = await response.json()
                    throw new Error(errorData.fields.inputName)
                } else {
                    throw new Error('Ошибка HTTP: ' + response.status)
                }
            }
            if (response.status === 200) {
                const data = await response.json();
                successInResponse.textContent = data.msg

                name.value = ''
                email.value = ''
                phone.value = ''
                message.value = ''
            }
        } catch (error) {
            errorInResponse.textContent = error
        }
    }
})

const setError = (el, message) => {
    const inputControl = el.parentElement
    const displayError = inputControl.querySelector('.error')
    displayError.innerText = message
    inputControl.classList.add('error')
    el.classList.add('input-error')
    inputControl.classList.remove('success')
}

const setSuccess = (el) => {
    el.classList.remove('input-error')
    const inputControl = el.parentElement
    const displayError = inputControl.querySelector('.error')
    displayError.innerText = ''
    inputControl.classList.add('success')
    inputControl.classList.remove('error')
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

const phoneMask = new IMask(phone, {
    mask: "{+375} (00) 000-00-00"
})