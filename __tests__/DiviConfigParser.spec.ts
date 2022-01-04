import DiviConfigParser from '../src';
import {
	randomBool,
	randomInt,
	randomString,
} from './helpers/MockPrimativeGenerators';

describe('Divi Config Parser', () => {
	test('Sets flag value & reads flag contents', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();
		const contents = randomString();

		diviConfig.setFlag(flagName, contents);

		expect(diviConfig.getFlagContents(flagName)).toEqual(contents);
	});
});
