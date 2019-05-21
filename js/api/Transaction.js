/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
	constructor() {
		super(host);
		this.url = '/transaction';
	}
}
//Entity.URL = '/transaction'