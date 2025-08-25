

// TODO: Add SDKs for Firebase products that you want to use
 `https://firebase.google.com/docs/web/setup#available-libraries`

// FIREBASE CONFIGURATION
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


firebase.initializeApp(firebaseConfig);

// INITIALIZING FIREBASE
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics(); // ANALYTICS



// AUTH OBSERVER
let firstCheck = true;
auth.onAuthStateChanged(user => {
  if (user && firstCheck) {
    console.log("User signed in:", user.email);
    firstCheck = false; // Prevent repeated logs
  } else if (!user && firstCheck) {
    // console.log("No user signed in yet");
    firstCheck = false; // Prevent repeated logs
  }
});





// CUSTOM MESSAGES REPLACING FIREBASE
function customFirebaseError(error, messageEl) {
    const errorMessages = {
        "auth/invalid-credential": "⚠️ Incorrect email or password. Please try again.",
        "auth/wrong-password": "⚠️ Incorrect email or password. Please try again.",
        "auth/user-not-found": "⚠️ No account found with this email.",
        "auth/invalid-email": "⚠️ Please enter a valid email address.",
        "auth/missing-password": "⚠️ Password field cannot be empty.",
        "auth/email-already-in-use": "⚠️ This email is already registered.",
        "auth/weak-password": "⚠️ Password must be at least 6 characters.",
    };

    const customMessage = errorMessages[error.code] || "⚠️ Something went wrong. Please try again later.";

    if (messageEl) {
        messageEl.innerText = customMessage;
        messageEl.style.background = "red";
        messageEl.style.color = "white";
    }

    // console.error("Error code:", error.code, "| Firebase message:", error.message);
}



// PASSWORD TOGGLER
function setupPasswordToggle(toggleId, fieldIds) {
    const toggleIcon = document.getElementById(toggleId);
    const pwdField = fieldIds.map(id => document.getElementById(id));

    toggleIcon.style.transition = 
        "transform 0.25s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.25s ease";

    toggleIcon.addEventListener("click", () => {
        // FADE OUT ANIMATION
        toggleIcon.style.transform = "rotate(180deg) scale(0.85)";
        toggleIcon.style.opacity = "0";

        setTimeout(() => {
            const showPwd = pwdField[0].type === "password";

            pwdField.forEach(field => {
                field.type = showPwd ? "text" : "password";
            });

            // SWAP ICONS
            toggleIcon.classList.toggle("fa-eye", showPwd);
            toggleIcon.classList.toggle("fa-eye-slash", !showPwd);

            // FADE IN ANIMATION
            toggleIcon.style.transform = "rotate(200deg) scale(1.15)";
            toggleIcon.style.opacity = "1";

            // SNAP BACK ANIMATION
            setTimeout(() => {
                toggleIcon.style.transform = "rotate(0deg) scale(1)";
            }, 150);
        }, 250);
    });
}

// SIGN UP WITH TWO FIELDS
setupPasswordToggle("toggleSignUpPwd", ["signUpPwd", "conSignUpPwd"]);

// LOGIN WITH ONE FIELD
setupPasswordToggle("toggleLoginPwd", ["loginPwd"]);







// ====================== SIGN IN VALIDATION ======================
window.signUp = function(event) {
    // PREVENT RELOAD ON SUBMIT
    event.preventDefault();
    
    const fullNameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("signUpEmail");
    const pwdInput = document.getElementById("signUpPwd");
    const confrimPwdInput = document.getElementById("conSignUpPwd");
    const messageEl = document.getElementById("signUpMessage");

   

    if (!emailInput || !pwdInput || !confrimPwdInput || !fullNameInput) {
        // console.error("Sign up inputs unavailable");
        messageEl.innerText = "⚠️ Please fill in all fields";
        messageEl.style.color = "red";
        return;
    }

        if (pwdInput.value !== confrimPwdInput.value) {
            messageEl.innerText = `⚠️ Please ensure your passwords match`;
            messageEl.style.background = "red";
            messageEl.style.color = "white";
            console.log("Passwords must match");
            return;
        }

    const email = emailInput.value;
    const pwd = pwdInput.value;
    const confPwd = confrimPwdInput.value;
    

    // =========================== CREATE USER ===========================
    auth.createUserWithEmailAndPassword(email, pwd)
    .then(userCredential => {
        const user = userCredential.user;
        console.log("User created");
        
        // REMOVE @gmail.com AND RETAIN THE INITIALS IN userName
        const userName = email.split("@")[0];

        // STORING FULLNAME IN FILE STORE
         db.collection("users").doc(user.uid).set({
            fullName: fullNameInput.value,
            email: email
        });


        // SUCCESS MESSAGE
        // console.log("User:", user);
        messageEl.innerText = `Account created successfully for ${userName}`;
        messageEl.style.background = "green";
        messageEl.style.color = "white";

    
        // STORING WELCOME MESSAGE AND TYPE
        sessionStorage.setItem("welcomeMessage", `🎉 Welcome, ${userName}!`);
        sessionStorage.setItem("welcomeType", "signup");


        // REDIRECT AFTER SUCCESSFUL SIGN UP
        setTimeout(() => {
            window.location.href = "userpage.html";
        }, 600); // DELAY TIME TO DISPLAY SUCCESS MESSAGE


        // CLEAR FORM
        emailInput.value = "";
        pwdInput.value = "";
        confrimPwdInput.value = "";
        fullNameInput.value = "";

    })
    .catch(error => {

        customFirebaseError(error, messageEl);
    });
}






// ====================== LOGIN FUNCTION ======================
window.login = function(event) {
    // PREVENT RELOAD ON SUBMIT
    event.preventDefault();
    
    const emailInput = document.getElementById("loginEmail");
    const pwdInput = document.getElementById("loginPwd");
    const messageEl = document.getElementById("loginMessage");


    if (!emailInput || !pwdInput ) {
        console.error("Sign up inputs unavailable");
        messageEl.innerText = "⚠️ Please fill in all fields";
        messageEl.style.color = "red";
        return;
    }

    const email = emailInput.value;
    const pwd = pwdInput.value;






    //  ============ LOGIN USER =====================
    auth.signInWithEmailAndPassword(email, pwd)
        .then(userCredential => {
            const user = userCredential.user;
            // SPLIT @ AND RETAIN THE INITIALS
            const userName = email.split("@")[0];

            // SUCCESS MESSAGE
            // console.log("user:", user);
            messageEl.innerText = `✅ Login successful!`;
            messageEl.style.color = "white";
            messageEl.style.background = "green";

            
            // STORING WELCOME MESSAGE AND TYPE
            sessionStorage.setItem("welcomeMessage", `🎉 Welcome back ${userName}!`);
            sessionStorage.setItem("welcomeType", "login");


            // REDIRECT AFTER SUCCESSFUL SIGN UP
            setTimeout(() => {
                window.location.href = "userpage.html";
            }, 600); // DELAY TIME TO DISPLAY SUCCESS MESSAGE


            // CLEAR FORM AFTER SUBMISSION
            emailInput.value = "";
            pwdInput.value = "";
        })
        .catch(error => {

            customFirebaseError(error, messageEl);
        });
}







// ========================== PASSWORD RESET ==========================

import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// ====================== PASSWORD RESET ======================
document.addEventListener("DOMContentLoaded", () => {
  const resetForm = document.querySelector("#pwdResetModal form");
  const resetEmailInput = document.getElementById("pwdResetEmail");
  const messageEl = document.getElementById("pwdResetMessage");

  if (resetForm) {
    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = resetEmailInput.value.trim();

      try {
        await sendPasswordResetEmail(auth, email);
        // RESET MESSAGE
        messageEl.innerHTML = `A link has been sent to ${email}, proceed to reset your password`;
        console.log(`A link has been sent to ${email}, proceed to reset your password`);
        messageEl.style.background = "green";
        messageEl.style.color = "white";
        
      } catch (error) {
        // console.error("Password reset error:", error.message);
        customFirebaseError(error, messageEl);
        // messageEl.innerHTML = `
        //   <p class="text-danger fw-bold text-center">
        //     ⚠️ ${error.message}
        //   </p>
        // `;
      }
    });
  }
});





