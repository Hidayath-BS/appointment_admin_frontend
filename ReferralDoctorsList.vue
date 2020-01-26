<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex>
                <v-card>
            <v-card-title>
              <v-layout row wrap>
                <v-flex>
                  <h2>REFERRAL DOCTORS LIST</h2>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex sm3>
                <v-btn color="info" dark align-end to="/AddReferralDoctors">ADD REFERRAL DOCTORS</v-btn>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-data-table
            :headers="headers"
            :items="referralDoctors"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{props.index+1}}</td>
              <td>{{props.item.fullName}}</td>
              <td>{{props.item.hospitalName}}</td>
              <td>{{props.item.mobileNumber}}</td>
            

      
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
            referralDoctors: [],
            headers: [
                { text: 'Sl.no',value: 'slno' },
                { text: 'Full Name', value: 'branch name' },
                { text: 'Hospital Name', value: 'hospital name'},
                { text: 'Mobile Number', value: 'delete'},
                { text: 'Delete', value: 'delete'}
                ],
        }
    },
    methods:{
        getReferralDoctors(){
            return apiService.getrefferalDoctors().then(response => {
                this.referralDoctors = response;
                console.log(response);
            })
        },
        deleteDoctor(id){
            const url = `${API_URL}/masters/deleteReferralDoctor`;
            const auth = {
                    headers: { Authorization: localStorage.getItem('token') } 
            };
            let request = {
                "doctor": id
            }
            
            return axios.put(url, request, auth).then((response)=>{
                console.log(response);
                if(response.status == 200){
                    alert('SUCCESS!!!, REFERRAL DOCTOR DELETED');
                    this.getReferralDoctors();
                }else{
                    alert('Oops!!!, Something went wrong');
                }
            },err=>{
                alert('Oops!!!, Something went wrong');
            })
        }
    },
    mounted(){
        this.getReferralDoctors();
    }
}
</script>
<style>

</style>
