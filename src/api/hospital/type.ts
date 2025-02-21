export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
export interface HosPitalDetail{
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": [
            string,
            string
        ]
    },
    "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "hostypeString": string,
            "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string;
        "intro": null,
        "route": string,
        "status": 1,
        "bookingRule": null
    }
}
export interface HospitalDetail extends ResponseData{
    data:HosPitalDetail
}
export interface Department{
    depcode:string,
    depname:string,
    children?:Department[]
}
export type DepartmentArr = Department[];
export interface DepartmentResponseData extends ResponseData{
    data:DepartmentArr
}