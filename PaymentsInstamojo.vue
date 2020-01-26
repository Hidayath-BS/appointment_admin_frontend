<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex>
                <v-card>
                    <v-card-title text-center>
                        <v-btn color="primary" small fab round :disabled="page <= 1" @click="prev()">
                            <v-icon>keyboard_arrow_left</v-icon>
                        </v-btn>
                        <v-btn color="primary" small fab round @click="next()" :disabled="payments.length ==0">
                            <v-icon>keyboard_arrow_right</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-crad-text>
                        
                <v-data-table
                :headers="headers"
                :items="payments"
                class="elevation-1"
                hide-actions>

                <template v-slot:items="props">
                    <td> {{ props.index+1}}</td>
                    <td> {{ props.item.name}} - {{ props.item.email}}</td>
                    <td> {{ props.item.createdAt}}</td>
                    <td> {{ props.item.amount}} {{ props.item.currency}} </td>
                    <td> 
                        <div v-for="(payment, i) of props.item.payments" :key="i">
                            <p>{{ payment.id }} - {{ payment.status }}</p>
                        </div>
                    </td>
                    
                    
                </template>

                </v-data-table>
                    </v-crad-text>
                    
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
            page: 1,
            payments: [],
            pageMaxCount: 0,
            headers:[
                        { text: 'Sl.no',value: 'slno' },
                        { text: 'Patient Name', value: 'Patient Name'},
                        { text: 'Payment Date', value: 'Date' },
                        { text: 'Amount', value: 'Amount' },
                        { text: 'Payment Id', value: 'Payment Id' },
                        
                        
                    ]
        }
    },
    methods:{
        getAllPayments(){
            return apiService.getAllPayments(this.page).then(response => {
                let payments = response;

                if(Array.isArray(payments)){
                    this.payments = response.reverse();
                    console.log(this.payments);
                }else{
                    this.payments = [];
                }
                
                
            })
        },
        getPageCount(){
            return apiService.getPayMentPageCount().then(response => {
                console.log(response);
                let count = response.count;
                let page = count / 500;
                this.pageMaxCount = page +1;
                
            })
        },
        next(){
            this.page= this.page+1;
            this.getAllPayments();
        },
        prev(){
            this.page = this.page -1;
            this.getAllPayments();
        }
    },
    mounted(){
        this.getAllPayments();
        this.getPageCount();
        this.page = this.pageMaxCount;
    }
}
</script>
<style>

</style>
