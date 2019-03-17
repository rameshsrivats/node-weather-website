console.log('client-side javascript file is loaded')
const formEl = document.querySelector('form')
const m1El = document.querySelector('#m1')
const m2El = document.querySelector('#m2')

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    m1El.textContent = 'Loading...'
    m2El.textContent = ''
    const url = 'http://localhost:3000/weather?address=' + e.target.elements[0].value
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1El.textContent = data.error
            } else {
                m1El.textContent = data.location
                m2El.textContent = data.forecast
            }            
        })
    })    
})

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log(data.error)
//         }
//         console.log(data.location)
//         console.log(data.forecast)
//     })
// })
