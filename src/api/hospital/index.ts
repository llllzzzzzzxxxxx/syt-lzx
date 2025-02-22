import request from "@/utils/request";
import type {HospitalDetail,DepartmentResponseData,LoginData,UserLoginResponseData} from './type'

enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    HOSPITALDEPARMENT_URL='/hosp/hospital/department/',
    GETUSERCODE_URL ='/sms/send/',
    USERLOGIN_URL = '/user/login'
}

export const reqHospitalDetail = (hoscode:string) => request.get<any,HospitalDetail>(API.HOSPITALDETAIL_URL+hoscode);
export const reqHospitalDepartment = (hoscode:string) => request.get<any,DepartmentResponseData>(API.HOSPITALDEPARMENT_URL+hoscode);
export const reqCode = (phone:string)=>request.get<any,any>(API.GETUSERCODE_URL+phone);
export const reqUserLogin = (data:LoginData)=>request.post<any,UserLoginResponseData>(API.USERLOGIN_URL,data);