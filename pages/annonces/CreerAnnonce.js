async function createAnnonce() {
    
    let title = document.querySelector('#title').value
    let description = document.querySelector('#description').value
    let image= document.querySelector('#image').value
    let lieu = document.querySelector('#lieu').value
    let date = document.querySelector('#date').value
    let participantsMax= document.querySelector('#participantsMax').value
     let userId = window.localStorage.getItem('userId')
    
    let annonce = {
        title: title,
        description: description,
        image: image,
        lieu: lieu,
        date: date,
        participantsMax: participantsMax,
        userId:userId,

    }

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(annonce),
    }

    let apiRequest = fetch('http://localhost:3333/createAnnonce', request)
    let response = await apiRequest
   
    if (response.status === 200) {
        
        window.location.href = 'annonce.html'
    }
}