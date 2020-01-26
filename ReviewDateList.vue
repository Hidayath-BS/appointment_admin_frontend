<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
     <br>
     
  


        <v-card>
          <v-card-title>
            <v-layout row wrap>
           
                <v-flex>
                  <h2>Review Date List</h2>
                </v-flex>
                <v-spacer></v-spacer>
              </v-layout>
          </v-card-title>
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
            :items="reviewlist"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td> {{ props.index+1}}</td>
              <td>{{props.item.reviewDate}}</td>
              <td>{{props.item.appointment.patientName}}</td>
              <td>{{props.item.appointment.contactNumber}}</td>

              <td>
                        <v-switch
                          :label="props.item.completed ? 'completed': 'not completed'"
                          v-model="props.item.completed"
                          @change="statusChange( props.item.id, props.item.completed )"
                        ></v-switch>
              </td>
             
              <td><v-btn icon color="primary" dark @click="reviewApp(props.item.appointment.id)">
                <i class="material-icons">launch</i>
                </v-btn>
                </td>
  
            <td>
                <v-btn  icon color="red" dark @click="deleteConfirm( props.item.id )">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
        
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
                  Are you sure want to delete this Date?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteDialog1 = false">Cancel</v-btn>
                  <v-btn color="danger" @click="deleteReviewDate( rvid )">Yes </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
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
       reviewlist:[],
     
        dialog1: false, 
        dialog2: false,
        picker: null,
        date: new Date().toISOString().substring(0,10),
        reviewDate: new Date().toISOString().substring(0,10),
        name: new Date().toISOString().substring(0,10),
        date1: null,
        menu: false,
        menu1: false,
        modal: false,
        rvid:0,
        deleteDialog1:false,
        reviewDialog2:false,
        headers: [
          { text: 'Sl.no',value: 'slno',width:10 },
          { text: 'Review Date', value: 'date' },
          { text: 'Patient Name', value: 'Patient Name'},
          { text: 'Contact Information', value: 'Contact information'},
          { text: 'Status', value: 'status'},
          { text: 'Book Appointment', value: 'Book Appointment'},
          { text: 'Delete', value: 'delete'},
        
        ],
        branch:[],
        branchid:0,
        
      }
    },
   
    methods: {
      statusChange( id, completed ){
        const url = `${API_URL}/CompletedReviewDate`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "reviewss": id,
          "status":completed
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          if(response.status == 202){
            alert('Status Changed Successfully');
            this.getReviewDate();
          }else{s
            alert('Oops !!!, Something went wrong');
          }
        }) 
      },

      getFutureReviewDate(id){
          return apiService.getfutureReviewBranchWise(id).then(response=>{
            this.reviewlist = response;
            console.log(this.reviewlist);
            
          })
      },

      getReviewDate(date,id){
        return apiService.getReviewBranchWise(date,id).then(response=>{
          this.reviewlist = response;
          console.log(this.reviewlist);
        })
      },

      getapp(id){
        console.log(id);
        if(this.date1 != null && id != 0){
        this.getReviewDate(this.date1,id)
        }
        else if(this.date1 == null && id != 0){
         this.getFutureReviewDate(id)
         } 
        
      },
      //for deleting
        deleteReviewDate( reviewid ){
        const url = `${API_URL}/deleteReviewDate`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "reviewss": reviewid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getReviewDate();
         
       
    
          this.deleteDialog1 = false;
        } )
      },
      //for deleting end
      deleteConfirm( reviewid ){
        this.deleteDialog1 = true;
        this.rvid = reviewid;
        console.log(this.rvid); 
      },

     //for deleting
        ReviewCom( reviewid ){
        const url = `${API_URL}/CompletedReviewDate`;
        const auth ={
            headers: {Authorization:localStorage.getItem('token')} 
        }

        const data ={
          "reviewss": reviewid
        }
        return axios.put(url , data , auth).then( response =>{
          console.log(response);
          this.getReviewDate();
            this.reviewDialog2 = false;
        } )
      },
      //for deleting end
      reviewCompleted( reviewid ){
        this.reviewDialog2 = true;
        this.rvid = reviewid;
        console.log(this.rvid); 
      },

      reviewApp(appId){
        this.$router.push('/reviewAppointents/'+appId);
      },

       getBranch(){
        return apiService.getBranches().then(response=>{
          this.branch = response;
          console.log(this.branch);
          
        })
      },
     
    },

    mounted () {
 
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
          text: 'Review Date List',
          disabled: false,
          href: '/ReviewDateList'
        },
        
      ]
    }
    
  }
</script>
