<template>
    <div class="photoproject">
        <div class="new__project__container">
            <h1>{{ title }}</h1>
            <p>project Id: {{$route.params.projectId}}</p>
            <button v-on:click="fillProject"> fill project </button>
            <div class="new__project__description">
                <input class="input__title" v-model="projectTitle">
                <input type="textarea" class="input__description" v-model="projectDescription">
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
        <!-- <div v-for="project in projects">
            <span v-for="item in project">{{item.projecttitle}}</span> |
            <span v-for="item in project">{{item.description}}</span>
            <span>{{project}}</span>
        </div> -->
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
        <button v-on:click="editProject"> Edit project </button>

        <div class="new__project__saveproject">
            <button v-on:click="saveProject"> Save project </button>
            <button v-on:click="updateProject" class="update"> Update project </button>
        </div>
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
let itemid = '-KjTvxZePR4UnAoo9Eis';
let projectTitle;
let projectDescription;
let projectsSlides;


// projectsRef.on('value', function(snap) {
//         let thisobject = snap.child(itemid).val();
//         // console.log(thisobject);
//
//         projectDescription = snap.child(itemid).val().projectDescription;
//         let tit = snap.child(itemid).val().projectTitle;
//         console.log(projectDescription);
//         console.log(tit);
//
//         let sil = snap.child(itemid).val().projectSlides;
//         console.log(sil);
//
//         console.log(projectDescription);
//         return projectDescription;
// });


// projectsRef.on('value', function(snap) {
        //this part if on the right track

        //grab object key eventually this should be passed on from the other view
        // let thisobjectKey = snap.child(itemid).getKey();
        // console.log(thisobjectKey);

        // console.log(snap.hasChild(itemid));
        // console.log(snap.getKey(), snap.val());
        // let thisobject = snap.child(itemid).val();
        // console.log(thisobject);
        //
        // projectDescription = snap.child(itemid).val().projectDescription;
        // let tit = snap.child(itemid).val().projectTitle;
        // console.log(projectDescription);
        // console.log(tit);
        //
        // let sil = snap.child(itemid).val().projectSlides;
        // console.log(sil);
        //grab first slide eventually we should loop through all slides
        // let thisobject0 = snap.child(itemid).child('0').val();
        // console.log(thisobject0);

        // let key = snap.child(itemid).child('description').getKey();
        // console.log(key);
        //ends here
        //loop?
        // snap.child(itemid).forEach(function (childSnap) {
        //     let descr = childSnap.val();
        //     let projectDescription = descr.key;
        //     console.log(projectDescription);
        //     console.log(childSnap.val());
        // });


    // snap.forEach(function (childSnap) {
    //     let firstStep = childSnap.val();
    //     let firstKey = childSnap.key;
    //     projectkeys.push(firstKey);
    //
    //     // console.log(firstStep);
    //     childSnap.forEach(function(babySnap){
    //         let key = babySnap.key;
    //         let title = babySnap.val();
    //         let description = babySnap.val();
    //
    //         projectDescription = description.description;
    //         projectTitle = title.projecttitle;
    //         //not failsafe
    //         if(projectDescription != undefined) {
    //             projectDescriptions.push(projectDescription);
    //         }
    //     });
    // });

    // console.log(projectkeys);
    // console.log(projectDescriptions);
// });

export default {
    name: 'photoproject',
    firebase: {
        projects: projectsRef,
    },
    watch: {
        '$route' (to, from) {
        console.log(to.params.projectId);
        },
    },
    data () {
        return {
        title: 'Edit photoproject',
        newSlide: {},
        slides: [],
        projectId: this.$route.params.projectId,
        hideBGcolor: false,
        projectTitle: '',
        projectDescription: projectDescription
        }
        //editslide object to add editbox var to be able to create a global edit form??
    },
    created (){
        projectsRef.on('value', function(snap) {
                let thisobject = snap.child(itemid).val();

                //grab info (title etc.)
                projectDescription = snap.child(itemid).val().projectDescription;
                projectTitle = snap.child(itemid).val().projectTitle;

                //grab slides
                let sil = snap.child(itemid).val().projectSlides;
                console.log(sil);
                return projectDescription;
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
            var testkeyvar = projectsRef.child('projects').push().key;
            console.log(projectsRef.child('projects').push().key);
            // this.newSlide.imageUrl = slide.imageUrl;
            // if(slide.imageUrl != '') {
            //     slide.editbox = false;
            // }
        },
        updateProject: function() {
            event.preventDefault();
            var newPostKey = projectsRef.child('projects').push().key;
            let slidesRef = db.ref('projects/' + itemid);
            slidesRef.update({
                projectTitle: this.projectTitle,
                projectDescription: this.projectDescription,
                projectSlides: this.slides
            });
            console.log('project updated');
            this.slides = [];
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
            console.log('project saved');
            this.slides = [];
        },
        editProject: function() {
            event.preventDefault();
            this.$router.push('/edit/:'+ this.projectId);
        },
        fillProject: function() {
            this.projectTitle = projectTitle;
            this.projectDescription = projectDescription;
            console.log(this.projectDescription);
            //for each slide/projectslide in data and push to slides[]
            //see if the model picks it up from there
        }
    }
}
// this.projectDescription = projectDescription;

// var projectDescription = 0;
//
// var projects = [];
// projectsRef.on('value', function(snap){
//     // console.log(snap);
//     snap.forEach(function (childSnap) {
//         let xss = childSnap.val();
//         // console.log(xss);
//         childSnap.forEach(function(babySnap){
//             let des = babySnap.val();
//             let xs = babySnap.key;
//             // console.log(des);
//             // console.log(xs);
//             let projectDescription = des.description;
//             let title = des.projecttitle;
//             let slides = babySnap.child(1);
//
//             // this.projectDescription = projectDescription;
//             //something like this
//             // this.description = des.description;
//             // console.log(title);
//             // console.log(projectDescription);
//             // console.log(slides);
//         });
//         // console.log('projects', childSnap.val());
//     });
//     // projects.push(snap.key);
// });
// projectsRef.orderByKey().on('value', function(snap) {
//     projectDescription = snap.getKey();
// });

// this.projectDescription = projectDescription;
// console.log(this.projectDescription);
// console.log(projectDescription);
// console.log(projectTitle);
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
.update {
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
