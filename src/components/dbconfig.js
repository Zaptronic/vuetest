import Firebase from 'firebase'


let config = {
    apiKey: "AIzaSyDMUHcRWC366LV2M3HK8mYUtdnldi7rG_M",
    authDomain: "mumu-2498f.firebaseapp.com",
    databaseURL: "https://mumu-2498f.firebaseio.com",
    projectId: "mumu-2498f",
    storageBucket: "mumu-2498f.appspot.com",
    messagingSenderId: "344642973269"
  };

let app = Firebase.initializeApp(config);
// let db2 = app.database();
// let projectsRef = db2.ref('projects');
let itemid = '-KjUaCSSVZHpQ19_HIwV';
let projectTitle;
let projectDescription;
let projectsSlides;

export const db2 = app.database();
