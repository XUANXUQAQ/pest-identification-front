<template>
  <div>
    <div style="margin: 10px">
      <el-button
        type="success"
        icon="el-icon-circle-check-outline"
        @click="showAddForm"
      >
        添加
      </el-button>
      <span style="position: fixed; left: 50%">
        <span style="font-size: 20px">
        根据
      </span>
      <el-select v-model="selectValue" placeholder="请选择" style="width: 130px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span style="font-size: 20px">
        搜索目
      </span>
      <el-input v-model="searchValue" placeholder="请输入名称" style="width: 30%"></el-input>
      <el-button round @click="getData(selectValue)">搜索</el-button>
      </span>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" :width="(screenWidth / 4) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="代码" :width="(screenWidth / 4) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="名称" :width="(screenWidth / 4) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" :width="(screenWidth / 4) + 'px'">
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="showUpdateForm(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="showDeleteForm(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-bind:title="dialogTitle" :visible="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" class="form-input" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="代码" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible="dialogDeleteVisible"
      width="30%">
      <span>是否删除</span>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogDeleteVisible = false">取消</el-button>
      <el-button type="danger" @click="confirmDelete">确定</el-button>
    </span>
      </template>
    </el-dialog>
    <!--分页-->
    <div class="page-bar">
      <el-pagination
        :page-size="totalPage"
        :page-count="8"
        :total="totalPage * all"
        layout="prev, pager, next"
        :prev-click="pageDown"
        :next-click="pageUp"
        @current-change="btnClick">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      listLoading: false,
      list: null,
      all: 1, // 总页数
      cur: 1, // 当前页码
      totalPage: 10, // 当前条数
      screenWidth: document.body.clientWidth - 260, // 屏幕尺寸
      searchValue: '',
      options: [{
        value: 'id',
        label: 'ID',
      },
      {
        value: 'name',
        label: '名称',
      }],
      selectValue: '',
      dialogFormVisible: false,
      form: {
        id: 0,
        code: '',
        name: '',
      },
      isUpdate: false,
      formLabelWidth: '120px',
      dialogTitle: '',
      dialogDeleteVisible: false,
      setPageSizeCount: 0,
    };
  },
  // 钩子函数
  mounted() {
    this.setPageSize();
    this.getData();
    const that = this;
    setInterval(() => {
      if (this.setPageSizeCount > 0) {
        this.setPageSizeCount -= 1;
      }
    }, 3000);
    setInterval(() => {
      if (this.isWindowResized) {
        this.isWindowResized = false;
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth - 250;
        that.setPageSize();
        that.getData();
      }
    }, 500);
    window.onresize = () => (() => {
      that.isWindowResized = true;
    })();
  },
  methods: {
    setPageSize() {
      if (this.setPageSizeCount <= 5) {
        this.setPageSizeCount += 1;
        const totalHeight = document.body.clientHeight * 0.75;
        let i = 0;
        let min = totalHeight;
        let minNum = 0;
        for (; i <= 9; i += 1) {
          const tmp = totalHeight - i * 80;
          if (tmp < min && tmp > 0) {
            min = tmp;
            minNum = i;
          }
        }
        this.totalPage = minNum;
      } else {
        this.$message({
          showClose: true,
          message: '拖动窗口过于频繁',
          type: 'warning',
        });
      }
    },
    async getData(selectValue) {
      this.listLoading = true;
      let result;
      if (this.searchValue) {
        if (selectValue === 'id') {
          result = await this.$orderApi.selectOrderById(this.searchValue);
        } else if (selectValue === 'name') {
          result = await this.$orderApi.selectOrderByName(this.cur, this.totalPage, this.searchValue);
        } else {
          result = await this.$orderApi.selectAllOrders(this.cur, this.totalPage);
        }
      } else {
        result = await this.$orderApi.selectAllOrders(this.cur, this.totalPage);
      }
      this.all = result.pages;
      const items = result.data;
      this.list = items.map((v) => {
        this.$set(v, 'edit', false);
        return v;
      });
      this.listLoading = false;
    },
    showAddForm() {
      this.dialogFormVisible = true;
      this.dialogTitle = '添加一个目';
      this.isUpdate = false;
      this.form.id = '自动添加';
      this.form.code = '';
      this.form.name = '';
    },
    showUpdateForm(row) {
      this.dialogFormVisible = true;
      this.dialogTitle = '正在修改目';
      this.isUpdate = true;
      this.form.id = row.id;
      this.form.code = row.code;
      this.form.name = row.name;
    },
    showDeleteForm(row) {
      this.dialogDeleteVisible = true;
      this.form.id = row.id;
    },
    confirmDelete() {
      this.dialogDeleteVisible = false;
      return this.$orderApi.deleteOrder(
        this.form.id,
      ).then(() => {
        this.getData();
      }).catch((res) => {
        if (res.code === 40000) {
          this.$message({
            showClose: true,
            message: '该目仍然在被使用',
            type: 'error',
          });
        } else if (res.code === 50000) {
          this.$message({
            showClose: true,
            message: '服务器错误',
            type: 'warning',
          });
        }
      });
    },
    confirmEdit() {
      this.dialogFormVisible = false;
      if (this.isUpdate) {
        // 更新
        return this.$orderApi.updateOrder(
          this.form.id, this.form.code, this.form.name,
        ).then(() => {
          this.getData();
        }).catch((res) => {
          if (res.code === 40000) {
            this.$message({
              showClose: true,
              message: '该目仍然在被使用',
              type: 'error',
            });
          } else if (res.code === 50000) {
            this.$message({
              showClose: true,
              message: '服务器错误',
              type: 'warning',
            });
          }
        });
      }
      // 添加
      return this.$orderApi.insertOrder(
        0, this.form.code, this.form.name,
      ).then(() => {
        this.getData();
      }).catch((res) => {
        if (res.code === 50000) {
          this.$message({
            showClose: true,
            message: '服务器错误',
            type: 'warning',
          });
        } else if (res.code === 40001) {
          this.$message({
            showClose: true,
            message: '无效的id',
            type: 'error',
          });
        }
      });
    },
    pageUp() {
      this.cur += 1;
      this.pageClick();
    },
    pageDown() {
      this.cur -= 1;
      this.pageClick();
    },
    btnClick(data) { // 页码点击事件
      if (data !== this.cur) {
        this.cur = data;
      }
      // 根据点击页数请求数据
      this.getData(this.cur * this.totalPage, this.totalPage);
    },
    pageClick() {
      // 根据点击页数请求数据
      this.getData(this.cur * this.totalPage, this.totalPage);
    },
  },
  computed: {
    // 分页
    indexs() {
      let left = 1;
      let right = this.all;
      const ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2;
          right = this.cur + 2;
        } else if (this.cur <= 3) {
          left = 1;
          right = 5;
        } else {
          right = this.all;
          left = this.all - 4;
        }
      }
      while (left <= right) {
        ar.push(left);
        left += 1;
      }
      return ar;
    },
  },
};
</script>

<style lang="scss" scoped>

/*分页*/
.page-bar {
  width: 80%;
  position: fixed;
  margin: 0 auto 0 35%;
  bottom: 10vh;
}

ul, li {
  margin: 0;
  padding: 0;
}

li {
  list-style: none
}

.page-bar li:first-child > a {
  margin-left: 0
}

.page-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #5D6062;
  cursor: pointer;
  margin-right: 20px;
}

.page-bar a:hover {
  background-color: #eee;
}

.page-bar a.banclick {
  cursor: not-allowed;
}

.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #E96463;
  border-color: #E96463;
}

.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0 4px;
  font-size: 12px;
}
</style>
