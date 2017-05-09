<template>
  <div class="headernav">
    <router-link to="/" exact> Projectlist </router-link>
    <router-link to="/new"> Edit project </router-link>
  </div>
</template>

<script>
// import Firebase from 'firebase'
// import {db} from './dbconfig.js'

// let config = {
//     apiKey: "AIzaSyDMUHcRWC366LV2M3HK8mYUtdnldi7rG_M",
//     authDomain: "mumu-2498f.firebaseapp.com",
//     databaseURL: "https://mumu-2498f.firebaseio.com",
//     projectId: "mumu-2498f",
//     storageBucket: "mumu-2498f.appspot.com",
//     messagingSenderId: "344642973269"
//   };

// let app = Firebase.initializeApp(config);
// let db = app.database();
// let projectsRef = db.ref('projects');

export default {
    name: 'headernav',
    // firebase (){
    //     return {
    //         projectsRef: db.ref('projects')
    //     }
    // },
    // mounted (){
    //     this.$bindAsObject('projectsRef', db.ref('projects'));
    // },
    // props: ['projectsRef'],
    data () {
        return {
        title: 'mumu projects'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headernav {
    width: 100%;
    height: 44px;
    background-color: #444;
}
a {
    padding: 12px;
    color: #eee;
    text-decoration: none;
}
.router-link-active {
    font-weight: bold;
}
</style>
