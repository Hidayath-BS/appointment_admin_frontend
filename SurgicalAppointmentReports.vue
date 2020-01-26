<template>

<v-container grid-list-xl fluid>

  <v-layout row wrap>
        <v-flex sm12 md12>
          <v-card>
              <v-card-title>
                 <h3>Surgical Appointment List</h3> 
              </v-card-title>
              <v-divider></v-divider>
      <v-card-text>                        
  <v-layout row wrap>
  <v-flex sm12 md12>
     <br>
     <v-layout row wrap>
       <v-radio-group row v-model="datetype">
           <v-radio color="primary"  label="OnDate" value="ONDATE"></v-radio>
           <v-radio color="primary"  label="Month" value="MONTH"></v-radio>
           <v-radio color="primary"  label="Between Dates" value="BWDATE"></v-radio>
       </v-radio-group>
                <v-flex xs3>
                  <div id="val1" v-if='datetype == "ONDATE"'>
                 <v-menu 
                      ref="menu"
                      lazy
                      :close-on-content-click="false"
                      v-model="menu"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-right="40"
                      min-width="150px"
                      :return-value.sync="date1">
                      <v-text-field
                        slot="activator"
                        label=" Select Date"
                        v-model="date1"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="date1" no-title scrollable>
                         <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="success" @click="$refs.menu.save(date1),menu = false,getOtherAppointment(date1)">OK</v-btn>                                                
                      </v-date-picker>
                    </v-menu>
      
         </div>
         <div id="val2" v-if='datetype == "MONTH"'>
        <v-menu
        ref="menu1"
     
        v-model="menu1"
       :close-on-content-click="false"
        :nudge-right="40"
          :return-value.sync="month"
         lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px" >
      <template v-slot:activator="{ on }">
          <v-text-field
           slot="activator"
            v-model="month"
            label="Select Month"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
      </template>
        <v-date-picker
          v-model="month"
          type="month"
          no-title
          scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
          <v-btn flat color="primary"  @click="$refs.menu1.save(month),getMonthlyOtherAppointment(month)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </div>
      <div id="val3" v-if='datetype == "BWDATE"'>
      <v-menu 
                      ref="menu2"
                      lazy
                      :close-on-content-click="false"
                      v-model="menu2"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-right="40"
                      min-width="150px"
                      :return-value.sync="date">
                      <v-text-field
                        slot="activator"
                        label="From *"
                        v-model="dateFrom"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="dateFrom" @change="getInBetweenDatesOtherAppointment()" scrollable>
                         <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn flat color="success" @click="$refs.menu2.save(dateFrom),menu2 = false">OK</v-btn>                                                
                      </v-date-picker>
                    </v-menu>
                    <v-menu
                      ref="menu3"
                      lazy
                      :close-on-content-click="false"
                      v-model="menu3"
                      transition="scale-transition"
                      offset-y
                      full-width
                      :nudge-right="40"
                      min-width="150px"
                      :return-value.sync="date">
                      <v-text-field
                        slot="activator"
                        label="Date To *"
                        v-model="dateTo"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="dateTo" @change="getInBetweenDatesOtherAppointment()" no-title scrollable>
                         <v-btn flat color="primary" @click="menu3 = false">Cancel</v-btn>
                        <v-btn flat color="success" @click="$refs.menu3.save(dateTo),menu3 = false">OK</v-btn>                                                                        
                      </v-date-picker>
                    </v-menu>
                    </div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex>

                </v-flex>
              </v-layout>
          <v-data-table 
            :headers="headers"
            :items="appointment"
            :search="search"  
          >

            <template slot="items" slot-scope="props" >
              <tr>
              <td > {{ props.index+1}}</td>
              <td > {{ props.item.appointmentDate}}</td>
              <td> {{ props.item.appointmentTime}}</td>
              <td> {{ props.item.patientName}}</td>
              <td>
              <v-dialog v-model="dialog2" persistent max-width="800px">
        <v-btn icon slot="activator" color="blue" dark><v-icon>list</v-icon></v-btn>
      <v-card>
        <v-layout row>
        <v-card-title>
            <span class="headline">Patient Details</span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" outline @click.native="dialog2 = false">Close</v-btn>
        </v-layout>
          <v-card-text>

            <v-layout row>
            <v-flex xs4><h3>MRD Number:</h3></v-flex>
              
            <v-flex xs3><p> {{props.item.mrdNumber}} </p></v-flex>
              
            <v-flex xs3><h3>Patient Name:</h3></v-flex>

            <v-flex xs3><p>{{ props.item.patientName}} </p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Mobile Number:</h3></v-flex>

            <v-flex xs3><p> {{ props.item.mobileNumber}} </p></v-flex>

            <v-flex xs3><h3>Email:</h3></v-flex>

            <v-flex xs3><p> {{ props.item.email}} </p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Procedure Advised:</h3></v-flex>

            <v-flex xs3><p> {{ props.item.procedure.procedures}}</p></v-flex>

            <v-flex xs3><h3>Age:</h3></v-flex>

            <v-flex xs3><p> {{ props.item.age}} </p></v-flex>

          </v-layout>

          </v-card-text>
                
            </v-card>
      </v-dialog></td>
            
           <td> {{ props.item.completed }}   </td>
            </tr>
            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
      </v-flex>
    </v-layout>
                           
                        
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
    name: 'otherappointmentlist',
    data () {
      return {
        tab: null,
        search: '',
        appointsid:0,
        dialog1: false, 
        dialog2: false,
        picker: null,
        date: new Date().toISOString().substring(0,10),
        date1:null,
        month:null,
        date2: null,
        dateFrom:null,
        dateTo:null,
        menu: false,
        menu1: false,
        menu2:false,
        menu3:false,
        modal: false,
        deleteDialog1:false,
        // appointment list
        appointment:[],
        // pending list
        applist:[],
        selected: [],
        headers: [
          { text: 'Sl.no',value: 'slno',width:10 },
          { text: 'Date', value: 'date' },
          { text: 'Time', value: 'time' },
          { text: 'Patient Name', value: 'patient' },
          { text: 'Details', value: 'details' },
          {
            text: 'Status',
            sortable: false,
            value: 'status'
          },
        ],
      datetype:'ONDATE'
        
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

      

      getOtherAppointment(date){
     return apiService.getOtherAppointmentList(date).then(response=>{
       this.appointment = response;
       for(let i=0; i< this.appointment.length; i++){
         this.appointment[i].completed = this.getStatus(this.appointment[i].completed);
      }
      //  console.log(response);
     })
      },
       getFutureAppointments(){
       return apiService.getFutureOtherAppointments().then(response=>{
        this.appointment = response;
        for(let i=0; i< this.appointment.length; i++){
         this.appointment[i].completed = this.getStatus(this.appointment[i].completed);
      }
      //  console.log(response);
    })
       },
      getMonthlyOtherAppointment(date){
     return apiService.getMonthlyOtherAppointment(date).then(response=>{
       this.appointment = response;
       for(let i=0; i< this.appointment.length; i++){
         this.appointment[i].completed = this.getStatus(this.appointment[i].completed);
      }
      //  console.log(this.appointment);
       
     })
      },

      getInBetweenDatesOtherAppointment(){
        const auth={
       headers:{
        Authorization:localStorage.getItem('token')
       }
     }
     const data={
       "FromDate":this.dateFrom,
       "ToDate":this.dateTo
     }
     const url=`${API_URL}/getInBetweenDatesOtherAppointment`;
    if(this.dateFrom != null && this.dateTo != null){
      return axios.post(url,data,auth).then((response)=>{
       if(response.status == 200){
       this.appointment = response.data;
       for(let i=0; i< this.appointment.length; i++){
         this.appointment[i].completed = this.getStatus(this.appointment[i].completed);
      }
       }else{
         alert("please reselect the date");
       }
      //  console.log(response.data);
     })
     }
    
      },

       getStatus(value){
        if(value == true){
          return "Completed";
        }else{
          return "Not Completed" ;
        }
      },


    },
    mounted () {
      this.getOtherAppointment(this.date);
      this.getFutureAppointments();
    },

    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Surgical Appointment Report',
          disabled: false,
          href: '/surgicalappointmentreport'
        },
        
      ]
    }
    
  }
</script>
<style scope="css">
/* table.v-table tbody td{
  background-color: blue;
} */
.bgclr{
   background-color: blue;
}
</style>
