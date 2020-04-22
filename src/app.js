const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const viewspath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
const app = express()
const home = path.join(__dirname, '../public')
app.set('view engine', 'hbs')
app.set('views',viewspath)
app.use(express.static(home))
hbs.registerPartials(partialPath)
// app.get('',(req,res)=>{
//     res.send('<h1>weather</h1>')
// })
// console.log(home)
app.get('',(req,res)=>
{
    res.render('index',{
        title:'weather App',
        name: 'karthik'
    })
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'ABOUT',
        name: 'KARTHIK'
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'HELP',
        name: 'karthik'
    })
})
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send("YOu must enter address")
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
{
    if(error)
    {
        return res.send({error})
    }
    weather(latitude,longitude,(error,forecastdat)=>
    {
        if(error)
        {
            return res.send({error})

        }
        res.send({
            forecast: forecastdat.response.temperature,
            location,
            address: req.query.address
        })

    })

})
})
app.get('/products',(req,res)=>
{
    if(!req.query.ser)
    {
        res.send({
            error: 'you must provide a serach term'
        })
    }else{
        console.log(req.query.ser)
    res.send({
        products:[]
    })

    }
    
})

app.listen(3000, () => {
    console.log('server started')
})
app.get('*',(req,res)=>{
    res.render('notfound',{
        title:'notfound',
        name: 'karthik'
    })
})
