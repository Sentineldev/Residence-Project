import { 
    request_create_register_expense,
    request_create_register_expense_concept,
    create_register_residence_balance,
    create_monthly_payment,
    modify_expense_concept 
} 
    from "../querys.mjs"

import template_concept_expenses from "./templates.mjs"
import { generate_message } from "../widgets.mjs"
import { template_monthly_payment } from "./templates.mjs"
import { template_residence_balance } from "./templates.mjs"

const current_year = 2021
const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']



export default function create_model_base(){
    const model_box = document.createElement('div')
    model_box.className = 'model_box'

    const model = document.createElement('div')
    model.className = 'model'

    model_box.appendChild(model)

    const model_form = document.createElement('form')
    model_form.autocomplete = 'off'
    model_form.onsubmit = e =>{
        e.preventDefault()
    }
    model_form.id = 'model_form'

    model.appendChild(model_form)



    document.body.prepend(model_box)


}


export  function create_model_register_expense(){

    create_model_base()

    const model_form = document.querySelector('#model_form')
    const model_box = document.querySelector('.model_box')


    const header = document.createElement('header')
    header.innerText = 'Aperturar Mes'
    header.id = 'form_header'
    model_form.appendChild(header)

    const month_selection = document.createElement('select')
    month_selection.id = 'month_selection'
    model_form.appendChild(month_selection)

    months.forEach(element =>{
        const option_month = document.createElement('option')
        option_month.value = element
        option_month.innerText = element
        month_selection.appendChild(option_month)
    })

    const year_selection = document.createElement('select')
    year_selection.id = 'year_selection'
    model_form.appendChild(year_selection)

    const option_year = document.createElement('option')
    option_year.value = current_year
    option_year.innerText = current_year
    year_selection.appendChild(option_year)

    const btn_send_request = document.createElement('button')
    btn_send_request.innerText = 'Aperturar'
    btn_send_request.type = 'submit'
    btn_send_request.id = 'btn_register_model'
    btn_send_request.className ='btn_send_request'
    btn_send_request.addEventListener('click',request_create_register_expense)
    model_form.appendChild(btn_send_request)

    const btn_close_model = document.createElement('button')
    btn_close_model.innerHTML = 'Cerrar'
    btn_close_model.id = 'btn_close_model'
    btn_close_model.type = 'Menu'
    btn_close_model.addEventListener('click',() =>{
        document.body.removeChild(model_box)
    })
    model_form.appendChild(btn_close_model) 
}

export function create_model_register_expense_concept(){

    const selected_month = document.querySelector('#month')
    const selected_year = document.querySelector('#year')

    create_model_base()

    const model_form = document.querySelector('#model_form')
    const model_box = document.querySelector('.model_box')


    const header = document.createElement('header')
    header.innerText = 'Concepto de Gasto'
    header.id = 'form_header'
    model_form.appendChild(header)

    const month_selection = document.createElement('select')
    month_selection.id = 'month_selection'
    model_form.appendChild(month_selection)

    const option_month = document.createElement('option')
    option_month.value = selected_month.value
    option_month.innerText = selected_month.value
    month_selection.appendChild(option_month)

    const year_selection = document.createElement('select')
    year_selection.id = 'year_selection'
    model_form.appendChild(year_selection)

    const option_year = document.createElement('option')
    option_year.value = selected_year.value
    option_year.innerText = selected_year.value
    year_selection.appendChild(option_year)

    const input_radio_box = document.createElement('div')
    input_radio_box.id = 'input_radio_box'
    model_form.appendChild(input_radio_box)

    const expense_type_estimated = document.createElement('input')
    expense_type_estimated.type = 'radio'
    expense_type_estimated.name = 'expense_type'
    expense_type_estimated.className = 'expense_type'
    expense_type_estimated.value = 'Estimated'
    expense_type_estimated.id = 'expense_type_estimated'
    input_radio_box.appendChild(expense_type_estimated)

    const expense_type_estimated_label = document.createElement('label')
    expense_type_estimated_label.innerText = 'Estimado'
    expense_type_estimated_label.htmlFor = 'expense_type_estimated'
    input_radio_box.appendChild(expense_type_estimated_label )

    const expense_type_real = document.createElement('input')
    expense_type_real.type = 'radio'
    expense_type_real.name = 'expense_type'
    expense_type_real.className = 'expense_type'
    expense_type_real.value = 'Real'
    expense_type_real.id = 'expense_type_real'
    input_radio_box.appendChild(expense_type_real)

    const expense_type_real_label = document.createElement('label')
    expense_type_real_label.innerText = 'Real'
    expense_type_real_label.htmlFor = 'expense_type_real'
    input_radio_box.appendChild(expense_type_real_label )

    

    const dollar_amount = document.createElement('input')
    dollar_amount.type = 'text'
    dollar_amount.id = 'dollar_amount'
    dollar_amount.placeholder = 'Dolares'
    model_form.appendChild(dollar_amount)

    const bolivares_amount = document.createElement('input')
    bolivares_amount.type = 'text'
    bolivares_amount.id = 'bolivares_amount'
    bolivares_amount.placeholder = 'Bolivares'
    model_form.appendChild(bolivares_amount)

    const dollar_rate = document.createElement('input')
    dollar_rate.type = 'text'
    dollar_rate.id = 'dollar_rate'
    dollar_rate.placeholder = 'Tasa del dolar'
    model_form.appendChild(dollar_rate)

    const expense_concept = document.createElement('input')
    expense_concept.type = 'text'
    expense_concept.id = 'expense_concept'
    expense_concept.placeholder = 'Concepto'
    model_form.appendChild(expense_concept)

    const btn_send_request = document.createElement('button')
    btn_send_request.innerText = 'Aceptar'
    btn_send_request.type = 'submit'
    btn_send_request.id = 'btn_register_model'
    btn_send_request.className ='btn_send_request'
    btn_send_request.addEventListener('click',async()=>{
        await request_create_register_expense_concept()
        let expense_type = document.querySelectorAll('.expense_type')
        if(expense_type[0].checked){
            template_concept_expenses('Estimated')
        }
        else{
            template_concept_expenses('Real')
        }
    })
    
    model_form.appendChild(btn_send_request)

    const btn_close_model = document.createElement('button')
    btn_close_model.innerHTML = 'Cerrar'
    btn_close_model.id = 'btn_close_model'
    btn_close_model.type = 'Menu'
    btn_close_model.addEventListener('click',() =>{
        document.body.removeChild(model_box)
    })
    model_form.appendChild(btn_close_model)  

}

export function clear_model_register_expense_concept(){
    const dollar_amount = document.querySelector('#dollar_amount').value = ''
    const bolivares_amount = document.querySelector('#bolivares_amount').value = ''
    const dollar_rate = document.querySelector('#dollar_rate').value = ''
    const concept = document.querySelector('#expense_concept').value = ''
}

export function create_model_register_balance(){
    create_model_base()

    const model_form = document.querySelector('#model_form')
    const model_box = document.querySelector('.model_box')


    const header = document.createElement('header')
    header.innerText = 'Registrar Fondo'
    header.id = 'form_header'
    model_form.appendChild(header)

    const month_selection = document.createElement('select')
    month_selection.id = 'month_selection'
    model_form.appendChild(month_selection)

    months.forEach(element =>{
        const option_month = document.createElement('option')
        option_month.value = element
        option_month.innerText = element
        month_selection.appendChild(option_month)
    })

    const year_selection = document.createElement('select')
    year_selection.id = 'year_selection'
    model_form.appendChild(year_selection)

    const option_year = document.createElement('option')
    option_year.value = current_year
    option_year.innerText = current_year
    year_selection.appendChild(option_year)

    const dollar_amount = document.createElement('input')
    dollar_amount.type = 'text'
    dollar_amount.id = 'dollar_amount'
    dollar_amount.placeholder = 'Dolares'
    model_form.appendChild(dollar_amount)

    const bolivares_amount = document.createElement('input')
    bolivares_amount.type = 'text'
    bolivares_amount.id = 'bolivares_amount'
    bolivares_amount.placeholder = 'Bolivares'
    model_form.appendChild(bolivares_amount)

    const dollar_rate = document.createElement('input')
    dollar_rate.type = 'text'
    dollar_rate.id = 'dollar_rate'
    dollar_rate.placeholder = 'Tasa del dolar'
    model_form.appendChild(dollar_rate)

    const btn_send_request = document.createElement('button')
    btn_send_request.innerText = 'Aceptar'
    btn_send_request.type = 'submit'
    btn_send_request.id = 'btn_register_model'
    btn_send_request.className ='btn_send_request'
    btn_send_request.addEventListener('click', async ()=>{

        if(dollar_amount.value === ''){
            generate_message('Ingresa los dolares','error')
        }
        else if(bolivares_amount.value === ''){
            generate_message('Ingresa los bolivares','error')
        }
        else if(dollar_rate.value === ''){
            generate_message('Ingresa la tasa','error')
        }
        else{
            await create_register_residence_balance(
                year_selection.value,
                month_selection.value,
                dollar_amount.value,
                bolivares_amount.value,
                dollar_rate.value
            )

            dollar_amount.value = ''
            bolivares_amount.value = ''
            dollar_rate.value = ''
            template_residence_balance()
        }


    })
    model_form.appendChild(btn_send_request)

    const btn_close_model = document.createElement('button')
    btn_close_model.innerHTML = 'Cerrar'
    btn_close_model.id = 'btn_close_model'
    btn_close_model.type = 'Menu'
    btn_close_model.addEventListener('click',() =>{
        document.body.removeChild(model_box)
    })
    model_form.appendChild(btn_close_model)  
}

export function create_model_register_monthly_payment(){
    create_model_base()

    const model_form = document.querySelector('#model_form')
    const model_box = document.querySelector('.model_box')


    const header = document.createElement('header')
    header.innerText = 'Cuota del Mes'
    header.id = 'form_header'
    model_form.appendChild(header)

    const month_selection = document.createElement('select')
    month_selection.id = 'month_selection'
    model_form.appendChild(month_selection)

    months.forEach(element =>{
        const option_month = document.createElement('option')
        option_month.value = element
        option_month.innerText = element
        month_selection.appendChild(option_month)
    })

    const year_selection = document.createElement('select')
    year_selection.id = 'year_selection'
    model_form.appendChild(year_selection)

    const option_year = document.createElement('option')
    option_year.value = current_year
    option_year.innerText = current_year
    year_selection.appendChild(option_year)

    const dollar_amount = document.createElement('input')
    dollar_amount.type = 'text'
    dollar_amount.id = 'dollar_amount'
    dollar_amount.placeholder = 'Dolares'
    model_form.appendChild(dollar_amount)

    const comment = document.createElement('input')
    comment.type = 'text'
    comment.id = 'comment'
    comment.placeholder = 'Comentarios'
    model_form.appendChild(comment)

    const btn_send_request = document.createElement('button')
    btn_send_request.innerText = 'Aceptar'
    btn_send_request.type = 'submit'
    btn_send_request.id = 'btn_register_model'
    btn_send_request.className ='btn_send_request'
    btn_send_request.addEventListener('click', ()=>{
        if(dollar_amount.value === ''){
            generate_message('Ingresa los dolares','error')
        }
        else if(comment.value === ''){
            generate_message('Ingresa un comentario','error')
        }
        else{
            create_monthly_payment(
                year_selection.value,
                month_selection.value,
                dollar_amount.value,
                comment.value
                )
            dollar_amount.value = ''
            comment.value = ''

            template_monthly_payment()
        }
    })
    model_form.appendChild(btn_send_request)

    const btn_close_model = document.createElement('button')
    btn_close_model.innerHTML = 'Cerrar'
    btn_close_model.id = 'btn_close_model'
    btn_close_model.type = 'Menu'
    btn_close_model.addEventListener('click',() =>{
        document.body.removeChild(model_box)
    })
    model_form.appendChild(btn_close_model)  

}

export function create_model_modify_expense_concept(current_concept){
    const selected_month = document.querySelector('#month')
    const selected_year = document.querySelector('#year')

    create_model_base()

    const model_form = document.querySelector('#model_form')
    const model_box = document.querySelector('.model_box')


    const header = document.createElement('header')
    header.innerText = 'Modificar'
    header.id = 'form_header'
    model_form.appendChild(header)

    const month_selection = document.createElement('select')
    month_selection.id = 'month_selection'
    model_form.appendChild(month_selection)

    const option_month = document.createElement('option')
    option_month.value = selected_month.value
    option_month.innerText = selected_month.value
    month_selection.appendChild(option_month)

    const year_selection = document.createElement('select')
    year_selection.id = 'year_selection'
    model_form.appendChild(year_selection)

    const option_year = document.createElement('option')
    option_year.value = selected_year.value
    option_year.innerText = selected_year.value
    year_selection.appendChild(option_year)


    const dollar_amount = document.createElement('input')
    dollar_amount.type = 'text'
    dollar_amount.id = 'dollar_amount'
    dollar_amount.placeholder = 'Dolares'
    dollar_amount.value = current_concept.dollars
    model_form.appendChild(dollar_amount)

    const bolivares_amount = document.createElement('input')
    bolivares_amount.type = 'text'
    bolivares_amount.id = 'bolivares_amount'
    bolivares_amount.placeholder = 'Bolivares'
    bolivares_amount.value = current_concept.bolivares
    model_form.appendChild(bolivares_amount)

    const dollar_rate = document.createElement('input')
    dollar_rate.type = 'text'
    dollar_rate.id = 'dollar_rate'
    dollar_rate.placeholder = 'Tasa del dolar'
    dollar_rate.value = current_concept.dollar_rate
    model_form.appendChild(dollar_rate)

    const expense_concept = document.createElement('input')
    expense_concept.type = 'text'
    expense_concept.id = 'expense_concept'
    expense_concept.placeholder = 'Concepto'
    expense_concept.value = current_concept.concept
    model_form.appendChild(expense_concept)

    const btn_send_request = document.createElement('button')
    btn_send_request.innerText = 'Aceptar'
    btn_send_request.type = 'submit'
    btn_send_request.id = 'btn_register_model'
    btn_send_request.className ='btn_send_request'
    btn_send_request.addEventListener('click',async()=>{
        if(dollar_rate.value === ''){
            generate_message('Inserta la tasa','error')
        }
        else if(dollar_amount.value === ''){
            generate_message('Inserta los dolares','error')
        }
        else if(bolivares_amount.value === ''){
            generate_message('Inserta los bolivares','error')
        }
        else if(expense_concept.value === ''){
            generate_message('Ingresa un concepto','error')
        }
        else{
            const new_expense_concept = {
                dollar_rate:dollar_rate.value,
                dollars:dollar_amount.value,
                bolivares:bolivares_amount.value,
                concept:expense_concept.value,
                expense_concept_id:current_concept.expense_concept_id

            }
            await modify_expense_concept(new_expense_concept)
            dollar_rate.value = ''
            dollar_amount.value = ''
            bolivares_amount.value = ''
            expense_concept.value = ''

            template_concept_expenses(current_concept.type)
        }
    })
    model_form.appendChild(btn_send_request)

    const btn_close_model = document.createElement('button')
    btn_close_model.innerHTML = 'Cerrar'
    btn_close_model.id = 'btn_close_model'
    btn_close_model.type = 'Menu'
    btn_close_model.addEventListener('click',() =>{
        document.body.removeChild(model_box)
    })
    model_form.appendChild(btn_close_model)  

}