
const loading = document.querySelector(".loading");

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}


/************************getMealDetails****************************/

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
  mealsData.innerHTML = mealDetails;
}

/************************ALL****************************/

async function getAll() {
  loading.classList.remove("d-none");
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
  var response = await Api.json()
  display(response.meals)
  loading.classList.add("d-none");
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
  loading.classList.remove("d-none");
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  var response = await Api.json()
  displayCategory(response.categories)
  loading.classList.add("d-none");
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
  loading.classList.remove("d-none");
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
  var response = await Api.json()
  displayCategoryMeal(response.meals)
  loading.classList.add("d-none");
}

function displayCategoryMeal(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3 mb-4">
          <div onClick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
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
  loading.classList.remove("d-none");
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  var response = await Api.json()
  displayArea(response.meals)
  loading.classList.add("d-none");
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
  loading.classList.remove("d-none");
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`)
  var response = await Api.json()
  display(response.meals)
  loading.classList.add("d-none");
}


/************************Ingredients****************************/

async function getIngredients() {
  loading.classList.remove("d-none");
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  var response = await Api.json()
  displayIngredients(response.meals)
  loading.classList.add("d-none");
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
  loading.classList.remove("d-none");
  var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
  var response = await Api.json()
  display(response.meals)
  loading.classList.add("d-none");
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
  loading.classList.remove("d-none");
  let Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let response = await Api.json()

  display(response.meals, "mealsDataSearch")
  loading.classList.add("d-none");
}


async function searchByLetter(letter){
  loading.classList.remove("d-none");
  let Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let response = await Api.json()

  display(response.meals, "mealsDataSearch")
  loading.classList.add("d-none");
}


/************************Contact US****************************/

var inputs = document.getElementsByClassName('form-control');

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

function signUp() {
  document.getElementById("submited").innerHTML = "submitted successfully"
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
        <button id="submitBtn" onclick="signUp()" disabled="type" class="btn btn-outline-success px-2 mt-3">Submit</button>
        <p class="text-success mt-3" id="submited"></p>
      </div>
</div>
 `  
}


/*********************Validation************************* */

function validationName() {
  const nameRegex =
     /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

  if (nameRegex.test(inputs[0].value)) {
     inputs[0].classList.remove("is-invalid");
     inputs[0].classList.add("is-valid");
     document.getElementById("nameAlert").classList.replace("d-block", "d-none")
     return true;
  } else {
     inputs[0].classList.add("is-invalid");
     inputs[0].classList.remove("is-valid");
     document.getElementById("nameAlert").classList.replace("d-none", "d-block")
     return false;
  }
}

function validationEmail() {
  const emailRegex =
     /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (emailRegex.test(inputs[1].value)) {
     inputs[1].classList.remove("is-invalid");
     inputs[1].classList.add("is-valid");
     document.getElementById("emailAlert").classList.replace("d-block", "d-none")
     return true;
  } else {
     inputs[1].classList.add("is-invalid");
     inputs[1].classList.remove("is-valid");
     document.getElementById("emailAlert").classList.replace("d-none", "d-block")
     return false;
  }
}

function phoneValidation() {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (phoneRegex.test(inputs[2].value)) {
     inputs[2].classList.remove("is-invalid");
     inputs[2].classList.add("is-valid");
     document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
     return true;
  } else {
     inputs[2].classList.add("is-invalid");
     inputs[2].classList.remove("is-valid");
     document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
     return false;
  }
}

function ageValidation() {
  const age = /^([1-7][0-9]|80)$/;

  if (age.test(inputs[3].value)) {
     inputs[3].classList.remove("is-invalid");
     inputs[3].classList.add("is-valid");
     document.getElementById("ageAlert").classList.replace("d-block", "d-none")
     return true;
  } else {
     inputs[3].classList.add("is-invalid");
     inputs[3].classList.remove("is-valid");
     document.getElementById("ageAlert").classList.replace("d-none", "d-block")
     return false;
  }
}

function passwordValidation() {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (passwordRegex.test(inputs[4].value)) {
     inputs[4].classList.remove("is-invalid");
     inputs[4].classList.add("is-valid");
     document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
     return true;
  } else {
     inputs[4].classList.add("is-invalid");
     inputs[4].classList.remove("is-valid");
     document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
     return false;
  }
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}








