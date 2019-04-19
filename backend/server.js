let Spotify = require('node-spotify-api')
const bodyParser = require("body-parser");
const expressValidator = require('express-validator')
const {body} = require('express-validator/check')
const express = require('express')
const app = express()
const port = 3000

// setup midle ware to use bodyparser to parse url's
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator())

// remap console.log to be just p()
const p = (...args) => {
    console.log(...args)
}
const pp = (...args) => {
    console.log(JSON.stringify(...args))
}

let spotify = new Spotify({
    id: "5341c5ff86ab4dfa8f2b656cd47bb3c3",
    secret: "d34125bde2054240bbebb6c219999fad"
})

function artists_ids(arr) {
    return arr.map((name, val) => {
        return get_artist_id(name)
    })
}


function get_artist_id(name) {
    return spotify.search({type: 'artist', query: name})
        .then((response) => {
            return response.artists.items[0].id
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
}

function get_artist_id_alt(name) {
    return spotify.search({type: 'artist', query: name})
}

function get_related_artists(artists_ids) {
    return artist_ids.map((artist_id) => {
        return get_related_artist(artist_id)
    })
}


console.log("Starting Music blender backend")


app.get("/", (request, responce) => {
    responce.sendfile("./backend/index.html");
})


// app.post('/api/v1/related-artist', (req, res) => {
//     var user_name = req.body.user;
//     var password = req.body.password;
//     let artist1 = req.body.artist1;
//     let artist2 = req.body.artist2;
//
//     console.log(`artist1: ${artist1}, artist2: ${artist2}`)
//
//     let id = spotify.search({type: 'artist', query: artist1})
//
//
//     id.then((data) => {
//         let artist_id = data.artists.items[0].id
//         // console.log(JSON.stringify(id));
//         console.log(id)
//         // responce.send(id)
//         // res.end("yes");
//
//         spotify.request(`https://api.spotify.com/v1/artists/${artist_id}/related-artists`)
//             .then((data) => {
//                 console.log("here")
//                 let result = data.artists.map((currentValue) => {
//                     return currentValue.name
//                 })
//                 res.send(result)
//                 res.end("yes");
//             })
//             .catch((err) => {
//                 console.error('Error occurred: ' + err)
//             })
//     }).catch((err) => {
//         console.log(err)
//         reject(err)
//     })
//
// });


// app.get("/api/v1/related-artists", (request, responce) => {
//
//     let promises = artists_ids(["the beatles", "muse", "wow"])
//     Promise.all(promises).then((artist_ids) => {
//         let results = get_related_artists(artists_ids)
//         Promise.all(results).then((array) => {
//             console.log(array)
//             responce.send(array)
//         })
//     })
//
// })

// app.post("/api/v1/related-artists/:name", (request, responce) => {
//     responce.send("__TODO___")
// })

app.post('/api/v1/related-artist', (request, responce) => {
    p(request.body.artist1)

})

function artist_id(name) {
    return spotify.search({type: 'artist', query: name, limit: 1})
}

async function accumulate_results(artist1, artist2, responce) {
    p("Waiting for both artist api calls")
    try {
        let result1 = await artist_id(artist1)
        let result2 = await artist_id(artist2)
        let artist1_id = result1.artists.items[0].id;
        let artist2_id = result2.artists.items[0].id;
        p(`${result1.artists.items[0].id},${result2.artists.items[0].id}`)
        responce.send({
            artist1: artist1_id,
            artist2: artist2_id
        })
    } catch (e) {
        p(e)
        responce.send("ERROR" + e.toString())
    }
}


//
app.get('/api/v1/artist_id/', async (request, response) => {
    p("/api/v1/artist_id/")
    p(JSON.stringify(request.query))
    let artist_name = request.query.artist1
    try {
        let artist_json = await artist_id(artist_name)
        let id =  artist_json.artists.items[0].id
        response.send(id)
    } catch (e) {
        p(e)
        response.send("Error: " + e.toString())
    }
})




function get_artist_id_names(hash) {
    return hash.artists.map((artist) => {
        let pair = {}
        pair[artist.name] = artist.id
        return pair
    })
}

function get_artist_infos(hash) {
    return hash.artists.map((artist) => {
        //the first image is always the largest
        let img = artist.images[2]
        let image = {
            "id": artist.id,
            "name": artist.name,
            "img": img.url,
            "height": img.height,
            "width": img.width,
            "url": artist.external_urls.spotify
        }
        image[artist.name] = artist.id
        return image
    })
}

function get_related_artist(artist_id) {
    return spotify.request(`https://api.spotify.com/v1/artists/${artist_id}/related-artists`)
}

//http://localhost:3000/api/v1/related_artist/?artist1_id=4tZwfgrHOc3mvqYlEYSvVi&artist2_id=12Chz98pHFMPJEknJQMWvI
app.get('/api/v1/related_artist', async (request, response) => {
    let artist_id = request.query.id;
    p("/api/v1/related_artist")
    pp(request.query)
    p(artist_id)
    try {
        let similar_artists = await spotify.request(`https://api.spotify.com/v1/artists/${"0SwO7SWeDHJijQ3XNS7xEE"}/related-artists`) //get_related_artist(artist_id)
        pp(similar_artists)

        let names_arr = get_artist_id_names(similar_artists)
        let images_large_arr = get_artist_infos(similar_artists)

        pp(names_arr)
        pp(images_large_arr)

        response.send(images_large_arr)
        // response.end("done")
    } catch (e) {
        response.send(e)
    }

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))