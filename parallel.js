import cluster from "cluster";
import os from 'os'

if(cluster.isMaster) {
	for(let i = 0; i < os.cpus().length / 2; i++) {
		createWorker()
	}

	function createWorker() {

		const worker = cluster.fork()
		let lose = 0
		let timer = setInterval(() => {
			worker.send('ping#' + worker.process.pid)
			lose++
			if(lose > 3) {
				clearInterval(timer)
				createWorker()
			}
		}, 3000)

		worker.on('message', (msg) => {
			if(msg === 'pong#' + worker.process.pid) {
				lose--
			}
		})
	}

	cluster.on('exit', () => {
		createWorker()
	})
	
}else {
	process.on('message', (msg) => {
		if(msg === 'ping#' + process.pid) {
			process.send('pong#' + process.pid)
		}
	})

	require('./render')
}