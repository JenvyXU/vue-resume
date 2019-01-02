require('css/share.less')
let Share=Vue.component('share',{
    props:['share-link'],
    template:`
    <div class="share" v-cloak>
        <h2>       
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-share"></use>
            </svg>
            分享链接
        </h2>
        <div class="closeShare" @click="$emit('close')">  
                  <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-close"></use>
                  </svg></div>
        <textarea readonly>{{shareLink}}</textarea>
    </div>
    `,
})
module.exports=Share