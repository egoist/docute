// Fetching a `.md` file from same domain on Netlify
// But response content-type is HTML ㄟ( ▔, ▔ )ㄏ
// It's because you're using redirect rules like `/* /index.html 200`
// With `routerMode: 'history'` but relevant file is not found
export default res => {
  if (
    // Not on Netlify
    !res.headers.get('server') === 'Netlify' ||
    // Not HTML
    !/text\/html/.test(res.headers.get('content-type')) ||
    // Not fetching .md file
    !res.url.endsWith('.md')
  ) {
    return
  }

  const a = document.createElement('a')
  a.href = res.url
  const isSameDomain = window.location.host === a.host

  if (!isSameDomain) {
    return
  }

  throw {
    status: 404,
    statusText: 'Not Found',
    url: res.url
  }
}
