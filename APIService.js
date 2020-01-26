import axios from 'axios';
const API_URL = 'http://localhost:9092';
// const API_URL = 'http://server.bangalorenethralaya.com:9092';
// const API_URL = 'http://server.mahatinnovations.com:9092';

export class APIService{
    serverurl = 'http://localhost:9092';
    // serverurl = 'http://server.bangalorenethralaya.com:9092';
    // serverurl = 'http://server.mahatinnovations.com:9092';
     auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
constructor(){
   
}
getCities(stateid){
    // const auth = {
    //     headers: {Authorization:localStorage.getItem('token')} 
    // }
    const url = `${API_URL}/states/city/${stateid}`;
   
    return axios.get(url).then(response => response.data);
    
}


getExpenses(){
    const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url = `${API_URL}/masters/readExpenseType/`;
   
    return axios.get(url,auth).then(response => response.data);
}
getDealers(){
    const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url = `${API_URL}/masters/getDealers/`;
   
    return axios.get(url,auth).then(response => response.data);
}
getProductCategory(){
    const auth = {
        headers: {Authorization:localStorage.getItem('token')} 
    }
    const url = `${API_URL}/masters/getproductCategory/`;
   
    return axios.get(url,auth).then(response => response.data);
}
getMaterialType(){
    const auth={
    
    headers: {Authorization:localStorage.getItem('token')} 
    }
const url = `${API_URL}/masters/materialTypes`;

return axios.get(url,auth).then(response => response.data);
}
getStates(){
    const auth={
    
        headers: {Authorization:localStorage.getItem('token')} 
        }
    const url = `${API_URL}/masters/getstates`;
    
    return axios.get(url,auth).then(response => response.data);
}
getRoles(){
    const auth={
    
        headers: {Authorization:localStorage.getItem('token')} 
        }
    const url = `${API_URL}/masters/getroles`;
    
    return axios.get(url,auth).then(response => response.data);
}
getGender(){
    const auth={
        headers:{
            Authorization:localStorage.getItem('token')

        }
    }
    const url=`${API_URL}/masters/getGender/`;
    return axios.get(url,auth).then(response =>response.data
    );
}
getHospital(){
    const auth={
        headers:{
            Authorization:localStorage.getItem('token')

        }
    }
    const url=`${API_URL}/masters/hospitals/`;
    return axios.get(url,auth).then(response =>response.data
    );
}
getSpeciality(){
    const auth={
        headers:{
            Authorization:localStorage.getItem('token')

        }
    }
    const url=`${API_URL}/masters/Speciality/`;
    return axios.get(url,auth).then(response =>response.data
    );
}
getCampCategories(){
    const auth = {
 headers: {
   Authorization:localStorage.getItem('token')
   } 
    }
        const url=`${API_URL}/masters/getCampCategories/`;
        return axios.get(url,auth).then(response=>
           response.data );
}
getCampType(){
    const auth = {
        headers: {
          Authorization:localStorage.getItem('token')
          } 
           }
               const url=`${API_URL}/masters/getCampType/`;
               return axios.get(url,auth).then(response=>
                  response.data );    
}

getCampCoordinator(){
    const auth = {
        headers: {
          Authorization:localStorage.getItem('token')
          } 
           }
               const url=`${API_URL}/masters/getCampCoordinator/`;
               return axios.get(url,auth).then(response=>
                  response.data );    
}
getRole(){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/masters/getRoles/`;
    return axios.get(url,auth).then(response =>response.data);
}

getDesignation(){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/masters/designations/`;
    return axios.get(url,auth).then(response =>response.data);
}

getBranch(){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/masters/branches/`;
    return axios.get(url,auth).then(response =>response.data);
}

getMedicineType(medtypeId){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/masters/medicineType/${medtypeId}`;
    return axios.get(url,auth).then(response =>response.data);
}

getMedicine(medicineId){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/masters/getMedicines/${medicineId}`;
    return axios.get(url,auth).then(response =>response.data);
}

getHospitals(hosId){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/masters/getHospitals/${hosId}`;
    return axios.get(url,auth).then(response =>response.data);
}

getloggedinUser () {
    const auth = {
      headers: { Authorization: localStorage.getItem('token') }
    };
    const url = `${API_URL}/User`;
    return axios.get(url, auth).then(response => response.data);
  }

getBranches () {
    const auth = {
        headers: { Authorization: localStorage.getItem('token') }
    };
    const url = `${API_URL}/masters/getBranches`;
    return axios.get(url, auth).then(response => response.data);
}

getAvailableSlotFromBranch(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url =`${API_URL}/availableSlots/getAllSlots/${date}`;
    
    // console.log(JSON.parse(data));
    
    return axios.get(url, auth).then(response => response.data);
}

getAllAvailableSlotsByBranch(date){
    // for slot creator method
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url =`${API_URL}/availableSlots/getAllSlotsByBranch/${date}`;
    
    // console.log(JSON.parse(data));
    
    return axios.get(url, auth).then(response => response.data);

}

getDoctors(){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/masters/getDoctors`;
    return axios.get(url, auth).then(response=> response.data);
}

getTimeSlots(){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/masters/getTimeSlots`;
    return axios.get(url, auth).then(response=> response.data);
}

getNewQueries(){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/patientQueries/newQueries`;
    return axios.get(url, auth).then(response=> response.data);
}

getAnsweredQueries(){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/patientQueries/answeredQueries`;
    return axios.get(url, auth).then(response=> response.data);
}

getQueryResponses(query){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/patientQueries/queryResponse/${query}`;
    return axios.get(url, auth).then(response=> response.data);
}

getQueryDetails(query){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/patientQueries/queryDetails/${query}`;
    return axios.get(url, auth).then(response=> response.data);
}

getDatee(rid) {
    const auth = {
      headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/masters/getDatee/${rid}`;
    return axios.get(url, auth).then(response => response.data);
}
getBranch (branchid) {
    const auth = {
      headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/masters/getBranch/${branchid}`;
    return axios.get(url, auth).then(response => response.data);
}
getTimeSlot (slotid) {
    const auth = {
      headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/masters/getslot/${slotid}`;
    return axios.get(url, auth).then(response => response.data);
}
getRoles(){
    const auth={
    
        headers: {Authorization:localStorage.getItem('token')} 
        }
    const url = `${API_URL}/getRoles`;
    
    return axios.get(url,auth).then(response => response.data);
}

getServices(serveId){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/masters/getServices/${serveId}`;
    return axios.get(url,auth).then(response =>response.data);
}

getMyAppointments(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/appointments/getmyappoinntments/${date}`;
    return axios.get(url, auth).then(response=> response.data);
}

getProcedures1(proId){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/masters/getAllProcedures/${proId}`;
    return axios.get(url,auth).then(response =>response.data);
}

getAllPayments(page){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/payments-instamojo/allPayments/${page}`;
    return axios.get(url,auth).then(response =>response.data);
}

getPayMentPageCount(){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/payments-instamojo/getCountPages`;
    return axios.get(url,auth).then(response =>response.data);
}

getProcedures(){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/masters/getProcedures`;
    return axios.get(url, auth).then(response=> response.data);
}


getAllPatients(){
    
        const auth = {
            headers: { Authorization: localStorage.getItem('token') },
        };
        const url = `${API_URL}/getAllPatients`;
        return axios.get(url, auth).then(response=> response.data);
    
}
getPatientDetails(id){
    
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/getPatientDetail/${id}`;
    return axios.get(url, auth).then(response=> response.data);

}

getOCRequestDetails(did){
    const auth= {
        headers:{Authorization:localStorage.getItem('token')
    }};
    const url=`${API_URL}/ConsultationDetails/${did}`;
    return axios.get(url,auth).then(response=>response.data);
}
    //getreposne in detail as weell as answred page 
getOCRequestRes(request){
    const auth= {
        headers:{Authorization:localStorage.getItem('token')
    }};
    const url=`${API_URL}/ConsultationDetailsResponse/${request}`;
    return axios.get(url,auth).then(response=>response.data);
}
        //get details in answered page
 getOCRequestResponse(aid){
    const auth= {
        headers:{Authorization:localStorage.getItem('token')
    }};
    const url=`${API_URL}/ConsultationDetails/${aid}`;
    return axios.get(url,auth).then(response=>response.data);
}
getMail(personid) {
    const auth = {
      headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/getMailid/${personid}`;
    return axios.get(url, auth).then(response => response.data);
}

getAllServices(){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
    };
    const url  = `${API_URL}/masters/getAllServices`;
    return axios.get(url, auth).then(response => response.data);
}

getresDate (id) {
    const auth = {
      headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/getResDatee/${id}`;
    return axios.get(url, auth).then(response => response.data);
}

getrefferalDoctors(){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/masters/allReferralDoctors`;
    return axios.get(url, auth).then(response => response.data);
}
getRevw(reviewid){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
      };
      const url = `${API_URL}/getreviewDate/${reviewid}`;
      return axios.get(url, auth).then(response => response.data);
}
getReviewDate(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
      };
      const url = `${API_URL}/ReviewDateList/${date}`;
      return axios.get(url, auth).then(response => response.data);
}
getAllPatientsList(){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/patient/getAllPatients`;
    return axios.get(url, auth).then(response => response.data);
}

getdateWiseOtherAppointmentdoctorWise(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/getdateWiseOtherAppointmentdoctorWise/${date}`;
    return axios.get(url, auth).then(response => response.data);
}
getMonthlyOtherAppointmentdoctorWise(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
    };
    const datee = date+"-01";
    const url = `${API_URL}/getMonthlyOtherAppointmentdoctorWise/${datee}`;
    return axios.get(url, auth).then(response => response.data);
}

getOtherAppointmentList(id){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
    };
    const url = `${API_URL}/getOtherApp/${id}`;
    return axios.get(url, auth).then(response => response.data);
}

getMonthlyOtherAppointment(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') } 
    };
    const datee = date+"-01";
    const url = `${API_URL}/getMonthlyOtherAppointment/${datee}`;
    return axios.get(url, auth).then(response => response.data);
}
getMonthwiseMyAppointments(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const datee=date+"-01";
    const url = `${API_URL}/appointments/getMonthwiseAppointmentDoctorwise/${datee}`;
    return axios.get(url, auth).then(response=> response.data);
}
getAppointments(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const url = `${API_URL}/getAppointment/${date}`;
    return axios.get(url, auth).then(response=> response.data);
}
getMonthwiseAppointments(date){
    const auth = {
        headers: { Authorization: localStorage.getItem('token') },
    };
    const datee=date+"-01";
    const url = `${API_URL}/getMonthwiseAppointment/${datee}`;
    return axios.get(url, auth).then(response=> response.data);
}
getReviewAppointments(appId){
    const auth={
        headers: {
            Authorization:localStorage.getItem('token')
        }
    }
    const url=`${API_URL}/offlineAppointments/getReviewAppointments/${appId}`;
    return axios.get(url,auth).then(response =>response.data);
}

getResheduledAppointmentsOnDate(date){
    const auth={
    headers: {
    Authorization:localStorage.getItem('token')
    }
    }
    const url=`${API_URL}/masters/getResheduledAppointmentsOnDate/${date}`;
    return axios.get(url,auth).then(response =>response.data);
}
    getrescheduledAppointment(){
    const auth={
    headers: {
    Authorization:localStorage.getItem('token')
    }
    }
    const url=`${API_URL}/masters/rescheduledAppointmentList`;
    return axios.get(url,auth).then(response =>response.data);
}
    getMonthwiseReshudledAppiontment(date){
    const auth={
    headers: {
    Authorization:localStorage.getItem('token')
    }
    }
    const datee = date+"-01";
    const url=`${API_URL}/masters/getMonthwiseResheduledAppiontment/${datee}`;
    return axios.get(url,auth).then(response =>response.data);
    }
    getFutureAppointments(){
    const auth = {
    headers: {Authorization:localStorage.getItem('token')}
    };
    const url = `${API_URL}/getfutureappointments`;
    return axios.get(url,auth).then(response=> response.data);
    
    }

    getFutureMyAppointments(){
        const auth = {
            headers: {Authorization:localStorage.getItem('token')}
        };
        const url = `${API_URL}/appointments/getfuturemyappointments`;
        return axios.get(url,auth).then(response=> response.data);
    
    }
    getFutureOtherAppointments(){
        const auth = {
            headers: {Authorization:localStorage.getItem('token')}
        };
        const url = `${API_URL}/getfutureOtherAppointment`;
        return axios.get(url,auth).then(response=> response.data);
    
    }
    getFutureDoctorOtherAppointments(){
        const auth = {
            headers: {Authorization:localStorage.getItem('token')}
        };
        const url = `${API_URL}/getFutureOtherAppointmentdoctorWise`;
        return axios.get(url,auth).then(response=> response.data);
    
    }

    getfutureappointmentsBranchWise(id){
        const auth = {
        headers: {Authorization:localStorage.getItem('token')}
        };
        const url = `${API_URL}/getfutureappointmentsBranchWise/${id}`;
        return axios.get(url,auth).then(response=> response.data);
        
        }
    
    futurerescheduledAppointmentListbranchwise(id){
        const auth={
        headers: {
        Authorization:localStorage.getItem('token')
        }
        }
        const url=`${API_URL}/masters/futurerescheduledAppointmentList/${id}`;
        return axios.get(url,auth).then(response =>response.data);
    }
    
    getResheduledAppointmentsOnDatebranchWise(date,id){
        const auth={
        headers: {
        Authorization:localStorage.getItem('token')
        }
        }
        const url=`${API_URL}/masters/getResheduledAppointmentsOnDatebranchWise/${date}/${id}`;
        return axios.get(url,auth).then(response =>response.data);
    }
    
    getAppointmentbranchwise(date,id){
        const auth = {
            headers: { Authorization: localStorage.getItem('token') },
        };
        const url = `${API_URL}/getAppointmentbranchwise/${date}/${id}`;
        return axios.get(url, auth).then(response=> response.data);
    }
    
    getfutureReviewBranchWise(id){
        const auth = {
        headers: {Authorization:localStorage.getItem('token')}
        };
        const url = `${API_URL}/getFutureReviewDateListBranchWise/${id}`;
        return axios.get(url,auth).then(response=> response.data);
        
        }

        getReviewBranchWise(date,id){
            const auth = {
            headers: {Authorization:localStorage.getItem('token')}
            };
            const url = `${API_URL}/getReviewDateListBranchWise/${date}/${id}`;
            return axios.get(url,auth).then(response=> response.data);
            
            }

        getSurgicalAppointments(date,id){
            const auth = {
                headers: {Authorization:localStorage.getItem('token')}
                };
                const url = `${API_URL}/getSurgApp/${date}/${id}`;
                return axios.get(url,auth).then(response=> response.data);
        }


}