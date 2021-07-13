import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom'
import routes from './routes'

const withPage = (Component, initialData) => () => {
	const [data, setData] = useState(initialData)
	useEffect(async () => {
		const resp = await Component.getInitialProps()
		setData(resp)
	}, [])
	return <Component {...data} />
}

const RouterRoot = ({data}) => {
	return <BrowserRouter>
	        <Switch>
			{routes.map(({path, component: Component}) => 
				<Route key={path} path={path} component={withPage(Component, data)}></Route>
			)}
		</Switch>
	</BrowserRouter>
}

const getServerState = () => {
	const data = JSON.parse(window.ssr_state)

	delete window.ssr_state
	
	document.getElementById('ssr_state').remove()
	
	return data
}


ReactDOM.hydrate(<RouterRoot data={getServerState()}/>, document.getElementById('app'))