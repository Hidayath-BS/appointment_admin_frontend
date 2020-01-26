<template>

<v-container grid-list-xl fluid>

  <v-layout row wrap>
        <v-flex>
          <v-card>
      <v-card-text>
                 <v-tabs slot="extension" v-model="tab" color="primary" grow>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab key="0">
                          <div class="text-white">
                               OTHER APPOINTMENTS
                          </div>
                        </v-tab>

                        <v-tab key="1">
                          <div class="text-white">
                            PENDING APPOINTMENTS
                          </div>
                        </v-tab>
          
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item  key="0">
                           <v-card flat>
                                <v-card-text>
                                    
  <v-layout row wrap>
  <v-flex sm12 md12>
        <v-card>
          <v-layout row wrap>
            <v-flex sm8>
              <v-card-title>
            <h2>Other Appointments List</h2>
          </v-card-title>
            </v-flex>
             <v-flex sm4>
                  <v-btn color="primary" @click="add()">
                  <v-icon>add_circle</v-icon>
                  ADD OTHER APPOINTMENTS
                </v-btn>
                </v-flex>
          </v-layout>
          <v-divider></v-divider>
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
          
          <v-data-table 
            :headers="headers"
            :items="appointment"
            :search="search"  
          >

            <template slot="items" slot-scope="props" >
              <tr v-if="props.item.rescheduled==1" class="bgclr">
              <td > {{ props.index+1}}</td>
              <td > {{ props.item.appointmentDate}}</td>
              <td> {{ props.item.appointmentTime}}</td>
              <td> {{ props.item.patientName}}</td>
              <td>
                <v-btn  icon color="blue" dark @click="details( props.item )">
                <v-icon>list</v-icon>
              </v-btn>
            </td>

              <td>
                <v-btn  icon color="red" dark @click="deleteConfirm( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <td>
                <v-btn  icon color="blue" dark @click="reshedule( props.item.id )">
                <v-icon>info</v-icon>
              </v-btn>
            </td>
           <td>
        <v-switch :label="props.item.completed ? 'completed':'not completed'" @change="CompletePendingAppointment(props.item.id)" v-model="props.item.completed"></v-switch>
      </td>
            </tr>
               <tr v-else>
              <td > {{ props.index+1}}</td>
              <td> {{ props.item.appointmentDate}}</td>
              <td> {{ props.item.appointmentTime}}</td>
              <td> {{ props.item.patientName}}</td>
              <td>
                <v-btn icon  color="blue" dark @click="details(props.item)"><v-icon>list</v-icon></v-btn> 
      </td> 


              <td>
                <v-btn  icon color="red" dark @click="deleteConfirm( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <td>
                <v-btn  icon color="blue" dark @click="reshedule( props.item.id )">
                <v-icon>info</v-icon>
              </v-btn>
            </td>
            <td>
        <v-switch :disabled = "props.item.completed" :label="props.item.completed ? 'completed':'not completed'"  @change="CompletePendingAppointment(props.item.id)" v-model="props.item.completed"></v-switch>
      </td>
            </tr>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
          </v-card-text>
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
                  <v-btn color="danger" @click="deleteOtherAppointment( appointsid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <!-- end of tab 0 -->
                         <v-tab-item  key="1">
                            <v-card flat>
                                <v-card-text>
                                  <!-- pending appointments starts -->
                                  <v-layout py-3>
	   	<v-flex xs12>
	   			<v-card>
		   			<v-card-title>
				      <div class="title">Other Appointments</div>
				      <v-spacer></v-spacer>
				      <v-flex lg3 md3 xs3 offset-xs1>
                  <v-autocomplete
                  :items="branch"
                  label="Select Branch"
                  item-text="branchName"
                  item-value="id"
                  v-model="branchid"
                  @input="getPendingAppointmentList(branchid)"
                  ></v-autocomplete>
                </v-flex>
				    </v-card-title>
		   			<v-data-table 
            :headers="pendingheaders"
            :items="applist"
            :search="search"  
          >

            <template slot="items" slot-scope="props" >
              <tr>
              <td > {{ props.index+1}}</td>
              <td > {{ props.item.appointmentDate}}</td>
              <td> {{ props.item.appointmentTime}}</td>
              <td> {{ props.item.patientName}}</td>
              <td>
                <v-btn icon  color="blue" dark @click="details(props.item)"><v-icon>list</v-icon></v-btn>
              </td>


              <td>
                <v-btn  icon color="red" dark @click="deleteConfirm( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
            <td>
                <v-btn  icon color="blue" dark @click="reshedule( props.item.id )">
                <v-icon>info</v-icon>
              </v-btn>
            </td>
           <td>
        <v-switch :label="props.item.completed ? 'completed':'not completed'" @change="CompletePendingAppointment(props.item.id)" v-model="props.item.completed"></v-switch>
      </td>
            </tr>
              
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
				</v-card>	   	
			 	</v-flex>		
	   </v-layout>
     


                                     
                                  <!-- Pending appointments ends -->
                                </v-card-text>
                            </v-card>
                            <v-dialog v-model="deleteDialog1" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you Sure want to delete this appointment ?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteOtherAppointment( appointsid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
                        </v-tab-item>
                        <!-- end of tab 1 -->
                    </v-tabs-items>
      </v-card-text>
    </v-card>
        </v-flex>
        <v-layout>
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
            <v-flex xs4><h3>MRD Number:</h3></v-flex>
              
            <v-flex xs3><p> {{detail.MRDNumber}} </p></v-flex>
              
            <v-flex xs3><h3>Patient Name:</h3></v-flex>

            <v-flex xs3><p>{{ detail.patientName}} </p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Mobile Number:</h3></v-flex>

            <v-flex xs3><p> {{ detail.mobileNumber}} </p></v-flex>

            <v-flex xs3><h3>Email:</h3></v-flex>

            <v-flex xs3><p> {{ detail.email}} </p></v-flex>

          </v-layout>

          <v-layout row>
            <v-flex xs4><h3>Procedure Advised:</h3></v-flex>

            <v-flex xs3><p> {{ detail.procedure}}</p></v-flex>

            <v-flex xs3><h3>Age:</h3></v-flex>

            <v-flex xs3><p> {{ detail.age}} </p></v-flex>

          </v-layout>
          <v-layout>
            <v-flex xs4><h3>Remarks:</h3></v-flex>

            <v-flex xs7><p> {{ detail.remarks}}</p></v-flex>
          </v-layout>

          </v-card-text>
                
            </v-card>
      </v-dialog>
  </v-layout>
      </v-layout>
     

</v-container>

    
</template>
<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

  export default {
    name: 'otherappointmentlist',
    data () {
      return {
        tab: null,
        search: '',
        appointsid:0,
        dialog1: false, 
        dialog2: false,
        picker: null,
        date: new Date().toISOString().substring(0,10),
        name: new Date().toISOString().substring(0,10),
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
        deleteDialog1:false,
        // appointment list
        appointment:[],
        // pending list
        applist:[],
        selected: [],
        detail:{
          MRDNumber:"",
          patientName:"",
          mobileNumber:"",
          email:"",
          procedure:"",
          age:"",
          remarks:""

        },

        
        headers: [
          { text: 'Sl.no',value: 'slno',width:10 },
          { text: 'Date', value: 'date' },
          { text: 'Time', value: 'time' },
          { text: 'Patient Name', value: 'patient' },
          { text: 'Details', value: 'details' },
          { text: 'Delete', value: 'delete'},
          { text: 'Reschedule', value: 'reshedule'},
          {
            text: 'Completed',
            align: 'left',
            sortable: false,
            value: 'completed'
          },
        ],
        pendingheaders: [
         { text: 'Sl.No', value: 'Sl.No', align: 'left', },
					{
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name',
           
          },
          {
            text: 'Date',
            align: 'left',
            sortable: false,
            value: 'date'
          },
          {
            text: 'Time',
            align: 'left',
            sortable: false,
            value: 'time'
          },
           {
            text: 'Status',
            align: 'left',
            sortable: false,
            value: 'status'
          },
          {
            text: 'Delete',
            align: 'left',
            sortable: false,
            value: 'delete'
          },
          {
            text: 'Reshedule',
            align: 'left',
            sortable: false,
            value: 'edit'
          },
          
          {
            text: 'Completed',
            align: 'left',
            sortable: false, 
            value: 'completed'
          },
      ],
      
      branch:[],
        branchid:0,
      
        
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

      details(obj){
        this.dialog2 = true,
        this.detail.mobileNumber = obj.mobileNumber,
        this.detail.patientName = obj.patientName,
        this.detail.email = obj.email,
        this.detail.age = obj.age,
        this.detail.MRDNumber = obj.mrdNumber,
        this.detail.procedure = obj.procedure.procedures,
        this.detail.remarks = obj.remarks
      },
      

      getOtherAppointment(id){
     return apiService.getOtherAppointmentList(id).then(response=>{
       this.appointment = response;
       console.log(this.appointment);
     })
      },

      getSurgicalAppoint(date,id){
        return apiService.getSurgicalAppointments(date,id).then(response=>{
          this.appointment = response;
          console.log(this.appointment);
        })
      },
       getapp(id){
        console.log(id);
        if(this.date1 != null && id != 0){
        this.getSurgicalAppoint(this.date1,id)
        }
        else if(this.date1 == null && id != 0){
         this.getOtherAppointment(id)
         } 
        
      },

     

       getBranch(){
        return apiService.getBranches().then(response=>{
          this.branch = response;
          console.log(this.branch);
          
        })
      },
     
      // for deleting
        deleteOtherAppointment( appointmentid ){
        const url = `${API_URL}/deleteAppointment`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "appoint": appointmentid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getapp(this.branchid);
          this.deleteDialog1 = false;
        } )
      },
      //for deleting end
      deleteConfirm( appointmentid ){
        this.deleteDialog1 = true;
        this.appointsid = appointmentid;
        console.log(this.appointsid); 
      },

      add(){
          this.$router.push('/addotherappointments');
      },
    
      reshedule(id){
        this.$router.push('/Resheduleotherappointments/'+id)
      },


      getPendingAppointmentList(id){
       const auth={
          headers:{
            Authorization:localStorage.getItem('token')
          }
        }
        const url=`${API_URL}/masters/oterAppointmentsPending/${id}`;
        return axios.get(url,auth).then(response=>{
          this.applist = response.data;
          console.log(response.data);
        })
    },

    CompletePendingAppointment(id){
       const auth={
          headers:{
            Authorization:localStorage.getItem('token')
          }
          
        }
        const data={
            "cappointment":id
          }
        const url=`${API_URL}/masters/CompletedOtherAppointment`;
        return axios.put(url,data,auth).then(response=>{
          if(response.status==202){
            alert("Appointment Completed");
             this.getPendingAppointmentList(this.branchid);
          }
        })
    }

    },
    mounted () {
      // this.getOtherAppointment(this.date);
      // this.getPendingAppointmentList();
     
      this.getBranch();
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
    }
    
  }
</script>
<style scope="css">
/* table.v-table tbody td{
  background-color: blue;
} */
.bgclr{
   background-color: blue;
}
</style>
