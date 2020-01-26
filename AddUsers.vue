<template>
  <v-flex xs12 sm12>
      <h2>Add Users</h2><br>
      <v-card>
      <v-card-text>
         <v-form ref="form"
      v-model="valid"
      lazy-validation>
    <v-layout row wrap>
      <v-flex>
        <v-subheader>Title</v-subheader>
      </v-flex>
      <v-flex xs3>
              <v-select
                      :items="title"
                      label="Select Title"
                      item-text="titlename"
                      item-value="titlename"
                      v-model="titlename"
                      single-line
                      class="fields"
                      :rules="[v => !!v || 'Please Select title']"
                      required
                    ></v-select>
            </v-flex> 
        <v-flex xs3>
            <v-subheader>
                User name
            </v-subheader>

        </v-flex>
            <v-flex xs3>
              <v-text-field type="text" label="User Name" v-model="username" 
              :rules="[v => !!v || 'Please Enter username']" required></v-text-field>
            </v-flex> 
        
        
        </v-layout>

        <v-layout row wrap>
          <v-flex xs3>
            <v-subheader>
                Mobile Number
            </v-subheader>
        </v-flex>
        
            <v-flex xs3>
              <v-text-field type="number" label="Mobile Number" v-model="mobilenumber"
               :rules="[v => !!v || 'Please Enter Mobilenumber']" required></v-text-field>
            </v-flex>
        <v-flex xs3>
            <v-subheader>
                Email
            </v-subheader>

        </v-flex>
            <v-flex xs3>
              <v-text-field type="email" label="Email" v-model="email"
               :rules="[v => !!v || 'Please Enter email']" required></v-text-field>
            </v-flex> 
        
        
        </v-layout>

        <v-layout row wrap>
          <v-flex xs3>
            <v-subheader>
                Password
            </v-subheader>
        </v-flex>
        
            <v-flex xs3>
              <v-text-field type="password" label="Password" v-model="password"
               :rules="[v => !!v || 'Please Enter password']" required></v-text-field>
            </v-flex>
        <v-flex xs3>
            <v-subheader>
                Role
            </v-subheader>

        </v-flex>
            <v-flex xs3>
              <v-select
            :items="authorities"
            v-model="role"
            label="Select"
            class="input-group--focused"
            item-value="id"
            item-text="authority"
             :rules="[v => !!v || 'Please select the role']" required
          ></v-select>
            </v-flex> 
        
        </v-layout>
            
        

     <br>
        <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn :disabled="!valid" round color="success" @click="addUser()">Submit</v-btn>
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
        authorities:[],
        titleid:"",
        titlename:"",
        username:'',
        mobilenumber:'',
        email: '',
        password:'',
        roleid:'',
        role:null,
        title:[{
          id:1,
          titlename: "Mr."
        },{
          id:2,
          titlename: "Ms."
        },{
          id:3,
          titlename: "Mrs."
        },{
          id:4,
          titlename: "Dr."
        }],

         valid:true,
         formRequest: null,
        displayError: false,
        
      }
    },

    methods: {
      getRoles(){
        apiService.getRoles().then((response)=>{
          this.authorities = response;
          console.log(response);
          
        })
      },

      reset () {
        this.$refs.form.reset()
      },
      addUser(){
        if (this.$refs.form.validate()){
           this.valid = true;
        let formData= {
          "mobilenumber": this.mobilenumber,
          "password":this.password,
          "username":this.titlename+" "+this.username,
          "email":this.email,
          "role":this.role,
        };
        console.log(formData);
        
        const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
           }
           const url = `${API_URL}/addUsers`;

           return axios.post(url,formData,auth).then(response => {
             console.log(response);
             
                                   if(response.status==202){
                        alert("User added successfully");
                                  this.$router.push("/user");
      }
      else{
        alert("Oops !!, Something went wrong..., Please try again after some time");
      }   
                                  })
        }
      }
    },

    mounted(){
      this.getRoles();
    }
    
    
  }
</script>