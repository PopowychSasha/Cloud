import { getSearchParts } from './get-search-parts'

describe('get-search-parts.js', () => {
  it('should return one exact match and one non-exact match and png extension', () => {
    const searchString = '"car" 1 ext:png'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: ['car'],
      searchParts: ['1'],
      ext: 'png',
    })
  })
  it('should return two exact match and two non-exact match and png extension', () => {
    const searchString = '"car" "my" 1 2 ext:png'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: ['car', 'my'],
      searchParts: ['1', '2'],
      ext: 'png',
    })
  })
  it('should return empty search match and png extension', () => {
    const searchString = 'ext:png'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: [],
      searchParts: [],
      ext: 'png',
    })
  })
  it('return an object without search data', () => {
    const searchString = ''

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: [],
      searchParts: [],
      ext: '',
    })
  })
  it('return an object without search data', () => {
    const searchString = '""""'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: [],
      searchParts: [],
      ext: '',
    })
  })
  it('return an object with extension', () => {
    const searchString = 'ext:jpg """"'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: [],
      searchParts: [],
      ext: 'jpg',
    })
  })
  it('return three exact match', () => {
    const searchString = '"car""(1)""(3)"'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: ['car', '(1)', '(3)'],
      searchParts: [],
      ext: '',
    })
  })
  it('return three exact match and png extension', () => {
    const searchString = '"car" ext:png "(1)""(3)"'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: ['car', '(1)', '(3)'],
      searchParts: [],
      ext: 'png',
    })
  })
  it('return three non-exact match', () => {
    const searchString = 'car (1) (3)'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: [],
      searchParts: ['car', '(1)', '(3)'],
      ext: '',
    })
  })
  it('return three non-exact match and png extension', () => {
    const searchString = 'car (1) ext:png (3)'

    expect(getSearchParts(searchString)).toEqual({
      exactSearchParts: [],
      searchParts: ['car', '(1)', '(3)'],
      ext: 'png',
    })
  })
})
