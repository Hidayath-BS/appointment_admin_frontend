<template>
  <div>
    <header-section></header-section>
    <v-content>
      <v-container fluid>
        <v-layout row wrap>
          <breadcrumbs v-if="$root.breadcrumbs.length"></breadcrumbs>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-layout>
      </v-container>
    </v-content>
    <footer-section></footer-section>
  </div>
</template>

<script>

  import Breadcrumbs from '../partials/Breadcrumbs'
  import Header from '../partials/Header'
  import Footer from '../partials/Footer'

  export default {
    name: 'Dashboard',
    data () {
      return {
        
      }
    },
    methods:{
      checkForLogin(){
        let loggedin = localStorage.getItem("loggedIn");
        let token = localStorage.getItem("token");
        if(loggedin != 1 || token == ""){
          this.$router.push("/login");
        }
      }
    },
    mounted(){
      this.checkForLogin();
    },
    components: {
      'breadcrumbs': Breadcrumbs,
      'header-section': Header,
      'footer-section': Footer
    }
  }
</script>
