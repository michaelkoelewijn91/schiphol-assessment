// jest.config.cjs
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                isolatedModules: true, // Improves performance when testing TypeScript files
            },
        ],
    },
    testMatch: [
        "**/?(*.)+(test).ts", // Only run tests inside `components/` with `.test.ts` or `.spec.ts`
    ],
};
