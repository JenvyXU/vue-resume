
var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible:false,
        signUpVisible:false,
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
        },

        showLogin(){this.loginVisible=true},
        saveResume(){},

        onClickSave(){
            let currentUser=AV.User.current()
            if(!currentUser){
                console.log(this);
                this.loginVisible=true
            }else{
                this.saveResume()
            }


        },
    }
})