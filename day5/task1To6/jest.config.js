/** @type {import("jest").Config} **/
export default {
    testEnvironment: "jsdom",
    preset: "ts-jest",
    testPathIgnorePatterns: [`<rootDir>/dist/`],
    moduleNameMapper: {
        "^@pages/(.*)": "<rootDir>/src/js/pages/$1",
        "^@components/(.*)": "<rootDir>/src/js/components/$1",
        "^@utils": "<rootDir>/src/js/utils",
    },
};
