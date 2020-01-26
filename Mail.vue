<template>
  <v-flex xs12 sm12>
      <h2>Send Mail</h2><br>
      <v-card>
      <v-card-text>
        <v-form 
      ref="form"
      v-model="valid"
      lazy-validation
      >
<v-layout row wrap>

   
            <v-flex xs6 offset-xs3>
            
           <v-subheader>To:</v-subheader>
            <v-text-field type="text" solo placeholder="User Name" :rules="rules.required" v-model="maildetails.emailId" readonly></v-text-field>
            </v-flex> 

      
            <v-flex xs6 offset-xs3>
                <v-subheader>
            Subject
            </v-subheader>
           
              <v-text-field type="text"  solo v-model="subject" :rules="rules.required"></v-text-field>
            
            </v-flex>
           
         
            <v-flex xs6 offset-xs3>
              <v-textarea type="text" v-model="text" label="Type here..." :rules="[rules.required, rules.cocontentRule]" solo></v-textarea>
            </v-flex>
            </v-layout>
       
 <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn round color="success" :disabled="!valid" @click="submitMail()">Submit</v-btn>
          <v-btn round color="error" to="/AppointmentOnlineList">Cancel</v-btn>
        </div>
      </v-flex>

        </v-layout>
        </v-form>
      </v-card-text>
      </v-card>
  </v-flex>
</template>
<script>
import {APIService} from '../APIService.js';
import axios from 'axios';
const apiService = new APIService();
const API_URL = apiService.serverurl;

  export default {
    data () {
      return {
        valid:true,
        subRules: [
                v => !!v || 'Subject is required',
            ],

        rules:{
          required:v => !!v || 'Content is required',
          contentRule: v=> (v && v.length >= 5) || 'Response Must be greater than atleast 5 characters'

        },
             mailRules: [
                v => !!v || 'Content is required',
            ],
       personnid:this.$route.params.personid,
       maildetails:{
        "emailId":'',
        "patientName":'',
       },
     emailId:'',
       subject:'',
       text:'',
       patientName:'',
      // patientName:maildetails.patientName,
        }
      },
      methods:{
         //get maildetails
      
      getMaill(personid){
       
        apiService.getMail(this.personnid).then((response)=>{
         this.maildetails.emailId = response.emailId;
         this.maildetails.patientName = response.patientName;
          console.log(response);
          
        });
      },
      submitMail(){
           if(this.$refs.form.validate()){
                console.log("Valid");
         let data ={
                    "emailId":this.maildetails.emailId,
                    "subject":this.subject,
                    "text":this.text,
                    "patientName":this.maildetails.patientName,
                    "appid":this.personnid
                   
                }
                 console.log(data);
      const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
        const url=`${API_URL}/submitmail`;
        return axios.post(url,data,auth).then(response=>{
          console.log(response.data);
         if(response.status==202){
           alert("Email Sent Successfully");
           this.$router.push("/AppointmentOnlineList");
         }
         else{
           alert("Something Wrong!");
         }
        },err=>{
                    alert("Something Went Wrong");
        })
            }
        }
    },
      mounted(){
        this.getMaill();
      }
    }

  
</script>