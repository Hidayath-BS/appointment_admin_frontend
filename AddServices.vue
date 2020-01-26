<template>
  <v-flex xs12 sm12>
      <h2>Add Services</h2><br>
      <v-card>
      <v-card-text>
         <v-form ref="form"
      v-model="valid"
      lazy-validation>
    <v-layout row>
        <v-flex xs4>
            <v-subheader>
                Service Name
            </v-subheader>

        </v-flex>
            <v-flex xs4>
              <v-text-field type="text" label="Full Name" v-model="services"  
              :rules="[v => !!v || 'Please Enter service']" required></v-text-field>
            </v-flex> 

     </v-layout><br>
        <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn :disabled="!valid" round color="success" @click="addService()">Submit</v-btn>
          <v-btn round color="error" @click="reset()">Cancel</v-btn>
        </div>
      </v-flex>

        </v-layout>
         </v-form>
      </v-card-text>
      </v-card>
  </v-flex>
</template>
<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

  export default {
    data () {
      return {
        services: "",
        valid:true,
         formRequest: null,
        displayError: false,
        
      }
    },

    methods: {
      reset () {
        this.$refs.form.reset()
      },

      addService(){
         if (this.$refs.form.validate()){
           this.valid = true;
          const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
        const url=`${API_URL}/masters/addServices`;
        return axios.post(url,{services: this.services},auth).then(response =>{
      if(response.status==202){
         alert("Service added successfully");
            this.$router.push("/services");
      }
      else{
        alert("Oops !!, Something went wrong..., Please try again after some time");
      }

    })
      }
      }
    },
    
    
  }
</script>