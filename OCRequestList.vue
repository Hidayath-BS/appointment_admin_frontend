<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
    
        <v-card>
          <v-card-title>
            <h2>List Of Opinion & Consultation Request</h2>  
          </v-card-title>
          <v-data-table
            :headers="headers"
           :items="OCRequestList"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td> {{ props.index +1 }} </td>
              <td>{{props.item.dateOfRequest}} - {{props.item.requestTime}}</td>
              <td> {{props.item.patient.firstName}} {{props.item.patient.lastName}} </td>
              <td>
                   <v-btn slot="activator" icon color="primary" dark @click="getDetailsId(props.item.id)">
                    <v-icon>
                      remove_red_eye
                    </v-icon>
                  </v-btn>
              </td>

              <td>

                <v-btn slot="activator" icon color="green" dark @click="getAnswerId(props.item.id)">
                  <v-icon>
                    assignment
                  </v-icon>
                </v-btn>
              </td>
              <!-- <td>
                <v-btn slot="activator"icon color="red" dark>
                  <v-icon>
                    delete
                  </v-icon>
                </v-btn>
              </td> -->
            </template>
            <!-- <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert> -->
          </v-data-table>
        </v-card>
      </v-flex>
      <!-- <v-dialog v-model="deletedialog" max-width="400">
        <v-card>
          <v-card-title>
            <h2>Do You really want to delet ?</h2>
          </v-card-title>
          <v-card-actions>
            <v-flex>
              <v-btn color="primary" dark>
              NO
            </v-btn>
            <v-btn @click="deleteAction()" color="red" dark>
              Yes
            </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    
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
        OCRequestList:[],
        dialog1: false,
        deletedialog: false,
        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Date-Time', value: 'date' },
          { text: 'Username', value: 'name' },
          { text: 'Details', value: 'Details' },
          { text: 'Answer', value: 'Answer' },
          // { text: 'Delete', value: 'Delete'},

        ],
     
      }
    },
   
    mounted () {
    this.getOCrequest();
    this.getDetailsId(did);
    this. getAnswerId(aid);
    },
    methods: {
     getOCrequest(){
       const auth={
         headers:{Authorization:localStorage.getItem('token')}
       }
       const url =`${API_URL}/ConsultationRequest`;
       return axios.get(url,auth).then(response=>{
         this.OCRequestList=response.data;
         console.log(response.data);
       })
     },
     getDetailsId(did){
       this.loader=true,
         this.$router.push("/OCRequestDetails/" +did);
     },
     getAnswerId(aid){
       this.loader=true;
       this.$router.push("/OCRequestResponse/"+aid);
     }
    
    },
    computed: {
      
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
          disabled:true,
          href: '/OCRequestList'
        }
        
      ]
    }
  }
</script>