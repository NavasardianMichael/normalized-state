const colors = {
  long: 'red',
  normal: 'orange',
  short: 'green'
}

export const detectColorByValue = (duration) => {
  // if(duration > 145) return colors.long
  // if(duration > 135) return colors.normal
  return colors.normal
}