declare namespace Cypress {
	interface Chainable {
		tryLogout(): void;
		loginByEmail(email: string, password: string): void;
		getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
		waitFirstAppLoading(): void;
	}
}
