import { defineConfig } from 'cypress'
import tasks from './tests/e2e/plugins'

export default defineConfig({
  projectId: '3zbvq9',
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  supportFolder: 'tests/e2e/support',
  downloadsFolder: 'tests/e2e/downloads',
  e2e: {
    specPattern: 'tests/e2e/specs/*.cy.ts',
    supportFile: 'tests/e2e/support/e2e.ts',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      tasks(on, config)
    },
  },
})
