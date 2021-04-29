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
        搜索种
      </span>
      <el-input v-model="searchValue" placeholder="请输入名称" style="width: 30%"></el-input>
      <el-button round @click="getData(selectValue)">搜索</el-button>
      </span>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :show-overflow-tooltip="true" align="center" label="标本图片" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <el-popover placement="right" title="" trigger="hover">
            <el-image :src="getImageFromBase64(row.image)"></el-image>
            <el-image slot="reference" :src="getImageFromBase64(row.image)" :alt="getImageFromBase64(row.image)"
                      style="max-height: 50px;max-width: 50px"></el-image>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="生态图片" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <el-button @click="showInhabitantImageList(row.image)">
            查看所有图片
          </el-button>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="代码" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="名称" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="拉丁学名" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.latin }}</span>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="危害植物" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.plant }}</span>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="分布区域" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.area }}</span>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="属名称" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.genus_name }}</span>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="科名称" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.family_name }}</span>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="目名称" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <span>{{ row.order_name }}</span>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="Actions" :width="(screenWidth / 10) + 'px'">
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-circle-check-outline"
            style="width: 45%"
            @click="showUpdateForm(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-circle-check-outline"
            style="width: 45%"
            @click="showDeleteForm(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
        <el-form-item label="拉丁学名" :label-width="formLabelWidth">
          <el-input v-model="form.latin" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="危害植物" :label-width="formLabelWidth">
          <el-input v-model="form.plant" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="分布区域" :label-width="formLabelWidth">
          <el-input v-model="form.area" autocomplete="off" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="属名称" :label-width="formLabelWidth">
          <el-select filterable v-model="form.genusId" placeholder="请选择属名称">
            <el-option
              v-for="item in allGenus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科名称" :label-width="formLabelWidth">
          <el-input v-model="form.familyName" autocomplete="off" :disabled="true" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="目名称" :label-width="formLabelWidth">
          <el-input v-model="form.orderName" autocomplete="off" :disabled="true" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="标本图片" :label-width="formLabelWidth" class="form-input">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="生态图片" :label-width="formLabelWidth" class="form-input">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture"
            :on-change="handleInhabitantChange"
            :before-remove="beforeRemove"
            :on-remove="handleInhabitantRemove"
            multiple
            :limit="9"
            :on-exceed="handleInhabitantExceed"
            :file-list="form.inhabitantImages"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
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

    <el-dialog
      title="生态图片"
      :visible="dialogInhabitantVisible"
      width="30%">
      <span></span>
      <el-image :src="item.image" v-for="item in inhabitantImageList" height="90%" list-type="picture"></el-image>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogInhabitantVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Species',
  data() {
    return {
      listLoading: false,
      list: null, // 所有结果
      all: 1, // 总页数
      cur: 1, // 当前页码
      totalPage: 9, // 当前条数
      screenWidth: document.body.clientWidth - 260, // 屏幕尺寸
      searchValue: '', // 搜索框中的值
      options: [{
        value: 'id',
        label: 'ID',
      },
      {
        value: 'name',
        label: '名称',
      }],
      selectValue: '', // 下拉框中选择id还是name
      dialogFormVisible: false,
      dialogInhabitantVisible: false,
      form: {
        id: 0,
        code: '',
        name: '',
        latin: '',
        plant: '',
        area: '',
        genusName: '',
        genusId: '',
        familyName: '',
        familyId: 0,
        orderName: '',
        orderId: '',
        image: '',
        inhabitantImages: [{
          name: '',
          url: '',
        }],
      },
      isUpdate: false,
      formLabelWidth: '120px',
      dialogTitle: '',
      dialogDeleteVisible: false,
      allGenus: null,
      fileList: [],
      inhabitantImageList: [],
      setPageSizeCount: 0,
      isWindowResized: false,
    };
  },
  // 钩子函数
  mounted() {
    this.setPageSize();
    this.getData();
    this.getAllGenus();
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
          result = await this.$speciesApi.getSpeciesById(this.searchValue);
        } else if (selectValue === 'name') {
          result = await this.$speciesApi.getSpeciesByName(this.cur, this.totalPage, this.searchValue);
        } else {
          result = await this.$speciesApi.getAllSpecies(this.cur, this.totalPage);
        }
      } else {
        result = await this.$speciesApi.getAllSpecies(this.cur, this.totalPage);
      }
      this.all = result.pages;
      const items = result.data;
      this.list = items.map((v) => {
        this.$set(v, 'edit', false);
        return v;
      });
      this.listLoading = false;
    },
    autoInsertFamilyAndOrder() {
      const { genusId } = this.form;
      this.$familyGenusApi.selectFamilyByGenusId(genusId).then((res) => {
        res.data.forEach((obj) => {
          this.form.familyId = obj.family_id;
          this.form.familyName = obj.family_name;
          this.$orderFamilyApi.selectOrderByFamilyId(this.form.familyId).then((res2) => {
            res2.data.forEach((obj2) => {
              this.form.orderId = obj2.order_id;
              this.form.orderName = obj2.order_name;
            });
          });
        });
      });
    },
    getImageFromBase64(base64) {
      if (base64) {
        return base64.split('|')[0];
      }
      return '';
    },
    showInhabitantImageList(base64) {
      this.dialogInhabitantVisible = true;
      this.inhabitantImageList = this.getInhabitantImageListFromBase64(base64).map((v) => ({
        name: 'img',
        url: '',
        image: v,
      }));
    },
    getInhabitantImageListFromBase64(base64) {
      if (base64) {
        return base64.split('|')[1].split('&').filter((obj) => (!(typeof obj === 'undefined' || obj === null || obj === '')));
      }
      return [];
    },
    showAddForm() {
      this.dialogFormVisible = true;
      this.dialogTitle = '添加一个种';
      this.isUpdate = false;
      this.form.id = '自动添加';
      this.form.code = '';
      this.form.name = '';
      this.form.latin = '';
      this.form.plant = '';
      this.form.area = '';
      this.form.genusId = '';
      this.form.genusName = '';
      this.form.familyId = 0;
      this.form.familyName = '';
      this.form.orderId = 0;
      this.form.orderName = '';
      this.form.image = '';
      this.form.inhabitantImages = [];
      this.fileList = [];
    },
    showUpdateForm(row) {
      this.dialogFormVisible = true;
      this.dialogTitle = '正在修改种';
      this.isUpdate = true;
      this.form.id = row.id;
      this.form.code = row.code;
      this.form.name = row.name;
      this.form.latin = row.latin;
      this.form.plant = row.plant;
      this.form.area = row.area;
      this.form.genusId = row.genus_id;
      this.form.genusName = row.genus_name;
      this.form.familyId = row.family_id;
      this.form.familyName = row.family_name;
      this.form.orderId = row.order_id;
      this.form.orderName = row.order_name;
      this.form.image = this.getImageFromBase64(row.image);
      this.form.inhabitantImages = this.getInhabitantImageListFromBase64(row.image).map((v) => ({ name: 'img', url: v }));
      this.fileList = [{
        name: 'img',
        url: this.form.image,
      }];
    },
    showDeleteForm(row) {
      this.dialogDeleteVisible = true;
      this.form.id = row.id;
    },
    confirmDelete() {
      this.dialogDeleteVisible = false;
      return this.$speciesApi.deleteSpecies(
        this.form.id,
      ).then(() => {
        this.getData();
      }).catch((res) => {
        if (res.code === 50000) {
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
        return this.$speciesApi.updateSpecies(
          this.form.area, this.form.code, this.form.genusId, this.form.id,
          this.getImageData(this.form.image, this.form.inhabitantImages), this.form.latin, this.form.name, this.form.plant,
        ).then(() => {
          this.getData();
        }).catch((res) => {
          if (res.code === 40000) {
            this.$message({
              showClose: true,
              message: '该种仍然在被使用',
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
      return this.$speciesApi.insertSpecies(
        this.form.area, this.form.code, this.form.genusId, 0,
        this.getImageData(this.form.image, this.form.inhabitantImages), this.form.latin, this.form.name, this.form.plant,
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
    getImageData(image, inhabitantImageList) {
      const tmp = [];
      inhabitantImageList.forEach((v) => {
        tmp.push(v.url);
      });
      const tmpImage = `${image}|`;
      return tmpImage + tmp.join('&');
    },
    async getAllGenus() {
      const resp = await this.$genusApi.selectAllGenus(1, 100);
      this.allGenus = resp.data;
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
    pageDown() {
      this.cur -= 1;
      this.pageClick();
    },
    pageUp() {
      this.cur += 1;
      this.pageClick();
    },
    handleChange(file) {
      const self = this;
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      // eslint-disable-next-line func-names
      reader.onload = function () {
        self.form.image = this.result;
      };
    },
    handleInhabitantChange(file) {
      const self = this;
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      // eslint-disable-next-line func-names
      reader.onload = function () {
        self.form.inhabitantImages.push({ name: 'img', url: this.result });
      };
    },
    handleInhabitantRemove(file) {
      this.form.inhabitantImages = this.form.inhabitantImages.filter((each) => each !== file);
    },
    handleExceed() {
      this.$message.warning('最多仅能添加1个文件');
    },
    handleInhabitantExceed() {
      this.$message.warning('最多仅能添加9个文件');
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
    genusIdCompute() {
      return this.form.genusId;
    },
  },
  watch: {
    genusIdCompute() {
      this.autoInsertFamilyAndOrder();
    },
  },
};
</script>

<style lang="scss" scoped>
/*分页*/
.page-bar {
  width: 80vw;
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

/* dialog */
.form-input {
  width: 80%;
}
</style>
