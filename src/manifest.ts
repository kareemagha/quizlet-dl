import { ManifestV3 } from 'rollup-plugin-chrome-extension'

const manifest: ManifestV3 = {
  name: "quizlet-dl",
  description: "download quizlet textbook solutions as a pdf",
  version: "0.2.2",
  manifest_version: 3,
  permissions: ["activeTab", "tabs", "scripting"],
  host_permissions: ["https://quizlet.com/explanations/textbook-solutions/*"],
  background: {
    service_worker: 'background/background.ts',
  },
  content_scripts: [
    {
      js: ['injected/answerScraper.ts'],
      matches: ['https://quizlet.com/explanations/textbook-solutions/*'],
    },
    {
      js: ['injected/nextPage.ts'],
      matches: ['https://example.com/*'],
    },
  ],
  action: {
    default_popup: "pages/popup.html",
  },
  icons: {
    128: "icon.png"
  }
}

export default manifest