import type { HosPitalDetail ,DepartmentArr} from "@/api/hospital/type";

export interface DetailState{
    hospitalInfo:HosPitalDetail,
    departmentArr:DepartmentArr,

}
export interface UserState{
    visable:boolean,
    code:string,
    userInfo:{}
}