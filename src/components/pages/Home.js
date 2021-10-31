import styles from './Home.module.css'
import savings from '../../img/money.svg'
import LinkButton from '../layout/LinkButton'


function Home() {
	return (

	<section className={styles.home_container}>
		<h1>Bem-vindo ao controlador de  <span>custos</span></h1>
		<p>Gerencie seus projetos pessoais e os custos para realiza-los</p>
		<LinkButton to='/newProject' text='criar projeto'/>
		<img src={savings} alt="controlador de custos" />
	</section>

	)
}

export default Home