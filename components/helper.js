function deg2rad(deg){return deg * (Math.PI/180)}

module.exports = {

  getCurrentDate : function(){
    // return new Date().toJSON().slice(0,10).replace(/-/g,'/');
    //return new Date (new Date().toLocaleDateString());
    return new Date(new Date().toJSON().slice(0,10).replace(/-/g,'/'));
  },
  
  getConvertedDate: function(inputDate){
    var splitDate = inputDate.split(" ")
    var temp = Number(splitDate[1])+1;
  //Note to myself: This is terrible code that exists because JS date is weird: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    return new Date(splitDate[2]+" "+String(temp)+", "+splitDate[3]);
},

//function only takes Date objects
  getDaysBetweenDates : function(date1,date2){
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days= Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days < 0? -Difference_In_Days: Difference_In_Days;
  },

  //NOTE: This is an implementation of the haversine formula ie as the crow flies
  getDistanceBetweenCoords: function(lat1, lon1, lat2, lon2){
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

};


