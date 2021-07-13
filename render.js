import React from 'react'
import Koa from 'koa'
import App from './App'
import md5 from 'md5'
import { renderToString } from 'react-dom/server'
import webpack from 'webpack'
import config from './webpack.config'
import matchRoute from './routes/matchRoute'
import fs from 'fs'
import path from 'path'

const app = new Koa()

app.use(require('koa-static')(__dirname))

const cacheCompile = async () => {
	if(!fs.existsSync(path.join(__dirname, '/bundle/main.js'))) {
		await new Promise((resolve) => {
			const compiler = webpack(config)
			compiler.run(() => {
				resolve()
			})
		})
	}
}

const memo = (fn) => {
	const map = new Map()
	return (...args) => {
		const key = args.map(JSON.stringify).map(md5).join('_')
		if(map.has(key)) return map.get(key)
		map.set(key, fn(...args))
		return map.get(key)
	}
}

const createHtml = memo((content, data) => `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<div id='app'>${content}</div>
		<script id='ssr_state'>
			window.ssr_state='${JSON.stringify(data)}'
		</script>
		<script src='/bundle/main.js'></script>
		
	</body>
	</html>
`)


app.use(async (ctx, next) => {
	const { req } = ctx
	
	const { component: Component } = matchRoute(req)

	if(!Component) {
		return
	}

	const data = await Component.getInitialProps(req)

	const content = renderToString(<App ctx={ctx} component={Component} data={data}/>)

	await cacheCompile()
	
	ctx.body = createHtml(content, data)
})



app.listen(3000)