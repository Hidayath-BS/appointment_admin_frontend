<template>
  <v-flex xs12 sm10 offset-sm1>
  <v-card>
  <v-card-text>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3>
      <v-text-field
            slot="activator"
            v-model="reshedule.date"
            label="Requested Date"
            prepend-icon="event"
            color="red"
            readonly></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
      <v-text-field
            slot="activator"
            v-model="reshedule.patientName"
            label="patient Name"            
            readonly></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
      <v-text-field
            slot="activator"
            v-model="reshedule.appointmentType"
            label="Appointment Type"            
            readonly></v-text-field>
            </v-flex>            
   <v-spacer></v-spacer>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3>
      <v-text-field
            slot="activator"
            v-model="doctorName"
            label="Prefered Doctor"            
            readonly></v-text-field>
            </v-flex>            
   <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-menu
          ref="menuu"
          :close-on-content-click="false"
          v-model="menuu"
          :nudge-right="40"
          :return-value.sync="datee"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px">
          <v-text-field
            slot="activator"
            v-model="datee"
            @change="getavailableTimeSlot()"
            label="Resheduled Date"
            prepend-icon="event"
            color="red"
            readonly
          ></v-text-field>
          <v-date-picker v-model="datee" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menuu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menuu.save(datee),ondate(datee)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3></v-flex>
<br/>
 
  <v-container grid-list-xl >
    
        
        
       <div v-if="datewiseslot.length > 0 ">
                  <v-radio-group v-model="slotid" >
          <v-layout row wrap>
          
                     <v-card class="m-5 card-border1" v-for="ava of datewiseslot" :key="ava.id" style="margin-right:40px;margin-bottom: 20px;">
                      <v-radio-group v-model="slotid"> 
                       <v-flex>
                         <v-card-title><p><b><u>{{ava.doctor.username}}</u></b></p></v-card-title>
                       <v-card-text>
                           <v-radio color="green" :value="ava.id" :label="ava.slot.slotName"></v-radio>
                           <p> {{ava.slot.startTime}} - {{ava.slot.endTime}} </p>
                           <v-divider></v-divider>
                            <p class="off"> Offline Count: {{ ava.walkinCount }}</p>
                            <p class="onn">Online Count: {{ ava.onlineCount}}</p>
                       </v-card-text>
                      
                       </v-flex>
                        </v-radio-group>
                   </v-card> 
         
          </v-layout>
        </v-radio-group>
                 
                </div>
                <div v-else>
                  <v-card color="error" dark>
                    <v-card-title>
                      NO Slots Available
                    </v-card-title>
                  </v-card>
                </div>
       
 
  </v-container>

<v-flex xs12 ></v-flex>
       <v-btn  color="green" round dark @click="resheduleAppointment()"> Update
          </v-btn>
          <v-btn  color="error" round>Cancel</v-btn>
    </v-layout>

   </v-card-text>
   </v-card>
  </v-flex>
</template>
<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

  export default {
    name: 'DatePickers',
    data () {
      return {
       ddid : this.$route.params.rid,
       reshedule:{
         "date":'null'
       } ,       
        slot:[],               
        date: '',
        menu: false,
        menuu: null,
        datee: null,
        menu5: false,
        datewiseslot:[],
        slotid:0,
        doctorName:""
      }
    },
    mounted(){
   this.getDate();
   this.getavailableTimeSlot();

    },
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
    

      getDate(){
        apiService.getDatee(this.ddid).then((response)=>{
          this.reshedule =response;
          this.doctorName = response.slot.doctor.username;
           if(this.reshedule.appointmentType == 1){
          
          this.reshedule.appointmentType = "online";
        }
         else if(this.reshedule.appointmentType == 2){
            this.reshedule.appointmentType = "Walkin";
           }
            else if(this.reshedule.appointmentType == 3){
            this.reshedule.appointmentType = "Telephonic";
        }
          console.log(this.reshedule);
        });
        },
     
  
     ondate(datee) {
       let slot= this.slot;
       this.datewiseslot = slot.filter(as=>as.date== datee)
        console.log(this.datewiseslot);
        
      },

      resheduleAppointment(){
      const auth = {
      headers: { Authorization: localStorage.getItem('token') } 
    };
    let data={
      "datee":this.datee,
      "appointmentId":this.ddid,
      "slotid":this.slotid,
    }
    console.log(data);
    
    const url = `${API_URL}/masters/ResheduledAppointments`;
    return axios.post(url,data,auth).then(response=>{
      if(response.status == 202){
        alert("Appointment Resheduled Successfully");
        this.$router.push('/appointmentlist');
      }
      else{
        alert("oops... something went wrong,Please Try again");
      }
    })
    },

      getavailableTimeSlot(){
        
        const auth = {
      headers: { Authorization: localStorage.getItem('token') } 
    }
    const url = `${API_URL}/masters/getavailableTimeSlot/${this.ddid}`;
    return axios.get(url, auth).then(response=>{
      this.slot = response.data;
      console.log("all active slots ");
      
      console.log(this.slot);
    }) 
      },


    },
   
   
    watch: {
      menu5 (val) {
        val && this.$nextTick(() => (this.$refs.picker5.activePicker = 'YEAR'))
      },
      
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Reshedule',
          disabled: true
        }
       
      ]
    }
  }
</script>
