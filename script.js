function initMap() {
    const locations = [
        { position: { lat: 1.4205983, lng: 38.9067339 }, title: '이비자 (Bali Center)' },
        { position: { lat: 25.3463, lng: 55.4209 }, title: '샤르자 (Sharjah)' },
        { position: { lat: 37.0902, lng: -95.7129 }, title: '미국 (US)' },
    ];

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: { lat: 0, lng: 0 },
    });

    const service = new google.maps.places.PlacesService(map);
    const markers = [];
    const pathCoordinates = [];

    locations.forEach((location) => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title,
        });
        markers.push(marker);
        pathCoordinates.push(location.position);

        const infoWindow = new google.maps.InfoWindow();

        marker.addListener('click', () => {
            infoWindow.setContent(`<h3>${location.title}</h3><p>Loading nearby places...</p>`);
            infoWindow.open(map, marker);

            service.nearbySearch(
                {
                    location: location.position,
                    radius: 5000,
                    type: ['restaurant'],
                },
                (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        let content = `<h3>${location.title}</h3><ul>`;
                        results.slice(0, 5).forEach((place) => {
                            content += `<li>${place.name} (${place.rating || 'N/A'}⭐)</li>`;
                        });
                        content += `</ul><p>숙소 평균 가격: $50-$100 (예시)</p>`;
                        infoWindow.setContent(content);
                    } else {
                        infoWindow.setContent(`<h3>${location.title}</h3><p>No places found.</p>`);
                    }
                }
            );
        });
    });

    console.log(pathCoordinates); // 좌표 값 확인

    // 선 추가 (Polyline)
    const pathLine = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: false,  // 직선으로 변경
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 4,
    });

    pathLine.setMap(map);
}


