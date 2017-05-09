<template>
  <div class="photoprojectlist">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <!-- <div v-for="project in projects">
        <span v-for="item in project">{{item.projecttitle}}</span> |
        <span v-for="item in project">{{item.description}}</span>
        <span>{{project}}</span>
    </div> -->
  </div>
</template>

<script>
import Firebase from 'firebase'

// let config = {
//     apiKey: "AIzaSyDMUHcRWC366LV2M3HK8mYUtdnldi7rG_M",
//     authDomain: "mumu-2498f.firebaseapp.com",
//     databaseURL: "https://mumu-2498f.firebaseio.com",
//     projectId: "mumu-2498f",
//     storageBucket: "mumu-2498f.appspot.com",
//     messagingSenderId: "344642973269"
//   };
//
// let app = Firebase.initializeApp(config);
// let db = app.database();
// let projectsRef = db.ref('projects');
// let itemid = '-KjUaCSSVZHpQ19_HIwV';
// let projectTitle;
// let projectDescription;
// let projectsSlides;

export default {
  name: 'photoprojectlist',
  data () {
    return {
      msg: 'Projectslist'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
  color: pink;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
