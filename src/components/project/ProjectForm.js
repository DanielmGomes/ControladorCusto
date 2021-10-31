import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

function ProjectForm( {btnText} ) {

	return(
		<div>
			<p>Formulário do projeto</p>
			<form className={styles.form}>
				<div>
					<Input type='text' name='name' placeholder='insira o nome do projeto' />
				</div>
				<div>
					<Input type='number' name='budget' placeholder='orçamento do projeto' />
				</div>
				<div>
					<Select name='category_id' text='Selecione a categoria' />
				</div>
				<div>
					<SubmitButton text={btnText}  />
				</div>
			</form>
		</div>
	)

}

export default ProjectForm