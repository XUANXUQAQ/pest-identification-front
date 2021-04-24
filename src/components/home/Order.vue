<!--
 * @Description: 目管理
-->
<template>
  <div>
    <div style="
    position: relative;
    left: 60%;
   ">
      <el-button
        style="position: relative; left: -60%"
        type="success"
        size="small"
        icon="el-icon-circle-check-outline"
        @click="showAddForm"
      >
        添加
      </el-button>
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
      <el-input v-model="searchValue" placeholder="请输入名称" style="width: 15%"></el-input>
      <el-button round @click="getData(selectValue)">搜索</el-button>
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
    <!--分页-->
    <div class="page-bar">
      <ul>
        <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
        <li v-if="cur===1"><a class="banclick">上一页</a></li>
        <li v-for="index in indexs" v-bind:class="{ 'active': cur === index}">
          <a v-on:click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="cur!==all"><a v-on:click="cur++,pageClick()">下一页</a></li>
        <li v-if="cur === all"><a class="banclick">下一页</a></li>
        <li><a>共<i>{{all}}</i>页</a></li>
      </ul>
    </div>

    <el-dialog v-bind:title="dialogTitle" :visible="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" class="form-input" :disabled="isIdDisabled"></el-input>
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
      screenWidth: document.body.clientWidth - 250, // 屏幕尺寸
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
      isIdDisabled: false,
      formLabelWidth: '120px',
      dialogTitle: '',
      dialogDeleteVisible: false,
    };
  },
  created() {
    this.getData();
  },
  // 钩子函数
  mounted() {
    const that = this;
    window.onresize = () => (() => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth - 250;
    })();
  },
  methods: {
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
      this.isIdDisabled = false;
      this.form.id = 0;
      this.form.code = '';
      this.form.name = '';
    },
    showUpdateForm(row) {
      this.dialogFormVisible = true;
      this.dialogTitle = '正在修改目';
      this.isIdDisabled = true;
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
      );
    },
    confirmEdit() {
      this.dialogFormVisible = false;
      if (this.isIdDisabled) {
        // 更新
        return this.$orderApi.updateOrder(
          this.form.id, this.form.code, this.form.name,
        );
      }
      // 添加
      return this.$orderApi.insertOrder(
        this.form.id, this.form.code, this.form.name,
      );
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
        left++;
      }
      return ar;
    },
  },
};
</script>

<style lang="scss" scoped>

/*分页*/
.page-bar{
  width: 80%;margin-left: 35%;margin-right: auto;margin-top: 3%;
}
ul,li{
  margin: 0;
  padding: 0;
}
li{
  list-style: none
}
.page-bar li:first-child>a {
  margin-left: 0
}
.page-bar a{
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
.page-bar a:hover{
  background-color: #eee;
}
.page-bar a.banclick{
  cursor:not-allowed;
}
.page-bar .active a{
  color: #fff;
  cursor: default;
  background-color: #E96463;
  border-color: #E96463;
}
.page-bar i{
  font-style:normal;
  color: #d44950;
  margin: 0 4px;
  font-size: 12px;
}
</style>
