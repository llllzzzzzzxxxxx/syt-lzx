<template>
    <div class="search">
        <el-autocomplete clearable placeholder="请输入医院名称" v-model="hosname" :fentch-suggestions="fetchData" trigger-on-focus="false"/>
      <el-button type="primary" size="default" :icon="Search">搜索</el-button>
    </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue"
import { useRoute } from "vue-router";
import { ref } from "vue"
import {reqHospitalInfo} from '@/api/home';
import type { HospitalInfo,Content } from "@/api/home/type";
let hosname = ref<string>('')
let $router = useRoute();

const goDetail = (item:any)=>{
    $router.push({path:'/hospital/register',query:{hoscode:item.hoscode}})
}

const fetchData = async (keyword:string,cb:any)=>{
    let result:HospitalInfo =await reqHospitalInfo(keyword);
    let showData = result.data.map(item=>{
        return{
            value:item.hosname
        }
    })
    cb(showData);
}

</script>
<script lang="ts">
export default {
    name:"Search",
}
</script>
<style scoped lang="scss">
.search{
    width: 100%;
    height: 50px;
    // background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    ::v-deep(.el-autocomplete){
        width: 600px;
        margin-right: 10px;
    }
}
</style>