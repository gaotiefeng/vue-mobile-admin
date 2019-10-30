<template>
<div class="body">
    <h3>添加角色</h3>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="列如：管理组"></el-input>
    </el-form-item>

    <el-form-item label="路由名称" prop="router_id">
        <el-select v-model="form.router_id" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
    </el-form-item>
    </el-form>
</div>
</template>

<script>
import { all } from '@/api/route'
import { add } from '@/api/role'
import * as error from '@/utils/error'
export default({
    data() {
      return {
        options: [],
        form: {
          name: '',
          router_id: '',
        },
        rules: {
            name: [{
                required: true,
                message: '请输入角色名称',
                trigger: 'blur'
            }],
            router_id: [{
                required: true,
                message: '请选择路由',
                trigger: 'blur'
            }],
        },
      }
    },
    created() {
        this.getRoute();
    },
    methods: {
        async getRoute()
        {
            let res = await all();
            if(res.code === error.SUCCESS_CODE) {
                this.options = res.data
            }
        },
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