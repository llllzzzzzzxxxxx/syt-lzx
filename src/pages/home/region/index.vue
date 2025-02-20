<template>
    <div class="region">
        <div class="content">
            <div class="left">地区:</div>
            <ul>
                <li :class="{active:RegionFlag==''}" @click="changeRegion('')">全部</li>
                <li v-for="item in RegionArr" :key="item.value" :class="{active:RegionFlag==item.value}" @click ="changeRegion(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reqHospitalLevelAndRegion} from '@/api/home';
import { onMounted ,ref} from 'vue';
import type { HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr } from '@/api/home/type';
let RegionFlag = ref<string>('')
let RegionArr = ref<HospitalLevelAndRegionArr>([]);
onMounted(()=>{
    getRegion();
});
const changeRegion = (region:string)=>{
    RegionFlag.value = region;
    $emit('getRegion',region);
}
const getRegion = async ()=>{
    let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("Beijin");
}
let $emit = defineEmits(['getRegion']);
</script >
<script lang="ts">
export default {
    name:'Region',
}
</script>
<style scoped lang="scss">
.region{
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 10px;
            width: 50px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover {
                    color: #55a6fe;
                    cursor: pointer;
                }
        }
    }
}
</style>