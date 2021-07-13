
import { matchPath } from 'react-router'
import routes from '.'

export default function matchRoute (req) {

	// 解析url，获取匹配的路由参数
	const route = routes.find((route) => matchPath(req.url, route))

	const routeParams = matchPath(req.url, route)

	if(routeParams === null) {
		return {}
	}

	// 通过匹配的路由参数获取对应的component
	const currentRoute = routes.find(({path}) => path === routeParams.path)

	return currentRoute
}