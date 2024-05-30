
function getPark(park) {
    const element = document.createElement("div");
    element.classList.add("park");

    element.innerHTML = `
        <hr>
        <div clas="parkName">${park.LocationName}</div>
        <div>${park.Address}
        <div>${park.State}, ${park.City}, ${park.ZipCode}</div>
        <div>Phone:${park.PhoneNumber}
        <div>Fax:${park.Fax}</div>
        <div>Longitude:${park.Longitude}, Latitude:${park.Latitude}</div>
    `;
    if(park.hasOwnProperty("Visit")){
        const link = park.Visit;
        const text = park.LocationName;
        element.innerHTML += `
        <div><a href="${link}" class="visit-site"> ${text} </a></div>
        `;
    };
    return element;
}
document.addEventListener("DOMContentLoaded", () => {

    function showResults() {
        let filtered = [];
        if (locationRadio.checked) {
            filtered = nationalParksArray.filter(
                o => o.State.toUpperCase() === locations.value.toUpperCase()
            )
        } else {
            filtered = nationalParksArray.filter(
                o => o.LocationName.toUpperCase().includes(
                    parkTypes.value.toUpperCase()
                )
            )
        }
        results.innerHTML = ""; //CLEAR OUT THE OLD
        filtered.forEach(p => results.appendChild(getPark(p)));
    }
    locations.addEventListener("change", showResults);
    parkTypes.addEventListener("change", showResults);

    function handleSearchBy(e) {
        if (locationRadio.checked) {
            locationLabel.style.display = "block";
            parkTypeLabel.style.display = "none";
        } else {
            locationLabel.style.display = "none";
            parkTypeLabel.style.display = "block";
        }
        showResults();
    }
    locationRadio.addEventListener("click", handleSearchBy)
    parkTypeRadio.addEventListener("click", handleSearchBy)

    locationsArray
        .map(option)
        .forEach(oe => locations.appendChild(oe));

    parkTypesArray
        .map(option)
        .forEach(pto => parkTypes.appendChild(pto));


});//end loaded 