export const inBrowser = typeof document !== 'undefined'

export const $ = inBrowser && document.querySelector.bind(document)

export const $$ = inBrowser && document.querySelectorAll.bind(document)
