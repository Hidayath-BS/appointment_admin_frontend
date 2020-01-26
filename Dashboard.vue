<template>
  <v-container grid-list-xl fluid>
      <v-layout>
          <v-flex lg3 sm12>
              <v-card>
                  <v-card-text><p><h3>Todays Appointment</h3>
                  <br/><h4>{{this.appointmentscount}}</h4></v-card-text>
              </v-card>
          </v-flex>
          <v-flex lg3 sm12>
              <v-card>
                  <v-card-text><p><h3>Total No of Doctors</h3>
                  <br/><h4>{{this.doctorcount}}</h4></v-card-text>
              </v-card>
          </v-flex>
          <v-flex lg3 sm12>
              <v-card>
                  <v-card-text><p><h3>Total No of Patients</h3>
                  <br/><h4>{{this.patientcount}}</h4></v-card-text>
              </v-card>
          </v-flex>
          <v-flex lg3 sm12>
              <v-card>
                  <v-card-text><p><h3>Total No of services</h3>
                  <br/><h4>{{this.servicecount}}</h4></v-card-text>
              </v-card>
          </v-flex>                              
      </v-layout>
	<v-layout py-3>
	   		<v-flex xs12>
	   			<v-card>
		   			<v-card-title>
				      <div class="title">Appointment Table</div>
				      <v-spacer></v-spacer>
				      <v-text-field
				        v-model="search"
				        append-icon="search"
				        label="Search"
				        single-line
				        hide-details
				      ></v-text-field>
				    </v-card-title>
		   			<v-data-table
					    :headers="headers"
					    :loading="true"
					    :items="appointmentsList"
					    :search="search"
					    v-model="selected"
					    item-key="name"
					    
					  >
					    <template slot="headerCell" slot-scope="props">
					      <v-tooltip bottom>
					        <span slot="activator">
					          {{ props.header.text }}
					        </span>
					        <span>
					          {{ props.header.text }}
					        </span> 
					      </v-tooltip>
					    </template>
					    <template slot="items" slot-scope="props">
					      <td>
					        {{props.index+1}}
					      </td>
					      <td>{{ props.item.patientName }}</td>
					      <td class="text-xs-left">{{ props.item.date }}</td>
					      <td class="text-xs-left">{{ props.item.slot.slot.slotName }}</td>
                <td class="text-xs-left"> {{ props.item.slot.doctor.username }} </td>
					      <td class="text-xs-left"> {{ props.item.onlinestat }} </td>
                <td class="text-xs-right"><v-btn slot="activator" fab small @click="reschedule(props.item.id)" color="blue" dark><v-icon white>edit</v-icon></v-btn></td>	
								

								<td>
                <v-btn fab small color="red" @click="deleteConfirm( props.item.id )" dark>
                <v-icon>delete</v-icon>
              </v-btn>
            </td>					
					    </template>
					  </v-data-table>
				</v-card>	   	
			 	</v-flex>		
	   </v-layout>		 

       <v-dialog v-model="deleteDialog1" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you Sure to delete this Product ?
                </v-card-title> 
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteAppointment( appointmentid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>

  </v-container>
</template>

<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

  export default {
    name: 'Dashboard',
    data () {
      return {
        e6: 1,
        search: '',
        selected: [],
        doctorcount:0,
        patientcount:0,
        appointmentscount:0,
        servicecount:0,
        appointmentsList:[],
        dialog1:false,
        headers: [
				 { text: 'Sl.No', value: 'Sl.No', align: 'left', },
				 {text: 'Patient Name', align: 'left', sortable: false,value: 'name'},
                 { text: 'Date', value: 'Date' ,align: 'left',},
                 { text: 'Time', value: 'Time',align: 'left', },
                 { text: 'Doctor', value: 'Doctor',align: 'left', },
                 { text: 'Status', value: 'status',align: 'left', },
                 { text: 'Reshedule', value: 'Edit',align: 'left', },          
                 { text: 'Delete', value: 'Delete',align: 'left', }
        ],
        deleteDialog1: false,
        date: new Date().toISOString().substring(0,10)
      }
    },
    created: function(){
      this.$root.breadcrumbs = []
    },
    methods:{
        getdoctorcount(){
            const auth = {
            headers: {
            Authorization:localStorage.getItem('token')
            }
          }
          const url=`${API_URL}/doctorsCount`;
          return axios.get(url,auth).then( (response) =>{
              this.doctorcount = response.data;
              console.log("doctor"+this.doctorcount);
            });
        },
        getpatientcount(){
            const auth = {
            headers: {
            Authorization:localStorage.getItem('token')
            }
          }
          const url=`${API_URL}/patientsCount`;
          return axios.get(url,auth).then( (response) =>{
              this.patientcount = response.data;
              console.log("patient"+this.patientcount);
            });
        },
        getappointmentscount(){
            const auth = {
            headers: {
            Authorization:localStorage.getItem('token')
            }
          }
          const url=`${API_URL}/todaysAppointmentCount`;
          return axios.get(url,auth).then( (response) =>{
              this.appointmentscount = response.data;
              console.log("appointment"+this.appointmentscount);
            });
        },
        getservicecount(){
            const auth = {
            headers: {
            Authorization:localStorage.getItem('token')
            }
          }
          const url=`${API_URL}/serviceCount`;
          return axios.get(url,auth).then( (response) =>{
              this.servicecount = response.data;
              console.log("service"+this.servicecount);
            });
        },
        getappointmentList(){
            const auth = {
            headers: {
            Authorization:localStorage.getItem('token')
            }
          }
          const url=`${API_URL}/getAppointment/${this.date}`;
          return axios.get(url,auth).then( (response) =>{
              this.appointmentsList = response.data;

              this.sortList();


              console.log(response.data);
              for(let i=0; i< this.appointmentsList.length; i++){
                this.appointmentsList[i].onlinestat = this.getAppointmentType(this.appointmentsList[i].appointmentType);
              }
            });
        },

        sortList(){
          return this.appointmentsList.sort(function(a,b){
            return b.id - a.id;
          })
          },
        getAppointmentType(value){
        if(value == 1){
          return "ONLINE";
        }else{
          if(value == 2){
            return "WALKIN";
          }else{
            return "TELEPHONIC";
          }
        }
      },
      reschedule(id){
        this.$router.push("/Reshedule/"+id);
      },
      deleteAppointment(id){
        const url = `${API_URL}/cancelAppointment`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "appointments": id
        }
        console.log(id);
        
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getappointmentList();
          this.deleteDialog1 = false;
        } )
      },

      deleteConfirm( id ){
        this.deleteDialog1 = true;
        this.appointmentid = id;
        console.log(this.appointmentid); 
      },

    },
    mounted(){
        this.getappointmentscount();
        this.getservicecount();
        this.getdoctorcount();
        this.getpatientcount();
        this.getappointmentList();
    }
  }
</script>
<style>
.v-carousel{
	height: 160px;
}
.v-window__container{
	height: 160px;
}
</style>

