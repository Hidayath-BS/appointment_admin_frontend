<template>
  <v-flex xs12 sm12>
      <h2>Add Billing Type</h2><br>
      <v-card>
      <v-card-text>
    <v-form ref="form"
      v-model="valid"
      lazy-validation>
    <v-layout row>
        <v-subheader>Billing Type:</v-subheader>
            <v-flex xs12 sm3 offset-sm1>
              <v-text-field type="text" label="Enter Billing Type Name" v-model="billingtype" 
              :rules="[v => !!v || 'Please Enter Branch Name']" required></v-text-field>
            </v-flex> 
      
     </v-layout>
  <v-layout>
            <v-flex xs12 sm8 offset-sm2>
        <div class="text-xs-center">
          <v-btn :loading="loading" :disabled="!valid" round color="success" @click="addbilling(),loader = 'loading'">Submit</v-btn>
          <v-btn round color="error">Cancel</v-btn>
        </div>
      </v-flex>

        </v-layout>
        </v-form>
      </v-card-text>
      </v-card>
  </v-flex>
</template>
<script>

  export default {
    name: 'DatePickers',
    
    data () {
      return {
        picker: null,
        date: null,
        menu: false,
        modal: false,
        dialog1: false,
        branchName:'',
        loader: null,
        loading: false,
        valid:true,
         formRequest: null,
        displayError: false,
        
      }
    },

    methods: {


       addbilling(){
 

         }  
    },
  

    created: function(){
      this.$root.breadcrumbs = [
        {
          text: 'Masters',
          disabled: false,
          href: ''
        },
        {
          text: 'Billing',
          disabled: false,
          href: '/Billing'
        },
        {
          text: 'Add Billing Type',
          disabled: false,
          href:'/AddBilling'
        }
      ]
    }

    
  }
</script>