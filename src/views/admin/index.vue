<template>
    <div class="admin">
        <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
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
import { getList } from '@/api/admin'
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
          },
        }
      },
    created() {
        this.admin();
    },
    methods: {
        async admin(){
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
        this.admin();
        },
        del(id) {
          alert(id);
        },
    },
}
</script>
<style scoped>
.admin {
  margin-left: 40px;
  text-align: center;
}
</style>