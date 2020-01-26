<template>
  <v-flex xs12 sm12>
     <v-card>
      <v-card-text>
        <v-form ref="form"
      v-model="valid"
      lazy-validation>

        <h2>Add Time Slot</h2><br>
        <v-layout row wrap>
        <v-subheader>Time Slot Name:</v-subheader>
            <v-flex xs12 sm5 offset-sm1>
              <v-text-field type="text" label="Enter Name" v-model="slotName"
              :rules="[v => !!v || 'Please Enter Slot name']" required></v-text-field>
            </v-flex>
 <v-flex xs12 sm5> 
 <!-- <v-subheader>Start Time</v-subheader> -->
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
            label="Enter Start Time"
            prepend-icon="access_time"
            readonly
            :rules="[v => !!v || 'Please Enter Start time']" required
          ></v-text-field>
          <v-time-picker v-model="startTime" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(startTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>
  <v-flex xs12 sm5> 
<v-dialog
          ref="dialogg"
          v-model="modal3"
          :return-value.sync="endTime"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="endTime"
            label="Enter End Time"
            prepend-icon="access_time"
            readonly
            :rules="[v => !!v || 'Please Enter End time']" required
          ></v-text-field>
          <v-time-picker v-model="endTime" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal3 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialogg.save(endTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog> 
      </v-flex>

    </v-layout>
    <v-flex xs12 offset-sm9>
  <v-btn :disabled="!valid" color="green" dark @click="addtimeslott()">Submit</v-btn>
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
        slotName:'',
        startTime:'',
        endTime:'',
         slotName:null,
        startTime:null,
        endTime:null,
         valid:true,
         formRequest: null,
        displayError: false,


      }
    },

    methods: {
     allowedHours: v => v % 2,
      allowedMinutes: v => v >= 10 && v <= 50,
   
    addtimeslott(){
      if (this.$refs.form.validate()){
           this.valid = true;
    const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url=`${API_URL}/masters/addtimeslot`;
    return axios.post(url,{slotName: this.slotName,
        startTime: this.startTime,
        endTime: this.endTime},auth).then(response=>{
                            console.log(response.status);
                            if(response.status==200){
                              alert("TimeSlot added");
                              this.$router.push("/timeslot");
                            }
                            else{
                              alert("failed");
                            }
         
         })
      }
    },

    reset () {
        this.$refs.form.reset()
      },
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
          text: 'Add Time slot',
          disabled: false,
          href:'/AddTimeSlot'
        }
      ]
    }
  }
</script>