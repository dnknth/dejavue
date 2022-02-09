function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'),
        front: withOpacityValue('--color-front'),
        back: withOpacityValue('--color-back'),
        danger: withOpacityValue('--color-danger'),
        // ...
      }
    },
  },
  plugins: [],
}
