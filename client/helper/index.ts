const objectToArray = (object: NotWellDefinedObject) => {
  let arr: NotWellDefinedObject[] = []
  Object.keys(object).forEach((key) => {
    let item = { id: key, ...object[key] }
    arr.push(item)
  })

  return arr
}

export { objectToArray }
