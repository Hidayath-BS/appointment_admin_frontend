<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
        
             
     <br>
        <v-card>
          <v-card-title>
            <v-layout>
              <v-flex>
                <h2>Admin Users List</h2>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex sm2>  
                <v-btn color="primary" to="/addusers">Add Users</v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="adminUsers"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td> {{ props.index+1 }} </td>
              <td> {{ props.item.username}} </td>
              <td> {{ props.item.mobilenumber}} </td>
              <td> {{ props.item.email}} </td>
              <td><v-btn color="primary" dark @click="forgot()">Change Password</v-btn></td>
              <td><v-btn depressed outline icon fab dark color="pink" small @click="deleteConfirm( props.item.id )">
                      <v-icon>delete</v-icon>
                    </v-btn></td>
            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
        <v-dialog v-model="deleteDialog1" width="500">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-title>
                  Are you Sure to delete this User ?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteUser( userid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
      </v-flex>
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
        userid:0,
        deleteDialog1:false,
        adminUsers:[],
        dialog1: false,
        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'User name', value: 'userName' },
          { text: 'Mobile Number', value: 'mobileNumber' },
          { text: 'Email', value: 'email' },
          { text: 'Forgot Password', value: 'ForgotPassword' },
          { text: 'Delete', value: 'delete' },
        ],

      }
    },
   
    
    methods: {
      forgot () {
      this.loading = true;
      setTimeout(() => {
        this.$router.push('/forgotPassword');
      }, 1000);
    },
      getUsers(){
        const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url=`${API_URL}/getUsers`;
     return axios.get(url,auth).then(response=>{
          this.adminUsers=response.data;
         console.log(response.data);
    })
      },

      //for deleting
        deleteUser(usersid){
        const url = `${API_URL}/deleteUsers`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "userId": usersid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getUsers();
          this.deleteDialog1 = false;
        } )
      },

      deleteConfirm( usersid ){
        this.deleteDialog1 = true;
        this.userid = usersid;
        console.log(this.userid); 
      }
      //for deleting end



       
    },
mounted () {
      this.getUsers();
    },
      created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Masters',
          disabled: false,
          href: ''
        },
        {
          text: 'Users List',
          disabled: false,
          href: '/user'
        },
        
        
      ]
    }
   
  
  }

  
</script>