<template>
  <v-flex xs12 sm10 offset-sm1>
  <v-card>
  <v-card-text>
    <v-layout row wrap>
     
      <v-menu
          ref="menu2"
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          :return-value.sync="applist.reviewDate"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="applist.reviewDate"
            label="Select Date"
            prepend-icon="event"
           
          ></v-text-field>
          <v-date-picker v-model="reviewDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu2.save(reviewDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
       <v-btn color="green"  @click="addDate()" dark>Add</v-btn>
      <v-btn color="red"  @click.native="remainderdialog = false" dark>Cancel</v-btn>
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
       rrid : this.$route.params.reviewid,
       menu2: false,
       applist:{
           "reviewDate":null,
       },
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
      }
    },
    mounted(){
   
this.getReview();
    },
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
      //get reviewdate through id
       getReview(){
        apiService.getRevw(this.rrid).then((response)=>{
          this.applist.reviewDate = response.reviewDate;
          console.log(response);
          
        });
      },
     addDate(){
        let dat={
          "reviewid": this.rrid,
          "reviewDate": this.applist.reviewDate,
        }
       
         const auth={
          headers:{
            Authorization:localStorage.getItem('token')
          }
         }          
          const url=`${API_URL}/addDate`;
          return axios.put(url,dat,auth).then(response=>{
          if(response.status==202){
            alert("Oops !!, Done");
            this.$router.push('/AppointmentList');
          }
          else{
            alert("Oops !!, Something went wrong..., Please try again after some time");
          }
        });
        
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
