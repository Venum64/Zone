class ElementMove {
    constructor(option) {
        this.social = document.querySelectorAll(option)
        window.addEventListener('mousemove', (event) => {
            this.moveElements(event)
        })
    }
    moveElements(event) {
        this.social.forEach((item) => {
            const speed = item.getAttribute('data-speed')
            const x = (innerWidth - event.x * speed) / 20;
            const y = (innerHeight - event.y * speed) / 50;
            item.style.transform = `translate(${x}px, ${y}px)`;
            console.log(x, y);
        });
    }

}

const elementMove = new ElementMove('.zone__img');

class Rotate3D {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector)
        if (!this.cards || this.cards.length === 0) return

        // add necessary CSS for 3D if not present (user can override in CSS files)
        this.cards.forEach(item => {
            item.style.transformStyle = item.style.transformStyle || 'preserve-3d'
            item.addEventListener('mousemove', (e) => this.rotate(e, item))
            item.addEventListener('mouseout', () => this.resetRotate(item))
        })
    }

    rotate(e, item) {
        const target = item // rotate the card element itself; change if you have inner .card_item
        const rect = target.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const offsetY = e.clientY - rect.top
        const halfWidth = rect.width / 2
        const halfHeight = rect.height / 2

        const rotateX = ((halfHeight - offsetY) / halfHeight) * 10
        const rotateY = ((offsetX - halfWidth) / halfWidth) * 10

        target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        target.style.transition = 'transform 0s'
    }

    resetRotate(item) {
        const target = item
        target.style.transition = 'transform 0.6s ease'
        target.style.transform = ''
        setTimeout(() => { target.style.transition = '' }, 700)
    }
}

let rotate3D = new Rotate3D('.service__block-card')

class Team3D {
    constructor(element) {
        this.blocks = document.querySelectorAll(element)
        if (!this.blocks || this.blocks.length === 0) return

        this.blocks.forEach(item => {
            item.style.transformStyle = item.style.transformStyle || 'preserve-3d'
            item.addEventListener('mousemove', (e) => this.rotate(e, item))
            item.addEventListener('mouseout', () => this.resetRotate(item))
        })
    }

    rotate(e, item) {
        const target = item // rotate the card element itself; change if you have inner .card_item
        const rect = target.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const offsetY = e.clientY - rect.top
        const halfWidth = rect.width / 2
        const halfHeight = rect.height / 2

        const rotateX = ((halfHeight - offsetY) / halfHeight) * 10
        const rotateY = ((offsetX - halfWidth) / halfWidth) * 10

        target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        target.style.transition = 'transform 0s'
    }

    resetRotate(item) {
        const target = item
        target.style.transition = 'transform 0.6s ease'
        target.style.transform = ''
        setTimeout(() => { target.style.transition = '' }, 700)
    }
}

let team3D = new Team3D('.team__block')

class FadeRight {
    constructor(sectionSelector) {
        this.section = document.querySelector(sectionSelector)
        if (!this.section) {
            console.warn(`Section "${sectionSelector}" not found`)
            return
        }
        window.addEventListener('scroll', () => this.fade())
        setTimeout(() => this.fade(), 100)
    }

    fade() {
        const rect = this.section.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const triggerPoint = windowHeight * 0.75

        const speed = this.section.getAttribute('data-speed') || '800'
        this.section.style.transition = `all ${speed}ms ease-out`

        if (rect.top < triggerPoint && rect.bottom > 0) {
            this.section.classList.add('active')
        } else {
            this.section.classList.remove('active')
        }
    }
}

const fadeRight = new FadeRight('.news__block')

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const offset = scrollY * 0.3; // скорость параллакса

    document.body.style.backgroundPositionY = `-${offset}px`;
});
