//全局过滤器
import Vue from 'vue'
import moment from 'moment'
//日期过滤
Vue.filter('formatDate',value=> moment(value).format('YYYY年MM月DD日'));

//文案转换 statusLabel = [{title:'hello',value:'world}]  status='world
Vue.filter('txtExchange',(status,statusLabel)=>{
    return statusLabel[statusLabel.findIndex(r=>r.value == status)].title;
 });
