<template>
  <v-flex xs12 sm12>
      <h2>Other Appointments</h2><br>
      <v-card>
        <v-form 
      ref="form"
      v-model="valid"
      lazy-validation
      >
        <v-card-title>
          <v-layout row wrap>
            <v-flex xs>
              <v-radio-group row v-model="patientType" @change="nullPatient( patientType )">
                <v-radio value="ONLINE" label="ONLINE"></v-radio>
                <v-radio value="OFFLINE" label="OFFLINE"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs4 v-if="patientType == 'ONLINE'">
              <v-select
              :items="patients"
              label="Select Patient"
              item-text="firstName"
              item-value="id"
              v-model="patient"
              @change="getPatientDetails(patient)"
              >

              </v-select>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
      <v-card-text>
      
        <v-layout row wrap>
      <v-flex xs4>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          class="fields"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Select Date"
            prepend-icon="event"
            :rules="[v => !!v || 'Please Select Appointment Date']"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" :min="minDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date),getAvailableSlotsBranchWise(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
        <v-spacer></v-spacer>
       <v-flex xs4>
        <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="time"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="time"
            label="Select Time"
            prepend-icon="access_time"
            readonly
            :rules="[v => !!v || 'Please Enter Time']"
          ></v-text-field>
          <v-time-picker v-model="time" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>
 
    </v-layout>
    <v-layout row>
            <v-flex xs12 sm4>
               <v-text-field type="text" class="fields" v-model="mrdNumber" label="MRD Number" :rules="[v => !!v || 'Please enter MRD number']" ></v-text-field>
            </v-flex>
          <v-flex xs12 sm4>
              <v-select
                      :items="title"
                      label="Select Title"
                      item-text="titlename"
                      item-value="titlename"
                      v-model="titlename"
                      single-line
                      class="fields"
                      :rules="[v => !!v || 'Please Select Title']"
                    ></v-select>
            </v-flex> 
            
            <v-flex xs12 sm4 >
              <v-text-field type="text" v-model="fullName" class="fields" :rules="[v => !!v || 'Please Enter Full Name of Patient']" label="Full Name"></v-text-field>
            </v-flex> 
            
            
     </v-layout>

     <v-layout row>
        <v-flex xs12 sm4> 
        <v-text-field type="number" class="fields" v-model="age" label="Age" max="100"></v-text-field> 
        </v-flex> 
        <v-flex xs12 sm4>
               <v-text-field label="Mobile Number" :rules="[v => !!v || 'Please Enter valid mobilenumber']" v-model="mobileNumber"  class="fields" type="number"></v-text-field>
            </v-flex>
        <v-flex xs12 sm4>
        <v-text-field type="email " class="fields" v-model="email" label="Email" max="100" ></v-text-field> 
        </v-flex> 
            
            
     </v-layout>

     <v-layout row>
          <v-flex xs12 sm4>
              <v-select
                      :items="genders"
                      label="Select Gender"
                      item-text="gender"
                      v-model="gender"
                      single-line
                      class="fields"
                      :rules="[v => !!v || 'Please Select Gender']"
                    ></v-select>
            </v-flex>
           <v-flex xs12 sm4>
              <v-select
                      :items="branchs"
                      label="Select Branch"
                      item-text="branchName"
                      item-value="id"
                      v-model="branch"
                      single-line
                      class="fields"
                      :rules="[v => !!v || 'Please Select Branch']"
                    ></v-select>
            </v-flex>
             <v-flex xs12 sm4>
              <v-select
                      :items="procedures"
                      label="Procedure Advised"
                      item-text="procedures"
                      v-model="procedure"
                      item-value="id"
                      :rules="[v => !!v || 'Please Select Procedure']"
                      single-line
                      class="fields"
                    ></v-select>
            </v-flex>
     </v-layout>

     <v-layout row wrap>
          <v-flex xs12 sm4>
            <v-select
                v-model="doc"
                :items="doctors"
                label="Select Doctors"
                item-text="username"
                item-value="id"
                :rules="[v => !!v || 'Please Select Doctors']"
                @input="displayValue"
                multiple
                outline
                class="fields"
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item.username}}</span>
                  </v-chip>
                  <span
                    v-if="index === 1"
                    class="blue--text caption"
                  >(+{{ doctors.length - 1 }} others)</span>
                </template>
              </v-select>      

          </v-flex>
        

     </v-layout>
   
    <v-layout>
      <v-flex lg12 md12>
          <v-textarea
             outline
             label="Remarks"
             v-model="remarks"
           ></v-textarea>
      </v-flex>
    </v-layout>
        
       <br>
        <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn :loading="loading" round color="success" :disabled="!valid" @click="submit(),loader = 'loading'" >Submit</v-btn>
          <v-btn round color="error">Cancel</v-btn>
        </div>
      </v-flex>

        </v-layout>

      </v-card-text>


      </v-form>
    
      </v-card>
  </v-flex>
</template>
<script>

import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;
// const API_URL = 'http://localhost:8091';

  export default {
    name: 'DatePickers',
    
    data () {
      return {
        picker: null,
        date: new Date().toISOString().substr(0, 10),
        minDate: new Date().toISOString().substr(0, 10),
        dob: null,
        menu: false,
        menu1: false,
        modal: false,
        dialog1: false,
        time: null,
        modal2: false,
        valid:true,
        displayValue:'',
        doc:[],
        patientType: 'ONLINE',


        

        // fields
        patient:null,
        fullName: "",
        mobileNumber: "",
        mrdNumber:"",
        email:"",
        gender:"",
        branch:null,
        appType:null,
        doctor:null,
        titleid:"",
        patients : [],
        procedure:'',
        remarks: '',
        pincode:"",
        age:"",

        titlename:"",
        title:[{
          id:1,
          titlename: "Mr."
        },{
          id:2,
          titlename: "Ms."
        },{
          id:3,
          titlename: "Mrs."
        },{
          id:4,
          titlename: "Dr."
        }],
        genders:[{
          gender:"MALE"
        },{
          gender:"FEMALE"
        },{
          gender:"OTHERS"
        }],
        
        branchs:[],
        doctors:[],
        procedures:[],
        formRequest: null,
        displayError: false,
        loader: null,
        loading: false,
        
      }
    },

    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
     
       getBranches(){
         return apiService.getBranches().then(res =>{
           this.branchs = res;
           console.log(this.branchs);
           
         })
       },

       getProcedures(){
           return apiService.getProcedures().then( response =>{
               this.procedures = response;
               console.log(this.procedures);  
           })
       },

       getDoctors(){
           return apiService.getDoctors().then(response =>{
               this.doctors = response;
               console.log(this.doctors);
           })
       },
       nullPatient(type){

         if(type =='OFFLINE'){
            this.patient = 0;
            this.fullName = null;
            this.mobileNumber = null;
            this.email = null;
         }

         
       },

       getPatients(){
         return apiService.getAllPatients().then(response => {
           this.patients = response;
           console.log(this.patients);
           
         })
       },

       getPatientDetails(id){
         return apiService.getPatientDetails(id).then(response => {
           console.log(response);
           this.fullName = response.firstName + " " + response.lastName;
           this.mobileNumber = response.mobileNumber;
           this.email = response.email;
         })
       },

      submit(){
       let formRequest ={
         "fullName": this.titlename + " " + this.fullName,
         "appointmentDate": this.date,
         "appointmentTime": this.time,
         "mrdNumber": this.mrdNumber,
         "patient": this.patient,
         "age": this.age,
         "mobileNumber": this.mobileNumber,
         "emailId": this.email,
         "gender": this.gender,
         "branch": this.branch,
         "procedure": this.procedure,
         "doctors": [],
         "remarks": this.remarks
       } ;

       for(let i =0; i< this.doc.length; i++){
         let doctors = {
           "doctor": this.doc[i]
         }
         formRequest.doctors.push(doctors);
       }

      console.log(formRequest);
       
       
      if(this.$refs.form.validate()){

       let url =`${API_URL}/createOtherAppointment`;
       const auth = {
        headers: { Authorization: localStorage.getItem('token') },
       }; 

       return axios.post(url, formRequest, auth).then(response=>{
           console.log(response);
           if(response.status == 202){
             this.$router.push("/otherAppointments");
           }else{
             alert("Oops !!! something went wrong , Try again later");
           }
         });
         

      }else{
        this.valid = false;
      }

       

     
        
      }
      
      
    },
    mounted(){
      this.getBranches();
      this.getProcedures();
      this.getDoctors();
      this.getPatients();

    },

    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 5000)

        this.loader = null
      }
    },
    
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Appointments',
          disabled: false,
          href: '/otherAppointments'
        },
        {
          text: 'Other Appointment',
          disabled: false,
          href: 'addotherappointments'
        }
        
      ]
    }
    
  }
</script>
<style>
.fields{
  width: 90%;
}
</style>
