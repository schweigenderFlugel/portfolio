import { defineConfig } from 'cypress'
import fs from 'fs'

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: "http://localhost:9000",
    video: true,
    videoCompression: true,
    setupNodeEvents(on, config) {
      on(
        'after:spec',
        (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
          if(results && results.video) {
            const failures = results.tests.some(test => 
              test.attempts.some(attempt => attempt.state === 'failed')
            )
            if (!failures) {
              fs.unlinkSync(results.video);
            }
          }
        }
      )
    }
  },
})