
/*Falta por agregar la validacion de cada tipo de dato
    Numerico, string etc.
*/

export default function validated_expense_concept_form(selected_year,selected_month,dollar_amount,bolivares_amount,dollar_rate,concept,expense_type){

    if(selected_year.value === ''){
        return {status:false,message:'Selecciona un año'}
    }
    else if(selected_month.value === ''){
        return {status:false,message:'Selecciona un mes'}
    }
    else if(dollar_amount.value === ''){
        return {status:false,message:'Ingresa los dolares'}
    }
    else if(bolivares_amount.value === ''){
        return {status:false,message:'Ingresa los bolivares'}
    }
    else if(dollar_rate.value === ''){
        return {status:false,message:'Ingresa la tasa'}
    }
    else if(concept.value === ''){
        return {status:false,message:'Ingresa el concepto'}
    }
    else if(expense_type[0].checked === false && expense_type[1].checked === false){
        return {status:false,message:'Ingresa el tipo de gasto Real/Estimado'}
    }

    return {status:true,message:''}
}