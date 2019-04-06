
window.addEventListener('load', function() {

    var app4 = new Vue({
        el: '#app-4',
        data: {
            todos: [],
            text: ["Odeza","Gramatik","milky chance","VULFPECK","Common ","Blackmill","Deltron3030","Orsten","Kungs & Cookin'","Dodie"]
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

