<template>
    <v-layout row wrap>
         <v-flex xs12 sm12>
             
     <br>
        <v-card>
          <v-card-title>
            <h2>Answered Queries</h2>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="queryList"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td> {{ props.index +1 }} </td>
              <td> {{ props.item.queryDate }} - {{ props.item.queryTime }}  </td>
              <td> {{ props.item.conversation.patient.firstName }}  {{props.item.conversation.patient.lastName}}  </td>
              <td>
                {{ props.item.conversation.topic }} 
              </td>

              <td>

                <v-btn slot="activator" @click="answer( props.item.id )"  icon color="green" dark>
                  <v-icon>
                    assignment
                  </v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn slot="activator" @click="del( props.item.id )"  icon color="red" dark>
                  <v-icon>
                    delete
                  </v-icon>
                </v-btn>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-dialog v-model="deletedialog" max-width="400">
        <v-card>
          <v-card-title>
            <h2>Do You really want to delet ?</h2>
          </v-card-title>
          <v-card-actions>
            <v-flex>
              <v-btn color="primary" dark>
              NO
            </v-btn>
            <v-btn @click="deleteAction()" color="red" dark>
              Yes
            </v-btn>
            </v-flex>
          </v-card-actions>
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
        dialog1: false,
        deletedialog: false,
        headers: [
          { text: 'Sl.no',value: 'slno' },
          { text: 'Date-Time', value: 'date' },
          { text: 'Username', value: 'name' },
          { text: 'Conversation topic', value: 'Topic' },
          { text: 'Answer', value: 'Answer' },
          { text: 'Delete', value: 'Delete'},

        ],
        desserts:[
            {
                slno: 1,
                date: '14/03/2019',
                name: 'Nagashree',
            }
        ],
        queryList:[],
        deletid: ''
      }
    },
   
    mounted () {
      this.getQueryList();
    },
    methods: {
      getQueryList(){
        return apiService.getAnsweredQueries().then(response => {
          this.queryList = response.reverse();
          console.log(this.queryList);
        })
      },
      del( id ){
        this.deletedialog = true;
        this.deletid = id;
      },
      view( id ){
        this.$router.push('/queryDetails/'+id);
      },
      deleteAction( ){
        const auth = {
            headers: { Authorization: localStorage.getItem('token') },
        };
        const url = `${API_URL}/patientQueries/deletQuery/${this.deletid}`;
        return axios.put(url, '',auth).then(response => {
          if(response.status == 200){
            this.deletedialog = false;
            // alert("Delete Successfull");

            this.getQueryList();
          }else{
            this.deletedialog = false;
            alert("Something Went wrong");
          }
        })
      },
      answer(id){
        this.$router.push('answerQuery/'+id);
      },
    },
    computed: {
      
    },
    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Home',
          disabled: false,
          href: '/dashboard'
        },
        {
          text: 'Query',
          disabled: true,
          href: ''
        },
        {
          text: 'Answered Queries',
          disabled: false,
          href: '/answeredqueries'
        }
        
      ]
    }
  }
</script>