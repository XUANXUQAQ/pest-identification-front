<template>
  <div style="height: 90vh">
    <el-card style="width: 20%; height: 400px">
      <div>
        <span style="font-size: 20px">
          深度学习训练集管理
        </span>
      </div>
      <div style="position: relative; left: 10%">
        <div class="training-data">
          所有训练集：{{ allTrainingData }}
        </div>
      </div>

      <div style="position: relative; left: 10%">
        <div class="training-data">
          可用训练集：{{ availableTrainData }}
        </div>
      </div>

      <el-popover
        placement="right"
        :width="400"
        trigger="click"
        style="position: relative; left: 10%"
      >
        <template #reference>
          <el-button type="danger" style="
              margin: 10px;">
            点击查看文件的错误
          </el-button>
        </template>
        <el-tag type="danger">
          不可用的xml文件：
        </el-tag>
        <el-table :height="(Math.min(damagedXml.length, 2)) * 100 + 'px'" :data="damagedXml" style="width: 100%">
          <el-table-column prop="path" label="路径"></el-table-column>
        </el-table>
        <el-tag type="danger">
          不可用的jpg文件：
        </el-tag>
        <el-table :height="(Math.min(damagedJpg.length, 2)) * 100 + 'px'" :data="damagedJpg" style="width: 100%">
          <el-table-column prop="path" label="路径"></el-table-column>
        </el-table>
      </el-popover>
      <div style="margin: 10px">
        <span class="training-data">
          文件保存位置：{{ trainDataDir }}
        </span>
        <el-button @click="dialogUpload = true" type="primary"
                   style="font-size: 14px; margin: 10px 10px 10px 0;position: relative; left: 10%;">点击上传数据集用于训练
        </el-button>
      </div>
    </el-card>

    <div style="height: 20px"></div>

    <el-card style="width: 20%;">
      <div>所有数据类别</div>
      <el-tag style="margin: 5px" :key="eachClass" v-for="eachClass in allClasses">{{ eachClass }}</el-tag>
    </el-card>

    <el-card style="
      position: fixed;left: 29%;margin-left: 20px;width: 69%;height: 720px;top: 2vw;">
      <my-chart style="width: 600px; height: 600px"></my-chart>
      <div style="position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);">
        <div>
          <el-tag style="font-size: 14px; margin-left: 20px; margin-right: 20px">
            训练测试比例：
          </el-tag>
          <el-input style="width: 10%" v-model="trainTestRate"></el-input>
          <el-tag style="font-size: 14px; margin-left: 20px; margin-right: 20px">
            模型精度：
          </el-tag>
          <el-input style="width: 10%" v-model="mAP"></el-input>
        </div>
        <div style="position: fixed; left: 10%; margin-top: 10px">
          <el-button type="success" @click="startTrain">开始训练</el-button>
          <el-button type="danger" @click="stopTrain">停止训练</el-button>
          <el-button type="primary" @click="testAccuracy">测试精度</el-button>
        </div>
      </div>
    </el-card>

    <el-dialog
      title="提示"
      :visible="dialogUpload"
      width="30%">
      <!-- todo 修改为Python神经网络的地址 -->
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-remove="beforeRemove"
        multiple
        :limit="50"
        :on-exceed="handleExceed"
        :file-list="imageList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">请将训练集以zip的格式进行压缩然后上传</div>
          <div class="el-upload__tip">zip文件中包含两个文件夹，分别为JPEGImages和Annotations</div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogUpload = false">取消</el-button>
          <el-button type="danger" @click="confirmUpload">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import MyChart from '@/components/myChart/MyChart';

export default {
  name: 'DashBoard',
  components: {MyChart},
  data() {
    return {
      allTrainingData: '0',
      availableTrainData: '0',
      allClasses: [],
      trainDataDir: '',
      imageList: [],
      damagedXml: [{
        path: 'xml',
      }],
      damagedJpg: [
        {
          path: 'jpg',
        },
        {
          path: 'test2',
        },
        {
          path: 'test3',
        },
        {
          path: 'test4',
        },
      ],
      trainTestRate: 1,
      mAP: 0.8,
      dialogUpload: false,
      transitionName: '',
    };
  },
  methods: {
    confirmUpload() {
      // todo 后端接口确认上传
    },
    cancelUpload() {
      // todo 后端接口取消上传
    },
    handleExceed() {
      this.$message.warning('最多支持50个文件');
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    startTrain() {
      // todo 开始训练
    },
    stopTrain() {
      // todo 结束训练
    },
    testAccuracy() {
      // todo 测试精度
    },
  },
};
</script>

<style lang="scss" scoped>
.training-data {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: 10px;
}

.el-upload__tip {
  font-size: 14px;
}
</style>
