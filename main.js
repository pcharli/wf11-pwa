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


//NOTIFICATION
const notifyMe = () => {
    let myNotification = null
    const options = {
        body: "Envoyé par Pierre",
        icon: "icons/favicon-32x32.png",
        vibrate: [200,100,200,100,200,100,200],
        url: "https://www.lesoir.be"
    }
    if( !("Notification" in window) ) {
        alert('Pas de notification dans ce navigateur')
    } else if (Notification.permission === "granted") {
        console.log("Notification possible")
        myNotification = new Notification('Hi me !', options)
    } else { //demande de permission
        Notification.requestPermission().then( permission => {
            if (permission === "granted") {
                console.log("Notification possible")
                myNotification = new Notification('Oh, Thank You !', options)
            }
        })
    }
}

if(Notification.permission !== 'granted') {
    if(confirm('Recevoir notifications ?')) {
        notifyMe()
    }
}

const $btnNotify = document.querySelector('.notification').addEventListener('click', e=> {
    e.preventDefault()
    notifyMe()
})