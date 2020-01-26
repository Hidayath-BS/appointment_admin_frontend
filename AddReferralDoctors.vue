<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex>
                <v-card>
                    <v-card-title>
                        <h3>ADD REFERRAL DOCTOR</h3>
                    </v-card-title>
                    <v-divider>
                    </v-divider>
                    <v-card-text>
                         <v-form 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            >
                        <v-layout row wrap>
                            
                            <v-flex xs12 sm5>
                                <v-select
                                :items="title"
                                label="Select Title"
                                item-text="titlename"
                                item-value="titlename"
                                v-model="titlename"
                                single-line
                                class="fields"
                                :rules="[v => !!v || 'Please Select Title']" required
                                ></v-select>
                            </v-flex>

                                <v-flex xs12 sm5 offset-sm1>
                                <v-text-field type="text" label="Enter Full Name" v-model="fullName" :rules="[v => !!v || 'Enter Full Name']" required></v-text-field>
                                </v-flex>

                                
                        
                        </v-layout>

                        <v-layout row wrap>
                                <v-flex xs12 sm5>
                                <v-text-field type="text" label="Hospital Name" v-model="hospitalName" :rules="[v => !!v || 'Enter Hospital Name']" required></v-text-field>
                                </v-flex>

                                <v-flex xs12 sm5 offset-sm1>
                                <v-text-field type="number" label="Mobile Number" v-model="mobileNumber" :rules="[v => !!v || 'Enter Mobile Number']" required></v-text-field>
                                </v-flex> 
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                            <v-spacer></v-spacer>
                            <v-flex sm3>
                                <v-btn :disabled="!valid" round color="success" @click="submit()">Submit</v-btn>
                                <v-btn round color="red" dark @click="reset()">CANCEL</v-btn>
    
                            </v-flex>
                            <v-spacer></v-spacer>
                        </v-layout>
                         </v-form>
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
            fullName: '',
            hospitalName: '',
            mobileNumber: '',
            titlename:'',
            title:[{
                id:1,
                titlename: "Mr."
                },{
                id:2,
                titlename: "Ms."
                },{
                id:3,
                titlename: "Mrs."
                },{
                id:4,
                titlename: "Dr."
                }],
                 valid:true,
         formRequest: null,
        displayError: false,
        }
    },
    methods: {

        reset () {
        this.$refs.form.reset()
      },

        submit(){
             if (this.$refs.form.validate()){
           this.valid = true;
                let request = {
                    "fullName": this.titlename + this.fullName,
                    "hospitalName": this.hospitalName,
                    "mobileNumber": this.mobileNumber
                }

                console.log(request);
                const auth = {
                    headers: { Authorization: localStorage.getItem('token') } 
                };
                const url = `${API_URL}/masters/addReferralDoctor`;
                return axios.post(url, request, auth).then((response)=> {
                    console.log(response);
                    if(response.status == 200){
                        alert('REFERRAL DOCTOR ADDED SUCCESSFULLY')
                        this.$router.push("/referralDoctorsList");
                    }else{
                        alert('Oops !!!, something went wrong');
                    }
                },err=>{
                    alert('Oops !!!, something went wrong');
                })
                
                
            }
        }
    }
}
</script>
<style>

</style>
