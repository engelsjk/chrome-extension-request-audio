# chrome-extension-request-audio

<img src="icons/icon-2.png" width="48">

A Chrome extension for turning webpage HTTP request activity into audio. And it happens to sound like an old 56k modem!

<a href="https://s3.amazonaws.com/github-engelsjk/chrome-extension-request-audio/request-audio-google.mp3" target="_blank">Audio Clip - Google</a>

<a href="https://s3.amazonaws.com/github-engelsjk/chrome-extension-request-audio/request-audio-youtube-video.mp3" target="_blank">Audio Clip - Youtube Video</a>

### Background

I've always been fascinated by the idea of converting or transducing data into something that our human senses can perceive. The brain has an uncanny ability to detect and analyze patterns with both sight and sound. And maybe touch? Less so smell. Don't get me started on taste.

Because of this, I've had some small prototypes in mind for converting various "data" sources, mostly event-based, into sounds. I'm convinced that we're probably better than we actually are at detecting meaning and patterns in sounds. To pick up on trends in data or just as a way to experience the data in a way beyond just looking at alphanumerics on a webpage, or a database, or a spreadsheet. Or the things that happen beyond the veil of human perception, like radio waves, WiFi or internet traffic.

### Web Sites

To that end, it was both a blessing and a curse to learn how web sites work. Less so on the frontend (like HTML, CSS, browser rendering, etc) and more on the backend, like how web requests are sent and received, how the application/transport/internet/network layers work, etc. I looked under the hood once, and now I keep peaking behind every interesting web site or web service I come across. This often leads to finding new and interesting API's (including undocumented API's), web scraping for useful information or simply just learning more about the structure of a popular web site.

### Requests-Audio

With this in mind, I often find myself opening the dev console in Chrome and watching the network activity of the websites I use. I had the idea a while back to make that network activity more visible to the user, so you would know how often a video from Netflix is being buffered, or how many Javascript libraries are being loaded by CNN, or just how many separate files and webcalls make up a webpage. Basically all of the activity behind the scenes to show what it takes to run the websites that we all use.

To do this, I decided to try and make a Chrome extension that turned HTTP request into sounds: Requests-Audio!

