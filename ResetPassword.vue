<template>
<v-container fluid class="logg7">
    
        <br><br>
    <v-layout row wrap >

      <v-flex lg4 md4></v-flex>
      <v-flex lg4 md4 sm12 xs12>
         <v-card class="mx-auto logg3">
            <v-card-title>
          <h3 class="logg5">Reset Password</h3>
            </v-card-title>
           <v-card-text>
              <v-form>
               <v-text-field prepend-icon="lock" name="Password" label="New Password" type="password" v-model="password"></v-text-field>
            <v-text-field prepend-icon="lock" name="Password" label="Confirm Password" type="password"></v-text-field>

             </v-form>
            
           </v-card-text>
          <v-card-actions>
            <v-flex lg2>

            </v-flex>
            
           <v-flex lg8 sm12 xs12>
              <v-btn block color="primary" class="logg4" @click="changePassword()" :loading="loading">Submit</v-btn>
          </v-flex>
          </v-card-actions>
          
            <br><br>
         </v-card>
       </v-flex>
      </v-layout>
    </v-container>
    </template>

<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

export default {
  data: () => ({
    loading: false,
  password:'',
  }),
  methods:{
    changePassword(){
      const url = `${API_URL}/forgotpassword/changePswd`
     const data ={
        "mobilenumber":localStorage.getItem('mobile_number'),
        "password":this.password
      }
      console.log(data);
      
      return axios.post(url,data).then(response=>{
        if (response.status==202) {
          alert("Password changed Successfully")
          localStorage.removeItem("mobile_number");
          this.$router.push('/user')
        }
        else if(response.status== 403){
          alert("something went wrong... please Try again")
        }
        else if(response.status== 409){
          alert("something went wrong... please Try again")
        }  
        else{
          alert("something went wrong... please Try again")
        }     
      })
    }
  }
}
</script>
<style scoped lang="css">
.logg{
  text-decoration: none;
}

.logg1{
  text-decoration: none;
  float: right;
}
/* .logg3{
  border: 2px solid darkblue;
} */
.logg5{
  text-align: center;
  
}
.logg6{
  padding: 8px 0px 0px 2px;
  margin: 0 0 0 10px;

}

.logg8{
  text-align: center;
}




</style>
