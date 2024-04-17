let card= document.querySelector('main');


async function getAllAnnonces() {
    let apiCall = await fetch('http://localhost:3333/annonces')
    let response = await apiCall.json()
    let jwt=localStorage.getItem('jwt')
    let userId= localStorage.getItem('userId')

   

   
    response.forEach((annonce) => {
        console.log(annonce.participants)
        let User;
        annonce.participants.forEach((participant)=>{
            if(participant===userId){User= true}
            if(User===true){

        
      
        card.innerHTML += `
        <div class="relative w-9/12 px-2 m-4 flex flex-row items-center justify-between gap-4  bg-gray-200 rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <button onclick="userModale('${annonce._id}')" href="#modale"><img src='${annonce.image}' class='w-32 rounded-md h-32 object-cover' /></button>
        <div class="flex flex-col justify-around">
         <h2 class="font-bold">${annonce.title}</h2>
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
                if(participant===userId){foundParticipant= true}
                

                })  
                 if(annonce.participants.length  == annonce.participantsMax){
                    card.innerHTML +=`<div class="flex flex-row justify-center items-center mb-10">
                     <button class="bg-blue-500 p-2 rounded ">Complet</button>
                     </div>`
                 } 
               
             else if(foundParticipant === true){
                  card.innerHTML +=`<div class="flex flex-row justify-center items-center mb-10">
                  <button onclick="deleteParticipant('${annonce._id}')"class="bg-red-600 p-2 rounded">Annuler</button>
                  </div>`
             }

             else {
                 card.innerHTML +=`<div class="flex flex-row justify-center items-center mb-10">
                 <button onclick="ajoutParticipant('${annonce._id}')  class="bg-blue-500 p-2 rounded">Participer</button>
                 </div>`
                }    
                
                
          }
        
        }) 
            

        
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
    
    setTimeout(()=>{
        
        window.location.reload() 
    },750)
   
}
async function deleteParticipant(id){
    const jwt= localStorage.getItem('jwt')

    if(!jwt){
        console.log('jwt invalide')
    }
    let request = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${jwt}`,
        },
        }
    await fetch(`http://localhost:3333/deleteParticipant/${id}`, request)
    console.log(jwt)
    setTimeout(()=>{
        
         window.location.reload() 
    },750)
   
}

// redirection vers update
function updateAnnonce(id){
    localStorage.setItem('annonce', id)
        window.location.href='modifierAnnonce.html'
}




let burgerbtn=document.querySelector('.nav')
async function burger(){
    burgerbtn.classList.toggle('hidden')
}
let modale=document.querySelector('.modale')
async function userModale(id){
    modale.classList.remove('hidden');
    card.classList.add('hidden')

    
   const apiUser= await fetch('http://localhost:3333/getAllUser')
   const responseUser= await apiUser.json()
   console.log(responseUser);
   const annonceById= await fetch(`http://localhost:3333/annonce/${id}`)
   const responseAnnonceById= await annonceById.json()
   const annonce= await fetch(`http://localhost:3333/annonces`)
   const responseAnnonce= await annonce.json()

  responseAnnonce.forEach(annonce=>{
    
    
        if(id===annonce._id){
    modale.innerHTML=`<div id=modale class="flex flex-col gap-4 m-8">
    <button onclick="backModal()" class="bg-blue-500 p-2 rounded">Retour</button>
    <h2 class="font-bold">${annonce.title}<h2>
    <p>${annonce.description}<p>
    <p>${annonce.lieu}</p>
    <p>${annonce.date}</p>
    <p>${annonce.participants.length}/${annonce.participantsMax} participants</p>
    <p class="font-bold m-4">Participants</p>`
}
})
responseAnnonceById.participants.forEach(participant => {
    responseUser.forEach((user)=>{
        
        if(participant===user._id){
           
          modale.innerHTML +=`
          <div class="flex flex-row gap-4 m-4">
        
        
        
         <p>Prenom :  ${user.firstName}</p>
        <p>Nom : ${user.lastName}</p>
        
        
        </div>
        `}
        

    })
   
    
        
   }); 
   }
async function backModal(){
    card.classList.remove('hidden')
     modale.classList.add('hidden')
    window.location.reload()
   }

  async function logout(){
    localStorage.removeItem("jwt")
    localStorage.removeItem("userId")
    window.location.href="../login/acceuil.html"
    
  }
    