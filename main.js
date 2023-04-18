// Scroll-load component
let pagination = 10
let output = ''
let list = document.querySelector('[data-cards-list]')
let http = new XMLHttpRequest()

class ScrollLoad {
  static attach() {
    const scroll = new ScrollLoad()
    scroll.init()
  }

  init() {
    this.applyListener()
    this.drawCards()
  }

  applyListener() {
    window.addEventListener('scroll', () => {
      const documentRect = document.documentElement.getBoundingClientRect()

      if (documentRect.bottom < document.documentElement.clientHeight + 1) {
        this.scrollPagination()
        this.drawCards()
      }
    })
  }

  scrollPagination() {
    return pagination = pagination + 10
  }

  drawCards() {
    let url = 'https://picsum.photos/v2/list?page=1&limit=' + pagination

    http.open('get', url, true)

    http.send()

    http.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        let products = JSON.parse(this.responseText)

        for (let item of products) {
          output += `
            <div id="${item.id}" class="col col-12 col-md-6 col-lg-12 col-xl-6 product-card" data-card="card">
              <div class="card h-100">
                <img class="card-img-top" src="${item.download_url}" alt="...">
                <div class="card-body text-collapse" data-collapse>
                  <h4 class="card-title fw-bold">${item.author}</h4>
                  <p class="card-text text-collapse-text mb-2" data-collapse-text>
                      Here goes some sample, example text that is relatively short.
                      Here goes some sample, example text that
                      Here goes some sample, example text that
                  </p>
                  <a class="link-dark text-decoration-none text-collapse-button fw-medium d-flex mb-1 show" data-collapse-action data-collapse-open href="javascript:void(0);">
                      Show more...
                  </a>
                </div>
                <div class="card-footer d-flex gap-3">
                    <button type="button" class="btn btn-warning">Save to collection</button>
                    <button type="button" class="btn btn-outline-secondary">Share</button>
                </div>
              </div>
            </div>
          `
        }

        list.innerHTML = output
      }
    }
  }
}

ScrollLoad.attach()

// Collapse component
const COLLAPSE_ACTION = 'collapseAction'

class Collapse {
  static attach() {
    const collapse = new Collapse()
    collapse.init()
  }

  init() {
    this.applyListener()
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = e.target

      if (this.isCallCollapseElement(element)) {
        if (this.isOpened(element)) {
          this.closeCollapse(element)
        } else {
          this.openCollapse(element)
        }
      }
    })
  }

  isCallCollapseElement(element) {
    return element && COLLAPSE_ACTION in element.dataset
  }

  openCollapse(element) {
    element.previousElementSibling.classList.add('collapsed')
    element.previousElementSibling.style.maxHeight = element.previousElementSibling.scrollHeight + 'px'
    element.innerHTML = 'Collapse'
  }

  closeCollapse(element) {
    element.previousElementSibling.classList.remove('collapsed')
    element.previousElementSibling.style.maxHeight = '3rem'
    element.innerHTML = 'Show more...'
  }

  isOpened(element) {
    return element.previousElementSibling.classList.contains('collapsed')
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
