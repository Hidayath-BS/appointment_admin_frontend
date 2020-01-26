<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
             
     <br>
        <v-card>
          <v-card-title>
            
            <v-flex>
              <h2>Doctors Speciality List</h2>
            </v-flex>

  <v-spacer></v-spacer>

        <v-flex xs3>
          <v-btn color="primary" to="/AddDoctorsSpeciality">Add Doctor Speciality</v-btn>
        </v-flex>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="doc"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.index+1 }}</td>
              <td>{{ props.item.doctor.username }}</td>
              <td>{{ props.item.speciality}}</td>
               <td><v-btn depressed outline icon fab dark color="pink" small @click="deleteConfirm( props.item.id )">
                      <v-icon>delete</v-icon>
                    </v-btn></td> 
            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
        <v-dialog v-model="deleteDialog1" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you Sure to delete this Doctor Speciality ?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteSpeciality( specid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
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
        specid:0,
        deleteDialog1:false,
        doc:[],
        dialog1: false,
        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Doctor Name', value: 'doctorName' },
          { text: 'Service Name', value: 'serviceName' },
          { text: 'Delete', value: 'delete' },
        ],

      }
    },
   
    
    methods: {
      getDoctorSuggest(){
        const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url=`${API_URL}/masters/getAllDoctorSpeciality`;
     return axios.get(url,auth).then(response=>{
          this.doc=response.data;
         console.log(response.data);
    })
      },
     

       //for deleting
        deleteSpeciality(specid){
        const url = `${API_URL}/masters/deleteSpeciality`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "speciality": specid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getDoctorSuggest();
          this.deleteDialog1 = false;
        } )
      },

      deleteConfirm( specid ){
        this.deleteDialog1 = true;
        this.specid = specid;
        console.log(this.specid); 
      }
      //for deleting end
    },
mounted () {
      this.getDoctorSuggest();
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Masters',
          disabled: false,
          href: ''
        },
        {
          text: 'Doctors Speciality',
          disabled: true
        },
        
        
      ]
    }
   
  
  }

  
</script>