let card= document.querySelector('main');
async function getAllListings() {
    let apiCall = await fetch('http://localhost:3000/annonces')
    let response = await apiCall.json()
    let jwt= localStorage.getItem('jwt')
   

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
           </div>
           <div class="button-${annonce._id}"></div>
           
           ${annonce.userId === jwt ?`<div class='absolute -bottom-6  right-0'> <button onclick="deleteAnnonce()"><i class="fa-solid fa-trash text-sm text-blue-500"></i></button>
           <button onclick="deleteAnnonce()"><i class="fa-solid fa-pen text-sm text-red-600"></i></button></div>`:"" }
           </div>
           `
        //    if(annonce.userId === jwt){
        //     let btn =document.querySelector(`.button-${annonce._id}`)
        //     btn.innerHTML += ` <button onclick="deleteAnnonce()"><i class="fa-solid fa-trash"></i></button>
        //     <button onclick="deleteAnnonce()"><i class="fa-solid fa-pen"></i></button>`
        //     card.appendChild(btn)
        //    }
         
    })
}

getAllListings()