export default function (input) {
  input = input
    // Remove html tags
    .replace(/<(?:.|\n)*?>/gm, '')
    .replace(/[!\"#$%&'\(\)\*\+,\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '') // eslint-disable-line no-useless-escape
    // Replace dots and spaces with a sepeator
    .replace(/(\s|\.)/g, '-')
    // Convert 2 or more sepeators into just one sepeator
    .replace(/-+/g, '-')
    // Make the whole thing lowercase
    .toLowerCase()
  // Make sure the string does not start with number
  if (/^[\d]+/.test(input)) {
    input = `_${input}`
  }
  return input
}
