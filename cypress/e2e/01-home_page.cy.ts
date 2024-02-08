describe('The home page', () => {
	it(
		'check redirect from root page to /tests and login by email',
		{ retries: { openMode: 3, runMode: 3 } }, // сколько попыток повторить тест при ошибке. Установил так как иногда он падает по непонятной причине
		() => {
			cy.visit('/');

			cy.url().should('include', '/tests');

			cy.waitFirstAppLoading(); // дожидаемся загрузки приложения, чтобы появилась кнопка для logout

			cy.tryLogout();

			cy.loginByEmail('nikitsidenk@mail.ru', '220597123');
		}
	);
});
