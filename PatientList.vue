<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex>
                <v-card>
                <v-card-title>
                    <h3>ONLINE PATIENTS</h3>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="patients"
                    >
                        <template slot="items" slot-scope="props">
                        <td>{{props.index+1}}</td>
                        <td>{{props.item.firstName}} {{ props.item.lastName }} </td>
                        <td>{{props.item.mobileNumber}}</td>
                        <td>{{props.item.email}}</td>
                        

                
            <td>
                <v-btn fab small color="red" dark @click="deleteDoctor( props.item.id )"> <v-icon>delete</v-icon> </v-btn>
            </td>
                        </template>
                    </v-data-table>  
                </v-card-text>
            </v-card>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>
<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

export default {
    data(){
        return{
            headers:[
                { text: 'Sl.no',value: 'slno' },
                { text: 'Full Name', value: 'branch name' },
                { text: 'Mobile Number', value: 'mobileNumber'},
                 { text: 'Email', value: 'email'},
                { text: 'Delete', value: 'delete'}
            ],
            patients: []
        }
    },
    methods:{
        getPatients(){
            return apiService.getAllPatientsList().then(response => {
                console.log(response);

                this.patients = response;
            })
        },
        deleteDoctor(id){
            const auth = {
                headers: { Authorization: localStorage.getItem('token') } 
            };
            const url = `${API_URL}/patient/deletePatient`;
            let data ={
                "patient":id
            }

            return axios.put(url, data, auth).then(response =>{
                console.log(response);
                if(response.status == 200){
                    alert("Success !!, Patient Deleted sucessfully");
                    this.getPatients();
                }else{
                    alert("Oops!!, Something went wrong");
                }
                
            })
        }
    },
    mounted(){
        this.getPatients();
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'dashboard'
        },
        {
          text: 'Online Patients',
          disabled: false,
          href:'/OnlinePatientList'
        }
      ]
    }    
}
</script>
<style>

</style>
