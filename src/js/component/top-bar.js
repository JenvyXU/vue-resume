require('css/top-bar.less')
let TopBar=Vue.component('top-bar',{
    props:['logout-visible','username','mode','editing'],
    data(){
        return {
        }
    },
    methods:{
        intoEdit:function(e){
            if(!e){
                $('#editButton').text('退出编辑') 
            }else{
                $('#editButton').text('编辑') 
            }
        }
    },
    template:`
        <div class="topBar">
             <div class="left">
                <h1><a href="./">Vue简历编辑器</a></h1>
                <ul class="actions">         
                    <li><button class="button" @click="$emit('print')">打印</button></li>
                    <li><button class="button" @click="$emit('share')">分享</button></li>
                    <li v-show="mode==='edit'"><button id="editButton" class="button" @click="$emit('edit'),intoEdit(editing)">编辑</button></li> 
                    <li><button class="button" @click="$emit('save')">保存</button></li>
                </ul>
            </div>
            <div class="right" v-show="logoutVisible">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                    </svg>
                <div class="userName" v-show="logoutVisible">{{username}}</div>
                <button class="button" v-show="logoutVisible" @click="$emit('logout')">注销</button>
            </div>
        </div>
    `,
})
module.exports=TopBar