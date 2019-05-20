/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(element) {
      this.element = element;
    } else {
      console.error('error');
    }
    this.registerEvents()

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render()

  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const remove_transaction_button = document.querySelectorAll('.transaction__remove');
    const remove_account_button = document.querySelector('.remove-account');
    for (let button of remove_transaction_button) {
      button.addEventListener('click', this.removeTransaction(button.dataset.id));
    }
    remove_account_button.addEventListener('click', this.removeAccount())

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(this.lastOptions) {
      confirm ('Вы действительно хотите удалить счёт?');
      if (confirm === true) {
        Account.remove();
        this.clear();
        App.update()
      }
      
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if(confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(id);
      App.update()
    }

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if(options) {
      this.options = lastOptions;
      const data = Account.get();
      const list = Transaction.list({}, (err, res) => {
        if(res) {
          this.renderTransactions();
        }
      });
      if(data) {
        this.renderTitle(data.name);
      }
    }


  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    //this.renderTransaction([]);
    this.renderTitle('Название счёта')

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    const content_title = document.querySelector('.content-title');
    content_title.innerHTML = name;

  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {

  }
}