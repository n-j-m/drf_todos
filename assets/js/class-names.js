export default function cls () {
  let classes = []

  for (let i = 0, l = arguments.length; i < l; i++) {
    let arg = arguments[i]
    if (!arg) continue

    let argType = typeof arg

    if (argType === 'string' || argType === 'number') {
      classes.push(arg)
    } else if (Array.isArray(arg)) {
      classes.push(cls.apply(null, arg))
    } else if (argType === 'object') {
      for (let key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          classes.push(key)
        }
      }
    }
  }
  return classes.join(' ')
}
