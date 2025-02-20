<template>
    <div>
        <Carousel />
        <Search />
        <el-row gutter="20">
            <el-col :span="20">
                <Level @getLevel="getLevel" />
                <Region @getRegion="getRegion" />
                <!-- 医院结构 -->
                <div class="hospital" v-if="hasHospitalArr.length>0">
                    <Card class="item" v-for='(item ,index) in hasHospitalArr' :key="index" :hospitalInfo="item"/>
                </div>
                <el-empty v-else description="没有医院" />
                    <el-pagination
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40]"
                        :background="true"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="13"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                    />
            </el-col>
            <el-col :span="4">
                <Tip />
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Carousel from "./carousel/index.vue";
import Search from './search/index.vue'
import Level from "./level/index.vue";
import Region from "./region/index.vue";
import Card from './card/index.vue';
import Tip from './tip/index.vue';
import { ref,onMounted } from "vue";
import {reqHospital} from '@/api/home'
import type { Content ,HospitalResponseData} from "@/api/home/type";


let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let hasHospitalArr = ref<Content>([]);
let total = ref<number>(0);
let hostype = ref<string>('');
let districtCode = ref<string>('');

onMounted(()=>{
    getHospitalInfo();
    console.log("--------total:",total.value);
})
const currentChange =() =>{
    getHospitalInfo();
}
const sizeChange = () =>{
    pageNo.value = 1;
    getHospitalInfo();
}
const getLevel =(level:string)=>{
    hostype.value = level;
    getHospitalInfo();
}
const getRegion = (region:string)=>{
    districtCode.value = region;
    getHospitalInfo();
}
const getHospitalInfo = async ()=>{
    let result:HospitalResponseData = await reqHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value);
    if(result.code===200){
        hasHospitalArr.value = result.data.content;
        total.value = result.data.totalElements;
        // console.log("成功");
    }
}


</script>

<style scoped lang="scss">
.hospital{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item{
        width: 48%;
        margin-top: 10px;
    }
}
</style>