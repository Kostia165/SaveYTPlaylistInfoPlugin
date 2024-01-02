# YouTube-Save-Playlist-Info

<p>A WEB extension that saves information about any playlist on youtube. You can ask why it's needed.
Youtube can hide/remove some videos and you won't know about it. It means that information about some saved videos will be lost.
This extension helps to save short info about video and maybe you will find alternative video if it's needed later.</p>

<p>To use extension you should install extension in browser, open URL like "https://www.youtube.com/playlist?list=LL". Scroll to the end of the playlist</p>

<p>Button "Show Data" will show name of playlist and amount of meta infos about video from playlist that's ready to download. Amount can be less than actual number of videos because some videos can be hidden or you didn't load all playlist on the current page.</p>

<p>Button "Save Data" will download data about playlist to file in json format.</p>

<p>P.S. Extension have some bug: when you're switching playlists in the left menu. Old loaded meta infos won't be deleted from variable and will be saved together with new data. It has the next consequences: If you load one playlist and afther that load playlist with less amount of videos then data from old playlist will be in the file with infos from the current playlist.</p>

<p>P.S. Extension was tested in Opera.</p>