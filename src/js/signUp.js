window.SignUp ={
    data(){
        return {
            signUp: {
                email: '',
                password: ''}
        }
    },
    methods:{
        onSignUp(e){
            const user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then((user) => {
                alert('注册成功')
                user = user.toJSON()
                this.$emit('signUp',user)
                this.$router.push({path:'/'})
                window.location.reload()
                //this.currentUser.objectId = user.objectId
                //this.currentUser.email = user.email
                //this.signUpVisible = false
            }, (error) => {
                alert(error.rawMessage)
            })
        },
        onClickLogin(e){'goToLogin'},
    },
    template:`
        <div class="signUp" v-cloak>
            <div class="signupTopBar">
                <h2>注册</h2>
            </div>
            <form @submit.prevent="onSignUp" class="form">
                <div class="row">
                    <input v-model="signUp.email" placeholder="邮箱">
                </div>
                <div class="row">
                    <input type="password" v-model="signUp.password" placeholder="密码">
                </div>
                <div class="action">
                    <p>已注册账号？去登陆<router-link class="sign-up" to="/login">登陆</router-link></p>
                    <button type="submit">提交</button>
                </div>
                   <router-link class="close" to="/">回到首页</router-link>
                    <p><i>Designed By <a href="https://github.com/JenvyXU" target="_blank">JenvyXU</a></i></p>
            </form>
        </div>
    `,
}
Vue.component('signUp',SignUp)