module.exports = {
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/"
  },
  setupFilesAfterEnv: [
    "./setupTests.ts"
  ],
  moduleNameMapper: {
    ".(css|less|scss)$": "identity-obj-proxy",
  },
}