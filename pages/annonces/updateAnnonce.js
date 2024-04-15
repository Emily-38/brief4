
const id = localStorage.getItem('annonce')

async function annonceById(){

const ById= await fetch(`http://localhost:3333/annonce/${id}`)
const annonce= await ById.json()

let title=document.querySelector('#title')
let description=document.querySelector('#description')
let image=document.querySelector('#image')
let lieu=document.querySelector('#lieu')
let date=document.querySelector('#date')
let participantsMax=document.querySelector('#participantsMax')

title.value= annonce.title
description.value= annonce.description
image.value= annonce.image
lieu.value= annonce.lieu
date.value= annonce.date
participantsMax.value= annonce.participantsMax

}
annonceById()

async function updateAnnonce(){

const jwt= localStorage.getItem('jwt')
    let title= document.querySelector('#title').value
    let description= document.querySelector('#description').value
    let image= document.querySelector('#image').value
    let lieu= document.querySelector('#lieu').value
    let date= document.querySelector('#date').value
    let participantsMax= document.querySelector('#participantsMax').value
if(!jwt){
    console.log('erreur')
}

    let annonce = {
        title: title,
        description: description,
        image: image,
        lieu: lieu,
        date: date,
        participantsMax: participantsMax,
    }

    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(annonce),
    }

        const dbUpdate= await fetch(`http://localhost:3333/update/${id}`, request)
        
        console.log(dbUpdate.status)
       if(dbUpdate.status === 200){
        localStorage.removeItem('annonce')
             window.location.href = 'annonce.html'
        }else{
            window.location.reload()
        }
    
    
}