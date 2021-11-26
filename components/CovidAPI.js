var tools = require("./helper.js");
const fetch = require("node-fetch")

//Function takes a location finds covid cases within 5kms and occuring less than 14 days ago. Returns cases.
async function getCasesOfConcern(location){
  const casesOfConcern = new Array()
  
  covidVenues = await getCovidVenues()
  currentLocation = await getLocationAsCoords(location)
  
  currentLocationLongitude = currentLocation.longitude
  currentLocationLatitude = currentLocation.latitude
  
  currentDate = tools.getCurrentDate()

  for (let i=0;i<covidVenues.length;i++){
    currentVenue = covidVenues[i]
    
    caseDate = tools.getConvertedDate(currentVenue["Date"])
    
    if (caseDate != "Invalid Date"){
      daysSinceCase = tools.getDaysBetweenDates(caseDate,currentDate)
      
      if (daysSinceCase < 15){
        caseSiteLongitude = currentVenue["Lon"]
        caseSiteLatitude = currentVenue["Lat"]

        distanceBetweenSiteAndLocation =tools.getDistanceBetweenCoords(caseSiteLatitude, caseSiteLongitude, currentLocationLatitude, currentLocationLongitude)
        
        if (distanceBetweenSiteAndLocation <= 5){

          casesOfConcern.push(currentVenue)
        }   
      }
    }   
  }
  return casesOfConcern

}

async function getCovidVenues() {
  url = "https://data.nsw.gov.au/data/dataset/0a52e6c1-bc0b-48af-8b45-d791a6d8e289/resource/f3a28eed-8c2a-437b-8ac1-2dab3cf760f9/download/covid-case-locations-20210802-0900.json"
  const response = await fetch(url)
  const data = await response.json()
  
  const covidVenues = data["data"]["monitor"]

  return covidVenues
}

async function getLocationAsCoords(location) { 
  url = "http://api.positionstack.com/v1/forward?access_key=<INSERT KEY HERE> &query="+location
  //ADD YOUR OWN KEY
  const response = await fetch(url)
  const data = await response.json()

  coordinates = data["data"][0]

  return {
    latitude: coordinates["latitude"],
    longitude: coordinates["longitude"]
  }

}



//User doesn't need to see Lon, Lat, HealthAdviceHTML, transmissionvenues

module.exports = {

  getUsefulInfo :async function(location) {
    casesOfConcern = await getCasesOfConcern(location)
    
    for (let i=0;i<casesOfConcern.length;i++){
      delete casesOfConcern[i]["HealthAdviceHTML"]
      delete casesOfConcern[i]["Lon"]
      delete casesOfConcern[i]["Lat"] 
      delete casesOfConcern[i]["transmissionvenues"]
      delete casesOfConcern[i]["Last updated date"]
    }
    return casesOfConcern;
  }

};








