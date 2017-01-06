export default function (input) {
  input = input.replace(/[!\"#$%&'\(\)\*\+,\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '') // eslint-disable-line no-useless-escape
    // Replace dots and spaces with a sepeator
    .replace(/(\s|\.)/g, '-')
    // Convert 2 or more sepeators into just one sepeator
    .replace(/-+/g, '-')
    // Make the whole thing lowercase
    .toLowerCase()
  // make sure the string does not start with number
  if (/^[\d]+/.test(input)) {
    input = `_${input}`
  }
  return input
}
