import Vue from 'vue'
import Router from 'vue-router'
import ShortKey from 'vue-shortkey'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'

Vue.use(Router)
Vue.use(ShortKey)
Vue.use(VueAxios, axios)
Vue.use(VueCookie)

// Vue.http.options.root = config.api_server_path
// Vue.http.headers.common['Content-Type'] = 'application/json'
// Vue.http.headers.common['Accept'] = 'application/json'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/dashboard',
      component: () => import('../pages/Home'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          title: 'Dashboard',
          component: () => import('../pages/Dashboard')
        },
        {
          path: 'doctorAppointment',
          name: 'doctorAppointment',
          title: 'Appointment List',
          component: () => import('../pages/doctorsAppointment')
        },
        {
          path: 'onlineSlot',
          name: 'onlineSlot',
          title: 'onlineSlot',
          component: () => import('../pages/onlineSlot')
        },
        {
          path: 'resheduleOnlineSlot',
          name: 'resheduleOnlineSlot',
          title: 'resheduleOnlineSlot',
          component: () => import('../pages/resheduleOnlineSlot')
        },
        {
          path: 'offlineappointment',
          name: 'Appointments',
          title: 'Appointments',
          component: () => import('../pages/OfflineAppointment')
        },
        {
          path: 'appointmentlist',
          name: 'Appointment List',
          title: 'Appointment List',
          component: () => import('../pages/AppointmentList')
        },
        {
          path: 'newqueries',
          name: 'New Queries',
          title: 'New Queries',
          component: () => import('../pages/NewQueries')
        },
        {
          path: 'answeredqueries',
          name: 'Answered Queries',
          title: 'Answered Queries',
          component: () => import('../pages/AnsweredQueries')
        },
        {
          path: 'Reshedule',
          name: 'Reshedule',
          component: () => import('../pages/Reshedule')
        },
        {
          path: 'appointmentSlots',
          name: 'Appointment Slots',
          component: () => import('../pages/AppointmentSlots')
        },
        {
          path: 'queryDetails/:id',
          name: 'Query Details',
          component: () => import('../pages/QueryDetails.vue')
        },
        {
          path: 'answerQuery/:id',
          name: 'Answer Query',
          component: () => import('../pages/AnswerQueries.vue')
        },
        {
          path:'reschedule',
          name: 'Reschedule',
          component: () => import('../pages/resheduledappointmentList')
        },
        {
          path: 'branch',
          name: 'Branch Page',
          component: () => import('../pages/BranchesList')
        },
        {
          path: 'timeslot',
          name: 'time Slot',
          component: () => import('../pages/TimeSlotList')
        },
        {
          path: 'AddTimeSlot',
          name: 'AddTimeSlot',
          component: () => import('../pages/AddTimeSlot')
        },
        {
          path: 'EditTimeSlot/:slotid',
          name: 'EditTimeSlot',
          component: () => import('../pages/EditTimeSlot')
        },
        {
          path: 'AddBranch',
          name: 'Branch',
          component: () => import('../pages/AddBranch')
        },
        {
          path:'AddBillingType',
          name:'Billing',
          component:() => import('../pages/AddBillingType')
        },
        {
          path: 'EditBranch/:branchid',
          name: 'EditBranch',
          component: () => import('../pages/EditBranch')
        },
        {
          path: 'user',
          name: 'User List',
          component: () => import('../pages/UsersList')
        },
        {
          path: 'services',
          name: 'Services List',
          component: () => import('../pages/BNServices')
        },
        {
          path: 'addservices',
          name: 'Add Services',
          component: () => import('../pages/AddServices')
        },
        {
          path: 'services/edit/:serveId',
          name: 'Edit Services',
          component: () => import('../pages/EditServices')
        },
        {
          path: 'addusers',
          name: 'Add Users',
          component: () => import('../pages/AddUsers')
        },
        {
          path: 'Reshedule/:rid',
          name: 'Reshedule',
          title: 'Reshedule',
          component: () => import('../pages/Reshedule')
        },
        {
          path: 'doctorappointments',
          name: 'Doctor Appointments',
          component: () => import('../pages/myappointments')
        },
        {
          path: 'procedurelist',
          name: 'Surgical Appointments',
          component: () => import('../pages/ProcedureList')
        },
        {
          path: 'addprocedures',
          name: 'Add Procedures',
          component: () => import('../pages/AddProcedures')
        },
        {
          path: 'procedures/edit/:proId',
          name: 'Edit Procedures',
          component: () => import('../pages/EditProcedures')
        },
        {
          path: 'otherAppointments',
          name: 'Other Appointments',
          component: () => import('../pages/otherappointmentlist')
        },
        {
          path: 'PaymentsInstamojo',
          name: 'Paymnets Instamojo',
          component: () => import('../pages/PaymentsInstamojo')
        },
        {
          path: 'addotherappointments',
          name: 'Add Other Appointment',
          component: () => import('../pages/AddOtherAppointments')
        },
        {
          path: 'AppointmentOnlineList',
          name: 'Appointment List',
          component: () => import('../pages/AppointmentOnlineList')
        },
        {
          path: 'Mail/:personid',
          name: 'Mail',
          component: () => import('../pages/Mail')
        },
        {
        path:'OCRequestList',
        name:'OC Request',
        component: ()=>import('../pages/OCRequestList')
        },
        {
          path:'OCRequestDetails/:did',
          name:'OC OCRequestDetails',
          component: ()=>import('../pages/OCRequestDetails')
        },
         
        {
          path:'OCRequestResponse/:aid',
          name:'OC Request',
          component: ()=>import('../pages/OCRequestResponse')
        },
        {
            path:'AnsweredOCList',
            name:'Answered OC List',
            component: ()=>import('../pages/AnsweredOCList')
        },
        {
          path: 'doctorsServiceList',
          name: 'Dpctors Service List',
          component: ()=> import('../pages/DoctorServiceList')
        },
        {
          path: 'AddDoctorsSpeciality',
          name: 'Add Doctors Speciality',
          component: () => import('../pages/AddDoctorSpeciality')
        },
        {
          path: 'OtherAppointmentsDoctors',
          name: 'Other Appointments Doctor List',
          component: () => import('../pages/DoctorWiseOtherAppList')
        },
        {
          path: 'Resheduleotherappointments/:id',
          name: 'Reschedule Other Appointments',
          component: ()=> import('../pages/Resheduleotherappointments')
        },
        {
          path: 'referralDoctorsList',
          name: 'Referral Doctors list',
          component: ()=> import('../pages/ReferralDoctorsList')
        },
        {
          path: 'AddReferralDoctors',
          name: 'Add Referral Doctors',
          component: ()=> import('../pages/AddReferralDoctors')
        },
        {
          path: 'pendingOtherAppointments',
          name: 'pending Other Appointments',
          component: ()=> import('../pages/pendingOtherAppointments')
        },
        {
          path: 'ReviewDate/:reviewid',
          name: 'ReviewDate',
          component: ()=> import('../pages/ReviewDate')
        },
        {
          path: 'ReviewDateList',
          name: 'Review Date List',
          component: ()=> import('../pages/ReviewDateList')
        },
        {
          path: 'OnlinePatientList',
          name: 'Online Patients',
          component: ()=> import('../pages/PatientList')
        },
        {
          path: 'reviewAppointents/:appId',
          name: 'Review Appointments',
          component: ()=> import('../pages/ReviewAppointments')
        },
        {
          path: 'appointmentreport',
          name: 'Appointment Reports',
          component: ()=> import('../pages/AppointmentReport')
        },
        {
          path: 'surgicalappointmentreport',
          name: 'Surgical Appointment Reports',
          component: ()=> import('../pages/SurgicalAppointmentReports')
        }

        
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login')
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('../pages/forgotPassword')
    },
    {
      path: '/ResetPassword',
      name: 'ResetPassword',
      component: () => import('../pages/ResetPassword')
    },
  ]
})

export default router