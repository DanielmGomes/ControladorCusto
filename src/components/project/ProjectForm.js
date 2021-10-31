import {useState, useEffect} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

function ProjectForm( {btnText} ) {

	const [categories, setCategories] = useState([])

	useEffect (() => {
		fetch("http://localhost:5000/categories", {
			method: "GET",
			headers: {
				'content-Type': 'application/json'
			}
		})
		.then((resp) => resp.json())
		.then((data) => {
			setCategories(data)
		})
		.catch((err) => console.log(err))
	}, [])

	return(
		<div>
			<form className={styles.form}>
				<div>
					<Input type='text' name='name' placeholder='insira o nome do projeto' />
				</div>
				<div>
					<Input type='number' name='budget' placeholder='orçamento do projeto' />
				</div>
				<div>
					<Select name='category_id' text='Selecione a categoria' options={categories} />
				</div>
				<div>
					<SubmitButton text={btnText}  />
				</div>
			</form>
		</div>
	)

}

export default ProjectForm