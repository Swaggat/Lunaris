
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
 `https://firebase.google.com/docs/web/setup#available-libraries`

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpc2CfnTDNGgVGRvEGFlxhuQxnOErUiDk",
  authDomain: "spacex-e7da4.firebaseapp.com",
  projectId: "spacex-e7da4",
  storageBucket: "spacex-e7da4.firebasestorage.app",
  messagingSenderId: "779914623942",
  appId: "1:779914623942:web:3374e8e06c17750d3550c7",
  measurementId: "G-QGNR1FZ39H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


// REDIRECTS UNAUTHORIZED ACCESS
if (window.location.pathname.endsWith("userpage.html")) {
  // Hide page until auth state resolves to prevent a content flash for unauthorized users
  document.documentElement.style.visibility = "hidden";

  let resolved = false;
  const timeoutMs = 3000; // safety fallback in case onAuthStateChanged delays

  onAuthStateChanged(auth, (user) => {
    resolved = true;
    if (!user) {
      // Not authenticated -> redirect out
      window.location.href = "unaccess.html";
      return;
    }
    // Authenticated -> show page
    console.log("Welcome:", user.email);
    document.documentElement.style.visibility = "";
  });

  // Safety: unhide after timeout so the page isn't stuck hidden if callback never fires
  setTimeout(() => {
    if (!resolved) document.documentElement.style.visibility = "";
  }, timeoutMs);
}







document.addEventListener("DOMContentLoaded", () => {
    // Only show welcome message on userpage.html
    if (!window.location.pathname.endsWith("userpage.html")) return;

    const welcomeBox = document.createElement("div"); // CREATES THE WELCOME DIV
    welcomeBox.id = "welcomeBox";
    welcomeBox.className = "welcome";
    document.body.appendChild(welcomeBox);

    const message = sessionStorage.getItem("welcomeMessage");
    const type = sessionStorage.getItem("welcomeType");

    if (message) {
        welcomeBox.innerText = message;

        // SETTING COLOR BASED ON SIGN UP/ LOGIN TYPE
        if (type === "signup") {
            welcomeBox.style.background = "#1b4332"; // GREEN FOR SIGN UP
        } else if (type === "login") {
            welcomeBox.style.background = "#007bff"; // BLUE FOR LOGIN
        }

        // SHOW/SLIDE DOWN BANNER
        setTimeout(() => {
            welcomeBox.classList.add("show");
        }, 3000);

        // HIDE AFTER 6 SECONDS
        setTimeout(() => {
            welcomeBox.classList.remove("show");
            setTimeout(() => {
                welcomeBox.remove();
                sessionStorage.removeItem("welcomeMessage");
                sessionStorage.removeItem("welcomeType");
            }, 3000);
        }, 3000);
    }
});



// CSS ANIMATION FOR SLIDE
const style = document.createElement("style");
style.textContent = `
    .welcome {
        position: fixed;
        top: -5px;
        justify-self: center;
        width: 80%;
        height: 15%;
        color: white;
        text-align: center;
        padding: 30px 15px;
        border-radius: 0 0 8px 8px;
        font-size: 30px;
        font-weight: bold;
        z-index: 9999;
        transition: top 0.5s ease;
    }
    .welcome.show {
        top: 15;
    }
`;
document.head.appendChild(style);






// ====================== LOGOUT FUNCTION ======================
window.logout = function() {
  auth.signOut()
    .then(() => {
      console.log("User signed out");
      window.location.href = "index.html"; // REDIRECT AFTER LOGOUT
    })
    .catch(error => console.error(error));
};



























