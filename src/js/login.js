Vue.component('login',{
    data(){
        return {
            login: {
                email: '',
                password: ''}
            }
    },
    methods:{
        onLogin(e){
            AV.User.logIn(this.login.email, this.login.password).then((user) => {
                user = user.toJSON()
                this.$emit('login',user)
                //this.currentUser.objectId = user.objectId
                //this.currentUser.email = user.email
                //this.loginVisible = false
            }, (error) => {
                if (error.code === 211) {
                    alert('邮箱不存在')
                } else if (error.code === 210) {
                    alert('邮箱和密码不匹配')
                }
            })
        },
        onClickSignUp(){
            this.$emit('goToSignUp')
        }
    },
    template:`
        <div class="login" v-cloak>
        <form @submit.prevent="onLogin" class="form">
            <h2>登陆</h2>
            <button type=button @click="$emit('close')">关闭</button>
            <div class="row">
                <label>邮箱</label>
                <input v-model="login.email" type="text">
            </div>
            <div class="row">
            <label>密码</label>
                <input v-model="login.password" type="text">
            </div>
            <div class="action">
                <button type="submit">提交</button>
                <a @click="onClickSignUp" href="#">注册</a>
            </div>
        </form>
    </div>
    `,

})