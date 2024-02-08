import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});

// https://github.com/cypress-io/cypress-example-kitchensink/tree/master/cypress/e2e/2-advanced-examples

// examples for all cypress commands
