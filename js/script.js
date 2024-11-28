// =======================================
// ||                                   ||   
// ||             COOKIES               || 
// ||                                   || 
// =======================================
// Function to set a cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

// Function to get a cookie by name
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Function to check the cookie and show the consent container if needed
function checkCookie() {
  const consent = getCookie("cookieConsent");
  if (!consent) {
    showCookieConsent();
  }
}

// Function to display the cookie consent container
function showCookieConsent() {
  const consentContainer = document.createElement("section");
  consentContainer.id = "cookie-consent-container";
  consentContainer.style.position = "fixed";
  consentContainer.style.bottom = "20px";
  consentContainer.style.left = "20px";
  consentContainer.style.padding = "15px";
  consentContainer.style.backgroundColor = "#333";
  consentContainer.style.color = "#fff";
  consentContainer.style.borderRadius = "5px";
  consentContainer.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  consentContainer.style.zIndex = "1000";

  const consentText = document.createElement("p");
  consentText.textContent =
    "Aquest lloc web utilitza cookies per millorar la teva experiència. Acceptes?";
  consentText.style.margin = "0 0 10px";
  consentText.style.color="#fff";
  consentContainer.appendChild(consentText);

  const allowButton = document.createElement("button");
  allowButton.textContent = "Permet";
  allowButton.style.marginRight = "10px";
  allowButton.style.padding = "8px 12px";
  allowButton.style.border = "none";
  allowButton.style.backgroundColor = "#4CAF50";
  allowButton.style.color = "#fff";
  allowButton.style.borderRadius = "3px";
  allowButton.style.cursor = "pointer";
  allowButton.onclick = () => {
    setCookie("cookieConsent", "allowed", 365);
    document.body.removeChild(consentContainer);
  };
  consentContainer.appendChild(allowButton);

  const declineButton = document.createElement("button");
  declineButton.textContent = "Declina";
  declineButton.style.padding = "8px 12px";
  declineButton.style.border = "none";
  declineButton.style.backgroundColor = "#f44336";
  declineButton.style.color = "#fff";
  declineButton.style.borderRadius = "3px";
  declineButton.style.cursor = "pointer";
  declineButton.onclick = () => {
    setCookie("cookieConsent", "declined", 365);
    document.body.removeChild(consentContainer);
  };
  consentContainer.appendChild(declineButton);

  document.body.appendChild(consentContainer);
}

// Check for cookies on page load
document.addEventListener("DOMContentLoaded", checkCookie);


// =======================================
// ||                                   ||   
// ||            DARK MODE              || 
// ||                                   || 
// =======================================

var icon = document.getElementById("icon");
icon.onclick=function(){
  document.body.classList.toggle("dark-theme");
  if(document.body.classList.contains("dark-theme")){
    icon.src ="icons/sun.png";
  }else{
    icon.src = "icons/moon.png";
  }

}