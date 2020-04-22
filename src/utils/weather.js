const request = require('request')
const weather=(lan,lat,callback)=>
{
    const url = 'http://api.weatherstack.com/current?access_key=a498dd83716989c7e5ffc3e04140ec4f&query='+lan+','+lat
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect','undefined')
        }
        else {
            callback(undefined,{
                response: response.body.current
            })
        }

    })
}
module.exports= weather