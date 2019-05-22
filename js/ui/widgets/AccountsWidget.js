/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(element) {
      this.element = element;
    } else {console.log('error')};
    this.registerEvents()
    this.update()
  
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const create_account = document.querySelector('.create-account');
    
    create_account.addEventListener('click', () => { 
      let modal = App.getModal('createAccount');
      modal.open();
      
    })
 

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода render()
   * */
  update() {
    const user = User.current();
    if(user != null ) {
      let account = Account.list({},(accountsList) => {
        console.log(accountsList);
        //localStorage.setItem("accountslist", JSON.stringify(accountsList.data));
        this.clear();
        this.render(accountsList.data);
        this.registerEvents();
      });
    }
  }

  /**
   * Отрисовывает массив счетов с помощью
   * метода renderItem
   * */
  render( data ) {
    for (let element in data) {
    let html_account = this.getAccountHTML(data[element])
    this.renderItem(html_account);

    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = document.querySelectorAll('.account');
    for(let i = 0; i < accounts.length; i++) {
      accounts[i].remove();
    }


  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element , id ) {
    if(element) {
      let active_account = document.querySelectorAll('.active')
      for (let active of active_account){
        active.classList.remove('active');
      }
      element.classList.add('active');
      App.showPage('transactions', id );
    }
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let html = `<li class= "account" data-id= ${item.id}>
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
    </a>
</li>`
    return html;
  }

  /**
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {
    let account = document.querySelectorAll('.accounts-panel');
    account[0].insertAdjacentHTML("beforeend", item)
    let childs = document.querySelectorAll('.account');
    let last = childs[childs.length- 1];
    last.addEventListener('click', () => {
        this.onSelectAccount(last, item.id);
      })
    }
}