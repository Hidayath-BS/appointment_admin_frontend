<template><v-layout>
  
    <v-layout row wrap>
         <v-flex xs12 sm12>
           <br>
     <v-card>
           <v-card-title>
            <h2>Appointments List</h2>
          </v-card-title>
        <v-card-text>
          <v-layout row wrap>
           <v-flex xs5>
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
                        <v-btn flat color="success" @click="$refs.menu.save(date1),getAppointment(date1),getResheduledAppointmentsOnDate(date1),menu=false">OK</v-btn>                                                
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
          <v-btn flat color="primary"  @click="$refs.menu1.save(month),getMonthwiseAppiontment(month),getMonthwiseReshudledAppiontment(month), menu1=false">OK</v-btn>
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
                      <v-date-picker v-model="dateFrom" @change="getInBetweenDatesAppointment(),getInBetweenDatesResheduledAppointment()" no-title scrollable>
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
                      <v-date-picker v-model="dateTo" @change="getInBetweenDatesAppointment(),getInBetweenDatesResheduledAppointment()" no-title scrollable>
                         <v-btn flat color="primary" @click="menu3 = false">Cancel</v-btn>
                        <v-btn flat color="success" @click="$refs.menu3.save(dateTo),menu3=false">OK</v-btn>                                                                        
                      </v-date-picker>
                    </v-menu>
                    </div>
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
              <td> {{ props.item.date}}</td>
              <td> {{ props.item.slot.slot.startTime}}</td>
              <td> {{ props.item.patientName}}</td>
              <td> {{ props.item.slot.doctor.username}}</td>
               <td><v-btn icon  color="blue" dark @click="Appointmentdetails(props.item)"><v-icon>list</v-icon></v-btn></td>

              <td>{{ props.item.completed}}</td>
            
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
      
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
            <v-btn color="error" @click="dialog1 = false" round>Close</v-btn>
          </v-card-actions>    
        </v-card>
        </v-dialog>    
              </td>
              
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no  results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout> 
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
        dialog1: false, 
        dialog2: false,
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
        deleteDialog2:false,
        deleteDialog1:false,
        remainderdialog:false,
        appointment:[],
        appointmentList:[],
        branch:[],
       
        headers: [
          { text: 'Sl.no',value: 'slno',width:10 },
          { text: 'Date', value: 'date' },
          { text: 'Time Slot', value: 'time' },
          { text: 'Patient Name', value: 'patient' },
          { text: 'Prefered doctor', value: 'doctor' },
          { text: 'Details', value: 'details' },
          { text: 'Status', value: 'status'},
          
        ],
        headers1: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Patient', value: 'patient' },
          { text: 'Doctor', value: 'doctor' },          
          { text: 'Resheduled Date', value: 'Resheduleddate' },
          { text: 'Details', value: 'Details' },          
          
        ],
        datetype: 'ONDATE',
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
datereview(reviewid){
  this.$router.push('/ReviewDate/' +reviewid);
},
 getAppointment(date){
   return apiService.getAppointments(date).then((response)=>{
      this.appointment = response;
       
      for(let i=0; i< this.appointment.length; i++){
        this.appointment[i].asthama = this.getBool(this.appointment[i].asthama);      
        this.appointment[i].diabetic = this.getBool(this.appointment[i].diabetic);
        this.appointment[i].bp = this.getBool(this.appointment[i].bp);
        this.appointment[i].cardiac = this.getBool(this.appointment[i].cardiac);
        this.appointment[i].eyeProblem = this.getBool(this.appointment[i].eyeProblem);
        this.appointment[i].eyeDrops = this.getBool(this.appointment[i].eyeDrops);
         if(this.appointment[i].appointmentType == 1){
          
          this.appointment[i].appointmentType = "Online";
        }
         else if(this.appointment[i].appointmentType == 2){
            this.appointment[i].appointmentType = "Walkin";
           }
            else if(this.appointment[i].appointmentType == 3){
            this.appointment[i].appointmentType = "Telephonic";
        }
        this.appointment[i].completed = this.getStatus(this.appointment[i].completed);
   }
    console.log(response);
  })
},

  getMonthwiseAppiontment(date){
       return apiService.getMonthwiseAppointments(date).then((response)=>{
      this.appointment = response;
      
         for(let i=0; i< this.appointment.length; i++){
        this.appointment[i].asthama = this.getBool(this.appointment[i].asthama);      
        this.appointment[i].diabetic = this.getBool(this.appointment[i].diabetic);
        this.appointment[i].bp = this.getBool(this.appointment[i].bp);
        this.appointment[i].cardiac = this.getBool(this.appointment[i].cardiac);
        this.appointment[i].eyeProblem = this.getBool(this.appointment[i].eyeProblem);
        this.appointment[i].eyeDrops = this.getBool(this.appointment[i].eyeDrops);
         if(this.appointment[i].appointmentType == 1){
          
          this.appointment[i].appointmentType = "Online";
        }
         else if(this.appointment[i].appointmentType == 2){
            this.appointment[i].appointmentType = "Walkin";
           }
            else if(this.appointment[i].appointmentType == 3){
            this.appointment[i].appointmentType = "Telephonic";
        }
        this.appointment[i].completed = this.getStatus(this.appointment[i].completed);

      }
         console.log(response);
       })
      },
      getfutureappointments(){
  return apiService.getFutureAppointments().then((response)=>{
    this.appointment = response;
  for(let i=0; i< this.appointment.length; i++){
        this.appointment[i].asthama = this.getBool(this.appointment[i].asthama);      
        this.appointment[i].diabetic = this.getBool(this.appointment[i].diabetic);
        this.appointment[i].bp = this.getBool(this.appointment[i].bp);
        this.appointment[i].cardiac = this.getBool(this.appointment[i].cardiac);
        this.appointment[i].eyeProblem = this.getBool(this.appointment[i].eyeProblem);
        this.appointment[i].eyeDrops = this.getBool(this.appointment[i].eyeDrops);
         if(this.appointment[i].appointmentType == 1){
          
          this.appointment[i].appointmentType = "Online";
        }
         else if(this.appointment[i].appointmentType == 2){
            this.appointment[i].appointmentType = "Walkin";
           }
            else if(this.appointment[i].appointmentType == 3){
            this.appointment[i].appointmentType = "Telephonic";
        }
        this.appointment[i].completed = this.getStatus(this.appointment[i].completed);
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
          const url=`${API_URL}/getBetweenDateAppiontment`;
        
        if(this.dateFrom != null && this.dateTo != null){

          return axios.post(url,data,auth).then((response)=>{

       if(response.status == 200){
       this.appointment = response.data;
       for(let i=0; i< this.appointment.length; i++){
        this.appointment[i].asthama = this.getBool(this.appointment[i].asthama);      
        this.appointment[i].diabetic = this.getBool(this.appointment[i].diabetic);
        this.appointment[i].bp = this.getBool(this.appointment[i].bp);
        this.appointment[i].cardiac = this.getBool(this.appointment[i].cardiac);
        this.appointment[i].eyeProblem = this.getBool(this.appointment[i].eyeProblem);
        this.appointment[i].eyeDrops = this.getBool(this.appointment[i].eyeDrops);
         if(this.appointment[i].appointmentType == 1){
          
          this.appointment[i].appointmentType = "Online";
        }
         else if(this.appointment[i].appointmentType == 2){
            this.appointment[i].appointmentType = "Walkin";
           }
            else if(this.appointment[i].appointmentType == 3){
            this.appointment[i].appointmentType = "Telephonic";
        }
         this.appointment[i].completed = this.getStatus(this.appointment[i].completed);
        

      }
       }else{
         alert("please reselect the date");
       }
       console.log(response.data);
     })
      }
        
     
      },

      getBool(value){
        if(value == true){
          return "Yes";
        }else{
          return "No" ;
        }
      },

      getStatus(value){
        if(value == true){
          return "Completed";
        }else{
          return "Not Completed" ;
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
          this.getAppointment();
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

      getResheduledAppointmentsOnDate(date){
  return apiService.getResheduledAppointmentsOnDate(date).then(response=>{
    this.appointmentList =response;
    console.log(this.appointmentList);
     
  })
},
getrescheduledAppointment(){
          return apiService.getrescheduledAppointment().then(response=>{
              this.appointmentList = response;
              console.log(this.appointmentList);
              
          })
      },
      getBranch(){
        return apiService.getBranches().then(response=>{
          this.branch = response;
          console.log(this.branch);
          
        })
      },
  getMonthwiseReshudledAppiontment(date){
       return apiService.getMonthwiseReshudledAppiontment(date).then((response)=>{
      this.appointmentList = response;
      console.log(this.appointmentList);
      
       })
      },
  getInBetweenDatesResheduledAppointment(){
        const auth={
            headers:{
              Authorization:localStorage.getItem('token')
            }
          }
          const data={
            "FromDate":this.dateFrom,
            "ToDate":this.dateTo
          }
          const url=`${API_URL}/masters/getInBetweenDatesResheduledAppointment`;
        
        if(this.dateFrom != null && this.dateTo != null){

          return axios.post(url,data,auth).then((response)=>{

       if(response.status == 200){
       this.appointmentList = response.data;
       }else{
         alert("please reselect the date");
       }
       console.log(response.data);
     })
      }
        
     
      },
       deleteExpenselType(id){
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
          this.getrescheduledAppointment();
          this.deleteDialog2 = false;
        } )
      },

      deleteConfirm1( id ){
        this.deleteDialog2 = true;
        this.appointmentid = id;
        console.log(this.appointmentid); 
      } ,
      
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
      this.getrescheduledAppointment();
      this.getfutureappointments();
      this.getBranch();
    }
    
  }
</script>