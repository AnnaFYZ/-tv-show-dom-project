
const allEpisodes = getAllEpisodes();

function setup() {
  
  const oneEpisode = getOneEpisode();
  allEpisodes.forEach(element => {makeDivForEpisode(element);
  });
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

window.onload = setup;

const episodesDiv = document.querySelector("#episodsHolder");

// function for displaying all episodes

function makeDivForEpisode (episode) {
  const divContainer = document.createElement("div");
  divContainer.className = "episodeContainer";

  let title = document.createElement("h3");
  let episodeCode = `S${(String(episode.season).padStart(2,'0'))}E${String(episode.number).padStart(2,'0')}`;
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

// search input
document.querySelector("#search-input").addEventListener("input", searchText);

function searchText(){
  const searchInput = document.querySelector("#search-input").value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter(episode => {
      if (episode.name.toLowerCase().includes(searchInput) || episode.summary.toLowerCase().includes(searchInput)){
        return episode
      }
  })
  episodesDiv.innerHTML = "";
  document.querySelector("#quantity").innerText = filteredEpisodes.length;
  filteredEpisodes.forEach(episode => makeDivForEpisode(episode));
}

// select input option
function getInputList (originalList) {
    const selectList = [];

    for (let i=0; i < originalList.length; i++){
      let listItem = {};
      listItem.name = originalList[i].name;
      listItem.episodeCode = `S${String(originalList[i].season).padStart(2, "0")}E${String(originalList[i].number).padStart(2, "0")}`;
      selectList.push(listItem);
    }
    return selectList;
}

const listOfOptions = getInputList(allEpisodes);

listOfOptions.forEach(item => {
  let optionValue = document.createElement("option");
  optionValue.innerText = `${item.episodeCode} - ${item.name}`;

  document.querySelector("#episode-selector").appendChild(optionValue);
})

document.querySelector("#episode-selector").addEventListener("change", (event) => {
  let inputValue = event.target.value.slice(9);
  let episodeToShow = allEpisodes.find(item => item.name === inputValue);
  if (episodeToShow === undefined) {
    setup();
  } else {
    episodesDiv.innerHTML = "";
    document.querySelector("#quantity").innerText = 1;
    makeDivForEpisode(episodeToShow);
  }
  
});
// 
// 2.get input selected value
// 3.match the input value with the name of the episode (indexOf, some, find ....), display this episode
// 4. clear the select input and get all episodes back