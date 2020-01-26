<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
                  <br>
  <v-card>
            <v-card-title>
              <v-layout row wrap>
                <v-flex>
                  <h2>Responsed Opinion & Consultation Request</h2>
                </v-flex>
               
              </v-layout>
            </v-card-title>
              
          <v-data-table
            :headers="headers"
           :items="OCAnsweredList"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{props.index+1}}</td>
               <td>{{props.item.dateOfRequest}} - {{props.item.requestTime}}</td>
              <td> {{props.item.patient.firstName}} {{props.item.patient.lastName}} </td>
              <!-- <td>{{props.item.responseDate}} - {{props.item.responseTime}}</td>
              <td>{{props.item.request.patient.firstName}} {{props.item.request.patient.lastName}}</td> -->
             <td>
                <v-btn slot="activator" @click="getDetailsId(props.item.id)" icon color="primary" darkk>
                  <v-icon>
                    remove_red_eye
                  </v-icon>
                </v-btn>   
              </td>

            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    
</template>
<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;


  export default {
    data () {
      return {
    
        search: '',
      
        dialog1: false,
      
        date: null,
        menu: false,
        modal: false,
        // OCAnsweredList:{
        //   request:{
        //     patient:{
        //       firstName:'',
        //       lastName:'',
        //     }
        //   }
        // },
       OCAnsweredList:[],
        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Date-Time', value: 'date' },
          { text: 'Username', value: 'name' },
          { text: 'Details', value: 'Details' },
        ],
       }
    },
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
     getDetailsId(did){
       this.loader=true,
       this.$router.push("/OCRequestDetails/" +did);
     },
     getAnsweredList(){
       const auth={
         headers:{Authorization:localStorage.getItem('token')}
       }
       const url =`${API_URL}/AnsweredResponseList`;
       return axios.get(url,auth).then(response=>{
         this.OCAnsweredList=response.data;
         console.log(response.data);
       })
     },
     
      },
    mounted () {
   
     this.getAnsweredList();
     this.getDetailsId(did);
  
    },
    created: function(){
      this.$root.breadcrumbs = [
      {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Answered Opinion & Consultation Request',
          disabled: true,
          href: '/AnsweredOCList'
        }
      ]
    }
  
  }
</script>



