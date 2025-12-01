const background = document.querySelector('.color-container')
const colorButton = document.querySelector('.color-picker-button')

let color = '#'

const colorHex = '0123456789ABCDEF'
colorButton.addEventListener('click', () => {
  for (i = 0; i < 6; i++) {
    let hexCode = colorHex[Math.floor(Math.random() * colorHex.length)]
    color += hexCode
  }
  background.style.backgroundColor = color
  console.log(color)
  color = '#'
})
