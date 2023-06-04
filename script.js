window.onload = setTimeout(setup, 500);

setTimeout(rootSetup, 500);


async function createShowList() {
  let showList = [];
  await availableShows.forEach((show) => showList.push(show.name));
  let select = document.querySelector("#show-selector");
  showList.sort().forEach((show) => {
    let option = document.createElement("option");
    option.innerText = show;
    select.appendChild(option);
  });
}
createShowList();
// setTimeout(createShowList, 300);

// show chosen show
function showChosen (event) {
  
  let chosenShow = availableShows.filter(
    (show) => show.name === event.target.innerHTML ||
      show.name === event.target.value
  );
  
  showIdNumber = chosenShow[0].id;

  allEpisodes = [];
  getData().then((episode) => {
    episode.forEach((element) => allEpisodes.push(element));
  });

  episodesDiv.innerHTML = "";
  setTimeout(rootSetup, 500);
  document.querySelector("#episode-selector").innerHTML = "";
  setTimeout(optionList, 1000);
}
document.querySelector("#show-selector").addEventListener("change", (event) => {
  showChosen(event);
  let chosenShow = availableShows.filter(
    (show) => show.name === event.target.value
  );
  showIdNumber = chosenShow[0].id;
  allEpisodes = [];
  getData().then((episode) => {
    episode.forEach((element) => allEpisodes.push(element));
  });

  episodesDiv.innerHTML = "";
  setTimeout(rootSetup, 500);
  document.querySelector("#episode-selector").innerHTML = "";
  setTimeout(optionList, 1000);
});

function setup () {
   availableShows.forEach((show) => createShowCart(show));
   createShowsDropDown(availableShows);
}

document
  .querySelector("#showCardContainer")
  .addEventListener("click", (event) => {
    document.querySelector("#page0").style.display = "none";
    showChosen(event);
    document.querySelector("#root").style.visibility = "visible";
  });

document.querySelector("#foundShowsList").addEventListener("click", (event) => {
  if(event.target.innerHTML !== "" && event.target.value !=="Select show"){
    document.querySelector("#page0").style.display = "none";
    showChosen(event);
    document.querySelector("#root").style.visibility = "visible";
  }
});

document.querySelector("#home").addEventListener("click", () => {
  document.querySelector("#page0").style.display = "";
  document.querySelector("#root").style.display = "none";
  
})

function getButtons(){
  let readMoreBUttons = document.querySelectorAll(".readMoreBtn");
  readMoreBUttons.forEach((button) =>
    button.addEventListener("click", (event) => {
      readMore(event.target);
    })
  );
}


function readMore(btn){
  let post = btn.parentElement;
  post.querySelector(".dots").classList.toggle("hide");
  post.querySelector(".more").classList.toggle("hide");
  btn.innerText == "Read more..."
    ? (btn.innerText = "Read less")
    : (btn.innerText = "Read more...");
}