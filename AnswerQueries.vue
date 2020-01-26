<template>
    <v-container>
        <v-layout row wrap>
            <v-flex sm12>
                <v-card>
                    
                    <v-card-text>
                        <v-layout>
                            <v-flex>
                                <p><b> {{ queryDetials.conversation.patient.firstName }} {{queryDetials.conversation.patient.lastName}} </b></p>
                        
                                
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex>
                                <p class="text-right">Mobile No : <u> {{ queryDetials.conversation.patient.mobileNumber }} </u> , Email : <u> {{ queryDetials.conversation.patient.email }} </u> </p>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <br>
                        <v-layout row wrap>
                            <v-flex sm12>
                                <h3>Query : </h3>
                                <p>
                                    {{ queryDetials.query }}
                                </p>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex>
                                <v-spacer></v-spacer>
                        <p class="text-right"> <b>Date & Time </b>: {{ queryDetials.queryDate }} - {{ queryDetials.queryTime }} </p>
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
                                    v-model="queryResp"
                                    :rules="responseRules"
                                ></v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-spacer></v-spacer>
                            <v-flex>
                                <v-btn color="primary" :disabled="!valid" @click="submit()"  dark>SUBMIT RESPONSE</v-btn>
                            </v-flex>
                        </v-layout>
                        </v-form>
                        <v-divider></v-divider>
                        <div v-if="responseDisplay">
                            <v-layout row wrap>
                            <h3>Query Responses</h3>
                        </v-layout>
                        <br>

                        <div row wrap v-for="(response, i) in queryResponse" :key="i">
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
                                <p class="text-right"> <b>Date & Time :</b> {{response.responseDate}} - {{response.responseTime}} </p>
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
            queryDetials:null,
            queryId : this.$route.params.id,
            queryResponse : [],
            responseDisplay : false,
            queryResp:'',
            valid:true,
            responseRules: [
                v => !!v || 'Response is required',
                v => (v && v.length >= 5) || 'Response Must be greater than atleast 5 characters'
            ]
        }
    },
    methods:{
        getQueryDetails(){
            return apiService.getQueryDetails(this.queryId).then(response => {
                this.queryDetials = response;
                console.log(this.queryDetials);
            })
        },
        getQueryResponse(){
            return apiService.getQueryResponses(this.queryId).then(response => {
                this.queryResponse = response;
                console.log(this.queryResponse);
                if(this.queryResponse.length > 0){
                    this.responseDisplay = true;
                }else{
                    this.responseDisplay = false;
                }
                
            })
        },
        submit(){
            if(this.$refs.form.validate()){
                console.log("Valid");

                let url = `${API_URL}/patientQueries/newResponse`;
                let data ={
                    "query":this.queryId,
                    "response":this.queryResp
                }
                const auth = {
                    headers: { Authorization: localStorage.getItem('token') },
                };

                return axios.post(url, data, auth).then(response => {
                    if(response.status == 202){
                        this.$router.push("/answeredqueries");
                    }else{
                        alert("Something Went Wrong");
                    }
                },err=>{
                    alert("Something Went Wrong");
                })
            }
        }
    },
    mounted(){
        this.getQueryDetails();
        this.getQueryResponse();
    },
       created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Query',
          disabled: true,
          href: ''
        },
        {
          text: 'Answer a Query',
          disabled: false,
          href: '/answerQuery'
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
