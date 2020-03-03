function checkLoginStatus(){
  const $loginStatus = document.querySelector(".login-status span")
  $loginStatus.textContent = localStorage.getItem("token")
    ? "YES!"
    : "NO."
}
checkLoginStatus()

/* Egg Listing */
const $eggsList = document.querySelector(".eggs")

fetch("http://localhost:4100/eggs", {
    headers: {
      "Authorization": `bearer ${localStorage.getItem("token")}`,
    }
  }).then(response => response.json())
  .then(({ eggs }) => {
    eggs
      .map(eggToLi)
      .forEach(appendItemToList($eggsList))
  })

function eggToLi(egg){
  const $li = document.createElement("li")
  $li.textContent = egg.preparation_style
  return $li
}

function appendItemToList($list){
  return $li => $list.append($li)
}

/* User Signup */
const $userSignupForm = document.querySelector(".user-signup")

$userSignupForm.addEventListener("submit", event => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  }

  fetch("http://localhost:4100/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  }).then(response => {
    const $message = document.querySelector(".user-signup .message")
    $message.textContent = "Ya Signed Up!"
  })
})

/* User login */
const $userLoginForm = document.querySelector(".user-login")

$userLoginForm.addEventListener("submit", event => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  }

  fetch("http://localhost:4100/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  }).then(response => response.json())
  .then(response => {
    localStorage.setItem("token", response.token)
    checkLoginStatus()

    const $message = document.querySelector(".user-login .message")
    $message.textContent = "Ya Logged In!"
  })
})

/* Logout */
const $logout = document.querySelector(".logout")
$logout.addEventListener("click", event => {
  localStorage.removeItem("token")
  checkLoginStatus()
})

/* Add Eggs */
const $addEgg = document.querySelector(".add-egg")
$addEgg.addEventListener("submit", event => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const egg = {
    preparation_style: formData.get("preparation_style"),
  }

  fetch("http://localhost:4100/eggs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(egg)
  }).then(response => response.json())
  .then(response => {
    console.log(response)
    const $li = eggToLi(response.egg)
    appendItemToList($eggsList)($li)
  })
})
