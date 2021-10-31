function ProjectForm() {

	return(
		<div>
			<p>Formulário do projeto</p>
			<form>
				<div>
					<input type="text" name="" placeholder="inserir o nome do projeto" />
				</div>
				<div>
					<input type="number" name="" placeholder="orçamento do projeto" />
				</div>
				<div>
					<select name="category_id">
						<option disabled selected>selecione a categoria</option>
					</select>
				</div>
				<div>
					<input type="submit" name="" value="criar projeto" />
				</div>
			</form>
		</div>
	)

}

export default ProjectForm