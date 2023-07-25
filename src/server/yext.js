
const axios = require('axios');

function addLocation(values){

    var fieldNames = ['Country', 'Region', 'PlantId', 'PlantName', 'PlantPostCode', 'PlantAddressLine1', 'PlantTown', 'PlantCountry', 'PlantManagerName', 'PlantManagerPhone', 'PlantManagerEmail']
    var payload = {}

    for(var i=0;i<fieldNames.length;i++){
        payload[fieldNames[i]] = values[i];
    }
    axios.post(
    'https://api.yext.com/v2/accounts/me/connectors/locationData/pushData?v=20210428&api_key=1672afc05a20a465ff54ebd80e3fdc59',
    payload
  )
    .then(function (response) {
      if (response.status === 200) {
        console.log("Location added successfully");
      } else {
        console.log('Error', response.data);
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}



module.exports = {
  addLocation
};
