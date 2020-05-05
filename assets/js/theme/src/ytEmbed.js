const YT_EMBED_PARENT = document.getElementById('yt-embed');
const YT_EMBED_PARENT_VIDEO_ID = YT_EMBED_PARENT.dataset.video;
//<iframe width="560" height="315" src="https://www.youtube.com/embed/LUCrx9chw-c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

function setAttributes(el, arg, argVal) {
  const argumentIsString = typeof arg == 'string';

  if ( argumentIsString ) {
    el.setAttribute(arg, argVal)
  } else {
    for (let i = 0, len = arg.length; i < len; i++) {
      el.setAttribute(arg[i], argVal[i])
    }
  }
  return el;
}

function ytEmbed() {
  const iframe = document.createElement('iframe');

  setAttributes(iframe, ['width', 'height', 'frameborder', 'allow', 'allowfullscreen'], ['560', '315', '0', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', '']);
  YT_EMBED_PARENT.appendChild(iframe);
  setAttributes(iframe, 'src', 'https://www.youtube.com/embed/' + YT_EMBED_PARENT_VIDEO_ID + '?showinfo=0&rel=0');
  iframe.onload = () => {
    YT_EMBED_PARENT.removeChild(YT_EMBED_PARENT.querySelector('.yt-embed'));
  }

}

export default ytEmbed;
