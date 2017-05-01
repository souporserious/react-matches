export default function resolveProps(matches, propQueries) {
  let resolvedProps
  Object.keys(propQueries).forEach(key => {
    if (matches[key] || key === 'default') {
      const props = propQueries[key]
      if (typeof props === 'object') {
        resolvedProps = { ...resolvedProps, ...props }
      } else {
        resolvedProps = props
      }
    }
  })
  return resolvedProps
}
