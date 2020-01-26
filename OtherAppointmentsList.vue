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
                                    <otherappointmentlist></otherappointmentlist>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <!-- end of tab 0 -->
                         <v-tab-item  key="1">
                            <v-card flat>
                                <v-card-text>
                                     <pendingOtherAppointments></pendingOtherAppointments>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <!-- end of tab 1 -->
                    </v-tabs-items>
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

import { otherappointmentlist } from "../pages/otherappointmentlist.vue";
import { pendingOtherAppointments } from "../pages/pendingOtherAppointments.vue";

  export default {
    components:{
      pendingOtherAppointments,
      otherappointmentlist
    },
    data () {
      return {
        tab: null,
      }
    },
   
    
    methods: {
      
  
    },
    mounted () {
      
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