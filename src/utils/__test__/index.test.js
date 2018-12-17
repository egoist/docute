import assert from 'assert'
import {getFilenameByPath} from '..'

describe('index', () => {
  it('getFilenameByPath', () => {
    assert(getFilenameByPath(null, '/') === 'README.md')
    assert(getFilenameByPath('/', '/') === '/README.md')
    assert(getFilenameByPath('./', '/') === 'README.md')
    assert(getFilenameByPath('./docs/', '/') === 'docs/README.md')
    assert(getFilenameByPath('/docs/', '/') === '/docs/README.md')
    assert(getFilenameByPath('/docs/', '/foo') === '/docs/foo.md')
    assert(getFilenameByPath('/docs/', '/foo.md') === '/docs/foo.md')
    assert(getFilenameByPath('/docs/', '/foo/') === '/docs/foo/README.md')
  })
})
