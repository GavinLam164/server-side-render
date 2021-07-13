import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Preview = ({name, age}) => {
	const history = useHistory()

	const goLogin = useCallback(() => {
		history.push('/login')
	}, [])
	return <div onClick={goLogin}>Preview, {name}, {age}</div>
}

Preview.getInitialProps = async function(req) {
	const res = await axios.get('http://127.0.0.1:3001/')
	return res.data
}

export default Preview