<template>
    <div class="main">
<!--        <a-form-model
            id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="formData"
            @submit="handleSubmit"
        >-->
        <a-form-model ref="ruleForm" class="user-layout-login" :rules="rules" :model="formData" @submit="handleSubmit" @submit.native.prevent>
            <a-tabs
                :activeKey="customActiveKey"
                :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
                @change="handleTabClick"
            >
                <a-tab-pane key="tab1" tab="账号密码登录">
                    <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="用户名或密码错误"/>
                    <a-form-model-item prop="username">
                        <a-input
                            v-model="formData.username"
                            size="large"
                            type="text"
                            placeholder="用户名"
                        >
                            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item prop="password">
                        <a-input
                            v-model="formData.password"
                            size="large"
                            type="password"
                            autocomplete="false"
                            placeholder="密码"
                        >
                            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-model-item>
                </a-tab-pane>
<!--                <a-tab-pane key="tab2" tab="手机号登录">
                    <a-form-model-item>
                        <a-input size="large" type="text" placeholder="手机号"
                                 v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
                            <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-model-item>

                    <a-row :gutter="16">
                        <a-col class="gutter-row" :span="16">
                            <a-form-model-item>
                                <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                                </a-input>
                            </a-form-model-item>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <a-button
                                class="getCaptcha"
                                tabindex="-1"
                                :disabled="state.smsSendBtn"
                                @click.stop.prevent="getCaptcha"
                                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
                            ></a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>-->
            </a-tabs>

            <!-- <a-form-model-item>
                <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
              <router-link
                    :to="{ name: 'recover', params: { user: 'aaa'} }"
                    class="forge-password"
                    style="float: right;"
                >忘记密码
                </router-link>
            </a-form-model-item> -->

            <a-form-model-item style="margin-top:24px">
                <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                >
                    确定
                </a-button>
            </a-form-model-item>

            <!-- <div class="user-login-other">
                <span>其他登录方式</span>
                <a>
                    <a-icon class="item-icon" type="alipay-circle"></a-icon>
                </a>
                <a>
                    <a-icon class="item-icon" type="taobao-circle"></a-icon>
                </a>
                <a>
                    <a-icon class="item-icon" type="weibo-circle"></a-icon>
                </a>
                <router-link class="register" :to="{ name: 'register' }">注册用户名</router-link>
            </div> -->
            <!-- <div class="user-login-app">
                <span class="info">请使用浏览器扫码下载APP</span>
                <img :src="appSrc" style="width:40px;height:40px;" @click="showLargePic">
            </div> -->
        </a-form-model>
        <a-modal :width='300' :visible="largePicModel"  :centered="true" :maskClosable="true" :closable="false"
        :footer="null" :bodyStyle="{padding:0}" class="largePicModal" @cancel="largePicModel=false">
            <div><img :src="appSrc"></div>
        </a-modal>
    </div>
</template>

<script>
//import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import {mapActions} from 'vuex'
//import { timeFix } from '@/utils/util'
//import { getSmsCaptcha, get2step } from '@/api/login'

export default {
    components: {
        //TwoStepCaptcha
    },
    data() {
        return {
            debug: process.env.NODE_ENV == "development",
            formData: {
                username: "",
                password: "",
                code: ""
            },
            rules: {
                username: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
            },
            loginVerifyType: this.$config.loginVerifyType,

            //----------------------------------------------
            customActiveKey: 'tab1',
            loginBtn: false,
            // login type: 0 email, 1 username, 2 telephone
            loginType: 0,
            isLoginError: false,
            requiredTwoStepCaptcha: false,
            stepCaptchaVisible: false,
            state: {
                time: 60,
                loginBtn: false,
                // login type: 0 email, 1 username, 2 telephone
                loginType: 0,
                smsSendBtn: false
            },
            appSrc:require('./images/app.png'),
            largePicModel:false
        }
    },
    created() {
        /*get2step({})
            .then(res => {
                this.requiredTwoStepCaptcha = res.result.stepCode
            })
            .catch(() => {
                this.requiredTwoStepCaptcha = false
            })*/
        // this.requiredTwoStepCaptcha = true
    },
    methods: {
        // handler
        handleUsernameOrEmail(rule, value, callback) {
            const {state} = this
            const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (regex.test(value)) {
                state.loginType = 0
            } else {
                state.loginType = 1
            }
            callback()
        },
        handleTabClick(key) {
            this.customActiveKey = key
            // this.form.resetFields()
        },
        handleSubmit() {
            if (!this.loading) {
                console.log(this.formData);
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.login();
                    } else {
                        return false;
                    }
                });
            }
        },
        login() {
            this.loading = true;
            this.$http({
                url: "zuul/oauth/",
                data: this.$qs.stringify(this.formData),
                method: "post"
            }).then(res => {
                if (res.data.success) {
                    this.$store.dispatch("getUserInfo", (r, data) => {
                        if (!!r.name) {
                            this.$message.success({
                                content: "欢迎您," + data.name,
                                duration: 1
                            });
                            this.$router.push({
                                name: r.name
                            });
                        } else {
                            this.$message.success({
                                content: "欢迎您" + data.name,
                                duration: 1
                            });
                            this.$router.push({
                                path:"/index"
                            });
                        }
                        this.loading = false;
                    });
                } else {
                    this.loading = false;
                    this.$message.error("登录失败！" + res.data.message);
                    // this.$message.error('This is an error message');
                }
            });
            setTimeout(() => {
                this.loading = false;
            }, 5000);
        },
        /*handleSubmit(e) {
            e.preventDefault()
            const {
                form: {validateFields},
                state,
                customActiveKey,
                Login
            } = this

            state.loginBtn = true

            const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

            validateFields(validateFieldsKey, {force: true}, (err, values) => {
                if (!err) {
                    console.log('login form', values)
                    const loginParams = {...values}
                    delete loginParams.username
                    loginParams[!state.loginType ? 'email' : 'username'] = values.username
                    loginParams.password = md5(values.password)
                    Login(loginParams)
                        .then((res) => this.loginSuccess(res))
                        .catch(err => this.requestFailed(err))
                        .finally(() => {
                            state.loginBtn = false
                        })
                } else {
                    setTimeout(() => {
                        state.loginBtn = false
                    }, 600)
                }
            })
        },*/
        getCaptcha(e) {
            e.preventDefault()
            const {form: {validateFields}, state} = this

            validateFields(['mobile'], {force: true}, (err, values) => {
                if (!err) {
                    state.smsSendBtn = true

                    const interval = window.setInterval(() => {
                        if (state.time-- <= 0) {
                            state.time = 60
                            state.smsSendBtn = false
                            window.clearInterval(interval)
                        }
                    }, 1000)

                    const hide = this.$message.loading('验证码发送中..', 0)
                    /*getSmsCaptcha({mobile: values.mobile}).then(res => {
                        setTimeout(hide, 2500)
                        this.$notification['success']({
                            message: '提示',
                            description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                            duration: 8
                        })
                    }).catch(err => {
                        setTimeout(hide, 1)
                        clearInterval(interval)
                        state.time = 60
                        state.smsSendBtn = false
                        this.requestFailed(err)
                    })*/
                }
            })
        },
        stepCaptchaSuccess() {
            this.loginSuccess()
        },
        stepCaptchaCancel() {
            this.Logout().then(() => {
                this.loginBtn = false
                this.stepCaptchaVisible = false
            })
        },
        loginSuccess(res) {
            console.log(res)
            // check res.homePage define, set $router.push name res.homePage
            // Why not enter onComplete
            /*
            this.$router.push({ name: 'analysis' }, () => {
              console.log('onComplete')
              this.$notification.success({
                message: '欢迎',
                description: `${timeFix()}，欢迎回来`
              })
            })
            */
            this.$router.push({path: '/'})
            // 延迟 1 秒显示欢迎信息
            setTimeout(() => {
                this.$notification.success({
                    message: '欢迎',
                    description: `延迟 1 秒，欢迎回来`
                })
            }, 1000)
            this.isLoginError = false
        },
        requestFailed(err) {
            this.isLoginError = true
            this.$notification['error']({
                message: '错误',
                description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
                duration: 4
            })
        },
        showLargePic(){
            console.log(this.appSrc)
            this.largePicModel=true;
        }
    },
    mounted() {
        if (this.debug) {
            this.formData.username = this.$config.testAccount.userName;
            this.formData.password = this.$config.testAccount.password;
        } else {
            this.formData.username = "";
            this.formData.password = "";
        }
    }
}
</script>

<style lang="less" scoped>
.user-layout-login {
    label {
        font-size: 14px;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .forge-password {
        font-size: 14px;
    }

    button.login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
    }

    .user-login-other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;

        .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }

        .register {
            float: right;
        }
    }
    .user-login-app{
        height: 40px;
        .info{
            padding: 6px 15px 6px 15px;
            background-color: #CCCCCC;
            border-radius: 15px;
            font-size: 12px;
            color: #5a5555;
            margin-right:20px;
        }
    }
}
</style>
