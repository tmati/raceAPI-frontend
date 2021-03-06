function onLoad() {
    var xmlhttp = new XMLHttpRequest();
    var url = 'http://localhost:3003/api/vehicles'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var vehicles = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < vehicles.length; i++) {
                out += parseVehicle(vehicles[i])
            }
            document.getElementById("vehiclesDiv").innerHTML = out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseVehicle(vehicle) {
    const url = "http://localhost:3003/api"
    let outputHTMLStructure = ''
    outputHTMLStructure = `</div><div class="dropdown"> <a href=${url}/vehicles?id=${vehicle.id}` + ' class=dropbtn>' +
    vehicle.name + '</a><div class="dropdown-content"><h3>Class: </h3><p>' + vehicle.class + `</p><br><h3>Driver: </h3><a href=${url}/drivers?username=${vehicle.driver.username}` + '>' + vehicle.driver.name + '</a>'
    
    if (vehicle.description !== '') {
        outputHTMLStructure += '<h3>Description: </h3><p>' + vehicle.description + '</p>'
    }
    outputHTMLStructure += '</div></div>'
    
    return outputHTMLStructure
}

function drivers() {
    var xmlhttp = new XMLHttpRequest();

    var url = 'http://localhost:3003/api/drivers'
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var drivers = JSON.parse(xmlhttp.responseText);
            var out = "";
            var i;
            for (i = 0; i < drivers.length; i++) {

                out += "<option value=" + drivers[i].name +">"+ drivers[i].name + "</option>"
            }
            document.getElementById('selectDriver').innerHTML += out;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function driverId(form){

    var xmlhttp2 = new XMLHttpRequest();

    var url = 'http://localhost:3003/api/drivers'
    xmlhttp2.onreadystatechange = function () {
        if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
            var drivers = JSON.parse(xmlhttp2.responseText);
            var driverId = ""
            console.log(drivers[0].name + form.driver.value)
            drivers.forEach(d => {if(form.driver.value == d.name){
                console.log(d.id)
                driverId = d.id;
            }});

            const loggedUserJSON = window.localStorage.getItem('loggedUser')
            var body = { }
            body.driver = driverId
            body.class = form.class.value
            body.name = form.name.value
            body.description = form.description.value
            const token = JSON.parse(loggedUserJSON).token

            var xmlhttp = new XMLHttpRequest();
            console.log(JSON.stringify(body))
            var url = 'http://localhost:3003/api/vehicles'
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 201) {

                    console.log(xmlhttp.responseText)
                }else {
                    console.log(xmlhttp.responseText)
                }
            }
            xmlhttp.open("POST", url, true);
            xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
            xmlhttp.setRequestHeader('Authorization', 'bearer ' + token);

            xmlhttp.send(JSON.stringify(body));
        }
    }
    xmlhttp2.open("GET", url, true);
    xmlhttp2.send();
}


