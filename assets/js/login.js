const check = document.querySelector("#check");
const checkMsg = document.querySelector("#checkMsg");

const name = document.querySelector(".name");
const psd = document.querySelector(".psd");
const msg = document.querySelector("#msg");

const main = document.querySelector(".main");

let img = [
  "https://variety.com/wp-content/uploads/2020/05/155485_dsc_1739_20190909102832658_revised_bw_l-e1589787393215.jpg",
  "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/itb3hCN.NoBM/v1/-1x-1.jpg",
  "https://ichef.bbci.co.uk/news/976/cpsprodpb/E84C/production/_128286495_e6bee2b51bfe8d37d9bb1a27b0600745b67a3a19.jpg",
];

let index = 0;
let imglength = img.length;

//slider
setInterval(function () {
  var index1 = img[index];
  index++;

  if (index >= imglength) {
    index = 0;
  }

  main.style.backgroundImage = `url(${index1})`;
}, 4000);

var a = 1;

check.addEventListener("click", () => {
  load();
});

const load = () => {
  if (a == 1) {
    checkMsg.style.color = "#fff";
    a = 0;
  } else {
    checkMsg.style.color = "#1db954";
    a = 1;
  }
};

load();

function signup(e) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var user = {
    username: username,
    password: password,
  };
  var json = JSON.stringify(user);
  localStorage.setItem(username, json);
  alert("Sign up successful");
  window.location.href = "./login.html";
}

function login(e) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var user = localStorage.getItem(username);
  var data = JSON.parse(user);
  if (username == data.username && password == data.password) {
    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert("Login failed");
  }
}
