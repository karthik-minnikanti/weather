const request = require('request')
const geocode = (address,callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2FydGhpazE3MTEiLCJhIjoiY2s5N2VjZmd4MDB1ZzNtcGE3djhyZW9ocSJ9.eXyeA7C24HGo879NWxgc0g&limit=1'
    request({url:url , json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect',undefined)
        }else if(response.body.length == 0){
            callback('unable to find location',undefined)

         }else if (response.body.features.length == 0) {
             callback({location:'Unable to find location. Try another search.'}, undefined)}
        else{
            
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
    
    }})
}
module.exports = geocode