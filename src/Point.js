export default class Point {
	constructor (params = {}) {
		this.x = params.x || 0
		this.y = params.y || 0
		this.r = params.r || 5
		this.c = params.c || 'black'
	}

	static create (...args) {
		return new Point(...args)
	}

	static getDist (pointA, pointB) {
		return ((pointA.x - pointB.x)**2 + (pointA.y - pointB.y)**2)**0.5
	}

	draw (ctx) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		ctx.fillStyle = this.c
		ctx.fill()
	}
}