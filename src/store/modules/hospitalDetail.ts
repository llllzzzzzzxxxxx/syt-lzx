import { defineStore } from 'pinia';
import { reqHospitalDetail ,reqHospitalDepartment} from '@/api/hospital';
import type{HospitalDetail,DepartmentResponseData,DepartmentArr} from '@/api/hospital/type'
import type{DetailState} from './interface'
import type{HosPitalDetail} from '@/api/hospital/type'

const useDetailStore = defineStore('Detail',{
    state:():DetailState=>{
        return{
            hospitalInfo:({}as HosPitalDetail),
            departmentArr:[]
        }
        
    },
    actions:{
        async getHospital(hoscode:string){
            let result:HospitalDetail = await reqHospitalDetail(hoscode);
            if(result.code===200){
                this.hospitalInfo = result.data;
            }
        },
        async getDepartment(hoscode:string){
            let result:DepartmentResponseData = await reqHospitalDepartment(hoscode);
            if(result.code===200){
                this.departmentArr = result.data;
            }
        }
    },
    getters:{

    }
});
export default useDetailStore;