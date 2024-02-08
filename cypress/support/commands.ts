Cypress.Commands.add('getByTestId', (testId: string) => cy.get(`[data-test-id=${testId}]`));

Cypress.Commands.add('waitFirstAppLoading', () =>
	cy.getByTestId('page-loader').should('not.exist')
); // дожидаемся загрузки страницы, cypress ждем пока этот элемент не пропадет и потом идем дальше

Cypress.Commands.add('tryLogout', () => {
	return cy.get('body').then(($body) => {
		if ($body.find('button[data-test-id=user-menu-button]').length > 0) {
			cy.getByTestId('user-menu-button').click();
			cy.getByTestId('logout-button').click();
		}
	});
});

Cypress.Commands.add('loginByEmail', (email: string, password: string) => {
	cy.session(
		[email, password],
		() => {
			cy.visit('/');

			cy.getByTestId('login-button').click();
			cy.contains('Sign in with email').click();

			cy.get('input[type=email]').type(`${email}{enter}`); // {enter} вызывает событие submit сразу после окончания type
			cy.get('input[type=password]').type(`${password}{enter}`); // actions типа click, type должны быть в конце цепочек. При падении, проверки (should)
			// и запросы html (cy.get), которые стояли в цепочке после actions не повторяются, как и не повторяются сами actions,
			// если после него упал assertation или query. Так же then рушит цепочку проверок, никакие операции до then не повторяются.
			// Если все же нужно использовать then в цепочке можно использовать .should(cb) с колбеком внутри, весь код внутри cb будет повторяться
			// пока не будет успешным, либо пока не истечет таймер

			cy.url().should('include', '/tests');
		},
		{
			validate: () => {
				cy.getCookie('TestConstructor.AuthUser').should('exist');
			},
		}
	);
});
