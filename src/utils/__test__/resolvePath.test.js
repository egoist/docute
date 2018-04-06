import resolvePath from '../resolvePath'

test('resolvePath', () => {
  expect(resolvePath('/', '/')).toBe('/')
  expect(resolvePath('/', '/foo/bar')).toBe('/foo/bar')
  expect(resolvePath('/root', '/foo/bar')).toBe('/root/foo/bar')
  expect(resolvePath('/root', '/foo/bar/')).toBe('/root/foo/bar')
  expect(resolvePath('/root/', '/foo/bar/')).toBe('/root/foo/bar')
})
