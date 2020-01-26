<template>
  <v-flex xs12 mb-4>
   
    <v-layout row wrap py-3>
   
      <div class="title my-4 px-5">Appointment List</div>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-card-title>
              
              <v-flex xs3>
          <v-subheader>Select Date</v-subheader>
        </v-flex>
           <v-flex xs4 >
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
             <v-flex xs5></v-flex>
        <v-flex xs3>
          <v-subheader>Select Doctor</v-subheader>
        </v-flex>
        <v-flex xs4>
          <v-select
            :items="items"
            v-model="e2"
            label="Select"
            class="input-group--focused"
            item-value="text"
            @input="onlineSlot"
          ></v-select>
        </v-flex>
           <v-flex xs5></v-flex> 
           <div id="timeSlot" style="display:none">
                               
                   <v-layout row wrap>
                      
                       <v-flex xs2 style="padding-left:15px;padding-bottom:15px;">
                   <v-card>
                       <v-card-text>
                           <v-text-field type="number" id="noOfPatients" v-model="PatientCount" label="Patients Count"></v-text-field>
                           <label>10.00AM to 11.00AM</label><br/>
                           <input type="checkbox" id="checkbox" v-model="checked">
                       </v-card-text>
                   </v-card>
                       </v-flex>
                       <v-flex xs2 style="padding-left:15px;padding-bottom:15px;">
                   <v-card>
                       <v-card-text>
                           <v-text-field type="number" id="noOfPatients" v-model="PatientCount" label="Patients Count"></v-text-field>                          
                           <label>11.00AM to 12.00AM</label><br/>
                           <input type="checkbox" id="checkbox" v-model="checked">
                       </v-card-text>
                   </v-card>
                       </v-flex>
                       <v-flex xs2 style="padding-left:15px;padding-bottom:15px;">
                   <v-card>
                       <v-card-text>
                           <v-text-field type="number" id="noOfPatients" v-model="PatientCount" label="Patients Count"></v-text-field>
                           <label>12.00AM to 1.00AM</label><br/>
                           <input type="checkbox" id="checkbox" v-model="checked">
                       </v-card-text>
                   </v-card>
                       </v-flex>
                       <v-flex xs2 style="padding-left:15px;padding-bottom:15px;">
                   <v-card>
                       <v-card-text>
                           <v-text-field type="number" id="noOfPatients" v-model="PatientCount" label="Patients Count"></v-text-field>                           
                           <label>1.00PM to 02.00PM</label><br/>
                           <input type="checkbox" id="checkbox" v-model="checked">                           
                           
                       </v-card-text>
                   </v-card>
                       </v-flex>
                       <v-flex xs2 style="padding-left:15px;padding-bottom:15px;">
                   <v-card>
                       <v-card-text>
                           <v-text-field type="number" id="noOfPatients" v-model="PatientCount" label="Patients Count"></v-text-field>                           
                           <label>02.00PM to 03.00PM</label><br/>
                           <input type="checkbox" id="checkbox" v-model="checked">
                           
                       </v-card-text>
                   </v-card>
                       </v-flex>
                       <v-flex xs2 style="padding-left:15px;padding-bottom:15px;">
                   <v-card>
                       <v-card-text>
                           <v-text-field type="number" id="noOfPatients" v-model="PatientCount" label="Patients Count"></v-text-field>                           
                           <label>03.00PM to 04.00PM</label><br/>
                           <input type="checkbox" id="checkbox" v-model="checked">
                           
                       </v-card-text>
                   </v-card>
                       </v-flex>
                       <v-flex xs2 style="padding-left:15px;padding-bottom:15px;">
                   <v-card>
                       <v-card-text>
                           <v-text-field type="number" id="noOfPatients" v-model="PatientCount" label="Patients Count"></v-text-field>                           
                          <label>04.00PM to 05.00PM</label><br/>
                           <input type="checkbox" id="checkbox" v-model="checked">
                       </v-card-text>
                   </v-card>
                       </v-flex>
                       <v-flex xs2 style="padding-left:15px;padding-bottom:15px;">
                   <v-card>
                       <v-card-text>
                           <v-text-field type="number" id="noOfPatients" v-model="PatientCount" label="Patients Count"></v-text-field>                           
                           <label>05.00PM to 06.00PM</label><br/>
                           <input type="checkbox" id="checkbox" v-model="checked" label="05.00PM to 06.00PM">
                       </v-card-text>
                   </v-card>
                       </v-flex>                                                                                                                                                                                       
                   </v-layout>                 
                 </div>      
                 <v-flex xs4>
                     <div class="form-btn">
            <v-btn outline @click="submit" color="success">Submit</v-btn>
            <v-btn outline @click="clear" color="error">Clear</v-btn>
        </div>
                 </v-flex>      
          </v-card-title>
          
        </v-card>
      </v-flex>



     </v-layout>
  </v-flex>
</template>  
<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

  export default {
    name: 'DataTables',
    data () {
      return {
        dialog: false,
        users:[],
        menu:false,
        search: '',
          
        headers: [
          { text: 'Sl No', value: ''},
          { text: 'Name', value: '' },
          { text: 'Date', value: '' },
          { text: 'Time', value: '' },
        ],
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' }
        ],
        totalDesserts: 0,
        desserts1: [],
        loading: true,
        pagination: {},
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        desserts2: [],
     
        editedIndex: -1,
        
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.desserts1 = data.items
              this.totalDesserts = data.total
            })
        },
        deep: true
      },
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.initialize()
      this.$root.breadcrumbs = [
        {
          text: 'Appointment List',
          disabled: false,
          href: '/doctorsAppointment'
        },
        {
          text: 'Data Tables',
          disabled: true
        }
      ]
    },
    mounted () {
      this.getusers();
      this.getDataFromApi()
        .then(data => {
          this.desserts1 = data.items
          this.totalDesserts = data.total
        })
         
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination

          let items = this.getDesserts()
          const total = items.length

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage,  page * rowsPerPage)
          }

          setTimeout(() => {
            this.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      onlineSlot(){
          document.getElementById('timeSlot').style.display='block';
      }
    },

    computed: {
    }
  }
</script>