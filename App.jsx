
import React from 'react'
import { StaticRouter } from "react-router";

const App = ({ ctx, component: Component, data }) => {
	const { req } = ctx
	return <StaticRouter location={req.path}>
		<Component {...data}/>
	</StaticRouter>
}

export default App
