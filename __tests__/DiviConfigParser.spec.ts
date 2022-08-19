import DiviConfigParser from '../src/DiviConfigParser';
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

	test('Sets flag (checks if set) unsets flag (and checks if still set)', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();
		diviConfig.setFlag(flagName, randomString());

		expect(diviConfig.isFlagSet(flagName)).toEqual(true);

		diviConfig.unsetFlag(flagName);

		expect(diviConfig.isFlagSet(flagName)).toEqual(false);
		expect(diviConfig.getFlagContents(flagName)).toEqual(undefined);
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

	test('Sets flags from divi config file', () => {
		const diviConfig = new DiviConfigParser();

		diviConfig.fromString(`
flag1=value
flag2=123
#comment
#commentedFlag=23

flag3=123.456.789
flag3=0.0.0.0
flag3=127.0.0.1
`);

		expect(diviConfig.getFlagContents('flag1')).toEqual('value');
		expect(diviConfig.getFlagContents('flag2')).toEqual('123');
		expect(diviConfig.isFlagSet('#comment')).toEqual(false);
		expect(diviConfig.getFlagContents('#commentedFlag')).not.toEqual('23');
		expect(diviConfig.getFlagContents('flag3')).toEqual(
			expect.arrayContaining(['123.456.789', '0.0.0.0', '127.0.0.1'])
		);
	});

	test('Constructs from divi config file', () => {
		const diviConfig = new DiviConfigParser(`
flag1=value
flag2=123
#comment
#commentedFlag=23

flag3=123.456.789
flag3=0.0.0.0
flag3=127.0.0.1
`);

		expect(diviConfig.getFlagContents('flag1')).toEqual('value');
		expect(diviConfig.getFlagContents('flag2')).toEqual('123');
		expect(diviConfig.isFlagSet('#comment')).toEqual(false);
		expect(diviConfig.getFlagContents('#commentedFlag')).not.toEqual('23');
		expect(diviConfig.getFlagContents('flag3')).toEqual(
			expect.arrayContaining(['123.456.789', '0.0.0.0', '127.0.0.1'])
		);
	});

	test('Returns divi config file', () => {
		const diviConfig = new DiviConfigParser();

		const flag1 = randomString();
		const contents1 = randomString();
		diviConfig.addValueToFlag(flag1, contents1);

		const flag2 = randomString();
		const contents2 = randomBool();
		const contents3 = randomInt();
		diviConfig.setFlag(flag2, [contents2, contents3]);

		expect(diviConfig.toString()).toEqual(`${flag1}=${contents1}
${flag2}=${contents2}
${flag2}=${contents3}
`);
	});
});
