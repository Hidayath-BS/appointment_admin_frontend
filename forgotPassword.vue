<template>
 <v-container fluid class="logg7">
    
        <br><br>
    <v-layout row wrap >

      <v-flex lg4 md4></v-flex>
      <v-flex lg4 md4 sm12 xs12>
         <v-card class="mx-auto logg3">
           <!-- <v-flex>
             <center>
               <img src="../static/BN-logo-47.png" class="logg6" alt="Vue Material Admin" width="310" height="80"/>
             </center>
             </v-flex> -->
             <div id="btn">
             <v-card-title>
          <h3 class="logg5">Forgot Password</h3>
             </v-card-title>
           
           <v-card-text>
             
              <v-form>
                
                <v-text-field prepend-icon="person" name="Username" label="Mobile Number" v-model="mobileNumber"></v-text-field>
               
            
             </v-form>
           </v-card-text>
          <v-card-actions>
            <v-flex lg2>

            </v-flex>
            
           <v-flex lg8 sm12 xs12>
              <v-btn block color="primary" class="logg4" @click="forgotPasswordOtp()" :loading="loading">Submit</v-btn>
          </v-flex>
          </v-card-actions>
           </div>
          
           <div id="otp" style="display:none">
             <v-card-title>
          <h3 class="logg5">Reset Password</h3>
             </v-card-title>
              <v-form>
              <v-flex xs12 sm11>
            <v-text-field prepend-icon="person" name="otp" label="Enter OTP" v-model="otp"></v-text-field>
            </v-flex>
            <v-card-actions>
              <v-layout row wrap>
                <v-flex xs4>
                </v-flex>
              <v-flex xs4>
              <v-btn primary block color="primary" @click="submitotp()">Submit</v-btn><br/><br/><br/>
              </v-flex>
              </v-layout>
            </v-card-actions>             
            </v-form>
            </div>

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
    mobileNumber:'',
    mobileNo:0,
    otp:'',
 
  }),
  methods:{
    
    forgotPasswordOtp(){
      const url = `${API_URL}/forgotpassword/forgotPasswordOtp/`
      const data ={
        "mobilenumber":this.mobileNumber
      }
      console.log(data);
      
      return axios.post(url,data).then(response=>{
        if (response.status==202) {
          this.getotp();
        }
        else if(response.status== 403){
          alert("User with above mobile number is not active... Please register")
        }
        else if(response.status== 409){
          alert("User does not exit")
        }  
        else{
          alert("something went wrong...")
        }     
      })
    },
    getotp(){
    document.getElementById('btn').style.display='none';
    document.getElementById('otp').style.display='block';    
    },
    submitotp(){
      const url = `${API_URL}/forgotpassword/validateFpOtp`
     const data ={
        "mobileNumber":this.mobileNumber,
        "otp":this.otp
      }
      console.log(data);
      
      return axios.post(url,data).then(response=>{
        if (response.status==202) {
          localStorage.setItem("mobile_number",this.mobileNumber);
          this.$router.push('/ResetPassword')
        }
        else if(response.status== 403){
          alert("User with above mobile number is not active... Please register")
        }
        else if(response.status== 409){
          alert("User does not exit")
        }  
        else{
          alert("something went wrong...")
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
