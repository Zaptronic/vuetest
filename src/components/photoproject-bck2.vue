<template>
    <div class="photoproject">
        <div class="new__project__container">
            <h1>{{ title }}</h1>
            <div class="new__project__description">
                <input placeholder="projecttitle" class="input__title">
                <input type="textarea" placeholder="description" class="input__description">
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
                <span>imageUrl: <strong>{{slide.imageUrl}}</strong></span><br>
                <span v-if="slide.backgroundColor">backgroundColor: <strong>{{slide.backgroundColor}}</strong></span>
                <span v-else>backgroundDominantColor: <strong>{{slide.backgroundDominantColor}}</strong></span>
                <br>
                <span>fullscreenOption: <strong>{{slide.fullscreenOption}}</strong></span><br>
                <div class="options">
                    <button v-on:click="editSlide(slide)"> edit </button>
                    <button v-on:click="deleteSlide(slide)"> delete </button>
                </div>
                <input v-model="slide.imageUrl" v-if="slide.editbox === false">
            </li>
        </ul>
        <!-- create a seperate template for this-->
        <!-- editslide.imageUrl-->
        <!--  so we need a new empty edit object in which we can bind the slide values-->
        <!-- <input v-model="slide.imageUrl" v-if="slide.editbox === false"> -->

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
let slidesRef = db.ref('slides');

export default {
    name: 'photoproject',
    firebase: {
        slides: slidesRef
    },
    data () {
        return {
        title: 'New photoproject',
        newSlide: {},
        slides: [
            // {
            // imageUrl: '',
            // backgroundDominantColor: false,
            // backgroundColor: [255,255,255],
            // fullscreenOption: false,
            // editbox: true
            // }
        ],
        hideBGcolor: false,
        totalSlides: []
        }
        //editslide object to add editbox var to be able to create a global edit form??
    },
    methods: {
        whattheoption: function(event){
            // console.log(this.newSlide);
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

            console.log(this.newSlide);
            slidesRef.push(this.newSlide);

            this.newSlide.imageUrl = '';
            this.newSlide.backgroundDominantColor = false;
            this.newSlide.backgroundColor = '';
            this.hideBGcolor = false;
            this.newSlide.fullscreenOption = false;
        },
        deleteSlide: function(slide) {
            slidesRef.child(slide['.key']).remove();
        },
        editSlide: function(slide) {
            this.newSlide.imageUrl = slide.imageUrl;
            if(slide.imageUrl != '') {
                slide.editbox = false;
            }
        }
    }
}

// this.slides.push({
//     imageUrl: this.newSlide.imageUrl,
//     backgroundDominantColor: this.newSlide.backgroundDominantColor,
//     backgroundColor: [r,g,b],
//     fullscreenOption: this.newSlide.fullscreenOption,
//     editbox: true
// });
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
