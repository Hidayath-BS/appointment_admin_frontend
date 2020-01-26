<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
     <br>
     
      <v-card>
        <v-card-text>
          <v-layout row wrap>
           
                <v-flex xs12>
                  <h2>Online Appointments List</h2>
                </v-flex>
          <br/>  <br/>  <br/>
                <v-flex xs3>
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
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Select Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date),getAppointment(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
                </v-flex>
                <v-spacer></v-spacer>
                <!-- <v-flex sm3>
                  <v-btn color="primary" @click="offline()">
                  <v-icon>add_circle</v-icon>
                  ADD APPOINTMENTS
                </v-btn>
                </v-flex> -->
              </v-layout>
        </v-card-text>
      </v-card>


        <v-card>
	       

          <v-data-table
            :headers="headers"
            :items="appointment"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td> {{ props.index+1}}</td>
              <td> {{ props.item.date}}</td>
              <td> {{ props.item.slot.slot.startTime}}</td>
              <td> {{ props.item.patientName}}</td>
              <td> {{ props.item.slot.doctor.username}}</td>
               <td><v-btn icon  color="blue" dark @click="Appointmentdetails(props.item)"><v-icon>list</v-icon></v-btn></td>

      <td>
              
        <v-btn icon slot="activator" @click="reschedule(props.item.id)" color="green" dark><v-icon>edit</v-icon></v-btn>
     
      </td>
      <td><v-btn icon color="blue" dark @click="getDetailsofPerson(props.item.id)"><v-icon>mail</v-icon></v-btn></td>

              <td>
                <v-btn  icon color="red" dark @click="deleteConfirm( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
             <td>
<v-btn icon color="purple" dark @click="AppointCompleted( props.item.id )"><v-icon>done</v-icon></v-btn></td>

        
        
  <v-dialog v-model="appointDialog2" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you sure this appointment has been completed ?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="appointDialog2 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="AppointCom( appid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>

        
          
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-dialog v-model="deleteDialog1" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you Sure want to delete this appointment ?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteAppointment( appid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
        <v-dialog v-model="dialog2"  max-width="800px">
        
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
            <v-flex xs4><h3>Appointment For:</h3></v-flex>

            <v-flex xs3><p> {{ details.appointmentType}} </p></v-flex>

            <v-flex xs3><h3>Patient Name:</h3></v-flex>

            <v-flex xs3><p> {{ details.patientName}} </p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Mobile Number:</h3></v-flex>

            <v-flex xs3><p> {{ details.mobileNumber}} </p></v-flex>

            <v-flex xs3><h3>Email:</h3></v-flex>

            <v-flex xs3><p> {{ details.email}} </p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Gender:</h3></v-flex>

            <v-flex xs3><p> {{ details.gender}}</p></v-flex>

            <v-flex xs3><h3>Date of Birth:</h3></v-flex>

            <v-flex xs3><p> {{ details.dob}} </p></v-flex>

          </v-layout><br>
            
           <hr><br> <h2>Clinical Details</h2><br>

            <v-layout row>
            <v-flex xs4><h3>Diabetic:</h3></v-flex>

            <v-flex xs3><p> {{ details.diabetic}}</p></v-flex>

            <v-flex xs3><h3>Duration:</h3></v-flex>

            <v-flex xs3><p> {{ details.diabeticDuration}}</p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Hypertension:</h3></v-flex>

            <v-flex xs3><p> {{ details.bp}}</p></v-flex>

            <v-flex xs3><h3>Duration:</h3></v-flex>

            <v-flex xs3><p>{{ details.bpDuration}}</p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Cardiac condition:</h3></v-flex>

            <v-flex xs3><p> {{ details.cardiac}}</p></v-flex>

            <v-flex xs3><h3>Asthma:</h3></v-flex>

            <v-flex xs3><p> {{ details.asthama}} </p></v-flex>

            

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>History of any eye problem:</h3></v-flex>

            <v-flex xs3><p> {{ details.eyeProblem}}</p></v-flex>

            <v-flex xs3><h3>Details:</h3></v-flex>

            <v-flex xs3><p>{{ details.eyeProblemDetails}}</p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Using any eye drop:</h3></v-flex>

            <v-flex xs3><p> {{ details.eyedrops}}</p></v-flex>

            <v-flex xs3><h3>Details:</h3></v-flex>

            <v-flex xs3><p> {{ details.eyedropsDetails}}</p></v-flex>

          </v-layout>


          </v-card-text>
                
            </v-card>
      </v-dialog>
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
      //  switch1:true,
        appid:0,
       id:'',
        dialog1: false, 
        dialog2: false,
        picker: null,
        date: new Date().toISOString().substring(0,10),
        date1: null,
        menu: false,
        menu1: false,
        modal: false,
      appointDialog2:false,
        deleteDialog1:false,
        appointment:[],
        maillist:[],
        headers: [
          { text: 'Sl.no',value: 'slno',width:10 },
          { text: 'Date', value: 'date' },
          { text: 'Time Slot', value: 'time' },
          { text: 'Patient Name', value: 'patient' },
          { text: 'Prefered doctor', value: 'doctor' },
          { text: 'Details', value: 'details' },
          { text: 'Reschedule', value: 'reschedule'},
          { text: 'Send Mail', value: 'mail'},
          { text: 'Delete', value: 'delete'},
          { text: 'Status', value: 'complete'},
        ],
        details:{
          patientName:"",
          mobileNumber:"",
          email:"",
          gender:"",
          dob:"",
          diabetic:"",
          diabeticDuration:"",
          bp:"",
          bpDuration:"",
          asthama:"",
          cardiac:"",
          eyedrops:"",
          eyedropsDetails:"",
          eyeProblem:"",
          eyeProblemDetails:"",
          drugAllergey:"",
          drugAllergeyDetails:"",
          otherMedicalCondition:"",
          otherMedicalConditionDetails:"",
          appointmentType:"",
        },
        
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
      //mail passing
      getDetailsofPerson(personid){
        this.loading=true;
        this.$router.push('/Mail/' +personid);
      },
     
      getAppointment(date){
        const auth={
       headers:{
        Authorization:localStorage.getItem('token')
       }
     }
     const url=`${API_URL}/getOnlineAppointment/${date}`;
     return axios.get(url,auth).then((response)=>{
       this.appointment = response.data;
       
      for(let i=0; i< this.appointment.length; i++){
        this.appointment[i].asthama = this.getBool(this.appointment[i].asthama);      
        this.appointment[i].diabetic = this.getBool(this.appointment[i].diabetic);
        this.appointment[i].bp = this.getBool(this.appointment[i].bp);
        this.appointment[i].cardiac = this.getBool(this.appointment[i].cardiac);
        this.appointment[i].eyeProblem = this.getBool(this.appointment[i].eyeProblem);
        this.appointment[i].eyeDrops = this.getBool(this.appointment[i].eyeDrops);
 this.appointment[i].otherMedicalCondition = this.getBool(this.appointment[i].otherMedicalCondition);
 this.appointment[i].drugAllergy = this.getBool(this.appointment[i].drugAllergy);
 this.appointment[i].appointmentType = this.getType(this.appointment[i].appointmentType);
      }

       console.log(response.data);
     })
      },
 getType(valu){
        if(valu==1){
          return "ONLINE"
        }else if(valu==2){
          return "WALKIN"
        }
        else if(valu==3){
          return "TELEPHONIC"
        }else{
          return "Not Specified"
        }
      },
      getBool(value){
        if(value == true){
          return "Yes";
        }else{
          return "No" ;
        }
      },

      //for deleting
        deleteAppointment( appointid ){
        const url = `${API_URL}/cancelAppointment`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "appointments": appointid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getAppointment(this.date);
          this.deleteDialog1 = false;
        } )
      },
      //for deleting end
      deleteConfirm( appointid ){
        this.deleteDialog1 = true;
        this.appid = appointid;
        console.log(this.appid); 
      },

     //for deleting
        AppointCom( appointid ){
        const url = `${API_URL}/CompletedAppointment`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "cappointment": appointid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getAppointment(this.date);
            this.appointDialog2 = false;
        } )
      },
      //for deleting end
      AppointCompleted( appointid ){
        this.appointDialog2 = true;
        this.appid = appointid;
        console.log(this.appid); 
      },
    
      //route to Offline Appointments
     offline(){
        this.$router.push('/offlineappointment');
      },

      reschedule(id){
        this.$router.push('/Reshedule/'+id);
      },

       Appointmentdetails(object){
        this.dialog2 = true;
        this.details.patientName = object.patientName;
        this.details.mobileNumber = object.contactNumber;
        this.details.email = object.emailId;
        this.details.gender = object.gender;
        this.details.dob = object.dateOfBirth;
        this.details.diabetic = object.diabetic;
        this.details.diabeticDuration = object.diabeticDuration;
        this.details.bp = object.bp;
        this.details.bpDuration = object.bpDuration;
        this.details.asthama = object.asthama;
        this.details.cardiac = object.cardiac;
        this.details.eyeProblem = object.eyeProblem;
        this.details.eyeProblemDetails = object.eyeProblemDetails;
        this.details.eyedrops = object.eyeDrops;
        this.details.eyedropsDetails = object.dropDetails;
        this.details.otherMedicalCondition = object.otherMedicalCondition;
        this.details.otherMedicalConditionDetails = object.otherMedicalConditionDetails;
        this.details.appointmentType = object.appointmentType;
        
        
      }
     
    },

    mounted () {
      this.getAppointment(this.date);
      // this.getMail();
    
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Online Appointment List',
          disabled: false,
          href: '/AppointmentOnlineList'
        },
        
      ]
    }
    
  }
</script>