import { ManifestV3 } from 'rollup-plugin-chrome-extension'

const manifest: ManifestV3 = {
  name: "chegg-dl",
  description: "download chegg textbook solutions as a pdf",
  version: "1.0",
  manifest_version: 3,
  permissions: ["activeTab", "tabs", "scripting"],
  host_permissions: ["https://quizlet.com/explanations/textbook-solutions/*"],
  background: {
    service_worker: 'scripts/background.ts',
  },
  content_scripts: [
    {
      js: ['scripts/answerScraper.ts', 'scripts/nextPage.ts'],
      matches: ['https://quizlet.com/explanations/textbook-solutions/*'],
    },
  ],
}

export default manifest