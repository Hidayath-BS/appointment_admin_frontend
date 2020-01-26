
<template>
  <v-flex xs12 sm12>
      <h2>Edit Branch</h2><br>
      <v-card>
      <v-card-text>
     <v-form ref="form"
      v-model="valid"
      lazy-validation>
    <v-layout row>
        <v-subheader>Branch Name:</v-subheader>
            <v-flex xs12 sm3 offset-sm1>
              <v-text-field type="text" label="Enter Branch Name"  v-model="branchlist.branchName"
              :rules="[v => !!v || 'Please Enter Branch Name']" required></v-text-field>
            </v-flex> 
      
     </v-layout>
  <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn :disabled="!valid" round color="success" @click="submitBranch()">Submit</v-btn>
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
        branchhid: this.$route.params.branchid,
   branchlist:{
        "branchName":null,
      },
        picker: null,
        date: null,
        menu: false,
        modal: false,
        dialog1: false,
           valid:true,
         formRequest: null,
        displayError: false,
        
      }
    },

    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
      //get branch through id
       getBranch(){
         return apiService.getBranch(this.branchhid).then((response)=>{
          this.branchlist.branchName = response.branchName;
          console.log(response);
          
        });
      },

      reset () {
        this.$refs.form.reset()
      },

      //submit edited data
      submitBranch(){
        if (this.$refs.form.validate()){
           this.valid = true;
        let data = {
          "branchid": this.branchhid,
          "branchName": this.branchlist.branchName,
         
        }
         console.log(data);

        const auth = {
                headers: {Authorization:localStorage.getItem('token')} 
            }
        const url = `${API_URL}/masters/editbranches`;
        return axios.put(url, data, auth).then((response)=>{
          if(response.status==202){ 
            this.$router.push('/branch');
          }
          else{
            alert("Oops !!, Something went wrong..., Please try again after some time");
          }
        });
      }
      }
      
 },
    mounted(){
     this.getBranch();
    },
    watch: {
      menu5 (val) {
        val && this.$nextTick(() => (this.$refs.picker5.activePicker = 'YEAR'))
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
          text: 'Edit Branch',
          disabled: false,
          href:'/EditBranch'
        }
      ]
    }
    
  }
</script>