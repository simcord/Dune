class Ship {
  constructor(name, hull, firepower, accuracy){
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }


  shotResult() { return this.accuracy >= Math.random(); }


  isDead() { return this.hull <= 0; }


  attackShip(enemy){
    if(this.shotResult()){
      enemy.hull -= this.firepower;
      let myText = "<br>" + this.name + " hit " + enemy.name + " and did " + this.firepower + " damage!";
      myText += "<br>";
      myText += enemy.name + " has " + enemy.hull + " Hull left.";
      return myText;
    } else {
      return "<br>" + this.name + " missed!";
    }
  }
}

const myShip = new Ship("Ampoliros", 20, 5, .7);
const alienShips = [];
const combatText = document.getElementById("battleText");


const enableButtons = () => {
  document.getElementById("attackButton").addEventListener('click', combat);
  document.getElementById("retreatButton").addEventListener('click', fullRetreat);

}


const disableButtons = () => {
  document.getElementById("attackButton").removeEventListener('click', combat);
  document.getElementById("retreatButton").removeEventListener('click', fullRetreat);

}


const pushText = (text) => {
  combatText.innerHTML += text;
}


const reset = () =>{

  disableButtons();
  enableButtons();


  combatText.innerHTML = "Paul Atredies, you are the mighty warrior Muad'Dib all The Fremen waiting for. It is time for you to accept your fate and fight againts evil Harkonnen who killed your father!Destroy all Harkonnen ships attacking your Spice collectors!<br><br>";


  myShip.hull = 20;


  alienShips.splice(0, alienShips.length);


  const random = Math.floor(Math.random() * 6) + 5;
  for(let i = 0; i < 6; i++){
    let hull = Math.floor(Math.random() * 4) + 3; //Hull is 3-6
    let firepower = Math.floor(Math.random() * 3) + 2; //Firepower is 2-4
    let accuracy = (Math.floor(Math.random() * 3) + 6) / 10; //Accuracy is 0.6-0.8
    alienShips.push(new Ship("HarkonnenShip " + (i+1), hull, firepower, accuracy));
  }
}

const getStatus = () => {
  let temp = `<br>My ship - ${ myShip.name }<br>Hull - ${myShip.hull}<br>Firepower - ${myShip.firepower}<br>Accuracy - ${myShip.accuracy}<br>`;

  for(let alien of alienShips){
    temp += `<br>${ alien.name }<br>Hull - ${ alien.hull }<br>Firepower - ${ alien.firepower }<br>Accuracy - ${ alien.accuracy }<br>`
  }
  pushText(temp);
}


const fullRetreat = () =>{
  pushText("<br><br>Who knew mighty Muaddib was a coward");
  disableButtons();
}


const winCheck = () => {

  if(myShip.isDead()){
    pushText("<br><br>Paul Atreides, you failed Atreides people!, from now Harkonnen will rule Dune.");
    disableButtons();
  }


  if(alienShips.length == 0){
    pushText("<br><br>You managed to kill all the Harkonnen ships and managed salvage all the spice left behind. This is a good day for Atreides but just a start.");
    disableButtons();
  }
}

const combat = () => {


  while(!myShip.isDead() && !alienShips[0].isDead()){


    pushText(myShip.attackShip(alienShips[0]));


    if(!alienShips[0].isDead()){
      pushText(alienShips[0].attackShip(myShip));

    } else {
      pushText("<br>You destroyed " + alienShips[0].name + " !<br>");
    }
  }
  alienShips.shift();


  winCheck();
}


reset();
document.getElementById("resetButton").addEventListener("click", reset, false);
