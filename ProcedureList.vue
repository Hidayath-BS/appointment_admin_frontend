<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
     <br>
        <v-card>
	        <v-card-title>
              <v-layout row wrap>
                <v-flex>
                  <h2>Surgical/Procedures List</h2>
                </v-flex>
                
              </v-layout>
              <v-spacer></v-spacer>

        <v-flex xs2>
          <v-btn color="primary" to="/addprocedures">Add Procedures</v-btn>
        </v-flex>

          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="procedures"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td> {{ props.index+1}}  </td>
              <td> {{ props.item.procedures}}</td>
      <td>
              
        <v-btn icon slot="activator" @click="editProcedure(props.item.id)" color="green" dark><v-icon>edit</v-icon></v-btn>
     
      </td>

              <td>
                 <v-btn  icon color="red" dark @click="deleteConfirm( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-dialog v-model="deleteDialog1" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you Sure want to delete this appointment ?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteProcedure( proid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
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
        proid:0,
        procedures: [],
        deleteDialog1:false,
        headers: [
          { text: 'Sl.no',value: 'slno',width:10 },
          { text: 'Surgical/Procedure Name', value: 'procedure' },
          { text: 'Edit', value: 'edit'},
          { text: 'Delete', value: 'delete'}
        ],
        
      }
    },
   
    
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu.save(date)
      },
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date1) {
        this.$refs.menu1.save(date1)
      },

      getProcedures(){
          const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url=`${API_URL}/masters/getProcedures`;
     return axios.get(url,auth).then(response=>{
          this.procedures=response.data;
         console.log(response.data);
    })
      },

      editProcedure(proId){
        this.$router.push('/procedures/edit/'+proId);
      },

      deleteProcedure(procid){
        const url = `${API_URL}/masters/deleteProcedures`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "procedures": procid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getProcedures();
          this.deleteDialog1 = false;
        } )
      },

      deleteConfirm( procid ){
        this.deleteDialog1 = true;
        this.proid = procid;
        console.log(this.proid); 
      }


    }, 

     
    mounted () {
      this.getProcedures();
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Masters',
          disabled: false,
          href: ''
        },
        {
          text: 'Porcedure List',
          disabled: true
        },
        
        
      ]
    }
    
  }
</script>