<template>
    <v-container>
        <v-layout row wrap>
            <v-flex sm12>
                <v-card>
                    
                    <v-card-text>
                        <v-layout>
                            <v-flex>
                                <p><b> {{ queryDetials.patient.firstName }} {{queryDetials.patient.lastName}} </b></p>
                        
                                
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex>
                                <p class="text-right">Mobile No : <u> {{ queryDetials.patient.mobileNumber }} </u> , Email : <u> {{ queryDetials.patient.email }} </u> </p>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <br>
                        <v-layout row wrap>
                            <v-flex sm12>
                                <h3>Query :</h3>
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
            responseDisplay : false
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
          text: 'Query Details',
          disabled: false,
          href: '/queryDetails'
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
