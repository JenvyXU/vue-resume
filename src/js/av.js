var APP_ID = 'v4HsIpokDt9K2aDIqbFimuEa-gzGzoHsz';
var APP_KEY = 'pv9RgNDGM8DMujh9Tg8RA3Ba';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
    words: 'Hello World!'
}).then(function(object) {
    alert('LeanCloud Rocks!');
})