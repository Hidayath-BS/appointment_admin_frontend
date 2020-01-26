<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
     <br>
        <v-card>
          <v-card-title>
            <h2>Rescheduled Appointments List</h2>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="appointmentList"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{props.index+1}}</td>
              <td class="text-xs-left">{{props.item.appointment.patientName}}</td>
              <td class="text-xs-left">{{props.item.slot.doctor.username}}</td>              
              <td class="text-xs-left">{{props.item.date}}</td> 
              <td><v-dialog v-model="dialog1" max-width="600px"> 
        <v-btn slot="activator" fab small color="blue" dark><v-icon white>info</v-icon></v-btn>
	
        <v-card>
          <v-card-title>
            <span class="headline">Details</span>
          </v-card-title>
          <v-card-text>
              <v-layout>
              <v-flex xs6>
                  <p><h4>Requested Date :  {{props.item.appointment.date}}</h4>
                  <br/>
                  <p><h4>Requested Time :  {{props.item.appointment.slot.slot.slotName}}</h4>
              </v-flex>  
              <v-flex xs6>
                  <p><h4>Resheduled Date :  {{props.item.date}}</h4>
                  <br/>
                  <p><h4>Resheduled Time :  {{props.item.slot.slot.slotName}}</h4>
              </v-flex>                  
              </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>            
            <v-btn color="error" @click.native="dialog1 = false" round>Close</v-btn>
          </v-card-actions>    
        </v-card>
        </v-dialog>    
              
              <td>
                <v-btn flat icon color="red" @click="deleteConfirm( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <v-dialog v-model="deleteDialog1" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you Sure to delete this Product ?
                </v-card-title> 
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteExpenselType( appointmentid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no  results.
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
        appointmentList:[],
        appointmentid:0,
        deleteDialog1:false,

        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Patient', value: 'patient' },
          { text: 'Doctor', value: 'doctor' },          
          { text: 'Resheduled Date', value: 'Resheduleddate' },
          { text: 'Details', value: 'Details' },          
          { text: 'Delete', value: 'delete'}
        ],
      }
    },
   
    mounted () {
      
    },
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
      getrescheduledAppointment(){
          const auth = {
            headers: {
            Authorization:localStorage.getItem('token')
            }
          } 
          const url =`${API_URL}/masters/rescheduledAppointmentList`;
          return axios.get(url,auth).then(response=>{
              this.appointmentList = response.data.reverse();
              console.log(this.appointmentList);
              
          })
      },
       deleteExpenselType(id){
        const url = `${API_URL}/masters/deleteResheduledAppointment`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "appointmentid": id
        }
        console.log(id);
        
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getrescheduledAppointment();
          this.deleteDialog1 = false;
        } )
      },

      deleteConfirm( id ){
        this.deleteDialog1 = true;
        this.appointmentid = id;
        console.log(this.appointmentid); 
      }
    },
    mounted(){
        this.getrescheduledAppointment();
    },
    computed: {
      
    },
    watch: {
      menu5 (val) {
        val && this.$nextTick(() => (this.$refs.picker5.activePicker = 'YEAR'))
      }
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Reschedule List',
          disabled: false,
          href: '/reschedule'
        },
        
      ]
    }
  }
</script>