// 定义一个深拷贝函数  接收目标target参数
export function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
}

//获取随机颜色
export function randomColor() {
    let numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += new String(numArr[Math.floor(Math.random() * (numArr.length))]);
    }
    return color;
}


//获取当前时间
export function getCurrentTime() {
    let date = new Date();
    let year = date.getFullYear(); //获取当前年份
    let mon = date.getMonth() + 1; //获取当前月份
    let da = date.getDate(); //获取当前日
    let h = date.getHours(); //获取小时
    let m = date.getMinutes(); //获取分钟
    let s = date.getSeconds(); //获取秒
    let weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    );
    let day = weeks[date.getDay()]; //获取当前星期几
    if (mon < 10) {
        mon = "0" + mon;
    }
    if (da < 10) {
        da = "0" + da;
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    return year + '年' + mon + '月' + da + '日' + ' ' + h + ':' + m + ':' + s +' '+ day;
}