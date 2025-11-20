const sidebarBtn = document.querySelector('.sidebar-btn')
const menuCloseButton = document.querySelector('.menu-close-button')

sidebarBtn.addEventListener('click', () => {
  document.body.classList.toggle('show-mobile-menu')
})

menuCloseButton.addEventListener('click', () => sidebarBtn.click())
