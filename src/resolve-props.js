export default function resolveProps(matches, propQueries) {
  let resolvedProps
  Object.keys(propQueries).forEach(key => {
    if (matches[key] || key === 'default') {
      resolvedProps = propQueries[key]
    }
  })
  return resolvedProps
}
