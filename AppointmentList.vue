<template><v-layout>
  
    <v-layout row wrap>
      <v-spacer></v-spacer>
  <v-flex sm3>
                  <v-btn color="primary" @click="offline()">
                  <v-icon>add_circle</v-icon>
                  ADD APPOINTMENTS
                </v-btn>
                </v-flex>
         <v-flex xs12 sm12>
           <br>
     <v-card>
           <v-card-title>
            <h2>Appointments List</h2>
          </v-card-title>
        <v-card-text>
          <v-layout row wrap>
                <v-flex xs3>
                  <div id="val1">
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
                      <v-date-picker v-model="date1" :min="name" no-title scrollable>
                         <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="success" @click="$refs.menu.save(date1),menu=false,getapp(branchid)">OK</v-btn>                                                
                      </v-date-picker>
                    </v-menu>
      
         </div>   
                </v-flex>                            
                <v-flex lg3 md3 xs3 offset-xs1>
                  <v-autocomplete
                  :items="branch"
                  label="Select Branch"
                  item-text="branchName"
                  item-value="id"
                  v-model="branchid"
                  @input="getapp(branchid)"
                  ></v-autocomplete>
                </v-flex>
               
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
              <td> {{ props.item.mrdNumber}}</td>
              <td> {{ props.item.date}}</td>
              <td> {{ props.item.slot.slot.startTime}}</td>
              <td> {{ props.item.patientName}}</td>
              <td> {{ props.item.slot.doctor.username}}</td>
              <td><v-btn icon  color="blue" dark @click="Appointmentdetails(props.item)"><v-icon>list</v-icon></v-btn></td>
      <td><v-btn :disabled= 'props.item.mrdNumber != null ' color="blue" round @click="getMrdNumber(props.item.id)">update</v-btn></td>
      <td>
        <v-switch :disabled = "props.item.completed" :label="props.item.completed ? 'completed':'not completed'" @change="statusUpdate(props.item.id, props.item.completed)" v-model="props.item.completed"></v-switch>
      </td>

      <td>
              
        <v-btn  icon slot="activator" @click="reschedule(props.item.id)" color="green" dark><v-icon>edit</v-icon></v-btn>
     
      </td>


              <td>
                <v-btn  icon color="red" dark @click="deleteConfirm( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
              <td>
              <v-btn slot="activator" icon color="purple" dark @click="datereview(props.item.id)">
                <v-icon>event</v-icon>
              </v-btn>
                
            </td>
            
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

            <v-flex xs3><h3>Age:</h3></v-flex>

            <v-flex xs3><p> {{ details.age}} </p></v-flex>

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
        <br><br><br>
            <v-layout row wrap>
         <v-flex xs12 sm12>
             
     <br>
        <v-card>
          <v-card-title>
            <h2>Rescheduled Appointments List</h2>
          </v-card-title>
          <v-data-table
            :headers="headers1"
            :items="appointmentList"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{props.index+1}}</td>
              <td class="text-xs-left">{{props.item.appointment.patientName}}</td>
              <td class="text-xs-left">{{props.item.slot.doctor.username}}</td>              
              <td class="text-xs-left">{{props.item.date}}</td> 
              <td><v-dialog v-model="dialog1" max-width="600px"> 
        <v-btn slot="activator" fab small color="blue" dark><v-icon white>info</v-icon></v-btn>
	
        <v-card>
          <v-card-title>
            <span class="headline">Details</span>
          </v-card-title>
          <v-card-text>
              <v-layout>
              <v-flex xs6>
                  <p><h4>Requested Date :  {{props.item.appointment.date}}</h4>
                  <br/>
                  <p><h4>Requested Time :  {{props.item.appointment.slot.slot.slotName}}</h4>
              </v-flex>  
              <v-flex xs6>
                  <p><h4>Resheduled Date :  {{props.item.date}}</h4>
                  <br/>
                  <p><h4>Resheduled Time :  {{props.item.slot.slot.slotName}}</h4>
              </v-flex>                  
              </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>            
            <v-btn color="error" @click.native="dialog1 = false" round>Close</v-btn>
          </v-card-actions>    
        </v-card>
        </v-dialog>    
              
              <td>
                <v-btn flat icon color="red" @click="deleteConfirm1( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <v-dialog v-model="deleteDialog2" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you Sure to delete this Product ?
                </v-card-title> 
                <v-card-actions>
                  <v-btn @click="deleteDialog2 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteResheduledAppointment( appointmentid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
       
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no  results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout> 
          </v-layout>
           <v-layout row justify-center>
    <v-dialog v-model="getMrdNumberDialog" max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">Enter MRD Number here</span>
        </v-card-title>
        <v-card-text>
          <v-form
          v-model="valid"
          ref="form"
          lazy-validation>
            <v-layout row wrap>
            <v-flex>
              <v-text-field
                label="Enter MRD number"
                color="primary"
                v-model="usersMRDNumber"
                :rules="[v=> !!v || 'please enter valid MRD Number']"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-flex>
              <v-btn color="primary" :disabled="!valid" @click="submitusersMRDNumber()"   round>SUBMIT</v-btn>
              <v-btn color="danger" @click="getMrdNumberDialog = false" round> CANCEL </v-btn>
            </v-flex>
          </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
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
        appid:0,
        getMrdNumberDialog:false,
        dialog1: false, 
        dialog2: false,
        valid: true,
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
        name:new Date().toISOString().substring(0,10),
        modal: false,
        deleteDialog2:false,
        deleteDialog1:false,
        remainderdialog:false,
        usersMRDNumber:"",
        appointment:[],
        appointmentList:[],
        branch:[],
        branchid:0,
        details:{
          patientName:"",
          mobileNumber:"",
          email:"",
          gender:"",
          dob:"",
          age:"",
          diabetic:"",
          patientId:'',
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
       
        headers: [
          { text: 'Sl.no',value: 'slno',width:10 },
          { text: 'MRD Number',value: 'MRDNUMBER',width:10 },
          { text: 'Date', value: 'date' },
          { text: 'Time Slot', value: 'time' },
          { text: 'Patient Name', value: 'patient' },
          { text: 'Prefered doctor', value: 'doctor' },
          { text: 'Details', value: 'details' },
          { text: 'Update', value: 'update' },
          { text: 'Status', value: 'status'},
          { text: 'Reschedule', value: 'reschedule'},
          { text: 'Delete', value: 'delete'},
          { text: 'Review Date' , value:'Review Date'}
        ],
        headers1: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Patient', value: 'patient' },
          { text: 'Doctor', value: 'doctor' },          
          { text: 'Resheduled Date', value: 'Resheduleddate' },
          { text: 'Details', value: 'Details' },          
          { text: 'Delete', value: 'delete'}
        ],
        datetype: 'ONDATE'
        
      }
    },
   
    
    methods: {
      getMrdNumber(patientId){
      this.patientId = patientId;
      this.getMrdNumberDialog = true;
    },
    submitusersMRDNumber(){
      console.log(this.patientId);

      const url = `${API_URL}/offlineAppointments/submitusersMRDNumber`;
      const auth = {
          headers: { Authorization: localStorage.getItem('token') } 
      };

      return axios.put(url, {"patientId":this.patientId,
                              "usersMRDNumber":this.usersMRDNumber}, auth).then((response)=>{
        console.log(response);
        if(response.status == 200){
         this.getMrdNumberDialog = false;
         this.getapp(this.branchid);
          
          alert('Success!!!, MRD Nuber Added Successfully');
        }else{
          alert('Oops!!!, Something went wrong, Please try again !!');
        }
        
      },(err)=>{
          alert('Oops!!!, Something went wrong, Please try again !!');
      })
      
    },
      getapp(id){
        console.log(id);
        if(this.date1 != null && id != 0){
        this.getAppointment(this.date1,id),
        this.getResheduledAppointmentsOnDatebranchWise(this.date1,id)}
        else if(this.date1 == null && id != 0){
         this.getfutureappointments(id),
         this.futurerescheduledAppointmentListbranchwise(id)} 
        
      },
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date) {
        this.$refs.menu.save(date)
      },
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      save (date1) {
        this.$refs.menu1.save(date1)
      },
datereview(reviewid){
  this.$router.push('/ReviewDate/' +reviewid);
},

  // get appointments branch wise
 getAppointment(date,id){
   return apiService.getAppointmentbranchwise(date,id).then((response)=>{
      this.appointment = response;
      console.log("getAppointment");
      
       
      for(let i=0; i< this.appointment.length; i++){
        this.appointment[i].asthama = this.getBool(this.appointment[i].asthama);      
        this.appointment[i].diabetic = this.getBool(this.appointment[i].diabetic);
        this.appointment[i].bp = this.getBool(this.appointment[i].bp);
        this.appointment[i].cardiac = this.getBool(this.appointment[i].cardiac);
        this.appointment[i].eyeProblem = this.getBool(this.appointment[i].eyeProblem);
        this.appointment[i].eyeDrops = this.getBool(this.appointment[i].eyeDrops);
        if(this.appointment[i].appointmentType == 1){
          
          this.appointment[i].appointmentType = "online";
        }
         else if(this.appointment[i].appointmentType == 2){
            this.appointment[i].appointmentType = "Walkin";
           }
            else if(this.appointment[i].appointmentType == 3){
            this.appointment[i].appointmentType = "Telephonic";
        }
   }
    console.log(response);
  })
},

  // get future appoints branch wise
      getfutureappointments(id){
  return apiService.getfutureappointmentsBranchWise(id).then((response)=>{
    this.appointment = response;
  console.log("getfutureappointments");
  
for(let i=0; i< this.appointment.length; i++){
        this.appointment[i].asthama = this.getBool(this.appointment[i].asthama);      
        this.appointment[i].diabetic = this.getBool(this.appointment[i].diabetic);
        this.appointment[i].bp = this.getBool(this.appointment[i].bp);
        this.appointment[i].cardiac = this.getBool(this.appointment[i].cardiac);
        this.appointment[i].eyeProblem = this.getBool(this.appointment[i].eyeProblem);
        this.appointment[i].eyeDrops = this.getBool(this.appointment[i].eyeDrops);
        console.log(this.appointment[i].appointmentType);
        
        if(this.appointment[i].appointmentType == 1){
          
          this.appointment[i].appointmentType = "Online";
        }
         else if(this.appointment[i].appointmentType == 2){
            this.appointment[i].appointmentType = "Walkin";
           }
            else if(this.appointment[i].appointmentType == 3){
            this.appointment[i].appointmentType = "Telephonic";
        }
   }
    console.log(response);
  })

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
          this.getapp(this.branchid);
          this.deleteDialog1 = false;
        } )
      },
     
      //for deleting end
      deleteConfirm( appointid ){
        this.deleteDialog1 = true;
        this.appid = appointid;
        console.log(this.appid); 
      },
      //route to Offline Appointments
     offline(){
        this.$router.push('/offlineappointment');
      },

      statusUpdate(id, status){
        const url = `${API_URL}/changeAppointmentStatus`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        let data ={
          "appointment": id,
          "status": status
        }

        return axios.put(url, data, auth).then((response)=>{
          console.log(response);
          if(response.status == 200){
            alert("Success!!!, Appointment Status changed");
          }else{
            alert("Oops !!!, Something went wrong");
          }
          
        },err=>{
          alert("Oops !!!, Something went wrong");
        })

      },

      reschedule(id){
        this.$router.push('/Reshedule/'+id);
      },

      // get resheduled appointments branch wise

      getResheduledAppointmentsOnDatebranchWise(date,id){
  return apiService.getResheduledAppointmentsOnDatebranchWise(date,id).then(response=>{
    this.appointmentList =response;
    console.log("getResheduledAppointmentsOnDatebranchWise");
    
    console.log(response);
     
  })
},  

  // get future resheduled appointments branch wise

futurerescheduledAppointmentListbranchwise(id){
          return apiService.futurerescheduledAppointmentListbranchwise(id).then(response=>{
              this.appointmentList = response;
              console.log("futurerescheduledAppointmentListbranchwise");
              
              console.log(this.appointmentList);
              
          })
      },

      // get branch list
      getBranch(){
        return apiService.getBranches().then(response=>{
          this.branch = response;
          console.log(this.branch);
          
        })
      },

    // Delete resheduled appointments
       deleteResheduledAppointment(id){
        const url = `${API_URL}/masters/deleteResheduledAppointment`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "appointmentid": id
        }
        console.log(id);
        
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getapp(this.branchid);
          this.deleteDialog2 = false;
        } )
      },

      deleteConfirm1( id ){
        this.deleteDialog2 = true;
        this.appointmentid = id;
        console.log(this.appointmentid); 
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
        this.details.age = object.age;
        
        
      }

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
          disabled: false,
          href: '/appointmentlist'
        },
        
      ]
    },
    mounted(){
      // this.getrescheduledAppointment();
      // this.getfutureappointments();
      this.getBranch();
    }
    
  }
</script>