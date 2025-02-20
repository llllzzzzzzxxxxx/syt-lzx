import request from "@/utils/request";

export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}
export interface Hospital {
    address: string;               // 地址
    bookingRule: {
        cycle: number;              // 间隔周期
        quitDay: number;            // 停止预约的天数
        quitTime: string;           // 停止预约的时间
        releaseTime: string;       // 释放预约的时间
        rule: string[];            // 预约号取号地点
        stopTime: string;          // 预约停止时间
    };                             // 预约规则
    cityCode: string;              // 城市代码
    createTime: string;            // 创建时间
    districtCode: string;          // 区域代码
    hoscode: string;               // 医院编码
    hosname: string;               // 医院名称
    hostype: string;               // 医院类型
    id: string;                    // 唯一ID
    intro: string | null;          // 介绍（如果有）
    isDeleted: number;             // 是否已删除（0表示未删除）
    logoData: string;              // 医院Logo
    param: {
        hostypeString: string | null;  // 医院类型（字符串）
        fullAddress: string;          // 完整地址
    };
    provinceCode: string;          // 省份代码
    route: string;                 // 乘车路线
    status: number;                // 状态（1表示有效）
    updateTime: string;
}
export type Content = Hospital[];
export interface HospitalResponseData extends ResponseData {
    data: {
        content: Content;
        pageable: {
            offset: number;  // 当前页的起始位置（从 0 开始）
            pageNumber: number;  // 当前页码（从 0 开始）
            pageSize: number;  // 每页显示的数量
            paged: boolean;  // 是否启用分页
            sort: {
                empty: boolean;  // 是否没有排序规则
                sorted: boolean;  // 是否已排序
                unsorted: boolean;  // 是否未排序
            };
            unpaged: boolean;  // 是否没有分页
        };  // 分页相关的信息
        size: number;  // 每页显示的数据数量
        sort: {
            empty: boolean;  // 是否没有排序
            sorted: boolean;  // 是否已排序
            unsorted: boolean;  // 是否未排序
        };
        totalElements: number;  // 数据的总条数
        totalPages: number;
        empty: boolean;
        first: boolean;
        last: boolean;
        number: number;
        numberOfElements: number;
    }
}
export interface HospitalLevelAndRegion {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {},
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren":boolean
}
export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[];
export interface HospitalLevelAndRegionResponseData extends ResponseData {
    data: HospitalLevelAndRegionArr;
}
export interface HospitalInfo extends ResponseData {
    data: Content;
}