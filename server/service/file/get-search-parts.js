export const getSearchParts = (search) => {
  const quotesIdx = []
  let exactSearchParts = []

  for (let i in search) {
    if (search[i] === '"' && search[i - 1] !== '\\') {
      quotesIdx.push(i)
    }
  }

  if (quotesIdx.length > 1) {
    for (let i = 0; i < quotesIdx.length; i += 2) {
      exactSearchParts.push(
        search.slice(quotesIdx[i], quotesIdx[i + 1]).replace('"', '')
      )
    }
  }

  exactSearchParts.forEach((item) => {
    search = search.replace(`"${item}"`, '')
  })

  exactSearchParts = exactSearchParts.filter((item) => item)

  let ext = ''
  const searchParts = search.split(' ').filter((item) => {
    if (item.startsWith('ext')) {
      ext = item.split(':')[1]
      return
    }
    return item
  })
  return { exactSearchParts, searchParts, ext }
}
