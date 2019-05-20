/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm {
	/**
	 * Производит авторизацию с помощью User.login
	 * После успешной авторизации, сбрасывает форму,
	 * устанавливает состояние App.setState( 'user-logged' ) и
	 * закрывает окно, в котором находится форма
	 * */
	onSubmit(options) {
	  console.log("user login" + options);
	  User.login(options , (err, response) => {
		User.setCurrent(response.user)
		App.setState('user-logged');
	   });
	}
  }
  