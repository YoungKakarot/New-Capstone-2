document.addEventListener("DOMContentLoaded", () => {
    mountainsArray.forEach(m => mountainList.appendChild(option(m.name)));
    mountainList.addEventListener("change", async e => {
        const mountain = mountainsArray[mountainList.selectedIndex - 1];
        mountainResults.innerHTML = `
            <br>
            <img src="./images/${mountain.img}">
            <h3>${mountain.name}</h3>
            <table>
                <tr><th> Elevation:</th><td> ${mountain.elevation} feet                    </td></tr>
                <tr><th> Effort:   </th><td> ${mountain.effort}                            </td></tr>
                <tr><th> Lattitude:</th><td> ${mountain.coords.lng}                        </td></tr>
                <tr><th> Longitude:</th><td> ${mountain.coords.lat}, ${mountain.coords.lng}</td></tr>
            </table>
            <p> ${mountain.desc} </p>
        `;
       
        async function getSunsetForMountain(lat, lng) {
            let response = await fetch(
                `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
            );
            let data = await response.json();
            return data;
        }
        
        const sunData = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);
      
        mountainResults.innerHTML += `
            <div> Sunrise: ${sunData.results.sunrise} </div>
            <div> Sunset: ${sunData.results.sunset} </div>
        `;
    });
});