console.log('Client side Js ')


const weather = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
weather.addEventListener('submit',(e)=>
{
    const location = search.value
    msg1.textContent='Loading.......'
    msg2.textContent = ""

    e.preventDefault()
    //console.log(location)
    fetch('/weather?address='+location).then((response)=>
{ 
    response.json().then((data)=>{
       if(data.error){
           console.log(data.error)
       }
       else{
        msg1.textContent= data.location
        const str = data.forecast+ " degress celcius outside"
        msg2.textContent = str
        console.log(str)
       }
    })
})
})