var MapWrapper = function(position,zoom,container){
  this.googleMap = new google.maps.Map(container,{
    zoom:zoom,
    center:position
  })

}