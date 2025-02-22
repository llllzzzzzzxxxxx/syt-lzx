<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visable" title="用户登录" @close="close">
            <el-row>
                <el-col :span="12">
                    <div class="login">
                        <div v-show="scene == 0">
                            <el-form :model="loginParam" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请输入手机号码" :prefix-icon="User"
                                        v-model="loginParam.phone"></el-input>
                                </el-form-item>
                                <el-from-item prop="code">
                                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock"
                                        v-model="loginParam.code"></el-input>
                                </el-from-item>
                                <el-from-item>
                                    <el-button :disable="!isPhone ? true : false">
                                        <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                                        <span @click="getCode" v-else>获取验证码</span>
                                    </el-button>
                                </el-from-item>
                            </el-form>
                            <el-button style="width:90%;background: rgb(79, 174, 238);color: white;" type="primary"
                                size="default" :disabled="!isPhone || loginParam.code.length < 6" @click="login">
                                用户登录
                            </el-button>
                            <div class="bottom" @click="changeScene">
                                <p>微信扫码登录</p>
                                <svg t="1740146719531" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4145" width="32" height="32">
                                    <path
                                        d="M183.379592 699.559184c-4.179592 0-8.359184-1.044898-11.493878-3.657143-6.269388-4.702041-9.404082-12.016327-7.836734-19.330612l13.061224-77.322449C136.881633 553.273469 114.938776 496.326531 114.938776 437.289796 114.938776 292.571429 246.073469 175.020408 408.032653 175.020408c76.8 0 149.420408 26.644898 204.8 74.710204 55.379592 48.587755 86.726531 113.893878 88.293878 183.379592 0 5.746939-2.089796 10.971429-6.269388 14.628572s-9.404082 5.746939-15.151021 5.746938c-5.22449-0.522449-9.404082-0.522449-13.583673-0.522449-112.326531 0-203.232653 79.934694-203.232653 178.677551 0 13.583673 1.567347 27.167347 5.22449 40.751021 1.567347 5.746939 0.522449 11.493878-2.612245 16.195918-3.134694 4.702041-8.359184 7.836735-14.106123 8.881633-14.106122 2.089796-28.734694 3.134694-43.363265 3.134694-52.767347 0-104.489796-12.538776-149.420408-36.571429l-65.828572 34.481633c-3.134694 0-6.269388 1.044898-9.404081 1.044898z"
                                        fill="#0B9682" p-id="4146"></path>
                                    <path
                                        d="M303.542857 352.653061m-35.004081 0a35.004082 35.004082 0 1 0 70.008163 0 35.004082 35.004082 0 1 0-70.008163 0Z"
                                        fill="#DCFFFA" p-id="4147"></path>
                                    <path
                                        d="M512 352.653061m-35.004082 0a35.004082 35.004082 0 1 0 70.008164 0 35.004082 35.004082 0 1 0-70.008164 0Z"
                                        fill="#DCFFFA" p-id="4148"></path>
                                    <path
                                        d="M849.502041 849.502041c-3.134694 0-6.269388-0.522449-9.404082-2.089796l-52.244898-27.167347c-37.093878 19.330612-78.889796 29.779592-122.253061 29.779592-134.269388 0-242.938776-98.220408-242.938776-218.383674S531.853061 412.734694 665.6 412.734694 909.061224 510.955102 909.061224 631.118367c0 48.065306-17.763265 95.085714-50.677551 133.22449l10.44898 61.64898c1.044898 7.314286-1.567347 15.15102-7.836735 19.330612-3.134694 3.134694-7.314286 4.179592-11.493877 4.179592z"
                                        fill="#16C4AF" p-id="4149"></path>
                                    <path
                                        d="M576.261224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z"
                                        fill="#DCFFFA" p-id="4150"></path>
                                    <path
                                        d="M755.461224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z"
                                        fill="#DCFFFA" p-id="4151"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="webchat" v-show="scene == 1">
                            微信扫码登录的结构
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="leftContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png" alt="">
                                <svg t="1740146719531" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4145" width="16" height="16">
                                    <path
                                        d="M183.379592 699.559184c-4.179592 0-8.359184-1.044898-11.493878-3.657143-6.269388-4.702041-9.404082-12.016327-7.836734-19.330612l13.061224-77.322449C136.881633 553.273469 114.938776 496.326531 114.938776 437.289796 114.938776 292.571429 246.073469 175.020408 408.032653 175.020408c76.8 0 149.420408 26.644898 204.8 74.710204 55.379592 48.587755 86.726531 113.893878 88.293878 183.379592 0 5.746939-2.089796 10.971429-6.269388 14.628572s-9.404082 5.746939-15.151021 5.746938c-5.22449-0.522449-9.404082-0.522449-13.583673-0.522449-112.326531 0-203.232653 79.934694-203.232653 178.677551 0 13.583673 1.567347 27.167347 5.22449 40.751021 1.567347 5.746939 0.522449 11.493878-2.612245 16.195918-3.134694 4.702041-8.359184 7.836735-14.106123 8.881633-14.106122 2.089796-28.734694 3.134694-43.363265 3.134694-52.767347 0-104.489796-12.538776-149.420408-36.571429l-65.828572 34.481633c-3.134694 0-6.269388 1.044898-9.404081 1.044898z"
                                        fill="#bfbfbf" p-id="4146"></path>
                                    <path
                                        d="M303.542857 352.653061m-35.004081 0a35.004082 35.004082 0 1 0 70.008163 0 35.004082 35.004082 0 1 0-70.008163 0Z"
                                        fill="#bfbfbf" p-id="4147"></path>
                                    <path
                                        d="M512 352.653061m-35.004082 0a35.004082 35.004082 0 1 0 70.008164 0 35.004082 35.004082 0 1 0-70.008164 0Z"
                                        fill="#bfbfbf" p-id="4148"></path>
                                    <path
                                        d="M849.502041 849.502041c-3.134694 0-6.269388-0.522449-9.404082-2.089796l-52.244898-27.167347c-37.093878 19.330612-78.889796 29.779592-122.253061 29.779592-134.269388 0-242.938776-98.220408-242.938776-218.383674S531.853061 412.734694 665.6 412.734694 909.061224 510.955102 909.061224 631.118367c0 48.065306-17.763265 95.085714-50.677551 133.22449l10.44898 61.64898c1.044898 7.314286-1.567347 15.15102-7.836735 19.330612-3.134694 3.134694-7.314286 4.179592-11.493877 4.179592z"
                                        fill="#bfbfbf" p-id="4149"></path>
                                    <path
                                        d="M576.261224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z"
                                        fill="#bfbfbf" p-id="4150"></path>
                                    <path
                                        d="M755.461224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z"
                                        fill="#bfbfbf" p-id="4151"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>“快速预约挂号”</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" alt="">
                                <svg t="1740147408839" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="5802" width="16" height="16">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="5803"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>预约挂号APP</p>
                            </div>
                        </div>
                        <p class="tip">尚医通官方指定平台</p>
                        <p class="tip">快速排号 安全放心</p>
                    </div>

                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import CountDown from '@/components/countdown/index.vue';
import useUserStore from '@/store/modules/user';
import { User, Lock, Phone } from '@element-plus/icons-vue';
import { ref, reactive, computed } from 'vue';


let scene = ref<number>(0);
let flag = ref<boolean>(false);
let loginParam = reactive({
    phone: '',
    code: '',
});
let form = ref<any>()
let isPhone = computed(() => {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    return reg.test(loginParam.phone);
});
let userStore = useUserStore();
const changeScene = () => {
    scene.value = 1;
}
const getFlag = (val: boolean) => {
    flag.value = val;
}
const login = async () => {
    await form.value.validate();
    try {
        await userStore.userLogin(loginParam);
        userStore.visable = false;
    } catch (error) {
        alert((error as Error).message)
    }
}
const getCode = async () => {
    if (!isPhone.value || flag.value) return;
    flag.value = true;
    try {
        await userStore.getCode(loginParam.phone)
        loginParam.code = userStore.code;
    } catch (error) {
        alert((error as Error).message)
    }
}
const validatorPhone = (rule: any, value: string, callback: any) => {
    if (!isPhone.value) {
        callback(new Error('请输入正确的手机号'));
    } else {
        callback();
    }
}
const validatorCode = (rule: any, value: string, callback: any) => {
    if (/^\d{6}$/.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的验证码格式'));
    }
}
const rules = {
    phone: [{ trigger: 'change', validator: validatorPhone }],
    code: [{ trigger: 'change', validator: validatorCode }]
}
const closeDialog = () => {
    userStore.visable = false;
    close();
}
const close = () => {
    Object.assign(loginParam, {
        phone: '',
        code: ''
    });
    form.value.resetFields();
}
</script>
<script lang="ts">

</script>

<style scoped lang="scss">
.login_container {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid rgb(79, 174, 238);
        height: 350px;
        border-bottom: 1px solid #ccc;
    }

    .login {
        padding: 20px;
        border: 1px solid #ccc;

    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0px;
        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                align-items: center;
                flex-direction: column;

                img {
                    height: 130px;
                    width: 130px;
                }

                p {
                    margin: 5px 0px;
                }
            }
        }

        .tip {
            text-align: center;
            margin: 20px 0px;
            font-size: 20px;
            font-weight: 900;
        }
    }
}
</style>