import { ManifestV3 } from 'rollup-plugin-chrome-extension'

const manifest: ManifestV3 = {
  name: "chegg-dl",
  description: "download chegg textbook solutions as a pdf",
  version: "1.0",
  manifest_version: 3,
  background: {
    service_worker: 'scripts/background.ts',
  },
  content_scripts: [
    {
      js: ['scripts/answerScraper.ts'],
      matches: ['https://*.example.com/*'],
    },
  ],
}

export default manifest