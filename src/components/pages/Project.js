import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Swal from 'sweetalert2'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'

import styles from './Project.module.css'


function Project() {

	const {id} = useParams()
	const [project, setProject] = useState([]) 
	const [showProjectForm, setShowProjectForm] = useState([false])
	
	useEffect(() => {

		fetch(`http://localhost:5000/projects/${id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then(resp => resp.json())
			.then((data) => {
				setProject(data)
			})
			.catch((err) => console.lo)
	}, [id])

	function editPost(project) {
		//budget validation
		if(project.budget < project.cost) {
			Swal.fire('O orçamento não pode ser menor que o custo do projeto!', '', 'error')
			return false
		}

		fetch(`http://localhost:5000/projects/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(project),
		})
		.then(resp => resp.json())
		.then((data) => {
			setProject(data)
			setShowProjectForm(false)
			Swal.fire(`edição de: ${project.name} concluida com sucesso`, '', 'success' )

		})
		.catch((err) => Swal.fire('Ocorreu um erro inesperado', `${(err)}`, 'error'))
	}

	function toggleProjectForm() {
		setShowProjectForm(!showProjectForm)
	}

	return(

	<div>
		{project.name ? (
			<div className={styles.project_details}>
				<Container customClass='column'>
					<div className={styles.details_container}>
						<h1>Projeto: {project.name}</h1>
						<button className={styles.btn } onClick={toggleProjectForm}>{!showProjectForm ? 'editar projeto' : 'fechar'}</button>
						{!showProjectForm ? (
							<div className={styles.project_info}>
								<p>
									<span>Categoria:</span> {project.category.name}
								</p>
								<p><span>Total de orçamento:</span> R${project.budget}</p>
								<p>
									<span>Total utilizado:</span> R${project.cost}
								</p>
							</div>
							) : (
								<div className={styles.project_info}>
									<ProjectForm handleSubmit={editPost} btnText='Concluir edição' projectData={project} />
								</div>
							)}
					</div>
				</ Container>
			</div>
		) : (
			<Loading />
		)}
	</div>

	)

}

export default Project