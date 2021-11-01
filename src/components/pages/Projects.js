import {useState, useEffect} from 'react'
import Swal from 'sweetalert2'

import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.css'

function Projects() {

	const [projects, setProject] = useState([])
	const Swal = require('sweetalert2')
	const [removeLoading, setRemoveLoading] = useState(false) 

	useEffect(() => {
		fetch('http://localhost:5000/projects', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			},
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data)
				setProject(data)
				setRemoveLoading(true)
			})
			.catch((err) => Swal.fire('Ocorreu um erro inesperado', `${(err)}`, 'error'))
	}, [])

	return (
		<div className={styles.project_container}>
			<div className={styles.title_container}>
				<h1>Meus Projetos</h1>
				<LinkButton to='/newProject' text='criar projeto'/>
			</div>
			<Container customClass='start'>
				{projects.length > 0 &&
					projects.map((project) =>(
						<ProjectCard 
							id={project.id}
							name={project.name}
							budget={project.budget}
							category={project.category.name}
							key={project.id}
						/>
					))
				}
				{!removeLoading && <Loading />}
				{removeLoading && projects.length === 0 && (
					<p>Não há projetos cadastrados</p>
				)}
			</Container>
		</div>
	)

}

export default Projects