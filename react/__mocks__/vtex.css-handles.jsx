export const useCssHandles = cssHandles => {
  const handles = {}
  cssHandles.forEach(handle => {
    handles[handle] = handle
  })

  return handles
}

export function applyModifiers(baseClass, modifier) {
  return `${baseClass}--${modifier}`
}
