<template style = "background-color: red">
<v-app id="login">
    <div id="app">
  <v-container fluid>
    <v-layout row wrap class="text-xs-center" style="border-radius:9%">
      <!-- <v-flex xs4>
        <v-card height="500px" style="background-color: lightblue"></v-card>
      </v-flex> -->
      <v-flex xs6 offset-xs3 class="grey lighten-4">
        <v-container style="top: 10%;height:500px;border:2px solid blue" class="text-xs-center">
          <img src="../static/BN-logo-47.png" alt="Bangalore Nethralaya" width="70%" height="80">
          <br><br><v-card flat>
            <v-card-title primary-title>
              <h4>Login Here</h4>
            </v-card-title>
            <v-form>
              <v-flex xs12 sm11>
            <v-text-field prepend-icon="person" name="Username" label="Username" v-model="model.username"></v-text-field>
            <v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="model.password"></v-text-field>
            </v-flex>
            <v-card-actions>
              <v-layout row wrap>
                <v-flex xs4>
                </v-flex>
              <v-flex xs4>
              <v-btn primary block color="primary" @click="login">Login</v-btn>
              </v-flex>
              </v-layout>
            </v-card-actions>
             <br> 
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</div> 
</v-app> 
</template>

<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: ''
    }
  }),

  methods: {
    login(){
    let flag
    return axios.post(`${API_URL}/auth`,{
      email: this.model.username,
      password: this.model.password,
    })
    .then(response=>
    {
      console.log(response);
      
      if(response.status==200){
        flag=true
        const token="Bearer"+' '+response.data.token;
        localStorage.setItem('token', token);
        
        this.getUserRole();
        
        console.log("Bearer"+' '+response.data.token);
         
       
      }
      else{
        alert("Someting went wrong");
        flag=false
      console.log("Flag"+' '+flag);
      }
    },err=>{
      alert("Something went wrong");
    })
  },

  getUserRole(){
    let authorities = [];
    
    let url = `${API_URL}/User`;
    const auth = {
      headers: { Authorization: localStorage.getItem('token') }
    };

    return apiService.getloggedinUser().then((response)=>{
      console.log(response);
      authorities = response.authorities;
      // console.log(authorities);
      
      let fail = 1;
      for(let i =0; i< authorities.length; i++){
        if(authorities[i].authority == "SUPER_ADMIN"){
          console.log(authorities[i].authority);
          localStorage.setItem("role","SUPER_ADMIN");
          localStorage.setItem("username",response.username);
          this.successLogin();
          fail = 0;
          break;
        }else{
          if(authorities[i].authority == "FRONT_DESK"){
            console.log(authorities[i].authority);
            localStorage.setItem("role","FRONT_DESK");
            localStorage.setItem("username",response.username);
            this.successLogin();
            fail = 0;
            break;
          }else{
            if(authorities[i].authority == "DOCTOR"){
            console.log(authorities[i].authority);
            localStorage.setItem("role","DOCTOR");
            localStorage.setItem("username",response.username);
            this.successLogin();
            fail = 0;
            break;
          }
          else{
             if(authorities[i].authority == "ADMIN"){
            console.log(authorities[i].authority);
            localStorage.setItem("role","ADMIN");
            localStorage.setItem("username",response.username);
            this.successLogin();
            fail = 0;
            break;
          }
            else{

          }
          }
          
        }
      }
      }
      if(fail == 1){
        this.faliureLogin();
      }


    })
  },
  
  successLogin(){
    localStorage.setItem('loggedIn',1);
    this.$router.push('/dashboard');
  },
  faliureLogin(){
    localStorage.setItem('loggedIn',0);
    localStorage.removeItem("token");
    alert("You are Not a Admin User");
  },

    forgot () {
      this.loading = true;
      setTimeout(() => {
        this.$router.push('/Forgot');
      }, 1000);
    }

  }

};
</script>


<style scoped lang="css">



</style>
