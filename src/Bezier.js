import Point from './Point.js'
import { C } from './Additional.js'

export default class Bezier {
	#points = []
	#curve = []
	#updated = true

	constructor (number) {
		this.number = number

		for (let i = 0; i < this.number; i++) {
			this.#points.push(Point.create())
		}
	}

	static create (...args) {
		return new Bezier(...args)
	}

	get points () {
		const bezier = this

		return this.#points.map(point => new Proxy(point, {
			set (target, name, value, receiver) {
				if (name === 'x' || name === 'y') {
					bezier.#updated = true
					target[name] = value
				}

				return value
			}
		}))
	}

	get curve () {
		if (!this.#updated) {
			return this.#curve
		}

		this.#updated = false
		this.#curve = []

		const n = this.#points.length
		const disc = 1000

		for (let d = 0; d <= disc; d++) {
			const t = d / disc
			const point = Point.create()

			for (let k = 0; k < n; k++) {
				const b = C(n - 1, k) * t**k * (1 - t)**(n - 1 - k)

				point.x += this.#points[k].x * b
				point.y += this.#points[k].y * b
			}

			this.#curve.push(point)
		}

		return this.#curve
	}

	draw (ctx) {
		for (const point of this.#points) {
			point.draw(ctx)
		}

		const curve = this.curve

		ctx.beginPath()
		ctx.moveTo(curve[0].x, curve[0].y)

		for (let i = 1; i < curve.length; i++) {
			ctx.lineTo(curve[i].x, curve[i].y)
		}

		ctx.strokeStyle = 'black'
		ctx.stroke()
	}

	drawPart (ctx, t) {
		drawPartMaster(this.#points)

		function drawPartMaster (points) {
			if (points.length < 1) {
				return
			}

			if (points.length === 1) {
				return points[0].draw(ctx)
			}

			ctx.beginPath()
			ctx.moveTo(points[0].x, points[0].y)

			for (let i = 1; i < points.length; i++) {
				ctx.lineTo(points[i].x, points[i].y)
			}

			ctx.strokeStyle = 'red'
			ctx.stroke()

			const newPoints = []
			for (let i = 0; i < points.length - 1; i++) {
				const pointA = points[i]
				const pointB = points[i + 1]
				const pointC = Point.create()

				pointC.x = pointA.x + (pointB.x - pointA.x) * t
				pointC.y = pointA.y + (pointB.y - pointA.y) * t

				newPoints.push(pointC)
			}

			drawPartMaster(newPoints)
		}
	}
}