<template>
  <v-flex xs12 sm12>
     <h2>Walk In/Telephonic Appointments</h2><br>
      <v-card>
        


      <v-card-text>
      <v-form 
      ref="form"
      v-model="valid"
      lazy-validation
      >
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
 
    </v-layout>
    <v-layout row>
          
            <v-flex xs12 sm4 >
              <v-text-field type="text" v-model="fullName" class="fields" :rules="[v => !!v || 'Please Enter Full Name of Patient']" label="Full Name"></v-text-field>
            </v-flex> 
            <v-flex xs12 sm4>
               <v-text-field label="Mobile Number" :rules="[v => !!v || 'Please Enter valid email']" v-model="mobileNumber"  class="fields" type="number"></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
        <v-text-field type="email " class="fields" v-model="email" label="Email" max="100"></v-text-field> 
        </v-flex>
            
     </v-layout>

     <v-layout row>
        <v-flex xs12 md4>
        <v-text-field type="number" class="fields" v-model="age" label="Age" max="100"></v-text-field> 
        </v-flex> 
         <v-flex xs12 md4>
            <v-menu
            ref="dob"
          :close-on-content-click="false"
          v-model="menu1"
          :nudge-right="40"
          :return-value.sync="date1"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          class="fields"
            >
              <v-text-field
            slot="activator"
            v-model="dob"
            label="Select Date Of Birth"
            prepend-icon="event"
            :rules="[v => !!v || 'Please Select Your Date of Birth']"
            readonly
          ></v-text-field>
          <v-date-picker v-model="dob"  no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dob.save(date1),calculateAge()">OK</v-btn>
          </v-date-picker>
            </v-menu>
            </v-flex>


         
            <v-flex xs12 md4>
               <v-text-field type="text" class="fields" v-model="CurrenteyeProblem" label="Current Eye Problem" ></v-text-field>
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
                      @change="filterBranchWise(branch)"
                      :rules="[v => !!v || 'Please Select Branch']"
                    ></v-select>
            </v-flex> 
            <v-flex xs12 sm4>
              <v-select
                      :items="appointmenttype"
                      label="Appointment type"
                      item-text="appointmenttype"
                      v-model="appType"
                      item-value="id"
                      :rules="[v => !!v || 'Please Select Appointment Type']"
                      single-line
                      class="fields"
                    ></v-select>
            </v-flex>
            
     </v-layout>
     <v-layout row wrap>
      <v-flex xs12 sm4>
        <span class="headline">Address</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-layout row>
        <v-flex xs12 sm4>
        <v-text-field type="text" class="fields" v-model="AddressLine1" label="Address Line 1" max="100"></v-text-field> 
        </v-flex> 
        <v-flex xs12 sm4>
        <v-text-field type="text" class="fields" v-model="AddressLine2" label="Address Line 2" max="100"></v-text-field> 
        </v-flex> 
            <v-flex xs12 sm4>
               <v-text-field type="number" class="fields" v-model="pincode" label="pincode" ></v-text-field>
            </v-flex>
            
     </v-layout>
    </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-subheader>Referred By
          <v-radio-group row v-model="referredType">
            <v-radio label="DOCTORS" value="DOCTOR" color="blue"></v-radio>
            <v-radio label="OTHERS" value="OTHERS" color="blue"></v-radio>
          </v-radio-group>
          </v-subheader>
        </v-flex>
        <v-flex xs12 sm4 v-if="referredType == 'DOCTOR'">
          <v-autocomplete
          :items="referredDoctors"
          label="Referred Doctors"
          item-text="fullName"
          item-value="fullName"
          v-model="RefferedBy"
          class="fields">
          </v-autocomplete>
        </v-flex>
        <v-flex xs12 sm4 v-else>
          <v-text-field type="text" class="fields" v-model="RefferedBy" label="Referred By" ></v-text-field>
        </v-flex>
      </v-layout>

    <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-subheader>Do you Prefer any Doctors? &nbsp;
              <v-radio-group row v-model="preferDoctors" @change="preferDoctor(preferDoctors)">
                    <v-radio label="Yes" value="yes" color="blue"  ></v-radio>
                    <v-radio label="No" value="no" color="blue"></v-radio>
                </v-radio-group>
               </v-subheader>
            </v-flex>
            <v-flex xs12 sm4>
              <div id="preferDoctors" style="display:none">
              <v-select
                      :items="doctors"
                      label="Available Doctors"
                      item-text="username"
                      item-value="id"
                      v-model="doctor"
                      @change="filterDoctorSlots(doctor)"
                      single-line
                      :rules="[v => !!v || 'Please Select Doctor']"
                      class="fields"
                    ></v-select>
                    </div>
            </v-flex>
            
    </v-layout>
    
         <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3> Number of slots available now </h3>
                    </v-card-title>
                    <v-card-text>
                        <v-form 
                        ref="form"
                        v-model="validform"
                        lazy-validation
                        >
               <v-card-text>
                 <div id="datewiseAllSlots" style="display:none">
                   <v-layout row wrap> 
                                    
                   <v-card class="m-5 card-border1" v-for="(ava,i) in slots" :key="i" style="margin-right:40px;margin-bottom: 20px">
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
                 </div>
                 <div id="branchWiseSlots" style="display:none">
                   <v-layout row wrap>                  
                   <v-card class="m-5 card-border2" v-for="(ava,i) in branchSlots" :key="i" style="margin-right:40px;margin-bottom: 20px">
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
                 </div>
                 <div id="doctorwiseSlots" style="display:none">
                   <v-layout row wrap>                  
                   <v-card class="m-5 card-border3" v-for="(ava,i) in doctorSlots" :key="i" style="margin-right:40px;margin-bottom: 20px">
                       <v-radio-group v-model="slotid">
                       <v-flex> 
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
                 </div>
                </v-card-text>           
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
       <br><hr><br> <h4><u>Clinical Details</u></h4><br>

            <v-layout row>
                <v-flex xs5>
                <v-subheader>Are you diabetic? &nbsp;&nbsp;&nbsp;
                    <v-radio-group row v-model="diabetic" @change="selectDiabetic(diabetic)">
                    <v-radio label="Yes" value="yes" color="blue" ></v-radio>
                    <v-radio label="No" value="no" color="blue" ></v-radio>
                </v-radio-group> 
                </v-subheader>
                    <div id="selectDiabetic" style="display:none">
                    <v-text-field type="text" v-model="diabeticDuration" label="Enter duration" ></v-text-field>
                    </div>
                </v-flex>
                <v-spacer></v-spacer>
               <v-flex xs6>
                    <v-subheader>Do you have Hypertension? &nbsp;
                    <v-radio-group row v-model="bp" @change="selectHp(bp)">
                    <v-radio label="Yes" value="yes" color="blue" ></v-radio>
                    <v-radio label="No" value="no" color="blue" ></v-radio>
                </v-radio-group> 
                </v-subheader>
                <div id="selectHp" style="display:none">
                    <v-text-field type="text" v-model="bpDuration" label="Enter duration" ></v-text-field>
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs5>
                <v-subheader>Are you allergic yo any Drug? &nbsp;
                    <v-radio-group row v-model="Drug" @change="selectAllergy(Drug)">
                    <v-radio label="Yes" value="yes" color="blue" ></v-radio>
                    <v-radio label="No" value="no" color="blue"></v-radio>
                </v-radio-group> 
                </v-subheader>
                <div id="selectAllergy" style="display:none">
                    <v-text-field type="text" v-model="DrugAllergy" label="Please Mention" ></v-text-field>
                    </div>
                </v-flex>
                 <v-spacer></v-spacer>
               <v-flex xs6>
                    <v-subheader>Do you have any Other Medical condition?  &nbsp;
                    <v-radio-group row v-model="medical" @change="selectMedical(medical)">
                    <v-radio label="Yes" value="yes" color="blue" ></v-radio>
                    <v-radio label="No" value="no" color="blue" ></v-radio>
                </v-radio-group> 
                </v-subheader>
                <div id="selectMedical" style="display:none">
                    <v-text-field type="text" v-model="MedicalCondition" label="Please Mention " ></v-text-field>
                    </div>
                </v-flex>
              
            </v-layout>           
            <v-layout row>
                <v-flex xs6>
                <v-subheader>Do you have History of Eye Problem? &nbsp;
                    <v-radio-group row v-model="eyeProblem" @change="selectEye(eyeProblem)">
                    <v-radio label="Yes" value="yes" color="blue" ></v-radio>
                    <v-radio label="No" value="no" color="blue" ></v-radio>
                </v-radio-group> 
                </v-subheader>
                <div id="selectEye" style="display:none">
                    <v-text-field type="text" v-model="eyeProblemDescription" label="Explain" ></v-text-field>
                    </div>
                </v-flex>
                <v-spacer></v-spacer>
               <v-flex xs6>
                    <v-subheader>Are you using any Eye drops? &nbsp;
                    <v-radio-group row v-model="eyeDrops" @change="selectDrop(eyeDrops)">
                    <v-radio label="Yes" value="yes" color="blue"></v-radio>
                    <v-radio label="No" value="no" color="blue"></v-radio>
                </v-radio-group> 
                </v-subheader>
                <div id="selectDrop" style="display:none">
                    <v-text-field type="text" v-model="eyeDropsDescription" label="Explain"></v-text-field>
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs6>
                <v-subheader>Do you have any Cardiac condition? &nbsp;
                    <v-radio-group row v-model="cardiac" >
                    <v-radio label="Yes" value="yes" color="blue" ></v-radio>
                    <v-radio label="No" value="no" color="blue"></v-radio>
                </v-radio-group> 
                </v-subheader>
                </v-flex>
                 <v-flex xs6>
                <v-subheader>Do you have any Asthama condition? &nbsp;
                    <v-radio-group row v-model="asthama" >
                    <v-radio label="Yes" value="yes" color="blue" ></v-radio>
                    <v-radio label="No" value="no" color="blue"></v-radio>
                </v-radio-group> 
                </v-subheader>
                </v-flex>
            </v-layout>
<hr>
        <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn round color="success" :disabled="!valid" @click="submit()" >Submit</v-btn>
          <v-btn round color="error">Cancel</v-btn>
        </div>
      </v-flex>

        </v-layout>

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
    name: 'DatePickers',
    
    data () {
      return {
        appid: this.$route.params.appId,
        picker: null,
        date: new Date().toISOString().substr(0, 10),
        minDate: new Date().toISOString().substr(0, 10),
        dob: null,
        menu: false,
        menu1: false,
        modal: false,
        dialog1: false,
        patients:[],

        valid:true,

        // fields
        fullName: "",
        mobileNumber: "",
        email:"",
        CurrenteyeProblem:"",
        gender:"",
        branch:null,
        appType:null,
        doctor:null,
        diabetic: "no",
        diabeticDuration:"",
        bp:"no",
        bpDuration:"",
        cardiac:"no",
        cardiacDuration: "",
        asthama:"no",
        eyeProblem:"no",
        eyeProblemDescription:"",
        eyeDrops:"no",
        eyeDropsDescription:"",
        medical:"no",
        Drug:"no",
        preferDoctors:"no",
        MedicalCondition:"",
        DrugAllergy:"",
        titleid:"",
        AddressLine1:"",
        AddressLine2:"",
        pincode:"",
        RefferedBy:"",
        age:"",
        asthama:"no",

        titlename:"",
        slotid:"",
        doctorSlots:[],
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

        appointmenttype: [{
          id: 2,
          appointmenttype: "WALKIN"
        },{
          id: 3,
          appointmenttype: "TELEPHONIC"
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
        
        slots:[],
        branchSlots:[],
        availSlots:[],
        slotid: "",
        formRequest: null,
        displayError: false,
        referredDoctors: [],
        referredType: "DOCTOR",
        patientType: 'OFFLINE',
        appointments: []
        
        
      }
    },

    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu5.save(date)
      },
      selectDiabetic(diabetic){
        if(diabetic == "yes"){
          document.getElementById('selectDiabetic').style.display='block';
        }else{
          document.getElementById('selectDiabetic').style.display='none';
        }
      },
     
      selectHp(bp){
        if(bp == "yes"){
          document.getElementById('selectHp').style.display='block';
        }else{
          document.getElementById('selectHp').style.display='none';
        }
      },
      selectMedical(medical){
        if(medical == "yes"){
          document.getElementById('selectMedical').style.display='block';
        }else{
          document.getElementById('selectMedical').style.display='none';
        }
      },
      preferDoctor(preferDoctors){
        if(preferDoctors == "yes"){
          document.getElementById('preferDoctors').style.display='block';
          
        }else{
          document.getElementById('preferDoctors').style.display='none';
          this.filterBranchWise(this.branch);
        }
      },

      selectAllergy(Drug){
        if(Drug == "yes"){
          document.getElementById('selectAllergy').style.display='block';
        }else{
          document.getElementById('selectAllergy').style.display='none';
        }
      },
      
      selectAsthma(asthama){
        if(asthama == "yes"){
          document.getElementById('selectAsthma').style.display='block';
        }else{
          document.getElementById('selectAsthma').style.display='none';
        }
      },

      selectEye(eyeProblem){
        if(eyeProblem == "yes"){
          document.getElementById('selectEye').style.display='block';
        }else{
          document.getElementById('selectEye').style.display='none';
        }
      },
      
      selectDrop(drop){
        if(drop == "yes"){
          document.getElementById('selectDrop').style.display='block';
        }else{
          document.getElementById('selectDrop').style.display='none';
        }
      },


       getBranches(){
         return apiService.getBranches().then(res =>{
           this.branchs = res;
           console.log(this.branchs);
           
         })
       },
      //  get full slots here
       getAvailableSlotsBranchWise(){
         
         
         return apiService.getAvailableSlotFromBranch(this.date).then(response =>{
           console.log(response);
           this.slots = response;
           document.getElementById('datewiseAllSlots').style="display:block";
           if(response.length > 0){
             this.displayError = false;
           }else{
             this.displayError = true;
           }
         })
       },




       filterBranchWise(branch){
         let Slots = this.slots;
         var branchslots = Slots.filter(bslot => bslot.branch.id == branch);
         this.branchSlots = branchslots;
         document.getElementById('branchWiseSlots').style="display:block";
         document.getElementById('doctorwiseSlots').style="display:none ";
         document.getElementById('datewiseAllSlots').style="display:none";
         console.log("Branch wise Slots ");
         console.log(this.branchSlots);
         this.getDoctor();
       },

       filterDoctorSlots(doctor){
         let branch = this.branchSlots;
         var result = branch.filter(avslot => avslot.doctor.id === doctor);
         this.doctorSlots  = result;
         document.getElementById('doctorwiseSlots').style="display:block";
         document.getElementById('branchWiseSlots').style="display:none";
         document.getElementById('datewiseAllSlots').style="display:none";                  
         console.log("Doctor wise Slots ");
         console.log(this.availSlots);
         this.slotid = null;
       },

      

      getDoctor(){
        let doctors =[];
        for(let i=0; i< this.branchSlots.length; i++){
          if(doctors == null || doctors.length == 0){
            doctors.push(this.branchSlots[i].doctor);
          }else{
            let added =0;
            for(let j =0; j< doctors.length; j++){
              if(doctors[j].id == this.branchSlots[i].id){
                added = 1;
              }else{
                added = 0;
              }
            }
            if(added == 0){
              doctors.push(this.branchSlots[i].doctor);
            }
          }
        }
        this.doctors = doctors;
        console.log("The list of Doctors");
        
        console.log(this.doctors);        
      },

      getBool(value){
        if(value == "yes"){
          return true;
        }else{
          return false;
        }
      },

            nullPatient(type){

         if(type =='OFFLINE'){
            this.patient = 0;
            this.fullName = null;
            this.mobileNumber = null;
            this.email = null;
            this.AddressLine1 = null;
            this.AddressLine2 = null;
            this.pincode = null;
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
           this.AddressLine1 = response.addressLine1;
           this.AddressLine2 = response.addressLine2;
           this.pincode = response.pincode;
         })
       },


      getreferredDoctors(){
        return apiService.getrefferalDoctors().then((response) => {
          this.referredDoctors = response;
          console.log(this.referredDoctors);
          
        })
      },

      submit(){
       let formRequest ={
         "fullName": this.fullName,
         "mobileNumber":this.mobileNumber,
         "date":this.date,
         "email":this.email,
         "age":this.age,
         "CurrenteyeProblem":this.CurrenteyeProblem,
         "gender":this.gender,
         "appointmentType":this.appType,
         "refferedBy":this.RefferedBy,
         "slot":this.slotid,
         "diabetic": this.getBool(this.diabetic),
         "diabeticDuration":this.diabeticDuration,
         "bp": this.getBool(this.bp),
         "bpDuration":this.bpDuration,
         "cardiac":this.getBool(this.cardiac),
         "asthma":this.getBool(this.asthama),
         "eyeProblem":this.getBool(this.eyeProblem),
         "eyeProblemExplain":this.eyeProblemDescription,
         "eyeDrops":this.getBool(this.eyeDrops),
         "eyeDropsExplain":this.eyeDropsDescription,
         "drugAllergy":this.getBool(this.Drug),
         "drugAllergyDuration":this.DrugAllergy,
         "otherMedicalCondition":this.getBool(this.medical),
         "otherMedicalConditionDuration":this.MedicalCondition, 
         "addressLine1": this.AddressLine1,
         "addressLine2": this.AddressLine2,
         "pincode": this.pincode

       } ;


console.log(formRequest);

       let url =`${API_URL}/offlineAppointments/AddAppointment`;
       const auth = {
        headers: { Authorization: localStorage.getItem('token') },
       };

      //  if (this.$refs.form.validate()) {
         console.log(formRequest);
         return axios.post(url, formRequest, auth).then(response=>{
           console.log(response);
           if(response.status == 202){
             this.$router.push("/appointmentlist");
           }else{
             alert("Oops !!! something went wrong , Try again later");
           }
         });
         
      //  }
        
      },
      calculateAge(){
        let myDate= new Date(this.dob),
                        milli = myDate.getTime(),
                        newDate = new Date(),
                        newMilli = newDate.getTime();
        this.age = Math.floor((newMilli - milli)/1000/60/60/24/30/12);
        console.log(this.age);
        
      },

      getReviewAppointments(){
          apiService.getReviewAppointments(this.appid).then((response)=>{
              this.fullName = response.patientName;
              this.mobileNumber = response.contactNumber;
              this.email = response.emailId;
              this.age = response.age;
              this.gender = response.gender;
              this.AddressLine1 = response.addressLine1;
              this.AddressLine2 = response.addressLine2;
              this.pincode = response.pincode;
              
            //   console.log(this.appointments);
              
          })
      }

      
      
      
      
    },
    mounted(){
      this.getBranches();
      this.getAvailableSlotsBranchWise();
      this.getreferredDoctors();
      this.getPatients();
      this.getReviewAppointments();
      
    },
    watch: {
      menu5 (val) {
        val && this.$nextTick(() => (this.$refs.picker5.activePicker = 'YEAR'))
      }
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Appointments',
          disabled: false,
          href: '/appointmentlist'
        },
        {
          text: 'Offline Appointment',
          disabled: false,
          href: 'offlineappointment'
        }
        
      ]
    }
    
  }
</script>
<style>
.fields{
  width: 90%;
}
.off{
  color: red;
}
.onn{
  color: green;
}
.card-border1{
  border: 3px solid darkblue !important;
  width: 200px;
  height: 275px;
  
}
.card-border2{
  border: 3px solid darkblue !important;
  width: 200px;
  height: 275px;
  
}
.card-border3{
  border: 3px solid darkblue !important;
  width: 200px;
  height: 200px;
  
}
</style>
