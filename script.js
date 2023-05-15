let showIdNumber = 82;
const availableShows = [];

function getAllShows() {
  return fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((data) => {
      let select = document.querySelector("#show-selector");
      console.log(data);
      data.forEach(({name, id}) => {
        let option = document.createElement("option");
        option.innerText = name;
        select.appendChild(option);
        availableShows.push({name, id});
      });
    })
    .catch((error) => console.log(error));
}

// pull all episodes from the selected show
function getData() {
  return fetch(`https://api.tvmaze.com/shows/${showIdNumber}/episodes`)
    .then(async (response) => await response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

const allEpisodes = [];
getData().then((episode) => {
  episode.forEach((element) => allEpisodes.push(element));
});

function setup() {
  allEpisodes.forEach((element) => makeDivForEpisode(element));
  getAllShows();
  // const oneEpisode = getOneEpisode();
}

window.onload = setTimeout(setup, 1000);

const episodesDiv = document.querySelector("#episodsHolder");

// function for displaying all episodes

function makeDivForEpisode(episode) {
  const divContainer = document.createElement("div");
  divContainer.className = "episodeContainer";

  let title = document.createElement("h3");
  let episodeCode = `S${String(episode.season).padStart(2, "0")}E${String(
    episode.number
  ).padStart(2, "0")}`;
  title.innerText = `${episode.name} - ${episodeCode}`;
  divContainer.appendChild(title);

  let avatar = document.createElement("img");
  avatar.setAttribute("src", `${episode.image.medium}`);
  divContainer.appendChild(avatar);

  let description = document.createElement("p");
  description.innerHTML = episode.summary;
  divContainer.appendChild(description);

  episodesDiv.appendChild(divContainer);
}

// search for episodes input
document.querySelector("#search-input").addEventListener("input", searchText);

function searchText() {
  const searchInput = document
    .querySelector("#search-input")
    .value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode) => {
    if (
      episode.name.toLowerCase().includes(searchInput) ||
      episode.summary.toLowerCase().includes(searchInput)
    ) {
      return episode;
    }
  });
  episodesDiv.innerHTML = "";
  document.querySelector("#quantity").innerText = filteredEpisodes.length;
  filteredEpisodes.forEach((episode) => makeDivForEpisode(episode));
}

// select episodes input option
function getInputList(originalList) {
  const selectList = [];

  for (let i = 0; i < originalList.length; i++) {
    let listItem = {};
    listItem.name = originalList[i].name;
    listItem.episodeCode = `S${String(originalList[i].season).padStart(
      2,
      "0"
    )}E${String(originalList[i].number).padStart(2, "0")}`;
    selectList.push(listItem);
  }
  return selectList;
}

function optionList() {
  const listOfOptions = getInputList(allEpisodes);
  listOfOptions.forEach((item) => {
    let optionValue = document.createElement("option");
    optionValue.innerText = `${item.episodeCode} - ${item.name}`;

    document.querySelector("#episode-selector").appendChild(optionValue);
  });
}

setTimeout(optionList, 2000);

// show chosen episode
document
  .querySelector("#episode-selector")
  .addEventListener("change", (event) => {
    let inputValue = event.target.value.slice(9);
    let episodeToShow = allEpisodes.find((item) => item.name === inputValue);
    if (episodeToShow === undefined) {
      episodesDiv.innerHTML = "";
      setup();
    } else {
      episodesDiv.innerHTML = "";
      document.querySelector("#quantity").innerText = 1;
      makeDivForEpisode(episodeToShow);
    }
  });


// show chosen show
document.querySelector("#show-selector")
.addEventListener("change", (event) => {
  let chosenShow = availableShows.filter(show => show.name === event.target.value);
  showIdNumber = chosenShow[0].id;
  console.log(getData());
  
  
})
//
// 2.get input selected value
// 3.match the input value with the name of the episode (indexOf, some, find ....), display this episode
// 4. clear the select input and get all episodes back
