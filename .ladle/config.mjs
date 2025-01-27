/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  port: 61000,
  addons: {
    a11y: {
      enabled: true
    },
    action: {
      enabled: true
    },
    control: {
      enabled: true
    },
    theme: {
      enabled: true
    }
  }
};