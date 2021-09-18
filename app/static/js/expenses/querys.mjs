import create_loader from './widgets.mjs'
import {remove_loader,generate_message} from './widgets.mjs'
import validated_expense_concept_form from './administrator/functions.mjs'
import {clear_model_register_expense_concept} from './administrator/models.mjs'


export default function get_url(prefix,direction){
    return window.location.origin+prefix+direction 
}


export async function request_create_register_expense(){


    const selected_month = document.querySelector('#month_selection')
    const selected_year = document.querySelector('#year_selection')

    const expense = {
        month:selected_month.value,
        year:selected_year.value
    }

    const url = get_url('/api','/create_expense')

    create_loader()
    try{
        let request = await fetch(url,{
            method: 'POST',
            cache:'no-cache',
            body: JSON.stringify(expense),
            credentials:'include',
            headers:new Headers({
                'content-type':'application/json'
            })
        })
        request = await request.json()
        remove_loader()
        if(request.status === 200){
            generate_message(request.message,'notification')
        }
        else{
            generate_message(request.message,'error')
        }

    }catch(e){
        remove_loader()
        generate_message('Error de conexion','error')
    }   
}

export async function request_create_register_expense_concept(){
    const selected_year = document.querySelector('#year_selection')
    const selected_month = document.querySelector('#month_selection')
    const dollar_amount = document.querySelector('#dollar_amount')
    const bolivares_amount = document.querySelector('#bolivares_amount')
    const dollar_rate = document.querySelector('#dollar_rate')
    const concept = document.querySelector('#expense_concept')
    let expense_type = document.querySelectorAll('.expense_type')

    const form_validation = validated_expense_concept_form(
        selected_year,
        selected_month,
        dollar_amount,
        bolivares_amount,
        dollar_rate,
        concept,
        expense_type
        )

    if(form_validation.status === false){
        generate_message(form_validation.message,'error')
        return false
    }

    if(expense_type[0].checked){
        expense_type = 'Estimated'
    }
    else{
        expense_type = 'Real'
    }


    const expense_concept = {
        year:selected_year.value,
        month:selected_month.value,
        dollars:dollar_amount.value,
        bolivares:bolivares_amount.value,
        dollar_rate:dollar_rate.value,
        concept:concept.value,
        type:expense_type
    }

    const url = get_url('/api','/create_expense_concept')

    create_loader()
    try{
        let request = await fetch(url,{
            method: 'POST',
            cache:'no-cache',
            body: JSON.stringify(expense_concept),
            credentials:'include',
            headers:new Headers({
                'content-type':'application/json'
            })
        })
        
        request = await request.json()
        remove_loader()
        if(request.status === 200){
            generate_message(request.message,'notification')
            clear_model_register_expense_concept()
        }
        else{
            generate_message(request.message,'error')
        }
    }catch(e){
        remove_loader()
        generate_message(e,'error')
    }
    
}

export async function get_all_concepts_expenses(expense_concept_type){
    const selected_month = document.querySelector('#month')
    const selected_year = document.querySelector('#year')

    const url = get_url('/api','/get_all_concepts_expenses')+'/'+selected_year.value+'/'+selected_month.value+'/'+expense_concept_type

    create_loader()
    try{
        let request = await fetch(url)
        request = await request.json()
        remove_loader()
        if(request.status === 200){
            return request.content
        }
        else{
            return null
        }


    }catch(e){
        remove_loader()
        generate_message(e,'error')
        console.log(e)
    }
}

export async function get_total_expense(expense_concept_type){
    const selected_month = document.querySelector('#month')
    const selected_year = document.querySelector('#year')

    const url = get_url('/api','/get_total_expense')+'/'+selected_year.value+'/'+selected_month.value+'/'+expense_concept_type

    

    try{
        let request = await fetch(url)
        request = await request.json()

        if(request.status === 200){
            return request.content
        }else{
            return null
        }
    }catch(e){
        remove_loader()
        console.log(e)
    }
}

export async function delete_expense_concept(expense_concept_id){

    const url = get_url('/api','/delete_expense_concept/')+expense_concept_id
    create_loader()
   try{
        let request = await fetch(url,{
            method: 'DELETE',
            cache:'no-cache',
            credentials:'include',
            headers:new Headers({
                'content-type':'application/json'
            })
        })
        request = await request.json()
        remove_loader()
        generate_message(request.message,'notification')
   }catch(e){
       remove_loader()
       console.log(e)
   }
}

export async function modify_expense_concept(new_expense_concept){
    const url = get_url('/api','/modify_expense_concept')+'/'+new_expense_concept.expense_concept_id


    create_loader()
    try{
        let request = await fetch(url,{
            method: 'PUT',
            cache:'no-cache',
            body: JSON.stringify(new_expense_concept),
            credentials:'include',
            headers:new Headers({
                'content-type':'application/json'
            })
        })
        request = await request.json()
        generate_message(request.message,'notification')
    }catch(e){
        console.log(e)
    }finally{
        remove_loader()
    }
    
}

export async function create_register_residence_balance(year,month,dollars,bolivares,dollar_rate){
    const url = get_url('/api','/create_balance')

    const balance = {
        year,
        month,
        dollars,
        bolivares,
        dollar_rate
    }

    create_loader()

    try{
        let request = await fetch(url,{
            method: 'POST',
            cache:'no-cache',
            body: JSON.stringify(balance),
            credentials:'include',
            headers:new Headers({
                'content-type':'application/json'
            })
        })
        request = await request.json()
        generate_message(request.message,'notification')
    }catch(e){
        console.log(e)
    }finally{
        remove_loader()
    }

}

export async function get_residence_balance(year,month){

    const url = get_url('/api','/get_balance')+'/'+year+'/'+month
    create_loader()
    try{
        let request = await fetch(url)
        request = await request.json()
        if(request.status === 200){
            return request.content
        }
        else{
            return null
        }
    }catch(e){
        console.log(e)
    }finally{
        remove_loader()
    }

}

export async function create_monthly_payment(year,month,dollars,comment){

    const url = get_url('/api','/create_monthly_payment')

    const monthly_payment = {
        year,
        month,
        dollars,
        comment
    }

    create_loader()
    try{
        let request = await fetch(url,{
            method: 'POST',
            cache:'no-cache',
            body: JSON.stringify(monthly_payment),
            credentials:'include',
            headers:new Headers({
                'content-type':'application/json'
            })
        })
        request = await request.json()
        generate_message(request.message,'notification')
    }catch(e){
        console.log(e)
        generate_message(e,'notification')
    }finally{
        remove_loader()
    }


}

export async function get_monthly_payment(year,month){

    const url = get_url('/api','/get_monthly_payment')+'/'+year+'/'+month

    create_loader()
    try{
        let request = await fetch(url)
        request = await request.json()
        if(request.status === 200){
            return request.content
        }
        else{
            return null
        }
    }catch(e){
        console.log(e)
    }finally{
        remove_loader()
    }
}