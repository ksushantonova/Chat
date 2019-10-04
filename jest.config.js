module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  automock: false,
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testURL: "http://localhost",
  testEnvironment: "node",
  "unmockedModulePathPatterns": [
    // "<rootDir>/node_modules/parse5",
    // "<rootDir>/node_modules/fbjs"
  ],
  collectCoverageFrom: ["src/**/*.{js,ts,tsx}", "!src/**/*.d.{ts,tsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/", "<rootDir>/src/entity"],
  coverageReporters: ["html", "text", "text-summary"]
};