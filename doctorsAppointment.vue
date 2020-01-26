<template>
  <v-flex xs12 mb-4>
   
    <v-layout row wrap py-3>
   
      <div class="title my-4 px-5">Appointment List</div>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-card-title>
           <v-flex xs12 sm3 md3>
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
            :items="users"
            :search="search">
            <template slot="items" slot-scope="props">
          
           <td class="text-xs-right">{{props.index+1}}</td>
            <td class="text-xs-right">{{props.item.firstname}} {{props.item.lastname}}</td>
              <td class="text-xs-right">{{props.item.mobilenumber}}</td>
              <td class="text-xs-right">{{props.item.	aadhar_no}}</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
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
    },

    computed: {
    }
  }
</script>