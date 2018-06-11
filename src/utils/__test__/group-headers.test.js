import groupHeaders from '../group-headers'

test('simple', () => {
  const res = groupHeaders([
    {
      depth: 2,
      value: 'title 1'
    },
    {
      depth: 3,
      value: 'title 3'
    },
    {
      depth: 3,
      value: 'title 4'
    },
    {
      depth: 2,
      value: 'title 2'
    }
  ])

  expect(res).toMatchSnapshot()
})
