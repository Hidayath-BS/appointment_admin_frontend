<template>
  <v-flex xs12 sm12>
      <h2>Add Doctor Speciality</h2><br>
      <v-card>
      <v-card-text>
        <v-form ref="form"
      v-model="valid"
      lazy-validation>

    <v-layout row>
        <v-flex xs3>
            <v-subheader>
                Doctor Name
            </v-subheader>

        </v-flex>
            <v-flex xs3>
               <v-select
                      :items="doctors"
                      label="Select Doctor"
                      item-text="username"
                      item-value="id"
                      v-model="doc"
                      single-line
                      class="fields"
                      :rules="[v => !!v || 'Please Select Doctor']" required
                    ></v-select>
            </v-flex>

            <v-flex xs3>
            <v-subheader>
                Speciality
            </v-subheader>

        </v-flex>

        <v-flex xs3>
              <v-text-field type="text" label="Enter Speciality" v-model="serve" 
              :rules="[v => !!v || 'Please Enter Speciality']" required></v-text-field>
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
        doctors:[],
        serve:'',
        doc:'',
         valid:true,
         formRequest: null,
        displayError: false,
        
      }
    },

    methods: {

      reset () {
        this.$refs.form.reset()
      },

        getDoctors(){
            return apiService.getDoctors().then(response=>{
                this.doctors = response;
                console.log(this.doctors);
                
            })
        },
      addService(){
        if (this.$refs.form.validate()){
           this.valid = true;
          const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
        const url=`${API_URL}/masters/addDoctorSpeciality`;
        return axios.post(url,{"speciality": this.serve,
                                doctors: this.doc},auth).then(response =>{
      if(response.status==202){
         alert("Successfull");
            this.$router.push("/doctorsServiceList");
      }
      else{
        alert("Oops !!, Something went wrong..., Please try again after some time");
      }

    })
      }
      }
    },

    mounted(){
        this.getDoctors();
    }
    
    
  }
</script>