let card= document.querySelector('main');


async function getAllListings() {
    let apiCall = await fetch('http://localhost:3333/annonces')
    let response = await apiCall.json()
    let userId= localStorage.getItem('userId')
   

   
    response.forEach((annonce) => {
        card.innerHTML += `
        <div class="relative container mx-auto my-8 w-full px-2 flex flex-row items-center justify-between gap-x-4 bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <img src='${annonce.image}' class='w-32 rounded-md h-32 object-cover' />
        <div class="flex flex-col justify-around">
         <h2>${annonce.title}</h2>
          <p>${annonce.description}</p>
          </div>
          <div>
           <p>${annonce.lieu}</p>
           <p>${annonce.date}</p>
           ${annonce.participants.length -1 === annonce.participantsMax ? "<p>Complet</p>":
           `<p>${annonce.participants.length -1}/${annonce.participantsMax}</p>`}
          <div class='participation'>
          
            </div>
           </div>

           ${annonce.userId === userId ?`<div class='absolute -bottom-6 right-0 '> 
           <button onclick="deleteAnnonce('${annonce._id}')"><i class="fa-solid fa-trash text-sm text-blue-500"></i></button>
           <button onclick="updateAnnonce('${annonce._id}')" class="update"><i class="fa-solid fa-pen text-sm text-red-600"></i></button>
           </div>`:"" }
           </div>`

           const participation= document.querySelector('.participation')
            
             if(annonce.participants.filter(participant =>participant.userId)){

                participation.innerHTML =`<button>Annuler</button>`

                 return card.appendChild(participation) 

            }else if(!annonce.participants.filter(participant=> participant.userId)){
                
                participation.innerHTML=`<button>Participer</button>`
                    return card.appendChild(participation)
            }   
               
            
          
            
           
        })
           
  
         
    }


getAllListings()

async function deleteAnnonce(id){
    let request = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
        },
    }
    const bdsuppr= await fetch(`http://localhost:3333/suppression/${id}`, request)
    
    window.location.reload()
    

}

// redirection vers update
function updateAnnonce(id, ){
    localStorage.setItem('annonce', id)
        window.location.href='modifierAnnonce.html'
}



