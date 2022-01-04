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

	test('Sets flag to have multiple values & gets all contents', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();
		const contents = [randomString(), randomString()];

		diviConfig.setFlag(flagName, contents);

		expect(diviConfig.getFlagContents(flagName)).toEqual(contents);
	});

	test('Sets flag & returns true if flag is set', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();
		const contents = randomBool();

		diviConfig.setFlag(flagName, contents);

		expect(diviConfig.isFlagSet(flagName)).toEqual(true);
	});

	test('Returns false if flag is not set', () => {
		const diviConfig = new DiviConfigParser();

		expect(diviConfig.isFlagSet(randomString())).toEqual(false);
	});

	test('Adds additional value to flag & gets new flag contents', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();

		const contents1 = randomString();
		diviConfig.setFlag(flagName, contents1);

		const contents2 = randomInt();
		diviConfig.addValueToFlag(flagName, contents2);

		expect(diviConfig.getFlagContents(flagName)).toEqual(
			expect.arrayContaining([contents1, contents2])
		);
	});

	test('Adds several values to flag & gets new flag contents', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();

		const allContents = [];
		for (let i = 0; i < allContents.length; i++) {
			allContents.push(randomString());
		}

		diviConfig.addValueToFlag(flagName, allContents);

		expect(diviConfig.getFlagContents(flagName)).toEqual(
			expect.arrayContaining(allContents)
		);
	});

});
