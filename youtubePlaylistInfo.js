let data = {};
let playlist_name = "default";
let oldHref = document.location.href;

const getPlaylistInfo = () =>{
  let allPlaylistVideos

  // Getting videos info
  if (window.location.href.includes('playlist')) {
    //Getting playlist videos on playlist page
    allPlaylistVideos= document.querySelectorAll('ytd-playlist-video-renderer')
  } else {
    //Getting playlist videos of panel on display screen when user is watching playlist video
    allPlaylistVideos= document.querySelectorAll('ytd-playlist-panel-video-renderer')
  }

  allPlaylistVideos.forEach(video => {
    let id_var = video.querySelector("#index").innerHTML
    let text_var = video.querySelector("#meta>h3>a").innerHTML.trim()
    let author_var = video.querySelector("ytd-channel-name .yt-simple-endpoint").innerText

    if (!data[id_var]) {
      data[id_var] = {
        name: text_var,
        author: author_var
      }
    }
  })
}

//Get playlist name
const setPlaylistName = () =>{
  var elem = document.querySelector("#container yt-formatted-string#text")
  if (elem) {
    playlist_name = elem.innerText
  }
  if (playlist_name === "default") {
    setTimeout(()=>{setPlaylistName()}, 500)
  }
}
setPlaylistName()

//Creating button for downloading data about playlist
const downloadButton = document.createElement('button')
downloadButton.innerText = "Download data"
downloadButton.style.position = "fixed"
downloadButton.style.right = "10px"
downloadButton.style.bottom = "10px"
downloadButton.style.width = "100px"
downloadButton.style.height = "40px"
downloadButton.style.backgroundColor = "#FFFFFF"
downloadButton.style.border = "1px solid rgba(0, 0, 0, 0.1)"
downloadButton.style.borderRadius = ".25rem"
downloadButton.style.boxShadow = "rgba(0, 0, 0, 0.02) 0 1px 3px 0"

downloadButton.addEventListener("click", function () {
  let link = document.querySelector('a');
  let string_data = JSON.stringify(data);

  var taBlob = new Blob([string_data], {type: 'text/plain'});
  link.setAttribute('href', URL.createObjectURL(taBlob));
  link.setAttribute('download', `${playlist_name}_playlist_info.json`);
  link.click();
});

downloadButton.addEventListener("mouseover", (event) => {
  downloadButton.style.cursor = "pointer"

  downloadButton.style.borderColor = "rgba(0, 0, 0, 0.15)"
  downloadButton.style.boxShadow = "rgba(0, 0, 0, 0.1) 0 4px 12px"
  downloadButton.style.color = "rgba(0, 0, 0, 0.65)"
});
downloadButton.addEventListener("mouseout", (event) => {
  downloadButton.style.cursor = "default"

  downloadButton.style.border = "1px solid rgba(0, 0, 0, 0.1)"
  downloadButton.style.boxShadow = "rgba(0, 0, 0, 0.02) 0 1px 3px 0"
  downloadButton.style.color = "rgba(0, 0, 0, 1)"
});

document.querySelector("body").appendChild(downloadButton) 


//Creating button for showing data about playlist
const showDataButton = document.createElement('button')
showDataButton.innerText = "Show data"
showDataButton.style.position = "fixed"
showDataButton.style.right = "10px"
showDataButton.style.bottom = "70px"
showDataButton.style.width = "100px"
showDataButton.style.height = "40px"
showDataButton.style.backgroundColor = "#FFFFFF"
showDataButton.style.border = "1px solid rgba(0, 0, 0, 0.1)"
showDataButton.style.borderRadius = ".25rem"
showDataButton.style.boxShadow = "rgba(0, 0, 0, 0.02) 0 1px 3px 0"

showDataButton.addEventListener("click", function () {
  console.info(data)
  var full_data = `
  Loaded video infos: ${Object.keys(data).length};
  Playlist name: ${playlist_name}
  `
  alert(full_data)
});

showDataButton.addEventListener("mouseover", (event) => {
  showDataButton.style.cursor = "pointer"

  showDataButton.style.borderColor = "rgba(0, 0, 0, 0.15)"
  showDataButton.style.boxShadow = "rgba(0, 0, 0, 0.1) 0 4px 12px"
  showDataButton.style.color = "rgba(0, 0, 0, 0.65)"
});
showDataButton.addEventListener("mouseout", (event) => {
  showDataButton.style.cursor = "default"

  showDataButton.style.border = "1px solid rgba(0, 0, 0, 0.1)"
  showDataButton.style.boxShadow = "rgba(0, 0, 0, 0.02) 0 1px 3px 0"
  showDataButton.style.color = "rgba(0, 0, 0, 1)"
});

document.querySelector("body").appendChild(showDataButton) 

console.info("Start plugin")
//Making the extension work
setTimeout(()=>{
  getPlaylistInfo()

  //Watching playlist changes or if the user switches playlists
  new MutationObserver(() => {
    if (oldHref != document.location.href) {
      oldHref = document.location.href
      playlist_name = "default";
      setPlaylistName()
    }
    getPlaylistInfo()
  }).observe(window.location.href.includes('playlist')?
  document.querySelector('.style-scope ytd-section-list-renderer') :
  document.querySelectorAll('div#items')[3],
  {subtree: true, childList: true})
},window.location.href.includes('playlist')?2500:4500)
