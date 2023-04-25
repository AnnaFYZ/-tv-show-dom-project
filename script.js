// 
// All episodes must be shown
// For each episode, AT LEAST following must be displayed:
// the episode's name
// the season number
// the episode number
// the episode's medium-sized image
// the episode's summary text
// You should combine season number and episode number into an episode code:
// Each part should be zero-padded to two digits.
// Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.
// Your page should state somewhere that the data has (originally) come from TVMaze.com, and link back to that site (or the specific episode on that site). See tvmaze.com/api#licensing.
// 


//You can edit ALL of the code here
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