<template>
<v-container fluid>
    <v-flex lg12>
    <v-card>
        <v-card-title>
            ADD NEW SLOTS
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form 
            ref="form"
            v-model="validform"
            lazy-validation
            >
                <v-layout row wrap>
                    <v-flex sm4>
                                <v-menu
                                ref="menu1"
                                :close-on-content-click="false"
                                v-model="menu1"
                                :return-value.sync="date"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                class="fields"
                                >
                                <v-text-field
                                    slot="activator"
                                    v-model="date"
                                    label="Select Date"
                                    prepend-icon="event"
                                    :rules="[v => !!v || 'Please Select Appointment Date']"
                                    readonly
                                    class="fields"
                                ></v-text-field>
                                <v-date-picker  v-model="date" @change="getLiveSlotsDate(), filterOptions()" no-title scrollable>
                                    
                                    <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu1.save(date)">OK</v-btn>
                                </v-date-picker>
                                </v-menu>

                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex sm4>
                                <v-select
                                :items="branches"
                                label="Select Branch"
                                item-text="branchName"
                                item-value="id"
                                v-model="branch"
                                single-line
                                :rules="[v => !!v || 'Please Select Hospital Branch']"
                                class="fields"
                                @change="filterOptions()"
                                ></v-select>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex sm4>
                                <v-select
                                :items="doctors"
                                label="Select Doctor"
                                item-text="username"
                                item-value="id"
                                v-model="doctor"
                                single-line
                                :rules="[v => !!v || 'Please Select Doctor']"
                                class="fields"
                                @change="filterOptions()"
                                ></v-select>
                            </v-flex>
                </v-layout> 
                <v-divider></v-divider>
                <br>
                <v-layout row wrap>
                    <v-flex sm6 md6 lg6>
                        <v-card >
                            <div class="slot11">
                            <v-card-title>
                                CREATE NEW SLOTS
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-data-table
                                :headers="createSlotHeaders"
                                :items="emptyslots"
                                >
                                <template v-slot:items="props">
                                <td>
                                    <v-checkbox v-model="props.item.checkbox"></v-checkbox>
                                </td>
                                <td>{{ props.item.slotName }}</td>
                                <td>
                                    <v-radio-group row v-model="props.item.online" :disabled="props.item.checkbox != true" @change="changeLimit(props.index, props.item.online)">
                                    <v-radio value="ONLINE" color="green" label="online">
                                    </v-radio>
                                    <v-radio value="OFFLINE" color="primary" label="offline"></v-radio>
                                </v-radio-group>
                                </td>
                                <td>
                                    <v-text-field 
                                    label="limit" 
                                    type="number"
                                    class="fields"
                                    :disabled="props.item.checkbox != true"
                                    v-model="props.item.onlineLimit"
                                    ></v-text-field>
                                </td>
                                </template>
                                </v-data-table>

                            </v-card-text>                            
                            <v-card-action>
                                <center>
                                 <v-btn color="primary" :disabled="!validform" @click="submit()">SUBMIT</v-btn>
                                </center>
                            </v-card-action>
                            </div>
                        </v-card>
                    </v-flex>  
                     <v-spacer></v-spacer>
                    <v-flex sm6 md5 lg5 >
                        <v-card>
                            <div class="slot11">
                            <v-card-title>
                                CREATED SLOTS
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-data-table
                                :headers="createdheaders"
                                :items="createdSlots"
                                >
                                <template v-slot:items="props">
                                <!-- <td>{{ props.index +1 }}</td> -->
                                <td>{{ props.item.doctor.username }}</td>
                                <td>{{ props.item.branch.branchName }}</td>
                                
                                
                                <td class="text-xs-left">{{ props.item.slot.slotName }}
                                    <v-chip v-if="props.item.online" color="teal" text-color="white">
                                        <v-avatar>
                                            <v-icon>cloud_done</v-icon>
                                        </v-avatar>
                                        {{ props.item.onlinestat }}
                                    </v-chip>
                                    <v-chip v-else color="red" text-color="white">
                                        <v-avatar>
                                            <v-icon>cloud_off</v-icon>
                                        </v-avatar>
                                        {{ props.item.onlinestat }}
                                    </v-chip>
                                </td>

                                <td>
                                     <v-btn fab small color="red" dark @click="deleteSlot( props.item.id )"> <v-icon>delete</v-icon> </v-btn>
                                </td>
                                </template>
                                </v-data-table>
                            </v-card-text>
                            </div>
                        </v-card>                        
                    </v-flex>
                </v-layout>           
            </v-form>
            
        </v-card-text>
    </v-card>
    </v-flex>
    
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
            validform: true,
            menu1: false,
            date: new Date().toISOString().substring(0,10),
            branches:[],
            branch:null,
            doctors:[],
            doctor:null,
            createdSlotsDate:[],
            createdSlots:[],
            createdheaders:[
                // {
                //     text: 'Sl No',
                //     align: 'left',
                //     sortable: true,
                //     value: 'Sl No' 
                // },
                {
                    text: 'Doctor',
                    align: 'left',
                    sortable: true,
                    value: 'Doctor'
                },
                {
                    text: 'Branch',
                    align: 'left',
                    sortable: true,
                    value: 'Branch'
                },
                {
                    text: 'Slot Name',
                    align: 'left',
                    sortable: true,
                    value: 'Slot Name'
                },
                {
                    text: 'Delete',
                    align: 'left',
                    sortable: true,
                    value: 'delete'
                },
            ],
            createSlotHeaders: [
                {
                    text: 'Select',
                    align: 'left',
                    sortable: true,
                    value: 'Select'
                },
                {
                    text: 'Slot Name',
                    align: 'left',
                    sortable: true,
                    value: 'Slot Name'
                },
                {
                    text: 'Slot Type',
                    align: 'left',
                    sortable: true,
                    value: 'Slot Type'
                },
                {
                    text: 'Limit',
                    align: 'left',
                    sortable: true,
                    value: 'Limit Online'
                }
            ],
            emptyslots:[],
            checkedSlots:[]

        }
    },
    methods:{
        getBranches(){
            return apiService.getBranches().then((respone)=>{
                this.branches = respone;
                console.log(this.branches);
            })
        },
        getDoctors(){
            return apiService.getDoctors().then(response => {
                this.doctors = response;
                console.log(this.doctors);
            })
        },
        getLiveSlotsDate(){
            // get Slots for this date
            return apiService.getAllAvailableSlotsByBranch(this.date).then((response)=>{
                this.createdSlotsDate = response;
                console.log("Created Slots Of Date: ",this.createdSlotsDate);
                this.filterOptions();
            })
        },
        filterOptions(){
            // branch id
            let branch = this.branch;
            // doctor id
            let doctor = this.doctor;
            // branchwise slots
            let datewiseSlot = this.createdSlotsDate;
            let slots = [];
            if(branch != null && doctor !=null){
            // if both are not null 
            
            slots = datewiseSlot.filter(dslot => ((dslot.branch.id == branch) && (dslot.doctor.id  == doctor)));
            this.createdSlots = slots;
            console.log("Created Slots for Branch && Doctor:",this.createdSlots);
            

            }else{
                if(branch == null && doctor == null){
                    this.createdSlots = datewiseSlot;
                    console.log("Assigned Slots of Day: ", this.createdSlots);
                    
                }else{
                    if(branch == null && doctor != null){
                        slots = datewiseSlot.filter(dslot => dslot.doctor.id==doctor);
                        this.createdSlots = slots;
                        console.log("Created Slots for Doctor:",this.createdSlots);
                    }

                       if(doctor == null && branch != null){
                            slots = datewiseSlot.filter(dslot => dslot.branch.id==branch);
                            this.createdSlots = slots;
                            console.log("Created Slots for Branch:",this.createdSlots);
                        }

                }
                
                
                
            }
            
            
        },
        getTimeSlots(){
            return apiService.getTimeSlots().then((response)=>{
                let arr=[];
                arr = response;
                let arrlen = arr.length;

                for(let i=0; i< arrlen; i++){
                    arr[i].online = "OFFLINE";
                    arr[i].onlineLimit = 0;
                    arr[i].checkbox = false;
                }
                this.emptyslots = arr;
                console.log("EMPTY SLOTS: ",this.emptyslots);
                
            })
        },
        changeLimit(index, online){
            if(this.emptyslots[index].online == 'ONLINE'){
                this.emptyslots[index].onlineLimit = 4;
            }else{
                this.emptyslots[index].onlineLimit = 0;
            }
        },
        getOnlineStatus(status){
            if(status == 'ONLINE'){
                return 1;
            }else{
                return 0;
            }
        },
        submit(){
            
            if(this.$refs.form.validate()){
                let slots = this.emptyslots;
                let checkedSlots = slots.filter(sl => sl.checkbox == true);
                for(let i=0; i< checkedSlots.length; i++){
                    checkedSlots[i].onlinestatus = this.getOnlineStatus(checkedSlots[i].online);
                }
                const formdata = {
                    "date":this.date,
                    "branch": this.branch,
                    "doctor": this.doctor,
                    "slots": checkedSlots
                }
            console.log(formdata);
            
            let url = `${API_URL}/availableSlots/addNewAvailSlot`;
            
            const auth = {
                headers: { Authorization: localStorage.getItem('token') },
            };
            return axios.post(url, formdata, auth).then((response)=>{
                console.log(response);

                if(response.status == 200){
                    alert('Success!!, Slots were created successfully');
                    this.getLiveSlotsDate();
                    this.filterOptions();
                }else{
                    alert('Oops!!!, Something went wrong');
                }
                
            })
            }
        },

        deleteSlot(id){
            const auth = {
                headers: { Authorization: localStorage.getItem('token') } 
            };
            const url = `${API_URL}/availableSlots/deleteAvailableTimeSlot`;
            let data ={
                "slots":id
            }
            return axios.put(url, data, auth).then(response =>{
                console.log(response);
                if(response.status == 200){
                    alert("Slot deleted successfully");
                    this.getLiveSlotsDate();
                    this.filterOptions();
                }else{
                    alert("Oops!!, Something went wrong");
                }
                
            })
        }
    },
    mounted(){
        this.getBranches();
        this.getDoctors();
        this.getLiveSlotsDate();
        this.getTimeSlots();
        
    }
}
</script>
<style>
.fields{
    width: 90%;
}

.slot11{
    border: 1px solid darkblue;
}
</style>
