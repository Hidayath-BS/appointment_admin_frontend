<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
                 
     <br>
          <v-card>
           <v-card-title>
            <h2>Appointments List</h2>
          </v-card-title>
        <v-card-text>
            <v-layout row wrap>
           <v-flex xs4>
           <v-radio-group row v-model="datetype"> 
           <v-radio label="Ondate" value="ONDATE" ></v-radio>
           <v-radio label="Month" value="MONTH"></v-radio>
           <v-radio label="Between Dates" value="BETWEENDATES"></v-radio>
           </v-radio-group>
            </v-flex> 
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
                        <v-btn flat color="success" @click="$refs.menu.save(date1),getmyappointments(date1),menu=false">OK</v-btn>                                                
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
          <v-btn flat color="primary"  @click="$refs.menu1.save(month),getMonthwiseAppiontment(month), menu1=false">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </div>
      <div id="val3" v-if='datetype=="BETWEENDATES"'>
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
                      <v-date-picker v-model="dateFrom"  @change="getInBetweenDatesAppointment()" no-title scrollable>
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
                      <v-date-picker v-model="dateTo"  @change="getInBetweenDatesAppointment()" no-title scrollable>
                         <v-btn flat color="primary" @click="menu3 = false">Cancel</v-btn>
                        <v-btn flat color="success" @click="$refs.menu3.save(dateTo),menu3=false">OK</v-btn>                                                                        
                      </v-date-picker>
                    </v-menu>
                    </div>

          </v-flex>
            </v-layout>
               

        <v-card>
      
          <v-data-table
            :headers="headers"
            :items="appointments"
            :search="search"
            
          >
            <template slot="items" slot-scope="props">
              <td>{{props.index+1}}</td>
              <td>{{props.item.patientName}}</td>
              <td>{{props.item.slot.slot.slotName}}
              </td>
              <td>
                <v-chip v-if="props.item.appointmentType == 1" color="teal" text-color="white">
                <v-avatar>
                    <v-icon>cloud_done</v-icon>
                </v-avatar>
                {{ props.item.onlinestat }}
            </v-chip>
            <v-chip v-else-if="props.item.appointmentType == 2" color="yellow" text-color="white">
                <v-avatar>
                    <v-icon>how_to_reg</v-icon>
                </v-avatar>
                {{ props.item.onlinestat }}
            </v-chip>
            <v-chip v-else color="red" text-color="white">
                <v-avatar>
                    <v-icon>call</v-icon>
                </v-avatar>
                {{ props.item.onlinestat }}
            </v-chip>
              </td>
              <td>
                {{ props.item.slot.branch.branchName }}
              </td>
             
            
            </template>
            
          </v-data-table>
        </v-card>
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
        dialog1: false, 
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
        appointments:[],
        date: new Date().toISOString().substr(0, 10),
        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Patient', value: 'patient' },
          { text: 'Slot', value: 'slot' },
          
          { text: 'Appointment Type', value: 'Appointment Type' },
          { text: 'Branch', value: 'Branch'}
         
        
        ],
        datetype: 'ONDATE'
      
      }
    },
   
   
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
      
      offline(){
        this.$router.push('/offlineappointment');
      },
    
      getmyappointments(date){
          return apiService.getMyAppointments(date).then(
            response=>{
              this.appointments=response;
              console.log(this.appointments);
              for(let i=0; i< this.appointments.length; i++){
                this.appointments[i].onlinestat = this.getAppointmentType(this.appointments[i].appointmentType);
              }
            }
          )
          
      },
      getfuturemyappointments(){
  return apiService.getFutureMyAppointments().then((response)=>{
  this.appointments=response;
  for(let i=0; i< this.appointments.length; i++){
                this.appointments[i].onlinestat = this.getAppointmentType(this.appointments[i].appointmentType);
              }
                console.log(response);
  })

},
       getMonthwiseAppiontment(date){
       return apiService.getMonthwiseMyAppointments(date).then(
            response=>{
         this.appointments = response;
          for(let i=0; i< this.appointments.length; i++){
                this.appointments[i].onlinestat = this.getAppointmentType(this.appointments[i].appointmentType);
              }
     
         console.log(response);
       })
      },
        getInBetweenDatesAppointment(){
        const auth={
       headers:{
        Authorization:localStorage.getItem('token')
       }
     }
     const data={
       "fromDate":this.dateFrom,
       "toDate":this.dateTo
     }
     const url=`${API_URL}/appointments/getBetweenDateAppiontmentDoctorwise`;
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
      }
      
    },
   mounted(){
     this.getfuturemyappointments();
   },
     created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Appointment List',
          disabled: true,
          href: '/myappointments'
        },
        
      ]
    },
    watch: {
      menu5 (val) {
        val && this.$nextTick(() => (this.$refs.picker5.activePicker = 'YEAR'))
      }
    },
  }
</script>