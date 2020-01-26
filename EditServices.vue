<template>
  <v-flex xs12 sm12>
      <h2>Edit Services</h2><br>
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
              <v-text-field type="text" label="Full Name" v-model="bnservice.services"
              :rules="[v => !!v || 'Please Enter service']" required></v-text-field>
            </v-flex> 

     </v-layout><br>
        <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn :disabled="!valid" round color="success" @click="formSubmit()">Submit</v-btn>
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
      serveid: this.$route.params.serveId,
      valid:true,
         formRequest: null,
        displayError: false,
      bnservice:{
          "services":''
      }
        
      }
    },

    methods: {

      reset () {
        this.$refs.form.reset()
      },
      
      getServices(){
          apiService.getServices(this.serveid).then((response)=>{
              this.bnservice.services = response.services;
              console.log(this.bnservice);
              
          })
      },

      formSubmit(){
         if (this.$refs.form.validate()){
           this.valid = true;
          let data = {
              "serveId":this.serveid,
              "services":this.bnservice.services
          }
          console.log(data);
          const auth = {
                headers: {Authorization:localStorage.getItem('token')} 
            }
            const url = `${API_URL}/masters/editServices`;
        return axios.put(url, data, auth).then((response)=>{
          if(response.status==202){ 
            alert("Successfull");
            this.$router.push("/services");
          }
          else{
            alert("Oops !!, Something went wrong..., Please try again after some time");
          }
        });
      }
      }
    },

    mounted(){
        this.getServices();
    }
    
    
  }
</script>