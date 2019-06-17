# Embed

Embeds let you display items from different files or websites that you would use in multiple places but would rather not edit them there (a single file to edit, many places to show), or media files that markdown doesn't handle. The general syntax for embed is `#embed(absoluteUrl embedKind codeTypeOrHTMLAttributes)`. Embed kind is a video, audio, iframe, code, or fragment. Absolute path is something like `/exampleEmbeds/embedjs.js` or `https://cinwell.com`. In order to pass additional or overriding attributes for properties like width, height, or media options for audio/video add arguments at the end `#embed(https://cinwell.com iframe width=autho height=100)`.

## Demonstrations
Some of these describe defaults, and caveats.

### Code

#embed(/exampleEmbeds/embedjs.js code js)

### Fragment
Note that the titles from fragment aren't visible in sidebar. Titles of second and third level are suppose to be shown there with the first level used as browser tab title.

#embed(/exampleEmbeds/fragment.md fragment)

### iFrame
iFrame loads a website, or widget in separate window. Youtube vidoes for example load through iFrame on a non-native website. The defaults are width 100%, and height 400 pixels.

#embed(https://cinwell.com iframe)

### Video
Controls are on by default and width is 100%.

#embed(http://techslides.com/demos/sample-videos/small.mp4 video)

### Audio
Controls are on by default.

#embed(http://techslides.com/demos/samples/sample.mp3 audio)
