<template>
  <v-flex xs12 row>
		 
				 </v-flex>
</template>

<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;


  export default {
   
    data () {
      return {
			  e6: 1,
        search: '',
        applist: [],
        selected: [],
        
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
            text: 'Reshedule',
            align: 'left',
            sortable: false,
            value: 'edit'
          },
          {
            text: 'Delete',
            align: 'left',
            sortable: false,
            value: 'delete'
          },
          {
            text: 'Completed',
            align: 'left',
            sortable: false,
            value: 'completed'
          },
			],
		
      }
    },
   methods:{
     getPendingAppointmentList(){
       const auth={
          headers:{
            Authorization:localStorage.getItem('token')
          }
        }
        const url=`${API_URL}/masters/oterAppointmentsPending`;
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
            this.getAppointmentList();
          }
        })
    },
  },
    mounted(){
      this.getAppointmentList();
    },
    created: function(){
      this.$root.breadcrumbs = []
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
div:nth-child(2) > div.v-table__overflow > table > tbody > div:nth-child(n){
border-radius: 2px;
background: aliceblue;
    border-left-style:dotted;
    border-left-width: 4px;

    border-left-color:grey;
    padding:8px;
     margin:10px;


}

</style>