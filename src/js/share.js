Vue.component('share',{
    props:['share-link'],
    template:`
    <div class="share" v-cloak>
        <h2>请把链接分享给面试官</h2>
        <textarea readonly>{{shareLink}}</textarea>
    </div>
    `,
})