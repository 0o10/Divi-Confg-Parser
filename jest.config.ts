export default {
	verbose: true,
	collectCoverage: true,
	transform: { '^.+\\.(ts|tsx)?$': 'ts-jest' },
	collectCoverageFrom: ['src/**/*.ts'],
	testPathIgnorePatterns: ['__tests__/helpers'],
	coveragePathIgnorePatterns: ['__tests__/helpers', 'src/index.ts'],
};
