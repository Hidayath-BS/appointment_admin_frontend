<template>
    <v-container>
        <v-layout row wrap>
            <v-flex sm12>
                <v-card>
                    
                    <v-card-text>
                        <v-layout>
                            <v-flex>
                              <p><b> {{ Detailslist.patient.firstName}} {{Detailslist.patient.lastName}} </b></p>
                        
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex>
                                <p class="text-right">Mobile No :<u>{{Detailslist.mobileNumber}} </u> , Email : <u>{{Detailslist.email}}  </u> </p>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <br>
                        <v-layout row wrap>
                            <v-flex sm12>
                                <h3>Query :{{Detailslist.consultationRequest}}</h3>
                                <p>
                                   
                                </p>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex>
                                <v-spacer></v-spacer>
                        <p class="text-right"> <b>Date & Time </b>:{{Detailslist.dateOfRequest}} - {{Detailslist.requestTime}} </p>
                            </v-flex>
                        </v-layout>
                       <v-divider></v-divider>
                        <br>
                        <v-form 
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        >
                        <v-layout row wrap>
                            <v-flex>
                                <v-textarea
                                    outline
                                    label="Your Answer"
                                    v-model="response"
                                    :rules="responseRules"
                                    required
                                ></v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-spacer></v-spacer>
                            <v-flex>
                                <v-btn :disabled="!valid" round color="success" @click="submitResponse()">Submit</v-btn>
                            </v-flex>
                        </v-layout>
                        </v-form>
                        <div v-if="responseDisplay">
                            <v-layout row wrap>
                            <h3>Consultation Responses</h3>
                        </v-layout>
                        <br>

                        <div row wrap v-for="(response, i) in reslist" :key="i">
                            <v-layout>
                            <v-flex sm12>
                                
                                <p>
                                   {{i +1}} ) {{response.response}}
                                </p>
                            </v-flex>
                            
                            
                        </v-layout>
                        <v-layout>
                            <v-spacer></v-spacer>
                            <v-flex>
                                <p class="text-right"> <b>Date & Time :</b>{{response.responseDate}}{{response.responseTime}}  </p>
                            </v-flex>
                        </v-layout>
                        </div>

                        </div>
                        
                        <br>
                    </v-card-text>
                    
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
    data(){
        return{
aaid:this.$route.params.aid,
reslist:[],
responseDisplay:false,
Detailslist:{
mobileNumber:null,
email:null,
dateOfRequest:null,
requestTime:null,
consultationRequest:null,
patient:{
firstName:null,
lastName:null,
},
},
  response:'',
  responseTime:'',
  responseDate:'',
  request:'',
            valid:true,
             formRequest: null,
        displayError: false,
            responseRules: [
                v => !!v || 'Response is required',
                v => (v && v.length >= 5) || 'Response Must be greater than atleast 5 characters'
            ]
        }
    },
    methods:{
         getDetails(){
         apiService.getOCRequestResponse(this.aaid).then((response)=>{
              this.Detailslist.mobileNumber=response.mobileNumber;
              this.Detailslist.email=response.email;
              this.Detailslist.dateOfRequest=response.dateOfRequest;
              this.Detailslist.requestTime=response.requestTime;
            
              this.Detailslist.consultationRequest=response.consultationRequest;
              this.Detailslist.patient.firstName=response.patient.firstName;
              this.Detailslist.patient.lastName=response.patient.lastName;
         })
     },
       getRes(){
         apiService.getOCRequestRes(this.aaid).then((response)=>{
             this.reslist = response;
                 console.log(response);
                 if(this.reslist.length > 0){
                    this.responseDisplay = true;
                }else{
                    this.responseDisplay = false;
                }
          })
     },
  
    submitResponse(){
        if(this.$refs.form.validate()){
                this.valid = true;
                console.log("Valid");
            let data ={
                 "request":this.aaid,
                    "response":this.response,
                  "responseTime":this.responseTime,
                    "responseDate":this.responseDate,
                   
                }
                console.log(data);
     const auth={
         headers:{Authorization:localStorage.getItem('token')}
       }
        const url =`${API_URL}/AddResponse`;
       return axios.post(url,data,auth).then(response=>{
           console.log(response.status);
         if(response.status==200){
             alert("Response added successfully");
              this.$router.push("/AnsweredOCList");

         }else{
             alert("Something Wrong");
         }
           },err=>{
                    alert("Something Went Wrong");
                })
            }
        }
    },
    mounted(){
       this.getDetails();
       this.getRes();
    },
       created: function(){
      this.$root.breadcrumbs = [
       {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
      
        {
          text: 'Opinion & Consultation Request List',
          disabled:false,
          href: '/OCRequestList'
        },
        {
          text: 'Response to Opinion & Consultation Request',
          disabled:true,
          href: '/OCRequestResponse'
        }
        
      ]
    }    
}
</script>
<style>
    .text-right{
        text-align: right;
    }
</style>
