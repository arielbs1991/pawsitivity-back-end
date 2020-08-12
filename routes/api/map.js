
// let map, infoWindow;
// const address = {
//     //petresult.address.number
//     //petresult.address.street
//     //pet
// }

// function initMap() {
//     myLatLng = { lat:47.60357, lng:-122.32945 }
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: {
//             lat:47.60357,
//             lng:-122.32945
//         },
//         zoom:6
//     });
//     infoWindow = new google.maps.InfoWindow();

//     var marker = new google.maps.Marker({
//         position: myLatLng, //will need to be the coordinates of the specific shelter
//         map: map
//     })
//     marker.addListener('click', function(){
//         infoWindow.open(map,marker);
//     })
// }

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         infoWindow.setPosition(pos);
//         infoWindow.setContent("Location found.");
//         infoWindow.open(map);
//         map.setCenter(pos);
//       },
//       () => {
//         handleLocationError(true, infoWindow, map.getCenter());
//       }
//     );
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }


// AIzaSyA22gdlHm5rutLZfgJNHsFzCIRPOArUg-0

// async defer
//             src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA22gdlHm5rutLZfgJNHsFzCIRPOArUg-0&callback=initMap">



// //geolocation
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat:47.6,
            lng: -122.6
        }
    });
    const geocoder = new google.maps.Geocoder();
    document.getElementById("submit").addEventListener("click", () => {
        geocodeAddress(geocoder, map);
    })
}

function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").nodeValue;
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode didn't work")
        }
    });
}