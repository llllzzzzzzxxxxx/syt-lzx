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
                    <Card class="item" v-for='item in 10' :key="item"/>
                    <el-pagination
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40]"
                        :background="true"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="13"
                    />
                </div>
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
import { ref } from "vue";
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
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