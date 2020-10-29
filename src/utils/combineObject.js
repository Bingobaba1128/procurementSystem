export function combineObject(obj1, obj2) {
  var obj = obj1
  for (var key in obj2) {
    obj[key] = obj2[key]
  }
  return obj
}

