let card= document.querySelector('main');


async function getAllAnnonces() {
    let apiCall = await fetch('http://localhost:3333/annonces')
    let response = await apiCall.json()
    let jwt=localStorage.getItem('jwt')
    let userId= localStorage.getItem('userId')

   

   
    response.forEach((annonce) => {
        
        card.innerHTML += `
        <div class="relative container mx-auto  w-full px-2 flex flex-row items-center justify-between gap-x-4 bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <img src='${annonce.image}' class='w-32 rounded-md h-32 object-cover' />
        <div class="flex flex-col justify-around">
         <h2>${annonce.title}</h2>
          <p>${annonce.description}</p>
          </div>
          <div>
           <p>${annonce.lieu}</p>
           <p>${annonce.date}</p>
           ${annonce.participants.length  == annonce.participantsMax ? "<p>Complet</p>":
           `<p>${annonce.participants.length }/${annonce.participantsMax}</p>`}
           </div>

           ${annonce.userId === userId ?`<div class='btn absolute -bottom-6 right-0 '> 
           <button onclick="deleteAnnonce('${annonce._id}')"><i class="fa-solid fa-trash text-sm text-blue-500"></i></button>
           <button onclick="updateAnnonce('${annonce._id}')" class="update"><i class="fa-solid fa-pen text-sm text-red-600"></i></button>
           </div>`:"" }
           </div>`

           // affichage bouton
           let foundParticipant;
           annonce.participants.forEach((participant)=>{
                if(participant.id===userId){foundParticipant= true}
                

                })  
                 if(annonce.participants.length  == annonce.participantsMax){
                    card.innerHTML +=`<div class="flex flex-row justify-center items-center mb-10">
                     <button onclick="" class="bg-blue-500 p-2 rounded">Complet</button>
                     </div>`
                 } 
               
             else if(foundParticipant === true){
                  card.innerHTML +=`<div class="flex flex-row justify-center items-center mb-10">
                  <button onclick="deletePaticipant('${annonce._id}')"class="bg-red-600 p-2 rounded">Annuler</button>
                  </div>`
             }

             else {
                 card.innerHTML +=`<div class="flex flex-row justify-center items-center mb-10">
                 <button onclick="ajoutParticipant('${annonce._id}')" class="bg-blue-500 p-2 rounded">Participer</button>
                 </div>`
                }     
           
        })
         
    }


getAllAnnonces()

// supprimer l'article
async function deleteAnnonce(id){
const jwt= localStorage.getItem('jwt')

    if(!jwt){
        console.log('jwt invalide')
    }

    let request = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
    }
    await fetch(`http://localhost:3333/suppression/${id}`, request)
   
    window.location.reload()
    
}
//ajout participant
async function ajoutParticipant(id){
    const jwt= localStorage.getItem('jwt')

    if(!jwt){
        console.log('jwt invalide')
    }
    let request = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        }
    await fetch(`http://localhost:3333/addParticpant/${id}`, request)
    window.location.reload()
}

// redirection vers update
function updateAnnonce(id){
    localStorage.setItem('annonce', id)
        window.location.href='modifierAnnonce.html'
}



