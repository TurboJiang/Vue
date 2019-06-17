<template>
  <div class="login_page">
    <!-- 路由切换触发transition -->
    <transition name="form-fade" mode="in-out">
        <!-- v-show触发transition动画 -->
      <section class="form_container" v-show="showLogin">
        <div class="manage_tip">
          <span class="title">后台管理系统</span>
        </div>
        <!-- :model表单构建模型 form的数据 表单elementui的props  -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
            <!-- username输入框 -->
          <el-form-item prop="username">
            <span class="fa-tips">
              <i class="fa fa-user"></i>
            </span>
            <el-input class="area" type="text" placeholder="用户" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- password输入框 -->
          <el-form-item prop="password">
            <span class="fa-tips">
              <i class="fa fa-lock"></i>
            </span>
            <el-input class="area" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
// 找不到包 改短路径
import axios from 'utils/axios'
export default {
  data() {
    return {
      // 规则校验model中的数据 收集model
      rules: {
        // el-form封装好的
        username: [
          {
            required: true, //必填项
            message: "请输入用户名",
            trigger: "blur" //未填 报错 失焦
          },
          {
            min: 2,
            max: 8,
            message: "长度在2到8个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      showLogin:false,
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
      this.showLogin =true
  },
  methods: {
      submitForm () {
        //   validate验证表单有没有填写
          this.$refs.loginForm.validate((valid)=>{//表单dom结构验证
            //   回调 验证通过 获取loginForm信息
              if(valid){
                let userInfo = this.loginForm
                // 自定义数据
                let data = {
                    // 提交的地址
                    url:''
                }
                // 拼接userInfo、data
                let userData = Object.assign(userInfo,data);
                console.log(userData)
              }
          })
      }
  },
};
</script>

<style lang="less" scoped>
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  opacity: 0;
  transform: translate3d(0, -50px, 0);
}
</style>
