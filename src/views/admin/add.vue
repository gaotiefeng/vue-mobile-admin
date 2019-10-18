<template>
<div class="body">
    <h3>添加路由</h3>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="路由名称" prop="name">
        <el-input v-model="form.name" placeholder="列如：添加路由"></el-input>
    </el-form-item>
    <el-form-item label="请求方法" prop="method">
         <el-input v-model="form.method" placeholder="列如：get|post"></el-input>
    </el-form-item>
    <el-form-item label="图标">
       <el-input v-model="form.icon" placeholder="列如：people"></el-input>
    </el-form-item>
    <el-form-item label="显示">
        <el-switch
        style="display: block"
        v-model="form.is_read"
        active-color="#13ce66"
        active-text="是否显示">
        </el-switch>
    </el-form-item>

    <el-form-item label="路由" prop="route">
       <el-input v-model="form.route" placeholder="列如：/route/add"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
    </el-form-item>
    </el-form>
</div>
</template>

<script>
import { add } from '@/api/route'
import * as error from '@/utils/error'
export default({
    data() {
      return {
        form: {
          name: '',
          method: '',
          icon: '',
          is_read: false,
          route: '',
        },
        rules: {
            name: [{
                required: true,
                message: '请输入路由名称',
                trigger: 'blur'
            }],
            method: [{
                required: true,
                message: '请输入请求方法',
                trigger: 'blur'
            }],
            route: [{
                required: true,
                message: '请输入地址',
                trigger: 'blur'
            }],

        },
      }
    },
    methods: {
      onSubmit(formName) {
          console.log(formName);
          this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.add();
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
      },
      resetForm(formName) {
            this.$refs[formName].resetFields()
      },
      async add() {
          if(this.form.is_read === false) {
              this.form.read = 0;
          }else {
              this.form.read = 1;
          }
          let result = await add(this.form)
          if(result.code === error.SUCCESS_CODE) {
              this.$router.push({
                    path: '/route/index'
                })

          }
      }

    }
})
</script>
<style scoped>
.body{
    margin-left: 40px;
}
</style>