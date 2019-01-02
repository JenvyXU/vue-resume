require('./top-bar.js')
require('./resume.js')
require('./editable-span.js')
require('./editable-textarea.js')
require('./share.js')
require('css/index.less')
require('css/skin.less')
let App=Vue.component('app',{
    props:['resume','logout-visible','current-user','url','display-resume','email','mode'],
    template:`
    <div>        
         <top-bar v-show="mode==='edit'" @save="onClickSave" @share="onShare" :logout-visible="logoutVisible" 
         @print="printResume" @logout="onLogout" @edit="editing=!editing" :username="email" :mode="mode" :editing="editing"></top-bar>
        <main>
            <resume :editing="editing" :mode="mode" :display-resume="displayResume" :resume="resume"></resume>
        </main>   
        <share :share-link="url"  v-show="shareVisible" @close="shareVisible=false"></share>
        <button v-cloak v-if="mode==='preview'" @click="$emit('exit-preview')" class="exitPreview">退出预览</button>
        </div>
    `,
    data(){
        return {
            editing:false,
            shareLink:'',
            shareVisible:false,
            editingName: false,
            previewUser: {
                objectId: undefined,
            },
            previewResume: {},
        }
    },
    methods: {
        onShare(){
            if(this.hasLogin()){
                this.shareVisible=true
            }else{
                alert('请点击保存按钮登录')
            }
        },
        hasLogin () {
            return !!this.currentUser.objectId
        },
        onLogin(user){
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            this.loginVisible = false
        },
        onLogout(e){
            AV.User.logOut();
            alert('注销成功')
            window.location.reload()
        },
        onClickSave(){
            let currentUser = AV.User.current()
            if (!currentUser) {
                this.$router.push('/login')
            } else {
                this.saveResume()
            }
        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId)
            user.set('resume', this.resume)
            user.save().then(() => {
                alert('保存成功')
            }, () => {
                alert('保存失败')
            })
        },
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                console.log(resume);
                return resume
            }, (error) => {
                // 异常处理
            });
        },
        printResume(){
            window.print()
        }
    },
})

module.exports.App=App

