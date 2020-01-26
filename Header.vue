<template>
  <div>
    <v-navigation-drawer fixed v-model="drawer" :class="$root.sidebarBg" class="darken-2" dark app>
      <v-toolbar flat dark :class="$root.sidebarBg" class="darken-3">
        <v-list class="pa-0">
          <!-- <router-link to="/dashboard"> -->
            <v-list-tile>
              
                <img src="../static/BN-logo-47.png" width="250px">
              
            </v-list-tile>
          <!-- </router-link> -->
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <div v-for="(menus, i) in menu" :key="i">


          <v-list-group v-if="menus.items" :prepend-icon="menus.icon" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title> {{ menus.title }} </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(link, li) in menus.items" :key="li" :to="link.path">
            
            <v-list-tile-action>
              <v-icon> {{ link.icon }} </v-icon>
            </v-list-tile-action>
            
            <v-list-tile-content>
              <v-list-tile-title> {{link.name}} </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else :to="menus.path">
          <v-list-tile-action>
            <v-icon> {{menus.icon}} </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title> {{menus.title}} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </div>
      </v-list>


        
      

    </v-navigation-drawer>
    <v-toolbar fixed app light class="white">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title ></v-toolbar-title>
      <v-chip color="primary">
        <b class="white-text">
          {{ role }}
        </b>  
      </v-chip>
      <v-spacer></v-spacer>
      <!-- <v-btn flat class="hidden-sm-and-down">Link One</v-btn>
      <v-btn flat class="hidden-sm-and-down">Link Two</v-btn> -->
      <v-badge overlap>
        Welcome <b> {{ username }} </b> 
      </v-badge>

      <v-menu bottom left transition="slide-y-transition">
        <v-btn slot="activator" icon>
          <v-icon class="grey--text text--darken-1">account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-btn fab small @click="logout">
              <v-icon>lock_open</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        title: 'Appointment Management System',
        drawer: true,
        admins: [
          ['Management', 'people_outline'],
          ['Settings', 'settings']
        ],
        cruds: [
          ['Create', 'add'],
          ['Read', 'insert_drive_file'],
          ['Update', 'update'],
          ['Delete', 'delete']
        ],
        types: [
          ['Headings', 'people_outline'],
          ['Sub Heading', 'settings']
        ],
        menu: [],
        username: localStorage.getItem('username'),
        superAdminMenu: [
          {
            title:'Dashboard',
            icon: 'home',
            path:'/dashboard'
          }
          ,
          {
            title: 'Masters',
            icon: 'lock',
            items: [
              { name: 'Branch', path: '/branch' , icon: 'call_split'},
              { name: 'Users', path: '/user' , icon: 'verified_user'},
              { name: 'Services', path: '/services', icon: 'list' },
              { name: 'Time Slots', path: '/timeslot', icon: 'schedule' },
              { name: 'Procedures', path:'/procedurelist', icon: 'list'},
              { name: 'DoctorsServices', path: '/doctorsServiceList', icon: 'list'},
              { name: 'Referral Doctors', path: '/referralDoctorsList', icon: 'list'}
            ]
          },
          {
            title: 'Appointment Slots',
            icon: 'schedule',
            path: '/appointmentSlots'
          },
          {
            title: 'Appointments',
            icon: 'view_list',
            items: [
              { name: 'All Appointments', path: '/appointmentlist' , icon: 'view_list'},
              { name: 'Online Appointments', path: '/AppointmentOnlineList' , icon: 'verified_user'},
              { name: 'For Review', path: '/ReviewDateList', icon: 'verified_user'}
            ]
          },
          {
            title: 'Queries',
            icon: 'mail',
            items: [
              { name: 'New Queries', path: '/newqueries' , icon: 'inbox' },
              { name: 'Answered Queries', path: '/answeredqueries', icon:' drafts' }
            ]
          },
          {
             title: 'Opinion & Consultaion',
             icon: 'mail',
             items: [
               { name: 'Opinion & Request', path:'/OCRequestList',icon:'inbox'},
             
               { name: 'Answered Opinion & Request', path: '/AnsweredOCList', icon:' drafts' },
             ]
          },
          {
            title: 'Sugical Appointments',
            icon: 'view_list',
            path: '/otherAppointments'
          },
          {
             title: 'Reports',
             icon: 'mail',
             items: [
               { name: 'Patients List', path: '/OnlinePatientList',icon:'inbox'},
             
               { name: 'Appointment List', path: '/appointmentreport', icon:' drafts' },
             ]
          },
          
        ],
        adminMenu:[
           {
            title:'Dashboard',
            icon: 'home',
            path:'/dashboard'
          }
          ,
          {
            title: 'Masters',
            icon: 'lock',
            items: [
              { name: 'Branch', path: '/branch' , icon: 'call_split'},
              { name: 'Services', path: '/services', icon: 'list' },
              { name: 'Time Slots', path: '/timeslot', icon: 'schedule' },
              { name: 'Procedures', path:'/procedurelist', icon: 'list'},
              { name: 'DoctorsServices', path: '/doctorsServiceList', icon: 'list'},
              { name: 'Referral Doctors', path: '/referralDoctorsList', icon: 'list'}
            ]
          },
          {
            title: 'Appointment Slots',
            icon: 'schedule',
            path: '/appointmentSlots'
          },
          {
            title: 'Appointments',
            icon: 'view_list',
            items: [
              { name: 'All Appointments', path: '/appointmentlist' , icon: 'view_list'},
              { name: 'Online Appointments', path: '/AppointmentOnlineList' , icon: 'verified_user'},
              { name: 'For Review', path: '/ReviewDateList', icon: 'verified_user'}
            ]
          },
          {
            title: 'Queries',
            icon: 'mail',
            items: [
              { name: 'New Queries', path: '/newqueries' , icon: 'inbox' },
              { name: 'Answered Queries', path: '/answeredqueries', icon:' drafts' }
            ]
          },
          {
             title: 'Opinion & Consultaion',
             icon: 'mail',
             items: [
               { name: 'Opinion & Request', path:'/OCRequestList',icon:'inbox'},
             
               { name: 'Answered Opinion & Request', path: '/AnsweredOCList', icon:' drafts' },
             ]
          },
          {
            title: 'Sugical Appointments',
            icon: 'view_list',
            path: '/otherAppointments'
          },
          {
             title: 'Reports',
             icon: 'mail',
             items: [
               { name: 'Patients List', path: '/OnlinePatientList',icon:'inbox'},
             
               { name: 'Appointment List', path: '/appointmentreport', icon:' drafts' },
             ]
          },
        ],

        frontDesk: [
          {
            title:'Dashboard',
            icon: 'home',
            path:'/dashboard'
          },
          {
            title: 'Appointment Slots',
            icon: 'schedule',
            path: '/appointmentSlots'
          },
          {
            title: 'Appointments',
            icon: 'view_list',
            items: [
              { name: 'All Appointments', path: '/appointmentlist' , icon: 'view_list'},
              { name: 'Online Appointments', path: '/AppointmentOnlineList' , icon: 'verified_user'},
              { name: 'For Review', path: '/ReviewDateList', icon: 'verified_user'}
            ]
          },
          {
            title: 'Reschedules',
            icon: 'update',
            path: '/reschedule'
          },
          {
            title: 'Queries',
            icon: 'mail',
            items: [
              { name: 'New Queries', path: '/newqueries' , icon: 'inbox' },
              { name: 'Answered Queries', path: '/answeredqueries', icon:' drafts' }
            ]
          },
          {
             title: 'Opinion & Consultaion',
             icon: 'mail',
             items: [
               { name: 'Opinion & Request', path:'/OCRequestList',icon:'inbox'},
             
               { name: 'Answered Opinion & Request', path: '/AnsweredOCList', icon:' drafts' },
             ]
          },
          {
            title: 'Sugical Appointments',
            icon: 'view_list',
            path: '/otherAppointments'
          },
           {
             title: 'Reports',
             icon: 'mail',
             items: [
               { name: 'Patients List', path: '/OnlinePatientList',icon:'inbox'},
             
               { name: 'Appointment List', path: '/appointmentreport', icon:' drafts' },
             ]
          },
        ],
        doctorMenu:[
          {
            title:'Dashboard',
            icon: 'home',
            path:'/dashboard'
          },
          {
            title: 'My Appointments',
            icon: 'view_list',
            path: '/doctorappointments'
          },
          {
            title: 'Surgical Appointments',
            icon: 'view_list',
            path:'/OtherAppointmentsDoctors'
          },
          {
            title: 'Queries',
            icon: 'mail',
            items: [
              { name: 'New Queries', path: '/newqueries' , icon: 'inbox' },
              { name: 'Answered Queries', path: '/answeredqueries', icon:' drafts' }
            ]
          }
        ],
        role : localStorage.getItem("role")
      }
    },
    methods:{
      menuAssign(){
         console.log("MENU ROLE IS : "+ this.role);
         if(this.role=="SUPER_ADMIN"){
           this.menu = this.superAdminMenu;
         }
           else{
           if(this.role == "FRONT_DESK"){
             this.menu = this.frontDesk;
           }else{
             if(this.role == "DOCTOR"){
               this.menu = this.doctorMenu;
             }else{
           if(this.role=="ADMIN"){
           this.menu = this.adminMenu;
         }else{
               this.menu = [];
             }
           }
         }
         }
      },
       logout(){
        localStorage.removeItem('token');
        localStorage.setItem('loggedIn',0);
        this.$router.push('/login');
			}
    },
    mounted(){
      this.menuAssign();
    },
  }
</script>

<style>
.blue-grey.darken-3{
  background: #eeeeee !important;
}
.white-text{
  color: #ffffff;
}
</style>

