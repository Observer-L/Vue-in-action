const Time = {
    // 获取当前时间戳
    getUnix: function () {
        const date = new Date();
        return date.getTime();
    },
    // 获取今天0点0分0秒的时间戳
    getTodayUnix: function () {
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取今年1月1日0点0分0秒的时间戳
    getYearUnix: function () {
        const date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取标准年月日
    getLastDate: function (time) {
        const date = new Date(time);
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    // 转换时间
    getFormatTime: function (timestamp) {
        const now = this.getUnix(); // 当前时间戳
        const today = this.getTodayUnix(); // 今天0点时间戳
        const year = this.getYearUnix(); // 今年0点时间戳
        const timer = (now - timestamp) / 1000; // 转换为秒级时间戳
        let tip = ''; // 要写入的字符串

        if (timer <= 0) {
            // 当给定的时间为现在或将来时
            tip = '刚刚';
        } else if (Math.floor(timer / 60) <= 0) {
            tip = '刚刚';
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && (timestamp - today >= 0)) {
            tip = Math.floor(timer / timer < 3600) + '小时前';
        } else if (timer / 86400 <= 31) {
            tip = Math.ceil(timer / 86400) + '天前'; // 对天数向上取整
        } else {
            // 如果大于1个月则直接显示日期
            tip = this.getLastDate(timestamp);
        }
        return tip;
    },
    // 获取两个日期的之间的年月日数目
    getYMD: function (timestamp) {
        const now_date = new Date();
        const birth_date = new Date(timestamp);
        let timer = (now_date - birth_date);
        const msPerDay = 1000 * 60 * 60 * 24;
        const years = Math.floor(timer / msPerDay / 365)
        timer -= years * 365 * msPerDay;
        const month = Math.floor(timer / msPerDay / 31)
        timer -= month * 31 * msPerDay;
        const days = Math.floor(timer / msPerDay)
        let tip = years + '岁' + month + '个月' + days + '天';
        return tip;
    },
    // 获取出生日期距今天数
    // 支持出生天数转年龄
    // 支持转换为具体年龄
    getBirthday: function (timestamp, detail) {
        const now = this.getUnix();
        const timer = (now - timestamp) / 1000;
        // 如果没有在修饰符中指定或者年龄不到一岁则只获取距今天数
        if (detail === undefined || timer / 86400 <= 31) {
            tip = Math.ceil(timer / 86400) + '天';
        }
        // 获取具体年龄
        else if (detail) {
            tip = this.getYMD(timestamp);
        } else {
        // 不具体且年龄向上取整
            tip = Math.ceil((timer / 86400) / 365) + '岁';
        }
        return tip;
    }
}

Vue.directive('time', {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        // 设置定时器，每分钟更新
        el.__timeout__ = setInterval(function () {
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 60000);
    },
    unbind: function (el) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
});

Vue.directive('birthday', {
    bind: function (el, binding) {
        el.innerHTML = Time.getBirthday(binding.value);
        // 可选项
        if (binding.modifiers.age) {
            binding.modifiers.detail === true ? el.innerHTML = Time.getBirthday(binding.value, true) : el.innerHTML = Time.getBirthday(binding.value, false);
        }

    }
})