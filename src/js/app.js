
var app = new Vue({
    el: '#app',
    data: {
        editingName: false,
        loginVisible:false,
        signUpVisible:false,
        signUp:{
            email:'',
            password:'',
        },
        login:{
            email:'',
            password:'',
        },
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
        saveResume(){
            let {id}=AV.User.current()
            let user = AV.Object.createWithoutData('User', id);
            user.set('resume', this.resume);
            user.save();
        },
        onLogin(e){
            AV.User.logIn(this.login.email, this.login.password)
                .then(function (user) {
                console.log(user);
            }, function (error) {
                    if(211===error.code){
                       alert('邮箱不存在')
                    }else if(210===error.code){
                        alert('邮箱和密码不匹配')
                    }
                });
        },
        onLogout(){
            AV.User.logOut()
            alert('登出成功')
            var currentUser = AV.User.current();
        },
        onSignUp(e){
            console.log(this.signUp)
            // 新建 AVUser 对象实例
            const user = new AV.User();
            // 设置用户名
            user.setUsername(this.signUp.email)
            // 设置密码
            user.setPassword(this.signUp.password)
            // 设置邮箱
            user.setEmail(this.signUp.email)
            user.signUp().then(function (user) {
                console.log(user)
            }, function (error) {
            })

        },

        onClickSave(){
            let currentUser=AV.User.current()
            if(!currentUser){
                this.loginVisible=true
            }else{
                this.saveResume()
            }
        },
    }
})