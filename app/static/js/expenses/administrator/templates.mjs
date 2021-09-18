import 
{ 
    get_all_concepts_expenses,
    get_total_expense,delete_expense_concept,
    get_residence_balance ,
    get_monthly_payment
} 
    from "../querys.mjs"

import { create_model_modify_expense_concept } from "./models.mjs"

const owner_amount = 17
/* Aun falta por arreglar el bug de duplicacion de los registros al momento de mostrar la plantilla */
export default async function template_concept_expenses(expense_concept_type){


    const content = document.querySelector('.content')
    const records_container = document.querySelector('.records-container')
    records_container.innerHTML = ''
    
    const expenses = await get_all_concepts_expenses(expense_concept_type)
    const total_expense = await get_total_expense(expense_concept_type)

    if(expenses === null){
        return 0
    }


    const information_box = document.querySelector('.information-box')
    information_box.innerHTML = ''


    const emptybox = document.createElement('div')
    emptybox.className = 'emptybox'

    const total_expense_label = document.createElement('p')
    if(expense_concept_type === 'Estimated')
    {
        total_expense_label.innerText = 'Gasto Estimado Total: '+total_expense.toFixed(2)+' $'
    }
    else{
        total_expense_label.innerText = 'Gasto Real Total: '+total_expense.toFixed(2)+' $'
    }
    total_expense_label.className = 'information-item'

    const total_quot = document.createElement('p')
    total_quot.innerText = 'Inmueble: '+(total_expense/owner_amount).toFixed(2)+' $'
    total_quot.className = 'information-item'
    
    information_box.appendChild(emptybox)
    information_box.appendChild(total_expense_label)
    information_box.appendChild(total_quot)


    expenses.forEach((element,index) => {
        
        const first_box = document.createElement('div')
        first_box.className = 'first-box'

        const description = document.createElement('p')
        description.className = 'description'
        description.innerText = element.concept

        first_box.appendChild(description)

        const second_box = document.createElement('div')
        second_box.className = 'second-box'
        first_box.appendChild(second_box)

        const item_list = document.createElement('ul')
        item_list.className = 'item-lists'

        second_box.appendChild(item_list)

        
        const list_item_dollars = document.createElement('li')
        list_item_dollars.className = 'list-item'
        list_item_dollars.id = 'item-dollars'
        list_item_dollars.innerText = element.dollars.toFixed(2)+' $'
        item_list.appendChild(list_item_dollars)

        const list_item_bolivares = document.createElement('li')
        list_item_bolivares.className = 'list-item'
        list_item_bolivares.id = 'item-bolivares'
        list_item_bolivares.innerText = element.bolivares.toFixed(2)+' Bs. S'
        item_list.appendChild(list_item_bolivares)

        const list_item_dollar_rate = document.createElement('li')
        list_item_dollar_rate.className = 'list-item'
        list_item_dollar_rate.id = 'item-dollar-rate'
        list_item_dollar_rate.innerText = element.dollar_rate.toFixed(2)+' Bs. S - Tasa' 
        item_list.appendChild(list_item_dollar_rate)

        const img_box = document.createElement('div')
        img_box.className = 'img-box'
        first_box.appendChild(img_box)

        const delete_option = document.createElement('img')
        delete_option.id = 'opt-delete'
        delete_option.src = '/static/images/expenses/delete.png'
        delete_option.addEventListener('click', async () =>{
            await delete_expense_concept(element.expense_concept_id)
            first_box.parentNode.removeChild(first_box)
            template_concept_expenses(expense_concept_type)
        })
        img_box.appendChild(delete_option)

        const edit_option = document.createElement('img')
        edit_option.id = 'opt-edit'
        edit_option.src = '/static/images/expenses/edit.png'
        edit_option.addEventListener('click',()=>{
            create_model_modify_expense_concept(element)
        })
        img_box.appendChild(edit_option)

        records_container.appendChild(first_box)

        
    });
    content.appendChild(records_container)
}

export async function template_residence_balance(){


    const selected_month = document.querySelector('#month').value
    const selected_year = document.querySelector('#year').value

    const residence_balance = await get_residence_balance(selected_year,selected_month)

    if(residence_balance === null){
        const records_container = document.querySelector('.records-container')
        records_container.innerHTML = ''
    
        const information_box = document.querySelector('.information-box')
        information_box.innerHTML = ''
        return 0
    }
    

    const records_container = document.querySelector('.records-container')
    records_container.innerHTML = ''

    const information_box = document.querySelector('.information-box')
    information_box.innerHTML = ''

    const emptybox = document.createElement('div')
    emptybox.className = 'emptybox'

    const total_balance = document.createElement('p')
    total_balance.innerText = 'Fondo: '+(residence_balance.dollars+(residence_balance.bolivares/residence_balance.dollar_rate)).toFixed(2)+' $'
    total_balance.className = 'information-item'

    const total_change = document.createElement('p')
    total_change.innerText = 'Bolivares en Dolares: '+(residence_balance.bolivares/residence_balance.dollar_rate).toFixed(2)+' $'
    total_change.className = 'information-item'
    
    information_box.appendChild(emptybox)
    information_box.appendChild(total_balance)
    information_box.appendChild(total_change)

    const first_box = document.createElement('div')
    first_box.className = 'first-box'

    const description = document.createElement('p')
    description.className = 'description'
    description.innerText = 'Fondo del Condominio'

    first_box.appendChild(description)

    const second_box = document.createElement('div')
    second_box.className = 'second-box'
    first_box.appendChild(second_box)

    const item_list = document.createElement('ul')
    item_list.className = 'item-lists'

    second_box.appendChild(item_list)

    
    const list_item_dollars = document.createElement('li')
    list_item_dollars.className = 'list-item'
    list_item_dollars.id = 'item-dollars'
    list_item_dollars.innerText = residence_balance.dollars.toFixed(2)+' $'
    item_list.appendChild(list_item_dollars)

    const list_item_bolivares = document.createElement('li')
    list_item_bolivares.className = 'list-item'
    list_item_bolivares.id = 'item-bolivares'
    list_item_bolivares.innerText = residence_balance.bolivares.toFixed(2)+' Bs. S'
    item_list.appendChild(list_item_bolivares)

    const list_item_dollar_rate = document.createElement('li')
    list_item_dollar_rate.className = 'list-item'
    list_item_dollar_rate.id = 'item-dollar-rate'
    list_item_dollar_rate.innerText = residence_balance.dollar_rate.toFixed(2)+' Bs. S - Tasa '
    item_list.appendChild(list_item_dollar_rate)

    const img_box = document.createElement('div')
    img_box.className = 'img-box'
    first_box.appendChild(img_box)

    const delete_option = document.createElement('img')
    delete_option.id = 'opt-delete'
    delete_option.src = '/static/images/expenses/delete.png'
    img_box.appendChild(delete_option)

    const edit_option = document.createElement('img')
    edit_option.id = 'opt-edit'
    edit_option.src = '/static/images/expenses/edit.png'
    img_box.appendChild(edit_option)

    records_container.appendChild(first_box)
}

export async function template_monthly_payment(){

    const selected_month = document.querySelector('#month').value
    const selected_year = document.querySelector('#year').value

    const monthly_payment = await get_monthly_payment(selected_year,selected_month)
    const information_box = document.querySelector('.information-box')
    information_box.innerHTML = ''

    if(monthly_payment === null){
        return 0
    }

    const records_container = document.querySelector('.records-container')
    records_container.innerHTML = ''

    const first_box = document.createElement('div')
    first_box.className = 'first-box'

    const description = document.createElement('p')
    description.className = 'description'
    description.innerText = monthly_payment.comment

    first_box.appendChild(description)

    const second_box = document.createElement('div')
    second_box.className = 'second-box'
    first_box.appendChild(second_box)

    const item_list = document.createElement('ul')
    item_list.className = 'item-lists'

    second_box.appendChild(item_list)

    
    const list_item_dollars = document.createElement('li')
    list_item_dollars.className = 'list-item'
    list_item_dollars.id = 'item-dollars'
    list_item_dollars.innerText = monthly_payment.dollars.toFixed(2)+' $'
    item_list.appendChild(list_item_dollars)

    const img_box = document.createElement('div')
    img_box.className = 'img-box'
    first_box.appendChild(img_box)

    const delete_option = document.createElement('img')
    delete_option.id = 'opt-delete'
    delete_option.src = '/static/images/expenses/delete.png'
    img_box.appendChild(delete_option)

    const edit_option = document.createElement('img')
    edit_option.id = 'opt-edit'
    edit_option.src = '/static/images/expenses/edit.png'
    img_box.appendChild(edit_option)

    records_container.appendChild(first_box)


}
 