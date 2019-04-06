
window.addEventListener('load', function() {
    var app4 = new Vue({
        el: '#app-4',
        data: {
            result_artist:"Bag Raiders",
            artist1:"Pink",
            artist2:"Daft punk",
        }
    });

    var params = getAllUrlParams();
    if(!typeof params.artist1 === undefined) {
        app4.artist1 = params.artist1;
    }else{
        app4.artist1 = "Daft Punk";
    }

    if(!typeof params.artist2 === undefined) {
        app4.artist2 = params.artist2;
    } else {
        app4.artist2 = "Bag Raiders";
    }

    if(!typeof params.result_artist === undefined) {
        app4.result_artist = params.result_artist;
    } else {
        app4.result_artist = "Chromeo";
    }

    console.log( params.artist1 + ", " +  params.artist2);
});