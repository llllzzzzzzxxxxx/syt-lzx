import request from "@/utils/request";
import type {HospitalDetail,DepartmentResponseData} from './type'

enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    HOSPITALDEPARMENT_URL='/hosp/hospital/department/'
}

export const reqHospitalDetail = (hoscode:string) => request.get<any,HospitalDetail>(API.HOSPITALDETAIL_URL+hoscode);
export const reqHospitalDepartment = (hoscode:string) => request.get<any,DepartmentResponseData>(API.HOSPITALDEPARMENT_URL+hoscode);