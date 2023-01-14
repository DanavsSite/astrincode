import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, duration, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { purple } from '@mui/material/colors'
import { AiOutlinePlus as PlusIcon } from 'react-icons/ai'
import { MdModeEditOutline as PencilIcon,MdDelete as DeleteIcon,MdRemoveRedEye as EyeIcon } from 'react-icons/md'
import { GiElectric as ElectricIcon } from 'react-icons/gi'
import { useQuery } from 'react-query'
import axios from 'axios'

const ColorButton = styled(Button)(({ theme }) => ({
	color: purple[500],
	borderColor: purple[500],
	'&:hover': {
		borderColor: purple[700],
	},
  }));
  

import '../dash.css'
const Dashboard = () => {
	const [quote, setQuote] = useState('')
	const [tempQuote, setTempQuote] = useState('')
	const navigate = useNavigate()
	async function populateQuote() {
		const req = await fetch('http://localhost:1337/api/quote', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(data.quote)
		} else {
			alert(data.error)
		}
	}
	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token){
			console.log(token)
		}else{
			navigate('/login')
		}
	}, [])

	async function updateQuote(event) {
		event.preventDefault()

		const req = await fetch('http://localhost:1337/api/quote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(tempQuote)
			setTempQuote('')
		} else {
			alert(data.error)
		}
	}
	function signOut(){
		localStorage.removeItem('token')
		navigate('/login')
	}
	const { isLoading, error, data } = useQuery('repoData', () =>
	axios.get('http://localhost:1337/api/getprojs',{
		headers:{
			"x-access-token":localStorage.getItem('token')
		}
	})
  )

	if (isLoading) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	if(data) {console.log(data.data.userPages)}
	return (
		<motion.div 
		className='bg-blue-200 h-screen maindiv overflow-y-scroll overflow-x-hidden'
		initial={{
			width:0
		}}
		animate={{
			width:'100%',
			height:'92.5vh',
            marginTop:'7.5vh'
		}}
		exit={{
			x:window.innerWidth			
		}}
		transition={{
			duration:1
		}}
		>
			<motion.div className=' bg-blue-200 pt-5'
			initial={{
				opacity:0
			}}
			transition={{
              delay:1,
			  duration:0.5
			}}
			animate={{
				opacity:1,
				margin:'auto',
			}}
			>

			<ColorButton startIcon={<PlusIcon size={31} />}
			 sx={{margin:'auto',display:'flex',height:'5rem',width:'65vw',fontSize:25}} size='large' variant='outlined' color="secondary">Create Project</ColorButton>
			 			 <div className='flex justify-center mt-3 w-screen'>
<div className='w-screen'>

			 {data.data.userPages.map((item) => <>

				<div className='block m-10 bg-slate-400 h-60 rounded-3xl bg-opacity-20 backdrop-blur-lg shadow-lg'>
					<div className='flex flex-row'>

					<h1 style={{fontSize:27}} className='text font-bold p-5 pl-9'>{item.name}</h1>
					<IconButton size={'large'} onClick={() => navigate(`/edit/${item._id}`)}><PencilIcon/></IconButton>
					<IconButton size={'large'}><ElectricIcon/></IconButton>
					<IconButton size={'large'}><EyeIcon/></IconButton>
					<IconButton size={'large'}><DeleteIcon/></IconButton>

					</div>
				</div>
			 </>)
}
</div>
</div>
			</motion.div>
		</motion.div>
	)
}

export default Dashboard
