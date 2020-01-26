
<template>
  <v-flex xs12 sm12>
      <h2>Add Branch</h2><br>
      <v-card>
      <v-card-text>
    <v-form ref="form"
      v-model="valid"
      lazy-validation>
    <v-layout row>
        <v-subheader>Branch Name:</v-subheader>
            <v-flex xs12 sm3 offset-sm1>
              <v-text-field type="text" label="Enter Branch Name" v-model="branchName" 
              :rules="[v => !!v || 'Please Enter Branch Name']" required></v-text-field>
            </v-flex> 
      
     </v-layout>
  <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn :loading="loading" :disabled="!valid" round color="success" @click="addbranch(),loader = 'loading'">Submit</v-btn>
          <v-btn round color="error">Cancel</v-btn>
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
    name: 'DatePickers',
    
    data () {
      return {
        picker: null,
        date: null,
        menu: false,
        modal: false,
        dialog1: false,
        branchName:'',
        loader: null,
        loading: false,
        valid:true,
         formRequest: null,
        displayError: false,
        
      }
    },

    methods: {


       addbranch(){
         if (this.$refs.form.validate()){
           this.valid = true;
           const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url=`${API_URL}/masters/addBranch/`;
   
     return axios.post(url,{"branchName": this.branchName},auth).then(response=>{
                            console.log(response.status);
                            if(response.status==200){
                              alert("Branch added succesfully");
                              this.$router.push("/branch");
                            }
                            else{
                              alert("failed");
                            }
                    },err=>{
                     alert("Something Went Wrong");
                     }
    )
         }
     
    },
      
    },
    watch: {
      menu5 (val) {
        val && this.$nextTick(() => (this.$refs.picker5.activePicker = 'YEAR'))
      },
       loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 5000)

        this.loader = null
      }
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Masters',
          disabled: false,
          href: ''
        },
        {
          text: 'Branch',
          disabled: false,
          href: '/branch'
        },
        {
          text: 'Add Branch',
          disabled: false,
          href:'/AddBranch'
        }
      ]
    }

    
  }
</script>