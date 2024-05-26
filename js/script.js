const user = "";// LastFm User id
const api_key = '';//Add your API KEY
const limit = '5';
var page = "1";
const api_url ='http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user='+user+'&api_key='+api_key+'&limit='+limit+'&page='+page+'&format=json';
//console.log(api_url);


async function getLastFm() {

    const response = await fetch(api_url);
    const Data = await response.json();
    const totalPages = Data.recenttracks['@attr'].totalPages;
    const total = Data.recenttracks['@attr'].total;
    const track = Data.recenttracks.track; 
    var trackNumber = "1";
    console.log('Total Pages: '+totalPages);
    console.log('Scroblles: '+total);


    //Track details
    Object.keys(track).forEach(key => {
        //console.log(key, track[key]);
        //const { name , artist , album , url , image , date } = track[key];
        const trackDetails = track[key];
        
        const track_Info = document.createElement('div');
        const track_Name = document.createElement('div');
        const track_Artist = document.createElement('div');
        const track_Album = document.createElement('div');
        const track_Page = document.createElement('div');
        const track_Art = document.createElement('div');
        const tracks = document.getElementById("track");
        
        track_Info.classList.add('trackInfo');
        track_Name.classList.add('trackName');
        track_Artist.classList.add('trackArtist');
        track_Album.classList.add('trackAlbum');
        track_Page.classList.add('trackPage');
        track_Art.classList.add('trackArt');


                
        track_Info.classList.add('trackInfo');
        tracks.appendChild(track_Info);


        //Now Playing
        if(trackDetails['@attr']){
            //console.log(trackDetails['@attr'].nowplaying);
            const nowPlaying = trackDetails['@attr'].nowplaying;


            console.log('Now Playing');

           // document.write("<b>Now Playing</b><br>");
           
            

        }

        //trackNumber
        else{
            console.log(trackNumber);
           // document.write('<br>'+trackNumber+'<br>');
            trackNumber++;
        }
             
        //Name
        const trackName = trackDetails.name;
        console.log('Name: '+trackName);

        //document.write("Name: "+trackName+'<br>')

       //////////////////////////////////
        track_Info.appendChild(track_Name);
        track_Name.innerHTML = trackName;


        //Artist
        const trackArtist = trackDetails.artist['#text'];
        console.log('Artist: '+trackArtist);

       // document.write("Artist: "+trackArtist+'<br>')

       //////////////////////////////////
       track_Info.appendChild(track_Artist);
       track_Artist.innerHTML = trackArtist;

  
        
        //Album
        const trackAlbum = trackDetails.album['#text'];
        console.log('Album: '+trackAlbum);

        //document.write("Album: "+trackAlbum+'<br>')

        //////////////////////////////////
        track_Info.appendChild(track_Album);
        track_Album.innerHTML = trackAlbum;
            

        //URL
        const trackURL = trackDetails.url;
        console.log('URL: '+trackURL);

       // document.write("<a href="+trackURL+">"+trackURL+"</a><br>")

       //////////////////////////////////
       track_Info.appendChild(track_Page);
       track_Page.innerHTML = "<a href="+trackURL+"><b>"+trackName+"</b>-"+trackArtist+"</a><br>";

        //Date
        /*Object.values(date).forEach(val => {
            console.log(val);
        });*/

        //Image
        Object.values(trackDetails.image).forEach(val => {

            //Small
           if(val.size=='small'){
            const imageSmall = val['#text'];
            //console.log(imageSmall);
           }

           //Medium
           if(val.size=='medium'){
            const imageMedium = val['#text'];
            //console.log(imageMedium);
           }

           //Large
           if(val.size=='large'){
            const trackImage_Large = val['#text'];
           // console.log(trackImage_Large);
            //document.write("<a href="+trackImage_Large+">"+trackImage_Large+"</a><br><br>")
           }

           //Extralarge
           if(val.size=='extralarge'){
            const trackImage_Extralarge = val['#text'];
            console.log(trackImage_Extralarge);
          //  document.write("<a href="+trackImage_Extralarge+">"+trackImage_Extralarge+"</a><br><br>")
        
          ///////////////////////////////////
          track_Info.appendChild(track_Name);
          track_Name.innerHTML = trackName; 

          // document.write("<img src="+trackImage_Extralarge+">")

          /////////////////////////////////
          track_Info.appendChild(track_Art);
          track_Art.innerHTML = "<img src="+trackImage_Extralarge+">"

           }

           });
           
           console.log('--------------------------------------------------------------------------');
          

           
        });

    };
    getLastFm();