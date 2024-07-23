export const iterateSeries = (collection, iteratorCallback, finalCallback) => {
  const iterate = (index) => {
    if (index === collection.length) {
      return finalCallback()
    }
    iteratorCallback(collection[index], (err) => {
      if (err) {
        return finalCallback(err)
      }
      iterate(index + 1)
    })
  }
  iterate(0)
}
