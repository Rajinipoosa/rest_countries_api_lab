var app = function(){
   var url = "https://restcountries.eu/rest/v2"
   makeRequest(url, requestComplete);
  
   var select = document.getElementById("country-select");
   select.addEventListener("change",selectCountriesdropdown);
  
   var jsonSavedCountry = localStorage.getItem("country");
   var objectSavedCountryArray = JSON.parse(jsonSavedCountry);

    addCountryDetails(objectSavedCountryArray[0]);  

    // MAPS
    var objectlat = objectSavedCountryArray[0].latlng[0];
    var objectlng = objectSavedCountryArray[0].latlng[1];

    var center = {lat: objectlat,lng: objectlng};
    var container =document.getElementById("main-map");
    var mainMapWrapper = new MapWrapper(center, 5,container);

}
var selectCountriesdropdown = function(){
  var url = "https://restcountries.eu/rest/v2/name/" + this.value  
  makeRequest(url, requestCountry)
}

var requestCountry = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var countryObject = JSON.parse(jsonString)[0];
  // var jsonCountry = JSON.stringify(country);
  localStorage.setItem("country",jsonString);
  addCountryDetails(countryObject);

//map attributes
  var objectlat = countryObject.latlng[0];
  var objectlng = countryObject.latlng[1];

  var center = {lat: objectlat,lng: objectlng};
  var container =document.getElementById("main-map");
  var mainMapWrapper = new MapWrapper(center, 5,container);
}
//adding the countries details
var addCountryDetails = function(countryObject){
  var ul = document.getElementById("country-list");

  ul.innerHTML = ""

  var liName = document.createElement("li");
  liName.innerText = "Name: " + countryObject.name;
  ul.appendChild(liName);

  var liPop = document.createElement("li");
  liPop.innerText = "Population: " + countryObject.population;
  ul.appendChild(liPop);

  var liCap = document.createElement("li");
  liCap.innerText = "Capital: " + countryObject.capital;
  ul.appendChild(liCap);

  addBorderDeatils(countryObject);

}
//adding the borderdetails
var addBorderDeatils = function(countryObject){
  var ul = document.getElementById("borders-list");
   ul.innerHTML = ""

   var borderNamesArray = countryObject.borders
   borderNamesArray.forEach( function(bordName) {
    var borderName = document.createElement("li");
    borderName.innerText = "Bordering Country:" + bordName;
    ul.appendChild(borderName);


   });    





   // var url = "https://restcountries.eu/rest/v2/name/" + this.value  
   // makeRequest(url, requestCountry)
}


var populateList = function(countries){ 
  var select = document.getElementById("country-select");
  var jsonSavedCountry = localStorage.getItem("country");
  var objectSavedCountryArray = JSON.parse(jsonSavedCountry);

  countries.forEach(function(country){
    var option = document.createElement("option");
    option.innerText = country.name

    if (country.name === objectSavedCountryArray[0].name){
      option.selected = true;
    }

    select.appendChild(option);
  })
}


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", callback)

  request.send();
}
var requestComplete = function(){
  console.log("requestComplete hit");
// THIS REFERS TO XMLHttpRequest OBJECT
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);

  populateList(countries);
}

window.addEventListener('load', app);