<template>
  <v-flex xs12 sm12>
     <v-card>
      <v-card-text>
        <v-form ref="form"
      v-model="valid"
      lazy-validation>

        <h2>Edit Time Slot</h2><br>
        <v-layout row wrap>
        <v-subheader>Time Slot Name:</v-subheader>
            <v-flex xs12 sm5 offset-sm1>
              <v-text-field type="text" label="Enter Name" v-model="slotyy.slotName"
              :rules="[v => !!v || 'Please Enter Slot name']" required></v-text-field>
            </v-flex>
 <v-flex xs12 sm5> 

 <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="slotyy.startTime"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="slotyy.startTime"
            label="Enter Start Time"
            prepend-icon="access_time"
            readonly
            :rules="[v => !!v || 'Please Enter Start time']" required
          ></v-text-field>
          <v-time-picker v-model="slotyy.startTime" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(slotyy.startTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>
  <v-flex xs12 sm5> 
<v-dialog
          ref="dialogg"
          v-model="modal3"
          :return-value.sync="slotyy.endTime"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="slotyy.endTime"
            label="Enter End Time"
            prepend-icon="access_time"
            readonly
            :rules="[v => !!v || 'Please Enter End time']" required
          ></v-text-field>
          <v-time-picker v-model="slotyy.endTime" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal3 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialogg.save(slotyy.endTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog> 
      </v-flex>

    </v-layout>
    <v-flex xs12 offset-sm9>
  <v-btn :disabled="!valid" color="green" dark @click="submitSlot()">Submit</v-btn>
<v-btn color="error" dark @click="reset()">Cancel</v-btn>
</v-flex>
        </v-form>
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
    name: 'TimePickers',
    data () {
      return {
         slotsid: this.$route.params.slotid,
  slotyy:{
        "slotName":null,
        "startTime":null,
        "endTime":null,
      },
        picker: null,
        landscape: false,
        e4: null,
        time: null,
        menu2: false,
        modal2: false,
        modal3: false,
        timee: null,
        e7: null,
        time2: '11:15',
        valid:true,
         formRequest: null,
        displayError: false,
      }
    },
mounted() {
  this.getSlots();
},
    methods: {
      allowedHours: v => v % 2,
      allowedMinutes: v => v >= 10 && v <= 50,
       //get slot through id
       getSlots(){
        apiService.getTimeSlot(this.slotsid).then((response)=>{
          this.slotyy.slotName = response.slotName;
          this.slotyy.startTime = response.startTime;
          this.slotyy.endTime = response.endTime;
          console.log(response);
          
        });
      },

      reset () {
        this.$refs.form.reset()
      },
      //submit edited data
      submitSlot(){
        if (this.$refs.form.validate()){
           this.valid = true;
        let data = {
          "slotid": this.slotsid,
          "slotName": this.slotyy.slotName,
          "startTime":this.slotyy.startTime,
          "endTime":this.slotyy.endTime,
         
        }
         console.log(data);

        const auth = {
                headers: {Authorization:localStorage.getItem('token')} 
            }
        const url = `${API_URL}/masters/editTimeslot`;
        return axios.put(url, data, auth).then((response)=>{
          if(response.status==202){ 
            this.$router.push('/timeslot');
          }
          else{
            alert("Oops !!, Something went wrong..., Please try again after some time");
          }
        });
      }
      }
    },
    watch: {
      
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Masters',
          disabled: false,
          href: ''
        },
        {
          text: 'TimeSlots',
          disabled: false,
          href: '/timeslot'
        },
        {
          text: 'Edit Time slot',
          disabled: false,
          href:'/EditTimeSlot'
        }
      ]
    }
  }
</script>