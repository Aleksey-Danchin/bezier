function memorize (fn) {
	const store = {}

	return function (...args) {
		const key = JSON.stringify(args)

		if (!store[key]) {
			store[key] = fn(...args)
		}

		return store[key]
	}
}

export function getRandomBetween (min, max) {
	return min + Math.floor(Math.random() * (max - min + 1))
}

export const factorial = memorize((n) => {
	if (n < 2) {
		return 1
	}

	return n * factorial(n - 1)
})

export const C = memorize((n, k) => {
	return factorial(n) / (factorial(k) * factorial(n - k))
})

export function tween (fn, duration, loopsNumber = 1) {
	let loopCounter = 0

	tweenMaster()

	function tweenMaster () {
		fn(0)
	
		const startMoment = Date.now()
		const stopTween = () => clearInterval(intevalFlag)
	
		const intevalFlag = setInterval(() => {
			const percent = Math.min(1, (Date.now() - startMoment) / duration)
	
			fn(percent)
	
			if (percent === 1) {
				loopCounter++

				if (loopCounter < loopsNumber) {
					tweenMaster()
				}
				
				stopTween()
			}
		})
	}
}