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
	data.body = options;
	//data.method = options._method;
	data.method = "POST";
	 const result = Account.create(data, (res) => {
	 
		let modal = App.getModal("createAccount");
		console.log("response:" + JSON.stringify(res.account)); // response object cointains .accounts which cointain accounts returned from api
    modal.close();
		App.update();

	 }); 
	}
  }
