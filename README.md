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

#### How

First, a simple primer on how to make Chrome extensions: <a href="https://robots.thoughtbot.com/how-to-make-a-chrome-extension">https://robots.thoughtbot.com/how-to-make-a-chrome-extension</a>

Next, I knew that I'd be dealing with web requests, so I did a quick read of the Chrome extension documentation on web requests: <a href="https://developer.chrome.com/extensions/webRequest">https://developer.chrome.com/extensions/webRequest
</a>

That documentation provided a good background on what I thought I might need to do between content and background scripts in order to actually trigger actions (like sounds) from web request activity. But I also did a search for similar Chrome extensions that either did the same thing or something similar. While I didn't find anything related to converting web request activity to sounds, I did find a Chrome extension that showed all web request activity in a seperate tab: <a href="https://chrome.google.com/webstore/detail/web-sniffer/ndfgffclcpdbgghfgkmooklaendohaef?hl=en">Web-Sniffer</a>.

I copied the files of this Chrome extension (<a href="https://stackoverflow.com/questions/14543896/where-does-chrome-store-extensions">how to</a>) into a new directory and started looking at the content and background scripts. I realized that since I wouldn't be displaying anything, and instead just playing audio sounds, then I wouldn't actually need any content scripts and I could accomplish all of this with just a background script.

* Create a series of callbacks for various web request events, based on the <a href="https://developer.chrome.com/extensions/webRequest
"><chrome.webRequest documentation</a>, including onBeforeRequest, onCompleted, and onErrorOccurred.
* Create an audio generator using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API">Web Audio API</a>.
* Assign a set of <a href="https://www.seventhstring.com/resources/notefrequencies.html
">frequency tones</a> to each of the seven main HTTP requests (and one for an error)
  * GET
  * POST
  * PUT
  * HEAD
  * DELETE
  * PATCH
  * OPTIONS
* Define the callback handler functions to start and stop the audio generator tones when any of the HTTP requests are triggered (before requests, completed, or errored).

I also coded a basic enable/disable function for when the extension icon is clicked, in order to turn the sounds on or off. And there's also some event checking in there to only trigger audio tones on HTTP requests that are associated with the active browser tab.

And that's Requests-Audio! 

#### Check It Out
To try it out, just download the directory and <a href="https://developer.chrome.com/extensions/getstarted#unpacked">install it in Chrome as an unpacked extension</a>. An icon should appear in your browser extensions list. Just click on it to enable Requests-Audio, click a tab with a website and try refreshing the website to trigger all of the web requests needed to serve up that page. You should start hearing sounds! You can also open the Developer Tools in Chrome and look at the Network tab to see the web requests happen in real time with the audio.

I recorded audio of some popular websites loading up on a page refresh...

* <a href="https://s3.amazonaws.com/github-engelsjk/chrome-extension-request-audio/request-audio-google.mp3" target="_blank">Audio Clip - Google</a>
* <a href="https://s3.amazonaws.com/github-engelsjk/chrome-extension-request-audio/request-audio-twitter.mp3" target="_blank">Audio Clip - Twitter</a>
* <a href="https://s3.amazonaws.com/github-engelsjk/chrome-extension-request-audio/request-audio-cnn.mp3" target="_blank">Audio Clip - CNN</a>
* <a href="https://s3.amazonaws.com/github-engelsjk/chrome-extension-request-audio/request-audio-foxnews.mp3" target="_blank">Audio Clip - Fox News</a>
* <a href="https://s3.amazonaws.com/github-engelsjk/chrome-extension-request-audio/request-audio-popurls.mp3" target="_blank">Audio Clip - Popurls</a>
* <a href="https://s3.amazonaws.com/github-engelsjk/chrome-extension-request-audio/request-audio-youtube-video.mp3" target="_blank">Audio Clip - Youtube Video</a>

Somewhat of a surprise, it all kind of sounds like a 56k modem! I'm not sure if this is insightful or obvious. Either way, it really gives you a sense of how much network activity is being used by various websites to do everything it "needs" to do, like serve up HTML, images, videos, submit user forms, log user activity, etc. Depending on the website, it can be...a lot.

#### What's Next?

I'm really glad I turned this idea into a reality! While the sounds can quickly become annoying, I think it's a really important way to educate or make people aware of how much goes on behind the scenes of different websites. I hope it empowers people to pay attention to how the web works: how webpages are generated, how actions are logged, how ads are served, 

Some updates to this extension could include anything from visualizing the network activity along with the sounds, adding distinguishing sounds (instruments? volume? pitch? etc?) for more detail of the web requests, like size of file/payload received, the type of the request (text, script, image, xhr, etc), or maybe the domain of the requested URL. There are many options, but it's a balance of capturing more detail in the data vs providing a limited array of sounds that the listener is able to process.
