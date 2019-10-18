<template>
    <div class="admin">
      <div class="search">
      <el-row>
        <el-form ref="search" :model="search" label-width="80px">
          路由名称:
          <el-input v-model="search.name" clearable placeholder="请输入名称" style="width:300px;margin-bottom:10px;"/>
          <el-button type="primary" @click="submitForm()">搜索</el-button>
        </el-form>
      </el-row>
      <br />
      </div>
      <div class="add">
       <router-link to="/route/add">
       <el-button type="success" >添加路由</el-button>
       </router-link>
      </div>
      <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="路由名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="route"
        label="路由"
        width="180">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="180">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间">
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button
              size="mini"
              type="warning"
              @click="del(scope.row.id)"
            >删除
        </el-button> 
        </template>
      </el-table-column>

    </el-table>
    
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="search.limit"
        :total="total">
      </el-pagination>

    </div>
</template>

<script>
import { getList,del } from '@/api/route'
import * as error from '@/utils/error'
export default {
data() {
    return {
      list: [],
      total: 1,
      page: 1,
      search: {
        'offset': 0,
        'limit': 10,
        'name': '',
      },
    }
  },
created() {
    this.getList();
},
methods: {
    async getList(){
        const query = this.search;
        let res = await getList(query);
        if(res.code == error.SUCCESS_CODE) {
            this.list = res.data.items;
            this.total = res.data.count;
        }
    },
    // 分页
    handleCurrentChange(currentPage) {
    Object.assign(this.search, {
        offset: (currentPage - 1) * this.search.limit
    });
    this.getList();
    },
    submitForm() {
      this.getList();
    },
    async del(id) {
      let query = {
        'id' : id
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
        del(query).then(result => {
        if(result.code == error.SUCCESS_CODE)
        {
          this.$message({
          type: 'success',
          message: '删除成功!'
          });
        }
        this.getList();
        })
      
      }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
    },
}
}
</script> 
<style scoped>
.admin {
  margin-left: 40px;
  text-align: center;
}
.search {
  color:chocolate;
  margin-top:30px;
}
.add {
  margin-left:-94%;
  margin-bottom:20px;
}
</style>