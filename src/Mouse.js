export default class Mouse {
	constructor (el) {
		this.el = el
		this.x = 0
		this.y = 0
		this.left = false

		this.el.addEventListener('mousemove', e => this.handlerMousemove(e))
		this.el.addEventListener('mousedown', e => this.handlerMousedown(e))
		this.el.addEventListener('mouseup', e => this.handlerMouseup(e))
	}

	handlerMousemove (event) {
		const rect = this.el.getBoundingClientRect()
		this.x = event.clientX - rect.left
		this.y = event.clientY - rect.top
	}

	handlerMousedown (event) {
		if (event.button === 0) {
			this.left = true
		}
	}

	handlerMouseup (event) {
		if (event.button === 0) {
			this.left = false
		}
	}
}