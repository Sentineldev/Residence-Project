import { request_create_register_expense } from '../querys.mjs'
import {
    create_model_register_expense,
    create_model_register_expense_concept,
    create_model_register_balance,
    create_model_register_monthly_payment
} from './models.mjs'

import template_concept_expenses from './templates.mjs'
import { template_residence_balance,template_monthly_payment } from './templates.mjs'

const select_date = document.querySelectorAll('.select_date')
const header_date = document.querySelector('#header-date')
const btn_load = document.querySelector('#btn-load')

const btn_open_expense_month = document.querySelector('#btn-open-expense-month')
const btn_create_expense_concept = document.querySelector('#btn-create-expense-concept')
const btn_register_balance = document.querySelector('#btn-register-balance')
const btn_create_register_monthly_payment = document.querySelector('#btn-create-register-monthly-payment')

const load_estimated_expenses = document.querySelector('#estimated-expenses')
const load_real_expenses = document.querySelector('#real-expenses')
const load_residence_balance = document.querySelector('#residence-balance')
const load_monthly_payment = document.querySelector('#monthly-payment')


btn_create_expense_concept.addEventListener('click',create_model_register_expense_concept)

btn_open_expense_month.addEventListener('click',create_model_register_expense)

btn_register_balance.addEventListener('click',create_model_register_balance)

btn_create_register_monthly_payment.addEventListener('click',create_model_register_monthly_payment)

load_estimated_expenses.addEventListener('click',(e)=>{
    e.preventDefault()
    template_concept_expenses('Estimated')
})

load_real_expenses.addEventListener('click',(e)=>{
    e.preventDefault()
    template_concept_expenses('Real')
})

load_residence_balance.addEventListener('click',(e)=>{
    e.preventDefault()
    template_residence_balance()
})

load_monthly_payment.addEventListener('click',(e)=>{
    e.preventDefault()
    template_monthly_payment()
})


btn_load.addEventListener('click',()=>{
    header_date.innerText = select_date[0].value+' - '+select_date[1].value
    template_residence_balance()
})

window.onload = () =>{
    template_concept_expenses('Estimated')
}