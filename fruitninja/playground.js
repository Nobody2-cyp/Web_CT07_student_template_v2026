let person = {
  eyecolor: "black",
  wallet: 10000,
  race: "Malay",

};//js object
person.eyecolor = "black";
person.wallet = 67;
person.race = "Chinese";
person.gender = "male";
person.height = 160
person.age = 67;
person.citizenship = "Singaporean";
let homeAddress = {
  street: "123 Main St",
  city: "Singapore",
  condo: "The Pinnacle",
  postalCode: "123456",
  country: "Singapore"
}


function setup() {

  new Canvas(250,250)
  background("cyan")
  print(person);
}

function draw() {}