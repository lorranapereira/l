var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var horainicio = [];
var horafim = [];
var metros = [];
var partida = [];
var chegada = [];
var hora = [];
var i = 0;
var now = "";
if (localStorage.length != 0){
    adicionar();    
    horafim.push(localStorage.horafim);
    horainicio.push(localStorage.horainicio);
    metros.push(localStorage.metros);
    chegada.push(localStorage.chegada);    
    partida.push(localStorage.partida);  
    hora.push(localStorage.hora);  
    horafim = JSON.parse(horafim);
    horainicio = JSON.parse(horainicio);
    metros = JSON.parse(metros);
    chegada = JSON.parse(chegada);
    partida = JSON.parse(partida);
    hora = JSON.parse(hora);
}


function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);

    var options = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("trajeto-texto"));

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(pontoPadrao);

            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({
                    "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        $("#txtEnderecoPartida").val(results[0].formatted_address);
                    }
                });
        });
    }
}

initialize();

$("form").submit(function(event) {
    event.preventDefault();
    var enderecoPartida = $("#txtEnderecoPartida").val();
    var enderecoChegada = $("#txtEnderecoChegada").val();
    now = new Date;
    horainicio.push(now.getHours() + ":" + now.getMinutes()); 
    var request = {
        origin: enderecoPartida,
        travelMode: google.maps.TravelMode.DRIVING
    };
    partida.push(request.origin);  
    localStorage.partida = JSON.stringify(partida);
    localStorage.horainicio = JSON.stringify(horainicio);
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
});

function p() {
    initialize();
    console.log("yes")
    var enderecoPartida = $("#txtEnderecoPartida").val();
    var enderecoChegada = $("#txtEnderecoPartida").val();
    var request = {
        origin: partida[partida.length-1],
        destination: enderecoPartida,
        travelMode: google.maps.TravelMode.DRIVING
    };
    chegada.push(request.destination);
    console.log(request.travelMode);
    localStorage.chegada = JSON.stringify(chegada);    
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    }); 
    now = new Date;        
    horafim.push(now.getHours() + ":" + now.getMinutes()); 
    localStorage.horafim = JSON.stringify(horafim);
    
}

function ver() {
    var aux1 = 0;
    var aux2 = 0;    
    var hora2 = 0;
    var hora1 = 0;
    var minuto2 = 0;
    var minuto1 = 0;
    hora2 = parseInt(horafim[horafim.length-1].substring(3,5));
    minuto2 = parseInt(horafim[horafim.length-1].substring(0,2));
    hora1 = parseInt(horainicio[horainicio.length-1].substring(3,5));
    minuto1 = parseInt(horainicio[horainicio.length-1].substring(0,2));
    aux1 = hora2 - hora1;
    aux2 = minuto2 - minuto1;    
    hora.push(aux2+":"+aux1);
    console.log(hora);
    //directionsDisplay.directions.routes[0].legs[0].distance.text)
    metros.push("Você percorreu "+document.getElementsByClassName("adp-summary")[0].children[0].textContent);
    localStorage.metros = JSON.stringify(metros);  
    localStorage.hora = JSON.stringify(hora);  
    adicionaroutra();
}
function adicionar() {
    var vetor = JSON.parse(localStorage.partida); 
    console.log("tamanho "+vetor.length-1);
    for (i = 0; i < vetor.length; i++) {
        var tr = document.createElement("tr");   
        tr.id = "tr"+i;     
        console.log(JSON.stringify(partida));
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");    
        var td3 = document.createElement("td");    
        var td4 = document.createElement("td");    
        var vetor1 = JSON.parse(localStorage.partida);
        var vetor2 = JSON.parse(localStorage.chegada);
        var vetor3 = JSON.parse(localStorage.metros);
        var vetor4 = JSON.parse(localStorage.hora);
        td1.textContent = vetor1[i]; 
        td2.textContent = vetor2[i];
        td3.textContent = vetor3[i]; 
        td4.textContent = vetor4[i]; 
        document.getElementById("tbody").appendChild(tr);
        document.getElementById("tr"+i).appendChild(td1);
        document.getElementById("tr"+i).appendChild(td2);
        document.getElementById("tr"+i).appendChild(td3);    
        document.getElementById("tr"+i).appendChild(td4);
    }

}
function adicionaroutra(){
    var vetor = JSON.parse(localStorage.partida); 
    console.log("tamanho "+vetor.length-1);
    for (i = i; i < vetor.length; i++) {
        var tr = document.createElement("tr");   
        tr.id = "tr"+i;     
        console.log(JSON.stringify(partida));
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");    
        var td3 = document.createElement("td");    
        var td4 = document.createElement("td");    
        var vetor1 = JSON.parse(localStorage.partida);
        var vetor2 = JSON.parse(localStorage.chegada);
        var vetor3 = JSON.parse(localStorage.metros);
        var vetor4 = JSON.parse(localStorage.hora);
        td1.textContent = vetor1[i]; 
        td2.textContent = vetor2[i];
        td3.textContent = vetor3[i]; 
        td4.textContent = vetor4[i]; 
        document.getElementById("tbody").appendChild(tr);
        document.getElementById("tr"+i).appendChild(td1);
        document.getElementById("tr"+i).appendChild(td2);
        document.getElementById("tr"+i).appendChild(td3);    
        document.getElementById("tr"+i).appendChild(td4);
    }

}