var animText = "Budi izvrstan u onom što ";
var span1 = "  vidiš!";
var span2 = "  voliš.";
var txtEnd = "Zaiskri!";
var charArray = [];
var msgArray = [];

const path = '../_Shared/index.html';

let div1 = document.createElement("div");
let div2 = document.createElement("div");
let h1First = document.createElement("H1");
let h1Second = document.createElement("H1");

function setUp(){
  charArray = animText.split("");

  div1.setAttribute("class", "typeWriter");
  h1First.setAttribute("class", "animation");

  div1.appendChild(h1First);

  $(div1).insertBefore(".kontakt");

  let i = 0;

  setInterval(() => {
    if (i < charArray.length) {
      h1First.append(charArray[i]);
      i++;
    }
  }, 100);
}

function dinamicChange() {
  
  reset();
  charArray = span1.split("");

  let span = document.createElement("span");
  
  h1First.appendChild(span);

  setInterval(() => {
    if (i < charArray.length) {
      span.append(charArray[i]);
      i++;
    }
  }, 100);

  setTimeout(() => {
    $('span').text('');
  }, 2000);
  
  setTimeout(() => {
    reset();
    charArray = span2.split("");

    setInterval(() => {
    if (i < charArray.length) {
      span.append(charArray[i]);
      i++;
    }
    }, 100);
  }, 3000);
}

function endMsg(){

  reset();

  msgArray = txtEnd.split("");

  div2.setAttribute("class", "endMsg");
  h1Second.setAttribute("class", "endTxt");

  div2.appendChild(h1Second);

  $(div2).insertBefore(".kontakt");

  setInterval(() => {
    if (i < msgArray.length) {
      h1Second.append(msgArray[i]);
      i++;
    }
  }, 100);
}


function reset(){
  charArray = [];
  i = 0;
}

$(function() {

  setUp();

  setTimeout(() => {
      dinamicChange();
  }, 2500);

  setTimeout(() => {
    endMsg();
  }, 9000);

});
