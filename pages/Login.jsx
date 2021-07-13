import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = ({name, age}) => {
	const history = useHistory()

	const goPreview = useCallback(() => {
		history.push('/preview')
	}, [])
	return <div onClick={goPreview} >Login, {name}, {age}</div>
}

Login.getInitialProps = async function(req) {
	const res = await axios.get('http://127.0.0.1:3002/')
	return res.data
}

export default Login