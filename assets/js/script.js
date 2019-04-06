
window.addEventListener('load', function() {

    var fake_data = [ [ 'John Lennon',
        'George Harrison',
        'Paul McCartney',
        'The Beach Boys',
        'The Kinks',
        'The Rolling Stones',
        'Bob Dylan',
        'The Hollies',
        'Ringo Starr',
        'The Byrds'],
        ['Simon & Garfunkel',
            'Wings',
            'Buddy Holly',
            'Chuck Berry',
            'Jimi Hendrix',
            'Donovan',
            'Roy Orbison',
            'Badfinger',
            'Eric Clapton',
            'Elvis Presley' ],
        [ 'Placebo',
            'Franz Ferdinand',
            'Kasabian',
            'Editors',
            'Kaiser Chiefs',
            'The Killers',
            'White Lies',
            'Interpol',
            'The Hives',
            'Queens of the Stone Age'],
        ['The Strokes',
            'The White Stripes',
            'The Raconteurs',
            'Wolfmother',
            'Keane',
            'The Fratellis',
            'Blur',
            'The Last Shadow Puppets',
            'Feeder',
            'Radiohead' ],
        [ 'Chingy',
            'Ray J',
            'Pretty Ricky',
            'Baby Bash',
            'B2K',
            'Lloyd',
            'J. Holiday',
            'Bobby V.',
            'Marques Houston',
            'Omarion'],
        ['Mario',
            'Pleasure P',
            'Frankie J',
            'The-Dream',
            'Jagged Edge',
            'Fabolous',
            'Ja Rule',
            'Ginuwine',
            'Keyshia Cole',
            'Ashanti' ] ];
    var app4 = new Vue({
        el: '#app-4',
        data: {
            counter: 0,
            artist1:"Bag Raiders",
            artist2:"Daft punk",
            text:["Odeza","Gramatik","milky chance","VULFPECK","Common ","Blackmill","Deltron3030","Orsten","Kungs & Cookin'","Dodie"]
        },
        methods: {
            greet: function () {
                // alert(fake_data[this.counter]);
                setTimeout(()=> {
                    this.text = fake_data[this.counter];
                },150);
                this.counter += 1;
                console.log("__TODO__");
                console.log(this.counter);
                if(this.counter>=3){
                    this.redirect_to_results_page();
                }
            },
            redirect_to_results_page() {
                var params = `artist1=${this.artist1}&artist2=${this.artist2}&artist2=${this.artist2}`;
                window.location.href = "results.html?" + params;
            }
        }
    });


    function add_artist(artist,image_url){
        // app4.todos.push({
        //     img: image_url,
        //     text:artist
        // })
    }
    setTimeout(()=>{
        // add_artist("Bag Raiders","../assets/img/daft_punk_album_art.jpg")
    //    https://semantic-ui.com/images/avatar2/large/matthew.png
        var params = getAllUrlParams();
        if(!typeof params.artist1 === undefined) {
            app4.artist1 = params.artist1;
        }else{
            app4.artist1 = "First Artist";
        }

        if(!typeof params.artist2 === undefined) {

            app4.artist2 = params.artist2;
        }else{
            app4.artist2 = "Second Artist";
        }

        console.log(params.artist1);
        console.log(params.artist2);
    },1000);
});

