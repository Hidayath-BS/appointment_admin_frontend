<template>
  <v-flex xs12 sm10 offset-sm1>
  <v-card>
  <v-card-text>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
      <v-text-field
            slot="activator"
            v-model="reshedule.date"
            label="Requested Date"
            prepend-icon="event"
            color="red"
            readonly></v-text-field>
            </v-flex>
   
      <v-flex xs12 sm6 md4  offset-lg1>
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
            
            label="Rescheduled Date"
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
    
<br/>
 <div id="slott" style="display:none"> 
  <v-layout row wrap>
        <v-flex xs5 offset-xs1 v-for="ts of datewiseslot" :key="ts.id">
        <v-radio-group v-model="slotid" >
                     <v-card>
                       <v-card-text>
                         <label>{{ts.slot.slotName}}</label>
                        <v-radio color="green" :value="ts.id"  ></v-radio>
                       </v-card-text>
                      </v-card>
                </v-radio-group>
       </v-flex>
       
 </v-layout>
</div>

<v-flex xs12 sm6 md4>
      <v-text-field
            slot="activator"
            v-model="reshedule.time"
            label="Requested Time"
            prepend-icon="access_time"
            color="red"
            readonly>
        </v-text-field>
</v-flex>
<v-flex xs12 sm6 md4  offset-lg1>
  <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="startTime"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="startTime"
            label="Enter Reschedule Time"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker v-model="startTime" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(startTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
</v-flex>
    </v-layout>
<v-layout>
  <v-row>
     <v-btn  color="green" round dark @click="resheduleAppointment()"> Update
          </v-btn>
          <v-btn color="error" round>Cancel</v-btn>
  </v-row>
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
       ddid : this.$route.params.id,
       reshedule:{
         "date":'null',
         "time":'null'
       } ,       
        slot:[],               
        date: '',
        menu: false,
        menuu: null,
        datee: null,
        menu5: false,
        datewiseslot:[],
        slotid:0,
        picker: null,
        landscape: false,
        e4: null,
        time: null,
        menu2: false,
        modal2: false,
        e7: null,
        time2: '11:15',
        startTime:null,
      }
    },
    mounted(){
   this.getDate();


    },
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
     
      getDate(){
        apiService.getresDate(this.ddid).then((response)=>{
          this.reshedule.date =response.appointmentDate;
           this.reshedule.time =response.appointmentTime;
          console.log(this.reshedule.date);
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
      "date":this.datee,
      "appointmentId":this.ddid,
      "time":this.startTime,
    }
    console.log(data);
    
    const url = `${API_URL}/rescheduleotherappointment`;
    return axios.post(url,data,auth).then(response=>{
      if(response.status == 202){
        alert("Appointment Resheduled Successfully");
        this.$router.push('/otherAppointments');
      }
      else{
        alert("oops... something went wrong,Please Try again");
      }
    })
    },

      getavailableTimeSlot(){
        document.getElementById('slott').style.display='block';
        const auth = {
      headers: { Authorization: localStorage.getItem('token') } 
    }
    const url = `${API_URL}/masters/getavailableTimeSlot/${this.ddid}`;
    return axios.get(url, auth).then(response=>{
      this.slot = response.data;
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
        }
        // {
        //   text: 'Reschedule',
        //   disabled: true
        // }
       
      ]
    }
  }
</script>
