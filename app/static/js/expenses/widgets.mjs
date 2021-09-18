export default function create_loader(){
    const loader_container = document.createElement('div')
    loader_container.className = 'loader_container'
    const loader_box = document.createElement('div')
    loader_box.className = 'loader_box'
    loader_container.appendChild(loader_box)

    const loader_second_box = document.createElement('div')
    loader_second_box.className = 'loader_second_box'
    loader_box.appendChild(loader_second_box)

    const loader = document.createElement('div')
    loader.className = 'loader'
    loader_second_box.appendChild(loader)

    const p = document.createElement('p')
    p.innerText = 'Cargando...'
    loader_second_box.appendChild(p)

    document.body.prepend(loader_container)
}

export function remove_loader(){
    const loader_container = document.querySelector('.loader_container')
    document.body.removeChild(loader_container)
}

export function generate_message(message_content,message_type){
    const get_message = document.querySelector('.message')
    if(get_message != null){
        document.body.removeChild(get_message)
    }
    if(message_type === 'error'){
        const message = document.createElement('p')
        message.className = 'message'
        message.id = 'error'
        message.innerText = message_content
        document.body.prepend(message)
    }
    else{
        const message = document.createElement('p')
        message.className = 'message'
        message.id = 'notification'
        message.innerText = message_content
        document.body.prepend(message)
    }
}

