
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}


/************************getmealDetails****************************/

async function getMealDetails(idMeal){
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
  var response = await Api.json()
  displayMealDetails(response.meals[0])
}

function displayMealDetails(meal) {

  let mealDetails = "";
  mealDetails = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>

    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
          `;

          Object.keys(meal).forEach(function(key){
            if(key.startsWith('strIngredient') && meal[key]!=""){
              mealDetails +=`
                <li class="alert alert-info m-2 p-1">${meal[key]}</li>
              `
            }
        });

        mealDetails +=`
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
          <li class="alert alert-danger m-2 p-1">${meal.strTags}</li>
        </ul>

        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
  `  
  mealsData.innerHTML =mealDetails;
}

/************************ALL****************************/

async function getAll() {
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
  var response = await Api.json()
  display(response.meals)
}

getAll()

function display(arr, divName="mealsData") {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3 mb-4">
          <div onClick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${arr[i].strMealThumb}" alt="">
              <div class="meal-layer position-absolute d-flex align-items-center text-dark p-2">
                  <h4>${arr[i].strMeal}</h4>
              </div>
          </div>
      </div>
   `  
  }
  document.getElementById(divName).innerHTML = cartoona
}

/************************Category****************************/

async function getCategories() {
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  var response = await Api.json()
  displayCategory(response.categories)
}

function displayCategory(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3 mb-4">
          <div onClick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
              <div class="meal-layer position-absolute d-flex flex-wrap align-items-center text-center text-dark p-2">
                  <h3 class="m-auto">${arr[i].strCategory}</h3>
                  <p>${arr[i].strCategoryDescription}</p>
              </div>
          </div>
      </div>
   `  
  }
  document.getElementById("mealsData").innerHTML = cartoona
}

async function getCategoryMeals(strCategory){
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
  var response = await Api.json()
  displayCategoryMeal(response.meals)
}

function displayCategoryMeal(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3 mb-4">
          <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${arr[i].strMealThumb}" alt="">
              <div class="meal-layer position-absolute d-flex flex-wrap align-items-center text-center text-dark p-2">
                  <h3 class="m-auto">${arr[i].strMeal}</h3>
              </div>
          </div>
      </div>
   `  
  }
  document.getElementById("mealsData").innerHTML = cartoona
}


/************************Area****************************/

async function getArea() {
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  var response = await Api.json()
  displayArea(response.meals)
}

function displayArea(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3 mb-4">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${arr[i].strArea}</h3>
        </div>
      </div>
   `  
  }
  document.getElementById("mealsData").innerHTML = cartoona
}

async function getAreaMeals(strArea){
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`)
  var response = await Api.json()
  display(response.meals)
}

/************************Ingredients****************************/

async function getIngredients() {
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  var response = await Api.json()
  displayIngredients(response.meals)
}

function displayIngredients(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3 mb-4">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription}</p>
        </div>
      </div>
    `  
  }
  document.getElementById("mealsData").innerHTML = cartoona
}

async function getIngredientsMeals(strIngredient){
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
  var response = await Api.json()
  display(response.meals)
}

/************************Search****************************/

function showSearchInputs() {
  mealsData.innerHTML = `
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
          <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
    <div id="mealsDataSearch" class="row mt-5"></div>
  `  
}

async function searchByName(name){
  let Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let response = await Api.json()

  display(response.meals, "mealsDataSearch")
}


async function searchByLetter(letter){
  let Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let response = await Api.json()

  display(response.meals, "mealsDataSearch")
}


/************************Contact US****************************/

var inputs = document.getElementsByClassName('form-control');

function signUp() {
  console.log("submit succefully")
}


function inputsValidation(){
  let submitBtn = document.getElementById('submitBtn');

  if (validationName() &&
    validationEmail() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
      submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}


function showContacts() {
  mealsData.innerHTML = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" onclick="signUp()" disabled="type" class="btn btn-outline-danger px-2 mt-3">Submit</button>
        <p id="submited"></p>
      </div>
</div>
 `  
}


var submited = document.getElementsByClassName('submited');


/*********************Validation************************* */

function validationName() {
  const nameRegex =
     /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

  if (nameRegex.test(inputs[0].value)) {
     inputs[0].classList.remove("is-invalid");
     inputs[0].classList.add("is-valid");
     document.getElementById("emailAlert").classList.replace("d-block", "d-none")
     return true;
  } else {
     inputs[0].classList.add("is-invalid");
     inputs[0].classList.remove("is-valid");
     document.getElementById("emailAlert").classList.replace("d-none", "d-block")
     return false;
  }
}

function validationEmail() {
  const emailRegex =
     /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (emailRegex.test(inputs[1].value)) {
     inputs[1].classList.remove("is-invalid");
     inputs[1].classList.add("is-valid");
     return true;
  } else {
     inputs[1].classList.add("is-invalid");
     inputs[1].classList.remove("is-valid");
     return false;
  }
}

function phoneValidation() {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (phoneRegex.test(inputs[2].value)) {
     inputs[2].classList.remove("is-invalid");
     inputs[2].classList.add("is-valid");
     return true;
  } else {
     inputs[2].classList.add("is-invalid");
     inputs[2].classList.remove("is-valid");
     return false;
  }
}

function ageValidation() {
  const age = /^([1-7][0-9]|80)$/;

  if (age.test(inputs[3].value)) {
     inputs[3].classList.remove("is-invalid");
     inputs[3].classList.add("is-valid");
     return true;
  } else {
     inputs[3].classList.add("is-invalid");
     inputs[3].classList.remove("is-valid");
     return false;
  }
}

function passwordValidation() {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (passwordRegex.test(inputs[4].value)) {
     inputs[4].classList.remove("is-invalid");
     inputs[4].classList.add("is-valid");
     return true;
  } else {
     inputs[4].classList.add("is-invalid");
     inputs[4].classList.remove("is-valid");
     return false;
  }
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}








