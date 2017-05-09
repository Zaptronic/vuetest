<template>
    <div class="photoproject">
        <div class="new__project__container">
            <h1>{{ title }}</h1>
            <button v-on:click="newProject">new project</button>
            <button v-on:click="editProject">select project</button>
            <!-- <p>project Id: {{$route.params.projectId}}</p> -->
            <div v-if="editnewToggle === false">
                <span>edit project</span>
                <select v-model="itemid" v-on:change="projectSelect" placeholder='edit'>
                    <option value="" disabled selected>Edit a project</option>
                    <option v-for="project in projects">{{project.projectTitle}}</option>
                </select>
            </div>
            <div class="new__project__description">
                <span>Title</span>
                <input class="input__title" v-model="projectTitle">
                <span>Description</span>
                <textarea type="textarea" class="input__description" v-model="projectDescription"></textarea>
            </div>
            <h2>Add new slide</h2>
            <div class="new__project__addslides">
                <div class="new__project__addelement">
                    </label>imageUrl</label>
                    <input v-model="newSlide.imageUrl">
                </div>
                <div class="new__project__addelement">
                    </label>backgroundDominantColor</label>
                    <input type="checkbox" v-model="newSlide.backgroundDominantColor" v-on:click="whattheoption">
                </div>
                <div v-if="hideBGcolor === false" class="backgroundDominantColor new__project__addelement">
                    </label>backgroundColor</label>
                    <input v-model="newSlide.backgroundColor">
                </div>
                <div class="new__project__addelement">
                    </label>fullscreenOption</label>
                    <input type="checkbox" v-model="newSlide.fullscreenOption">
                </div>

                <button v-on:click="addNewSlide">add slide</button>
            </div>
        </div>
        <ul>
            <li v-for="slide in slides" class="liblock">
                <span>imageUrl:</span>
                <input v-model="slide.imageUrl"><br>
                <span>backgroundDominantColor:</span>
                <input type="checkbox" v-model="slide.backgroundDominantColor"><br>
                <span>backgroundColor:</span>
                <input v-model="slide.backgroundColor"><br>
                <span>fullscreenOption:</span>
                <input type="checkbox" v-model="slide.fullscreenOption"><br>
                <div class="options">
                    <button v-on:click="deleteSlide(slide)"> delete </button>
                </div>
                <!-- <input v-model="slide.imageUrl" v-if="slide.editbox === false"> -->
            </li>
        </ul>
        <div class="new__project__saveproject">
            <button v-on:click="saveProject"> Save as new project </button>
            <!-- when new project is active hide these buttons -->
            <button v-on:click="updateProject" class="update"> Update project </button>
            <button v-on:click="deleteProject" class="delete"> Delete project </button>
        </div>
    </div>
</template>

<script>
import Firebase from 'firebase'
// import {db} from './dbconfig.js'

let config = {
    apiKey: "AIzaSyDMUHcRWC366LV2M3HK8mYUtdnldi7rG_M",
    authDomain: "mumu-2498f.firebaseapp.com",
    databaseURL: "https://mumu-2498f.firebaseio.com",
    projectId: "mumu-2498f",
    storageBucket: "mumu-2498f.appspot.com",
    messagingSenderId: "344642973269"
  };

let app = Firebase.initializeApp(config);
let db = app.database();
let projectsRef = db.ref('projects');
let itemid = '-KjUaCSSVZHpQ19_HIwV';
let projects;
let projectKeys = [];
let projectTitle;
let projectDescription;
let projectsSlides;

export default {
    name: 'photoproject',
    firebase: {
        projects: projectsRef,
    },
    watch: {
        '$route' (to, from) {
        console.log(to.params.projectId);
        }
    },
    data () {
        return {
        title: 'Edit photoproject',
        newSlide: {},
        slides: [],
        projectId: this.$route.params.projectId,
        itemid: false,
        hideBGcolor: false,
        editnewToggle: false,
        projects: '',
        projectTitle: '',
        projectDescription: ''
        }
        //editslide object to add editbox var to be able to create a global edit form??
    },
    created (){
        projectsRef.on('value', function(snap) {
                //creates seperate title array
                snap.forEach(function (childSnap) {
                    let projectKey = childSnap.val().projectTitle;

                    projectKeys.push({
                        projectTitle: childSnap.val().projectTitle,
                        projectDescription: childSnap.val().projectDescription,
                        projectKey: childSnap.key
                    });
                });
                //grab entire oject for logging
                let thisobject = snap.child(itemid).val();
                projects = snap.val();
                // console.log(projects);

                //grab info (title etc.)
                // projectDescription = snap.child(itemid).val().projectDescription;
                // projectTitle = snap.child(itemid).val().projectTitle;

                //grab slides
                // projectsSlides = snap.child(itemid).val().projectSlides;
                // console.log(projectsSlides);
        });
    },
    methods: {
        whattheoption: function(event){
            if (this.hideBGcolor == false) {
                this.hideBGcolor = true
            } else {
                this.hideBGcolor = false
            }
        },
        addNewSlide: function(event) {
            event.preventDefault();
            if(this.newSlide.backgroundColor) {
                var color = this.newSlide.backgroundColor.split(',');
                var r = parseInt(color[0]);
                var g = parseInt(color[1]);
                var b = parseInt(color[2]);
                this.newSlide.backgroundColor = [r,g,b];
            } else {
                this.newSlide.backgroundColor = false;
            }
            if(this.slides == undefined) {
                this.slides = [];
            }
            this.slides.push({
                imageUrl: this.newSlide.imageUrl || false,
                backgroundDominantColor: this.newSlide.backgroundDominantColor || false,
                backgroundColor: this.newSlide.backgroundColor,
                fullscreenOption: this.newSlide.fullscreenOption || false
            });

            this.newSlide.imageUrl = '';
            this.newSlide.backgroundDominantColor = false;
            this.newSlide.backgroundColor = '';
            this.hideBGcolor = false;
            this.newSlide.fullscreenOption = false;
        },
        deleteSlide: function(slide) {
            console.log(this.slides.indexOf(slide));
            this.slides.splice(this.slides.indexOf(slide),1);
        },
        projectSelect: function(e) {
            event.preventDefault();
            for(var i=0; i< projectKeys.length; i++) {
                if (projectKeys[i].projectTitle == e.target.value) {
                    itemid = projectKeys[i].projectKey;
                    this.$router.push('/edit/:'+ itemid);
                }
            }
            //check if empty > error after delete project
            projectsRef.on('value', function(snap) {
                projectDescription = snap.child(itemid).val().projectDescription;
                projectTitle = snap.child(itemid).val().projectTitle;
                projectsSlides = snap.child(itemid).val().projectSlides;
            });
            this.projects = projects;
            this.projectTitle = projectTitle;
            this.projectDescription = projectDescription;
            this.slides = projectsSlides;
        },
        newProject: function() {
            event.preventDefault();
            this.projects = projects[0];
            this.projectTitle = '';
            this.projectDescription = '';
            this.slides = [];
            this.editnewToggle = true;
            console.log('new');
        },
        editProject: function() {
            this.editnewToggle = false;
            this.projects = projects;
            this.projectTitle = projectTitle;
            this.projectDescription = projectDescription;
            this.slides = projectsSlides;
        },
        saveProject: function() {
            event.preventDefault();
            var newPostKey = projectsRef.child('projects').push().key;
            let slidesRef = db.ref('projects/' + newPostKey);
            slidesRef.set({
                projectTitle: this.projectTitle,
                projectDescription: this.projectDescription,
                projectSlides: this.slides
            });
            this.projects = projects;
            this.projectTitle = '';
            this.projectDescription = '';
            this.slides = [];
            console.log('project saved');
        },
        updateProject: function() {
            event.preventDefault();
            let slidesRef = db.ref('projects/' + itemid);
            slidesRef.update({
                projectTitle: this.projectTitle,
                projectDescription: this.projectDescription,
                projectSlides: this.slides
            });
            console.log('project updated');
        },
        deleteProject: function(project) {
            let slidesRef = db.ref('projects/' + itemid);
            slidesRef.remove();
            this.projects = projects;
            this.projectTitle = '';
            this.projectDescription = '';
            this.slides = [];
            console.log('project deleted');
        }
    }
}
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";
.input {
    &__title {
        width: 400px;
    }
    &__description {
        width: 400px;
        height: 100px;
    }
}
select {
        width: 400px;
        min-height: 64px;
}
.new__project {
    &__description {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &__container {
    position: relative;
    padding: 12px;
    background-color: #f2f2f2;
    }
    &__addslides {
    }
    &__addelement {
        display: inline-block;
        height: 36px;
        border: 1px solid #bbb;
        margin: 12px;
        padding: 12px;
        vertical-align: middle;
    }
    &__saveproject {
        box-sizing: border-box;
        width: 100%;
        background-color: #f2f2f2;

        bottom: 0;
        padding: 12px;
    }
}
.update {
    background-color: green;
}
.delete {
    background-color: red;
}
.backgroundDominantColor {
    display: inline-block;
    background-color: white;
}
.liblock {
    background-color: #f2f2f2;
    padding: 12px;
    margin: 12px;
}
.options {
    display: block;
    padding-top: 12px;
}
h1, h2 {
font-weight: normal;
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
