<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
             
     <br>
        <v-card>
          <v-card-title>
            
            <v-flex>
              <h2>Services Available List</h2>
            </v-flex>

<v-spacer></v-spacer>

        <v-flex xs2>
          <v-btn color="primary" to="/addservices">Add Services</v-btn>
        </v-flex>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="services"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.index+1 }}</td>
              <td>{{ props.item.services }}</td>
              <td><v-btn depressed outline icon fab dark color="primary" small @click="editServices( props.item.id )">
                      <v-icon>edit</v-icon>
                    </v-btn></td>
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
                  Are you Sure to delete this Service ?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteService( serveid )">Yes </v-btn>
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
        serveid:0,
        deleteDialog1:false,
        services:[],
        dialog1: false,
        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Service Name', value: 'serviceName' },
          { text: 'Edit', value: 'edit' },
          { text: 'Delete', value: 'delete' },
        ],

      }
    },
   
    
    methods: {
      getServices(){
        const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url=`${API_URL}/masters/getAllServices`;
     return axios.get(url,auth).then(response=>{
          this.services=response.data;
         console.log(response.data);
    })
      },
      editServices(serveId){
        this.$router.push('/services/edit/'+serveId);
      },

       //for deleting
        deleteService(serid){
        const url = `${API_URL}/masters/deleteServices`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "services": serid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getServices();
          this.deleteDialog1 = false;
        } )
      },

      deleteConfirm( serid ){
        this.deleteDialog1 = true;
        this.serveid = serid;
        console.log(this.serveid); 
      }
      //for deleting end
    },
mounted () {
      this.getServices();
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Masters',
          disabled: false,
          href: ''
        },
        {
          text: 'Services List',
          disabled: false,
          href: '/services'
        },
        
        
      ]
    }
   
  
  }

  
</script>