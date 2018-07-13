window.Login={
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
                console.log(user)
                //this.$emit('login',user)
                this.$emit('login',user)
                this.$router.push({path:'/'})
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
       <div class="topBar">
            <h2>登陆</h2>
        </div>
        <form @submit.prevent="onLogin" class="form">
            <div class="row">
                <input v-model="login.email" type="text" placeholder="邮箱">
            </div>
            <div class="row">
                <input v-model="login.password" type="password" placeholder="密码">
            </div>
            <div class="action">
            <p>还没账号？去注册<router-link class="sign-up" to="/signUp">注册</router-link></p>
                <button type="submit">提交</button>           
            </div>
            <router-link class="close" to="/">回到首页</router-link>
            <p><i>Designed By <a href="https://github.com/JenvyXU" target="_blank">JenvyXU</a></i></p>
        </form>
    </div>
    `,
}

Vue.component('login',Login
 )