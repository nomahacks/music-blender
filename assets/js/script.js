
window.addEventListener('load', function() {

    var app4 = new Vue({
        el: '#app-4',
        data: {
            todos: []
        },
        methods: {
            greet: function (event) {
                alert('Hello ' )
            }
        }
    });

    function add_artist(artist,image_url){
        app4.todos.push({
            img: image_url,
            text:artist
        })
    }
    setTimeout(()=>{
        add_artist("Bag Raiders","../assets/img/daft_punk_album_art.jpg")
    //    https://semantic-ui.com/images/avatar2/large/matthew.png

    },1000);
});

