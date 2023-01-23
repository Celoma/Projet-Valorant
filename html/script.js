const btnAdd = document.querySelector('.add');
const btnLess = document.querySelector('.less');
const mainLeft = document.getElementById('main_left');
const mainRight = document.getElementById('main_right');
const mainCenter = document.getElementById('main_center');
const addImg = document.getElementById('add_img');
const mainBot = document.getElementById('main_bot');
const prebot = document.getElementById("prebot");

var Interraction = document.getElementById('interraction_img_carte');


btnAdd.addEventListener('click', updateBtnAdd);
btnLess.addEventListener('click', updateBtnLess);

const urlList = {
  "arme.html": ["https://valorant-api.com/v1/weapons", ["displayName", "displayIcon", "skins"]],
  "carte.html": ["https://valorant-api.com/v1/maps", ["displayName", "displayIcon", "listViewIcon", "splash"]],
  "agent.html": ["https://valorant-api.com/v1/agents", ["displayName", "description", "bustPortrait", "background", "role"]],
};

const currentUrl = window.location.href.toString().split('/').pop().split('#')[0];

let dataSet = [];
let currentIndex = 0;

function showSkin(){
  if (document.querySelector(".img_bot_mosaique").style.visibility === 'visible'){
    document.querySelector(".img_bot_mosaique").style.visibility = 'hidden';
    document.querySelector(".img_bot_mosaique").style.display = 'None';
  } else {
    document.querySelector(".img_bot_mosaique").style.visibility = 'visible';
    document.querySelector(".img_bot_mosaique").style.display = 'block';
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function importData() {
    if (currentUrl === "agent.html") {
      document.getElementById("add_img").style.width = '35%';
      mainLeft.innerHTML = `<img src="${dataSet[currentIndex][4].displayIcon}">
                          <p class='title'>${dataSet[currentIndex][4].displayName}</p><p>${dataSet[currentIndex][4].description}</p>`;
      mainRight.innerHTML = `<p>${dataSet[currentIndex][1]}</p>`;
      addImg.innerHTML = `<img src="${dataSet[currentIndex][3]}" class="behind">
                          <img src="${dataSet[currentIndex][2]}" class="above">`;
      mainBot.innerHTML = `<h3>${dataSet[currentIndex][0]}</h3>`;
    } else if (currentUrl === "carte.html") {
      let img1 = dataSet[currentIndex][1] || "";
      let mainLeftContent;
      if (img1 === "") {
        mainCenterContent = `<img class='debug' src="${dataSet[currentIndex][3]}">`;
      } else {
      mainCenterContent = `<div class='trace_carte'><img src="${dataSet[currentIndex][1]}"></div> `;
      }
      Name = `<h3>${dataSet[currentIndex][0]}</h3>`;
      Img = `<div class="fond_trace"><img src="${dataSet[currentIndex][3]}"></div>`;
      addImg.innerHTML = `${Img}${mainCenterContent}`;
      let images = "";
      for (item in dataSet) {
          images += `<a href="#carte"><div id='interraction_img_carte' ><div class='overlay'><img src="${dataSet[item][2]}" onclick="carteUpdate(${item})"></div><div class='overlay'><h3 class="txt_button" onclick="carteUpdate(${item})">${dataSet[item][0]}</h3></div></div></a>`;
      }
      mainBot.innerHTML =  `${Name}<div class='img_bot_mosaique'>${images}</div>`;
      document.getElementById("main_center").getElementsByTagName("img")[0].style.width = '100%';
      document.getElementById("main_center").getElementsByTagName("img")[1].style.width = '100%';
    } else if (currentUrl === "arme.html") {
    mainCenter.innerHTML = `<img class="small" src="${dataSet[currentIndex][1]}">`;
    prebot.innerHTML = `<a href="#skins"><button id='skin'>Voir les cosmétiques</button>`
    let images =''
    skin_bugger = ['Prime Guardian', 'Sovereign Guardian', 'Sovereign Marshal', 'Luxe Knife', 'Melee']
    for (item of dataSet[currentIndex][2]){
    if( item['displayIcon'] != null & item['displayName'].slice(0,8) != 'Standard' & item['displayName'] != 'Random Favorite Skin' & !(skin_bugger.includes(item['displayName'])))
      {
        images += `<div class='overlay'><img src="${item['displayIcon']}" onclick="skinUpdate(${item})"></div>`;
      }
    mainBot.innerHTML = `<h3 id='skins'>${dataSet[currentIndex][0]}</h3><div class='img_bot_mosaique'>${images}</div>`;
    document.querySelector(".img_bot_mosaique").style.visibility = 'hidden';
    document.querySelector(".img_bot_mosaique").style.display = 'None';
    const btnSkin = document.getElementById('skin');
    btnSkin.onclick = function() {showSkin()};
    }
  }
}

function carteUpdate(newIndex){
  currentIndex = newIndex;
  importData();
}

function skinUpdate(skin){
  console.log(skin);
}
function updateBtnAdd() {
  currentIndex = (currentIndex + 1) % dataSet.length;
  importData();
}

function updateBtnLess() {
  currentIndex = currentIndex === 0 ? dataSet.length - 1 : currentIndex - 1;
  importData();
}

function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

const data = JSON.parse(httpGet(urlList[currentUrl][0])).data;

for (const item of data) {
  const temp = [];
  let shouldPush = false;

  for (const prop in item) {
    if (urlList[currentUrl][1].includes(prop)) {
      temp.push(item[prop]);
    }

      if (currentUrl !== "agent.html" || (prop === "isPlayableCharacter" && item[prop])) {
        shouldPush = true;
      }
    }

    if (shouldPush) {
      dataSet.push(temp);
    }
    }

    currentIndex = getRandomInt(dataSet.length);
    
    importData();