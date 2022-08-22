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

		diviConfig.setFlag<any>(flagName, contents);

		expect(diviConfig.getFlagContents<any>(flagName)).toEqual(contents);
	});

	test('Sets flag to have multiple values & gets all contents', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();
		const contents = [randomString(), randomString()];

		diviConfig.setFlag<any>(flagName, contents);

		expect(diviConfig.getFlagContents<any>(flagName)).toEqual(contents);
	});

	test('Sets flag & returns true if flag is set', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();
		const contents = randomString();

		diviConfig.setFlag<any>(flagName, contents);

		expect(diviConfig.isFlagSet<any>(flagName)).toEqual(true);
	});

	test('Returns false if flag is not set', () => {
		const diviConfig = new DiviConfigParser();

		expect(diviConfig.isFlagSet<any>(randomString())).toEqual(false);
	});

	test('Sets flag (checks if set) unsets flag (and checks if still set)', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();
		diviConfig.setFlag<any>(flagName, randomString());

		expect(diviConfig.isFlagSet<any>(flagName)).toEqual(true);

		diviConfig.unsetFlag<any>(flagName);

		expect(diviConfig.isFlagSet<any>(flagName)).toEqual(false);
		expect(diviConfig.getFlagContents<any>(flagName)).toEqual(undefined);
	});

	test('Adds additional value to flag & gets new flag contents', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();

		const contents1 = randomString();
		diviConfig.setFlag<any>(flagName, contents1);

		const contents2 = randomInt();
		diviConfig.addValueToFlag<any>(flagName, contents2);

		expect(diviConfig.getFlagContents<any>(flagName)).toEqual(
			expect.arrayContaining([contents1, contents2])
		);
	});

	test('Adds several values to flag & gets new flag contents', () => {
		const diviConfig = new DiviConfigParser();

		const flagName = randomString();

		const allContents: string[] = [];
		for (let i = 0; i < allContents.length; i++) {
			allContents.push(randomString());
		}

		diviConfig.addValueToFlag<any>(flagName, allContents);

		expect(diviConfig.getFlagContents<any>(flagName)).toEqual(
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

		expect(diviConfig.getFlagContents<any>('flag1')).toEqual('value');
		expect(diviConfig.getFlagContents<any>('flag2')).toEqual('123');
		expect(diviConfig.isFlagSet<any>('#comment')).toEqual(false);
		expect(diviConfig.getFlagContents<any>('#commentedFlag')).not.toEqual(
			'23'
		);
		expect(diviConfig.getFlagContents<any>('flag3')).toEqual(
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

		expect(diviConfig.getFlagContents<any>('flag1')).toEqual('value');
		expect(diviConfig.getFlagContents<any>('flag2')).toEqual('123');
		expect(diviConfig.isFlagSet<any>('#comment')).toEqual(false);
		expect(diviConfig.getFlagContents<any>('#commentedFlag')).not.toEqual(
			'23'
		);
		expect(diviConfig.getFlagContents<any>('flag3')).toEqual(
			expect.arrayContaining(['123.456.789', '0.0.0.0', '127.0.0.1'])
		);
	});

	test('Gets Divi Config as String', () => {
		const diviConfig = new DiviConfigParser();

		const flag1 = randomString();
		const contents1 = randomString();
		diviConfig.setFlag<any>(flag1, contents1);

		const flag2 = randomString();
		const contents2 = randomBool();
		const contents3 = randomInt();
		diviConfig.setFlag<any>(flag2, [contents2, contents3]);

		expect(diviConfig.toString()).toEqual(`${flag1}=${contents1}
${flag2}=${contents2}
${flag2}=${contents3}
`);
	});

	test('Copies another divi config contents into self', () => {
		const diviConfig1 = new DiviConfigParser();

		const flag1 = randomString();
		const contents1 = randomString();
		diviConfig1.setFlag<any>(flag1, contents1);

		const diviConfig2 = new DiviConfigParser();

		const flag2 = randomString();
		const contents2 = [randomBool(), randomInt()];
		diviConfig2.setFlag<any>(flag2, contents2);

		const flag3 = randomString();
		const contents3 = randomString();
		diviConfig2.setFlag<any>(flag3, contents3);

		diviConfig1.copyFlagsFromConfig(diviConfig2);

		expect(diviConfig1.getFlagContents<any>(flag1)).toEqual(contents1);
		expect(diviConfig1.getFlagContents<any>(flag2)).toEqual(contents2);
		expect(diviConfig1.getFlagContents<any>(flag3)).toEqual(contents3);
	});

	test('Overwrites current flags with other divi config', () => {
		const diviConfig1 = new DiviConfigParser();

		const flag1 = randomString();
		const contents1 = randomString();
		diviConfig1.setFlag<any>(flag1, contents1);

		const diviConfig2 = new DiviConfigParser();

		const contents2 = randomString();
		diviConfig2.setFlag<any>(flag1, contents2);

		diviConfig1.copyFlagsFromConfig(diviConfig2);

		expect(diviConfig1.getFlagContents<any>(flag1)).toEqual(contents2);
	});
});
