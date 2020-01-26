<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
     <br>
        <v-card>

          <v-card-title>
            <v-layout row wrap>
              <v-flex>
                <h2>Time Slot List</h2>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex sm2>
            <v-btn color="info" dark align-end to="/AddTimeSlot">Add Time Slot</v-btn>
            </v-flex>
            </v-layout>
          </v-card-title>
            
             <v-flex xs4 offset-lg8>
             
            </v-flex>
          <v-data-table
            :headers="headers"
            :items="slots"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{props.index+1}}</td>
              <td>{{props.item.slotName}}</td>
              <td>{{props.item.startTime}} To {{props.item.endTime}}</td>
             
      <td><v-btn fab small color="green" dark @click="editTimeSlot( props.item.id )"><v-icon>edit</v-icon></v-btn></td>
 <td>
 <v-dialog v-model="dialog1" persistent max-width="400px">
        <v-btn icon slot="activator" color="red" dark fab small @click="deleteConfirm( props.item.id )"><v-icon>delete</v-icon></v-btn>
         <v-card>
        <v-card-title>
            <span class="headline">Are you sure you want to delete This Timeslot ?</span>
          </v-card-title>
         
                  <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog1 = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click=" deleteTimeSlot(slotssid)">Delete</v-btn>
            
          </v-card-actions>
            </v-card>
      </v-dialog>
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
        picker: null,
        date: null,
        menu: false,
        modal: false,
       slots:[],
      slotssid: 0,
        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Time Slot Name', value: 'slotName' },
          { text: 'Time', value: 'startTime' },
    
         { text: 'Edit', value: 'edit'},
          { text: 'Delete', value: 'delete'}
        ],
       
      }
    },
   
    mounted () {
    this.getTimeslot();
    },
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
      //to get list of timeslot
      getTimeslot(){
        const auth ={
          headers:{Authorization:localStorage.getItem('token')}
        }
        const url = `${API_URL}/masters/getTimeSlots`;
        return axios.get(url,auth).then(response =>{
           this.slots = response.data;
           console.log(response);
           
        });
      },
      //get id 
      editTimeSlot(slotid){
      this.loading = true;
        this.$router.push('/EditTimeSlot/' +slotid);
      },
      
    //for deleting
        deleteTimeSlot(slotid){
        const url = `${API_URL}/masters/deletetimeslot`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "slotss": slotid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getTimeslot();
          this.dialog1 = false;
        } )
      },

      deleteConfirm( slotid ){
        this.deleteDialog1 = true;
        this.slotssid= slotid;
        console.log(this.slotssid); 
      }
      //for deleting end  
        
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Masters',
          disabled: false,
          href: ''
        },
        {
          text: 'Time Solts',
          disabled: false,
          href: '/timeslot'
        }
      ]
    }
    
  
  }
</script>



