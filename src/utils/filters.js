//全局过滤器
import Vue from 'vue'
import moment from 'moment'
//日期过滤
Vue.filter('formatDateTime', value => moment(value * 1000).format('YYYY-MM-DD HH:mm:ss'));
Vue.filter('formatDate', value => moment(value * 1000).format('YYYY-MM-DD'));

//文案转换 statusLabel = [{title:'hello',value:'world}]  status='world
Vue.filter('txtExchange', (status, statusLabel) => {
   let index = statusLabel.findIndex(r => r.value == status);
   return index < 0 ? '' : statusLabel[index].title;
});

//过滤html标签
Vue.filter('filterTag', v => {
   return v.replace(/<.*?>/g, "");
});
Vue.filter('formatAge', v => {
   return v * 1 < 0 ? '' : `${v}岁`;
});
Vue.filter('formatGender', v => {
   return v == 1 ? '男' : v == 2 ? '女' : '未知';
});

Vue.filter('formatNumber', v => {
   return v * 1 > 10000 ? (v * 1 / 10000).toFixed(2) + '万' : v;
});
Vue.filter('formatSeconds', milliseconds => {
   // 初始化变量
   let seconds = Math.floor((milliseconds / 1000) % 60),
      minutes = Math.floor((milliseconds / (1000 * 60)) % 60),
      hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

   // 保证每个部分都是两位数
   seconds = seconds < 10 ? '0' + seconds : seconds;
   minutes = minutes < 10 ? '0' + minutes : minutes;
   hours = hours < 10 ? '0' + hours : hours;

   // 返回格式化的时间字符串
   return hours + ':' + minutes + ':' + seconds;
});
Vue.filter('formatFileSize', bytes => {
   if (bytes === 0) return '0 Bytes';

   const k = 1024;
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

   const i = Math.floor(Math.log(bytes) / Math.log(k));

   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];

});
