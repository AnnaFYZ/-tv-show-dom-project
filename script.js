

// function getAllShows() {
//   return fetch("https://api.tvmaze.com/shows")
//     .then((response) => response.json())
//     .then((data) => {
//         data.forEach(({name, id}) => {
//         availableShows.push({name, id});
//       });
//     })
//     .catch((error) => console.log(error));
// }

// pull all episodes from the selected show


function createShowList () {
  let showList = [];
  availableShows.forEach(show => showList.push(show.name));
  let select = document.querySelector("#show-selector");
  showList.sort().forEach(show => {
    let option = document.createElement("option");
    option.innerText = show;
    select.appendChild(option);
  })
}
setTimeout(createShowList, 300);

window.onload = setTimeout(rootSetup, 500);

// show chosen show
document.querySelector("#show-selector")
.addEventListener("change", (event) => {
  let chosenShow = availableShows.filter(show => show.name === event.target.value);
  showIdNumber = chosenShow[0].id;
  allEpisodes = [];
  getData().then((episode) => {
  episode.forEach((element) => allEpisodes.push(element))});

  episodesDiv.innerHTML = "";
  setTimeout(rootSetup, 500);  
  document.querySelector("#episode-selector").innerHTML = "";
  setTimeout(optionList, 1000);
})

