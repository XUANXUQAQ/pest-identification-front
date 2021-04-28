<template>
  <div style="height: 90vh;">
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
          <el-button type="danger"
                     style="margin: 10px;">
            查看文件的错误
          </el-button>
        </template>
        <el-tag style="margin: 5px" type="danger">
          不可用的xml文件：
        </el-tag>
        <el-table :height="(Math.min(damagedXml.length, 2)) * 100 + 'px'" :data="damagedXml" style="width: 100%">
          <el-table-column prop="path" label="路径"></el-table-column>
        </el-table>
        <el-tag style="margin: 5px" type="danger">
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
                   style="font-size: 14px; margin: 10px 10px 10px 0;position: relative; left: 10%;">
          上传数据集用于训练
        </el-button>
        <el-button style="font-size: 14px; margin: 10px 10px 10px 0;position: relative; left: 10%;"
                   @click="showAvailableModels">修改已经训练好的模型
        </el-button>
      </div>
    </el-card>

    <div style="height: 20px"></div>
    <el-card style="width: 20%; height: 55%">
      <div>所有数据类别</div>
      <el-table
        :data="allClasses"
        :show-header="false"
        height="44vh"
        :stripe="true"
        style="width: 100%">
        <el-table-column
          prop="className"
          label="className">
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="提示"
      :visible="dialogUpload"
      width="30%">
      <el-upload
        :action="modelUpdateUrl"
        :before-remove="beforeRemove"
        multiple
        :limit="5"
        :on-exceed="handleExceed"
        :file-list="imageList"
      >
        <el-button size="small" type="primary">上传</el-button>
        <template #tip>
          <div class="el-upload__tip">请将训练集以zip的格式进行压缩然后上传</div>
          <div class="el-upload__tip">zip文件中包含两个文件夹，分别为JPEGImages和Annotations</div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelUpload">取消</el-button>
          <el-button type="danger" @click="confirmUpload">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible="dialogUpdateModel"
      width="30%">
      <span>
        请选择已存在的模型文件：
      </span>
      <el-select v-model="selectedModelPath" placeholder="请选择">
        <el-option
          v-for="item in modelFileList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogUpdateModel = false">取消</el-button>
          <el-button @click="updateTrainModel(selectedModelPath)" type="success">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-card style="
      position: fixed;left: 29%;margin-left: 20px;width: 69%;height: 94vh;top: 2vw;">
      <span style="position: fixed;left: 33vw;font-size: 18px;">
        损失函数状态
      </span>
      <loss-chart v-bind:properties="lossChartProperties" style="width: 80vw; height: 600px"></loss-chart>
      <div
        style="position:fixed;left:67vw; bottom: 20vh; -webkit-transform:translateX(-50%);transform:translateX(-50%);">
        <div>
          <el-tag style="font-size: 14px; margin-left: 20px; margin-right: 20px">
            训练测试比例：
          </el-tag>
          <el-input style="width: 10%" v-model="trainTestRate"></el-input>
          <el-tag style="font-size: 14px; margin-left: 50px; margin-right: 20px">
            模型精度：{{ mAP }}
          </el-tag>
          <el-tag style="font-size: 14px;">
            当前训练轮数：{{ iterationCount }}
          </el-tag>
        </div>
        <div style="position: fixed; left: 3%; margin-top: 10px">
          <el-button type="primary" @click="updateTrainPercent">修改训练测试比例</el-button>
          <el-button type="success" @click="startTrain">开始训练</el-button>
          <el-button type="danger" @click="stopTrain(true)">停止训练</el-button>
          <el-button type="primary" @click="testAccuracy">测试精度</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import LossChart from '@/components/lossChart/LossChart';
import baseURLs from '@/network/baseURLs';

export default {
  name: 'DashBoard',
  components: {LossChart},
  data() {
    return {
      allTrainingData: '0',
      availableTrainData: '0',
      allClasses: [{
        className: '',
      }],
      trainDataDir: '',
      imageList: [],
      modelFileList: [],
      damagedXml: [{
        path: '',
      }],
      damagedJpg: [{
        path: '',
      }],
      trainTestRate: 1,
      mAP: 0,
      dialogUpload: false,
      dialogUpdateModel: false,
      transitionName: '',
      selectedModelPath: '',
      lossChartProperties: {
        isStart: false,
        lossData: 100,
      },
      modelUpdateUrl: `${baseURLs.yoloURL}/uploadTrainData`,
      iterationCount: 0,
    };
  },
  mounted() {
    setInterval(this.updateLossData, 500);
    this.$yolov4Api.getAllClasses().then((res) => {
      this.allClasses = res.classes.map((v) => ({className: v}));
    });
    this.checkTrainData();
  },
  methods: {
    updateLossData() {
      if (this.lossChartProperties.isStart) {
        this.$yolov4Api.getTotalLoss().then((res) => {
          this.lossChartProperties.lossData = res.loss;
          this.iterationCount = res.iteration;
        }).catch((res) => {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error',
          });
          this.stopTrain();
        });
      }
    },
    confirmUpload() {
      this.dialogUpload = false;
      this.$yolov4Api.confirmAddTrainData().catch(() => {
        this.$message.error('上传失败');
      });
    },
    cancelUpload() {
      this.dialogUpload = false;
      this.$yolov4Api.cancelAddTrainData().catch(() => {
        this.$message({
          showClose: true,
          message: '取消失败',
          type: 'error',
        });
      });
    },
    handleExceed() {
      this.$message({
        showClose: true,
        message: '最多支持5个文件',
        type: 'warning',
      });
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    startTrain() {
      this.lossChartProperties.isStart = true;
      LossChart.clearData();
      this.$yolov4Api.startTrain().catch((res) => {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error',
        });
      });
    },
    stopTrain(isCallback) {
      this.lossChartProperties.isStart = false;
      this.$yolov4Api.stopTrain().then(() => {
        if (isCallback) {
          this.$message({
            showClose: true,
            message: '停止训练需要一定时间，请等几分钟再点击开始训练',
            type: 'success',
          });
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '停止训练失败',
          type: 'error',
        });
      });
    },
    testAccuracy() {
      this.$yolov4Api.testAccuracy().then((res) => {
        this.mAP = res.accuracy;
      });
    },
    updateTrainPercent() {
      this.$yolov4Api.updateTrainPercent(this.trainTestRate).catch(() => {
        this.$message({
          showClose: true,
          message: '输入无效',
          type: 'error',
        });
      });
    },
    showAvailableModels() {
      this.dialogUpdateModel = true;
      this.$yolov4Api.getAllTrainedModels().then((res) => {
        this.modelFileList = res.fileList;
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '获得训练模型失败',
          type: 'error',
        });
      });
    },
    updateTrainModel(path) {
      this.dialogUpdateModel = false;
      this.$yolov4Api.updateTrainModel(path).then(() => {
        this.$message({
          showClose: true,
          message: '修改训练模型成功',
          type: 'success',
        });
      });
    },
    checkTrainData() {
      this.$yolov4Api.checkTrainFiles().then((res) => {
        let tmp = res.xmlList;
        tmp = tmp.map((v) => ({path: v}));
        this.damagedXml = tmp;
        tmp = res.jpgList;
        tmp = tmp.map((v) => ({path: v}));
        this.damagedJpg = tmp;
        this.$yolov4Api.getAllTrainData().then((res2) => {
          this.allTrainingData = res2.num;
        });
        this.$yolov4Api.getAvailableTrainData().then((res3) => {
          this.availableTrainData = res3.num;
        });
        this.$message({
          showClose: true,
          message: '检查成功，有问题的文件会被放到训练集的backup文件夹中',
          type: 'success',
        });
      });
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
