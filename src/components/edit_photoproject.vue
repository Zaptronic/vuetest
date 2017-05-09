<template>
    <div class="photoproject">
        <div class="new__project__container">
            <h1>{{ title }}</h1>
            <div class="new__project__description">
                <input placeholder="projecttitle" class="input__title" v-model="newProject.projecttitle">
                <input type="textarea" placeholder="description" class="input__description" v-model="newProject.description">
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
        <div v-for="project in projects">
            <span v-for="item in project">{{item.projecttitle}}</span> |
            <span v-for="item in project">{{item.description}}</span>
            <span>{{project}}</span>
        </div>
        <ul>
            <li v-for="slide in slides" class="liblock">
                <span>imageUrl: <strong>{{slide.imageUrl}}</strong></span><br>
                <span v-if="slide.backgroundColor">backgroundColor: <strong>{{slide.backgroundColor}}</strong></span>
                <span v-else>backgroundDominantColor: <strong>{{slide.backgroundDominantColor}}</strong></span>
                <br>
                <span>fullscreenOption: <strong>{{slide.fullscreenOption}}</strong></span><br>
                <div class="options">
                    <button v-on:click="editSlide(slide)"> edit </button>
                    <button v-on:click="deleteSlide(slide)"> delete </button>
                </div>
                <!-- <input v-model="slide.imageUrl" v-if="slide.editbox === false"> -->
            </li>
        </ul>
        <p>project Id: {{$route.params.projectId}}</p>
        <!-- create a seperate template for this-->
        <!-- editslide.imageUrl-->
        <!--  so we need a new empty edit object in which we can bind the slide values-->
        <!-- <input v-model="slide.imageUrl" v-if="slide.editbox === false"> -->
        <div class="new__project__saveproject">
            <button v-on:click="saveProject"> Save project </button>
        </div>
        <!-- save button to export to firebase-->
    </div>
</template>

<script>
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
let db = app.database();
let projectsRef = db.ref('projects');

export default {
    name: 'photoproject',
    firebase: {
        projects: projectsRef
    },
    watch: {
        '$route' (to, from) {
            console.log(to.$params.projectId);
        }
    },
    created (){
        console.log(this.projectId);
    },
    data () {
        return {
        title: 'New photoproject',
        newProject: {},
        newSlide: {},
        slides: [],
        projectId: this.$route.params.projectId,
        hideBGcolor: false
        }
        //editslide object to add editbox var to be able to create a global edit form??
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
        editSlide: function(slide) {
            var testkeyvar = projectsRef.child('projects').push().key;cd
            console.log(projectsRef.child('projects').push().key);
            // this.newSlide.imageUrl = slide.imageUrl;
            // if(slide.imageUrl != '') {
            //     slide.editbox = false;
            // }
        },
        saveProject: function() {
            event.preventDefault();
            var newPostKey = projectsRef.child('projects').push().key;
            let slidesRef = db.ref('projects/'+ newPostKey);
            slidesRef.push(this.newProject);
            slidesRef.push(this.slides);

            this.slides = [];
            this.newProject.projecttitle = '';
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
        position: absolute;
        bottom: 0;
        padding: 12px;
    }
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
