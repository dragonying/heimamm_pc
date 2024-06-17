//全局过滤器
import Vue from 'vue'
import moment from 'moment'
//日期过滤
Vue.filter('formatDateTime',value=> moment(value*1000).format('YYYY-MM-DD HH:mm:ss'));
Vue.filter('formatDate',value=> moment(value*1000).format('YYYY-MM-DD'));

//文案转换 statusLabel = [{title:'hello',value:'world}]  status='world
Vue.filter('txtExchange',(status,statusLabel)=>{
    let index = statusLabel.findIndex(r=>r.value == status);
    return index < 0 ? '' : statusLabel[index].title;
 });

 //过滤html标签
 Vue.filter('filterTag',v=>{
    return v.replace(/<.*?>/g,"");
 });
