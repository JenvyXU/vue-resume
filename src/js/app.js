
var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1992年1月',
            jobTitle: '前端工程师',
            phone: '138xxxxxxxx',
            email: 'example@example.com',
        }
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value;
        }
    }
});