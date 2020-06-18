import Game from './Game.js'
import Bezier from './Bezier.js'
import { getRandomBetween, tween } from './Additional.js'

const bezier = Bezier.create(5)

for (const point of bezier.points) {
	point.x = getRandomBetween(50, 450)
	point.y = getRandomBetween(50, 450)
}

const game = new Game({
	el: document.querySelector('canvas'),
	width: 500,
	height: 500
})

let t = 0
tween(x => t = x, 5000, Infinity)

game.update = mouse => {
	if (mouse.point && !mouse.left) {
		mouse.point = null
	}

	if (!mouse.point && mouse.left) {
		mouse.point = bezier.points.find(p => game.isUnderMouse(p, 2 * p.r))
	}

	if (mouse.point) {
		mouse.point.x = mouse.x
		mouse.point.y = mouse.y
	}
}

game.draw = ctx => {
	bezier.drawPart(ctx, t)
	bezier.draw(ctx)
}
