let acceptDecline = localStorage.getItem("cookie") ? JSON.parse(localStorage.getItem("cookie")) : "";
const cookiesBanner = document.querySelector("#cookies-banner")

//localStorage.clear()

document.querySelector("#allow").addEventListener("click", () => {
  setCookie()
})

document.querySelector("#decline").addEventListener("click", () => {
  setCookie()
})

function setCookie(){
  acceptDecline = true
  localStorage.setItem("cookie", JSON.stringify(acceptDecline))
  cookiesBanner.style.display = "none"
}

if(acceptDecline){
  cookiesBanner.style.display = "none"
}