import {useState} from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from '../project/ProjectForm.module.css'

function ServiceForm( {handleSubmit, btnText, projectData} ) {

	const [service, setService] = useState({})

	function submit(e) {
		e.preventDefault()
		projectData.services.push(service)
		handleSubmit(projectData)
	}

	function handleChange(e) {
		setService({...service, [e.target.name]: e.target.value})
	}

	return(

	<form onSubmit={submit} className={styles.form}>
		<Input 
			type='text'
			text='descrição'
			name='name'
			placeholder='insira uma descrição'
			handleOnChange={handleChange}
		/>
		<Input 
			type='number'
			text='economia'
			name='cost'
			placeholder='insira um valor'
			handleOnChange={handleChange}
		/>
		<Input 
			type='date'
			text='data'
			name='deposit'
			handleOnChange={handleChange}
		/>
		<SubmitButton text={btnText} />
	</form>

	)

}

export default ServiceForm