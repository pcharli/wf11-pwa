const installBtn = document.querySelector('.install')

let deferredPrompt = null

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
    installBtn.classList.remove('hidden')
})

installBtn.addEventListener('click', e => {
    e.preventDefault()
    installBtn.classList.add('hidden')
    deferredPrompt.prompt()

deferredPrompt.userChoice.
    then(choice => {
        if (choice === 'accepted') {
            console.log("Installation acceptée")
        } else {
            console.log("Instalation refusée")
        }
        deferredPrompt = null
    })

})

//affichage des bières
const beersList = document.querySelector('.beers')

if(beersList) {
fetch('https://api.punkapi.com/v2/beers/random')
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(beer => {
             beersList.innerHTML += `
                <li class="beer-item">${beer.name}</li>
                `
        })
    })
    .catch(err => console.log(err))
}