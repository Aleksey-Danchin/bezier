import Mouse from './Mouse.js'
import Point from './Point.js'

export default class Game {
	constructor (params = {}) {
		this.el = params.el
		this.ctx = this.el.getContext('2d')
		this.mouse = new Mouse(this.el)

		this.el.width = params.width || 100
		this.el.height = params.height || 100

		requestAnimationFrame(() => this.tick(0))
	}

	isUnderMouse (point, r) {
		return Point.getDist(this.mouse, point) <= r
	}

	tick (timestamp) {
		requestAnimationFrame(x => this.tick(x))

		this.update(this.mouse)

		this.el.width |= 0

		this.draw(this.ctx)
	}

	update () {}
	draw () {}
}