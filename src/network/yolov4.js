import http from '@/network/axios.config';
import baseURLs from '@/network/baseURLs';

const baseURL = baseURLs.yoloURL;

const yolov4Api = {
  testAccuracy() {
    const url = `${baseURL}/accuracy`;
    return http.get(url);
  },
  startTrain() {
    const url = `${baseURL}/train`;
    return http.post(url);
  },
  stopTrain() {
    const url = `${baseURL}/train`;
    return http.delete(url);
  },
  getTotalLoss() {
    const url = `${baseURL}/loss`;
    return http.get(url);
  },
  cancelAddTrainData() {
    const url = `${baseURL}/trainData`;
    return http.delete(url);
  },
  confirmAddTrainData() {
    const url = `${baseURL}/trainData`;
    return http.post(url);
  },
  getAllTrainedModels() {
    const url = `${baseURL}/trainedModels`;
    return http.get(url);
  },
  updateTrainModel(path) {
    const url = `${baseURL}/updateTrainModel`;
    return http.post(url, {
      path,
    });
  },
  updateTrainPercent(percent) {
    const url = `${baseURL}/trainPercent`;
    return http.post(url, {
      percent,
    });
  },
  getAllClasses() {
    const url = `${baseURL}/classes`;
    return http.get(url);
  },
  writeClasses(classes) {
    const url = `${baseURL}/classes`;
    return http.post(url, {
      classes,
    });
  },
  checkTrainFiles() {
    const url = `${baseURL}/check`;
    return http.get(url);
  },
  getAllTrainData() {
    const url = `${baseURL}/allTrainData`;
    return http.get(url);
  },
  getAvailableTrainData() {
    const url = `${baseURL}/availableTrainData`;
    return http.get(url);
  },
};

export default yolov4Api;
