
gsap.registerPlugin(ScrollTrigger);


// ABOUT SECTION ANIMATION
gsap.fromTo("#contentWrapper", 
    {
        y: 150,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        delay: .5,
        duration: 1.5,
        scrollTrigger: "#aboutHeaderText"
    }
)


// CARDS ANIMATION
gsap.fromTo("#firstCard", 
    {
        y: 400,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: "#firstCard"
    }
)



gsap.fromTo("#secondCard", 
    {
        y: 400,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        delay: .5,
        duration: .5,
        scrollTrigger: "#secondCard"
    }
)




gsap.fromTo("#thirdCard", 
    {
        y: 400,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        delay: 1,
        duration: .5,
        scrollTrigger: "#thirdCard"
    }
)



// CONTACT ANIMATION
gsap.fromTo("#firstCarousel", 
    {
        scale: 0.2,
    },
    {
        scale: 1,
        opacity: 1,
        delay: 0.2,
        duration: 1,
        scrollTrigger: "#firstCarousel"
    }
)




gsap.fromTo("#form", 
    {
        scale: 0.2,
        opacity: 0
    },
    {
        scale: 1,
        opacity: 1,
        delay: .5,
        duration: 1,
        scrollTrigger: "#form"
    }
)











// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

// import { 
//     getAuth, 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword 
// } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";










































