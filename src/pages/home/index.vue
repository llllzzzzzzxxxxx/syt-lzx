<template>
    <div>
        <Carousel />
        <Search />
        <el-row gutter="20">
            <el-col :span="20">
                <Level />
                <Region />
                <!-- 医院结构 -->
                <div class="hospital">
                    <Card class="item" v-for='(item ,index) in hasHospitalArr' :key="index" :hospitalInfo="item"/>
                </div>
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
            <el-col :span="4">34</el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Carousel from "./carousel/index.vue";
import Search from './search/index.vue'
import Level from "./level/index.vue";
import Region from "./region/index.vue";
import Card from './card/index.vue'
import { ref,onMounted } from "vue";
import {reqHospital} from '@/api/home'


let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let hasHospitalArr = ref([]);
let total = ref(0);

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
const getHospitalInfo = async ()=>{
    let result:any = await reqHospital(pageNo.value,pageSize.value);
    if(result.code===200){
        hasHospitalArr.value = result.data.content;
        total.value = result.data.totalElements;
        console.log("成功");
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