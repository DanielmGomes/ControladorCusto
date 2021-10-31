import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'

import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'


function NewProject() {

	const history = useHistory()
	const Swal = require('sweetalert2')

	function createPost(project) {

		// inicializa custo e serviço
		project.cost = 0
		project.services = []

		fetch("http://localhost:5000/projects", {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			}, 
			body: JSON.stringify(project),
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data)
				history.push('/projects', 
					Swal.fire(
  						'Projeto cadastrado com sucesso!',
  						'',
  						'success'
					)
				)
			})
			.catch((err) => console.log(err))
	} 

	return (
		<div className={styles.new_project_conteiner}>
			<h1>Criar Projeto</h1>
			<p>Crie seu projeto para depois adicionar os custos do mesmo</p>
			<ProjectForm handleSubmit={createPost} btnText='criar projeto' />
		</div>
	)
}

export default NewProject