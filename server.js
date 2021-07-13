
const Koa = require('koa')

const app = new Koa()


app.use(require('koa-cors')())

app.use(async(ctx, next) => {
	ctx.headers['content-type'] = 'application/json'
	ctx.body = {
		name: 'lgw',
		age: 18
	}
})

app.listen(3001)