// Collapse component
const COLLAPSE        = '[data-collapse]'
const COLLAPSE_ACTION = '[data-collapse-action]'
const COLLAPSE_TEXT   = '[data-collapse-text]'
const OPEN_COLLAPSE   = 'collapseOpen'
const COLLAPSES       = document.querySelectorAll(COLLAPSE)

class Collapse {
  static attach() {
    const collapse = new Collapse()
    collapse.init()
  }

  init() {
    this.applyListener()

    for (let item of COLLAPSES) {
      const itemAction = item.querySelector(COLLAPSE_ACTION)
      const itemText = item.querySelector(COLLAPSE_TEXT)

      if (itemText.scrollHeight >= '49') {
        itemAction.classList.add('show')
      }
    }
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = e.target

      if (this.isCallCollapseElement(element)) {
        const text = element.previousElementSibling

        if (this.isOpened(text)) {
          this.closeCollapse(text, element)
        } else {
          this.openCollapse(text, element)
        }
      }
    })
  }

  isCallCollapseElement(element) {
    return element && OPEN_COLLAPSE in element.dataset
  }

  openCollapse(text, element) {
    text.classList.add('collapsed')
    text.style.maxHeight = text.scrollHeight + 'px'
    element.innerHTML = 'Collapse'
  }

  closeCollapse(text, element) {
    text.classList.remove('collapsed')
    text.style.maxHeight = '3rem'
    element.innerHTML = 'Show more...'
  }

  isOpened(text) {
    return text.classList.contains('collapsed')
  }
}

Collapse.attach()

// Switcher component
const SWITCHER_ACTION = 'themeSwitcherAction'

class ThemeSwitcher {
  static attach() {
    const switcher = new ThemeSwitcher()
    switcher.init()
  }

  init() {
    this.applyListener()
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = e.target
      const body = document.querySelector('body')

      if (this.isCallThemeSwitcherElement(element)) {
        if (this.isDarkTheme(body)) {
          this.switchLightTheme(body)
        } else {
          this.switchDarkTheme(body)
        }
      }
    })
  }

  isCallThemeSwitcherElement(element) {
    return element && SWITCHER_ACTION in element.dataset
  }

  switchLightTheme(body) {
    body.classList.remove('theme-dark')
  }

  switchDarkTheme(body) {
    body.classList.add('theme-dark')
  }

  isDarkTheme(body) {
    return body.classList.contains('theme-dark')
  }
}

ThemeSwitcher.attach()
