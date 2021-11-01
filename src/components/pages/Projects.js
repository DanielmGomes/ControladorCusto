import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'

import styles from './Projects.module.css'



function Projects() {

	return (
		<div className={styles.project_container}>
			<div className={styles.title_container}>
				<h1>Meus Projetos</h1>
				<LinkButton to='/newProject' text='criar projeto'/>
			</div>
			<Container customClass='start'>
				<p>projetos</p>
			</Container>
		</div>
	)

}

export default Projects