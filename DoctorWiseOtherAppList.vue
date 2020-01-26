<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
                  <br>
  <v-card>
            <v-card-title>
              <v-layout row wrap>
                <v-flex>
                  <h2>Other Appointment List</h2>
                </v-flex>
               
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
               <v-layout row wrap>
           <v-radio-group row v-model="datetype">
              <v-radio color="primary"  label="OnDate" value="ONDATE"></v-radio>
              <v-radio color="primary"  label="Month" value="MONTH"></v-radio>
              <v-radio color="primary"  label="Between Dates" value="BWDATE"></v-radio>
           </v-radio-group>
                <v-flex xs3>
                  <div id="val1" v-if='datetype=="ONDATE"'>
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
                        <v-btn flat color="success" @click="$refs.menu.save(date1),menu = false,getdateWiseOtherAppointmentdoctorWise(date1)">OK</v-btn>                                                
                      </v-date-picker>
                    </v-menu>
      
         </div>
         <div id="val2" v-if='datetype=="MONTH"'>
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
          <v-btn flat color="primary"  @click="$refs.menu1.save(month),getMonthlyOtherAppointmentdoctorWise(month)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </div>
      <div id="val3" v-if='datetype=="BWDATE"'>
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
                      <v-date-picker v-model="dateFrom"  @change="getInBetweenDatesOtherAppointmentdoctorWise()" no-title scrollable>
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
                      <v-date-picker v-model="dateTo" @change="getInBetweenDatesOtherAppointmentdoctorWise()" scrollable>
                         <v-btn flat color="primary" @click="menu3 = false">Cancel</v-btn>
                        <v-btn flat color="success" @click="$refs.menu3.save(dateTo),menu3 = false">OK</v-btn>                                                                        
                      </v-date-picker>
                    </v-menu>
                    </div>
                </v-flex>
                <v-spacer></v-spacer>
     </v-layout>    
          <v-data-table
             :headers="headers" :items="appointments"
            :search="search">
            <template slot="items" slot-scope="props">
             <td>{{ props.index+1 }}</td>
            <td>{{ props.item.patientName }}</td>
            <td>{{ props.item.mrdNumber }}</td>
            <td>{{ props.item.appointmentDate }} - {{props.item.appointmentTime}}</td>
           
<td>
 <v-dialog v-model="dialog" max-width="400">
       <v-btn slot="activator" icon color="primary" darkk>
                  <v-icon>
                    remove_red_eye
                  </v-icon>
       </v-btn>   
        <v-card>
          <v-card-title class="headline" ><b>Details</b></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                    <p><b>Branch: </b></p></v-flex><v-flex xs6>{{props.item.branch.branchName}}</v-flex>
            </v-layout> 
            <v-layout row wrap>
              <v-flex xs6>    
                    <p><b>Procedure:</b></p></v-flex><v-flex xs6>{{props.item.procedure.procedures}}</v-flex>
            </v-layout>
               <v-layout row wrap>
                 <v-flex xs6>     
                    <p><b>Age:</b></p></v-flex><v-flex xs6>{{props.item.age}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs6>
                    <p><b>Email:</b></p></v-flex><v-flex xs6>{{props.item.email}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs6>
                    <p><b>Mobile Number:</b></p></v-flex><v-flex xs6>{{props.item.mobileNumber}}</v-flex>
                    </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
      
            <v-btn color="blue" @click.native="dialog = false" dark round>OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
          </v-card-text>
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
      date: new Date().toISOString().substr(0, 10),
        dialog: false,
      date1:null,
        month:null,
        date2: null,
        dateFrom:null,
        dateTo:null,
        menu: false,
        menu1: false,
        menu2:false,
        menu3:false,
        appointments:[],
       datetype:'ONDATE',
        menu: false,
        modal: false,
      otherapplist:[],
     headers: [
       
         { text: 'Sl No', value: 'calories' },
          { text: 'Patient Name', value: 'calories' },
          { text: 'MRD Number', value: 'fat' },
          { text: 'Appointment Date-Time', value: 'carbs' },
          { text: 'Details', value: 'protein' },
        
        ],
       
      
       }
    },
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },

        

    
      getFutureDoctorwiseApp(){
return apiService.getFutureDoctorOtherAppointments().then(response=>{
  this.appointments=response;
   for(let i=0; i< this.appointments.length; i++){
                this.appointments[i].onlinestat = this.getAppointmentType(this.appointments[i].appointmentType);
              }
              console.log(this.appointments);
})
      },
      getAppointmentType(value){
        if(value == 1){
          return "ONLINE";
        }else{
          if(value == 2){
            return "WALKIN";
          }else{
            return "TELEPHONIC";
          }
        }
      },
        getdateWiseOtherAppointmentdoctorWise(date){  
     return apiService.getdateWiseOtherAppointmentdoctorWise(date).then(response=>{
       this.appointments = response;
           for(let i=0; i< this.appointments.length; i++){
                this.appointments[i].onlinestat = this.getAppointmentType(this.appointments[i].appointmentType);
              }
              console.log(this.appointments);
              
     })
      },
 
      getMonthlyOtherAppointmentdoctorWise(date){
     return apiService.getMonthlyOtherAppointmentdoctorWise(date).then(response=>{
       this.appointments = response;
           for(let i=0; i< this.appointments.length; i++){
                this.appointments[i].onlinestat = this.getAppointmentType(this.appointments[i].appointmentType);
              }
       console.log(response);
     })
      },

      getInBetweenDatesOtherAppointmentdoctorWise(){
        const auth={
       headers:{
        Authorization:localStorage.getItem('token')
       }
     }
     const data={
       "FromDate":this.dateFrom,
       "ToDate":this.dateTo
     }
     const url=`${API_URL}/getInBetweenDatesOtherAppointmentdoctorWise`;
      if(this.dateFrom != null && this.dateTo != null){
       return axios.post(url,data,auth).then((response)=>{
       if(response.status == 200){
       this.appointments = response.data;
        for(let i=0; i< this.appointments.length; i++){
                this.appointments[i].onlinestat = this.getAppointmentType(this.appointments[i].appointmentType);
              }
       }else{
         alert("please reselect the date");
       }
       console.log(response.data);
     })
    
      }
      }
 },
    mounted () {
    this. getFutureDoctorwiseApp();
   
    },
    created: function(){
      this.$root.breadcrumbs = [
      {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Other Appointment List',
          disabled: true,
          href: '/OtherAppList'
        }
      ]
    }
  
  }
</script>



