<template>
    <div id="app">
        <headernav></headernav>
        <router-view></router-view>
    </div>
</template>

<script>
import Headernav from './components/headernav'
import Photoprojectlist from './components/photoprojectlist'
import Photoproject from './components/photoproject'

export default {
    name: 'app',
    components: {
        Headernav,
        Photoprojectlist
    },
    data () {
        return {
        }
    }
}
</script>

<style>
    body {
        margin: 0;
    }
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
</style>
