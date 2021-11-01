import {parse, v4 as uuidv4} from 'uuid'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Swal from 'sweetalert2'


import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'

import styles from './Project.module.css'


function Project() {

	const {id} = useParams()
	const [project, setProject] = useState([]) 
	const [showProjectForm, setShowProjectForm] = useState([false])
	const [showServiceForm, setShowServiceForm] = useState([false])
	
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
			Swal.fire('O orçamento não pode ser menor que 0 !', '', 'error')
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

	function createService() {
		//ultimo serviço
		const lastService = project.services[project.services.length - 1]
		lastService.id = uuidv4()

		const lastServiceCost = lastService.cost
		const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)


		//valor maximo
		if(newCost > parseFloat(project.budget)) {
			Swal.fire('valor ultrapassado', '', 'error')
			project.services.pop()
			return false
		}


		project.cost = newCost

		//update project

		fetch(`http://localhost:5000/projects/${project.id}`, {
			method: 'PATCH',
			header: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(project)
		})
			.then((resp) => resp.json())
			.then((data) => {
				//exibir serviços
				console.log(data)
			})
			.catch((err) => Swal.fire('Ocorreu um erro inesperado', `${(err)}`, 'error'))

	} 


	function toggleProjectForm() {
		setShowProjectForm(!showProjectForm)
	}

	function toggleServiceForm() {
		setShowServiceForm(!showServiceForm)
	}

	return(

	<div>
		{project.name ? (
			<div className={styles.project_details}>
				<Container customClass='column'>
					<div className={styles.details_container}>
						<h1>Projeto: {project.name}</h1>
						<button className={styles.btn }
							 onClick={toggleProjectForm}>{!showProjectForm ? 'editar projeto' : 'fechar'}
						</button>
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
					<div className={styles.service_form_container}>
						<h2>adicione um valor para econômia do projeto:</h2>
						<button className={styles.btn } 
							onClick={toggleServiceForm}>{!showServiceForm ? 'adicionar econômias' : 'fechar'}
						</button>
						<div className={styles.project_info}>
							{showServiceForm && (
								<ServiceForm 
									handleSubmit={createService}
									btnText='adicionar serviço'
									projectData={project}
								/>
							)}
						</div>
					</div>
					<h2>Serviços</h2>
					<Container customClass='start'>
						<p>itens de serviços</p>
					</Container>
				</ Container>
			</div>
		) : (
			<Loading />
		)}
	</div>

	)

}

export default Project