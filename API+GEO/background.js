function foundLocation(position) {
	var latitud = position.coords.latitude;
	var longitud = position.coords.longitude;
	
	var url='http://a3460185602.api.wxbug.net/getLiveWeatherRSS.aspx?ACode=A3460185602&lat=';
	url += latitud.toString();
	url += '&long=';
	url += longitud.toString();
	url += '&UnitType=1&OutputType=1';
	$.get(url,{},function(xml){
		var imagen=$('ob', xml).find("current-condition").attr('icon');
		var estacion=$('ob', xml).find("station").text();
		var temperatura=$('ob', xml).find("temp").text();
		var viento=$('ob', xml).find("wind-speed ").text();
		var humedad=$('ob', xml).find("humidity").text();

		HTMLcontent = '<h1>Datos tomados de "'+estacion+'"</h1>';
	 	HTMLcontent += '<table width="70%" border="1" cellpadding="0" cellspacing="0">';
	  	HTMLcontent += '<tr><td><h2>Tiempo actual</h2></td><td><p>'+'<img src="'+imagen+'" border="0">'+'</p></td></tr>';
		HTMLcontent += '<tr><td><h2>Temperatura</h2></td><td><p>'+temperatura+' C&deg;</p></td></tr>';
		HTMLcontent += '<tr><td><h2>Viento</h2></td><td><p>'+viento+' km/h</p></td></tr>';
		HTMLcontent += '<tr><td><h2>Humedad</h2></td><td><p>'+humedad+' %</p></td></tr>';
		HTMLcontent += '</table>';
                $("#ContentArea").append(HTMLcontent);
	}); //fin get
}

function noLocation() {
	HTMLcontent = '<br/><br/>';
        HTMLcontent += 'no posicion';
        HTMLcontent += '<br/><br/>';
        $("#ContentArea").append(HTMLcontent);
}

$(document).ready(function(){ 
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
	}else{
		HTMLcontent = '<br/><br/>';
                HTMLcontent += 'Lo sentimos no disponemos de geolocalizacion';
                HTMLcontent += '<br/><br/>';
                $("#ContentArea").append(HTMLcontent);
        }

});//fin de document ready