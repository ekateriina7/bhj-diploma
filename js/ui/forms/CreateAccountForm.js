/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
 
 
	/**
	 * Создаёт счёт с помощью Account.create и закрывает
	 * окно в случае успеха, а также вызывает App.update()
	 * и сбрасывает форму
	 * */
	onSubmit( options ) {
	let data = {};
	data.body = {name: options.name};
	data.method = options._method;
	 const result = Account.create(data, (err, res) => {
	  if(result) {
		modal.close();
		App.update();
	  }
	 }); 
	}
  }
