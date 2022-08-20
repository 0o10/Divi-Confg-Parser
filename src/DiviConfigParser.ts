import { FlagName, FlagTypes } from './FlagNames';

export default class DiviConfigParser {
	private flags: { [flagName: string]: FlagTypes[FlagName][] } = {};

	constructor(fileContents: string = '') {
		this.fromString(fileContents);
	}

	private ensureValueIsInArray(
		value: FlagTypes[FlagName] | FlagTypes[FlagName][]
	): FlagTypes[FlagName][] {
		if (!Array.isArray(value)) {
			return [value];
		}
		return value;
	}

	setFlag<F extends FlagName>(flagName: F, value: FlagTypes[F]): void {
		this.flags[flagName] = this.ensureValueIsInArray(value);
	}

	unsetFlag<F extends FlagName>(flagName: F): void {
		this.flags[flagName] = null;
		delete this.flags[flagName];
	}

	isFlagSet<F extends FlagName>(flagName: F): boolean {
		return flagName in this.flags;
	}

	addValueToFlag<F extends FlagName>(flagName: F, value: FlagTypes[F]): void {
		this.flags[flagName] = this.isFlagSet(flagName)
			? this.ensureValueIsInArray(this.flags[flagName])
			: [];
		(this.flags[flagName] as FlagTypes[FlagName][]).push(value);
	}

	getFlagContents<F extends FlagName>(
		flagName: F
	): FlagTypes[F] | FlagTypes[F][] | unknown {
		const contents = this.flags[flagName];
		if (!contents) {
			return undefined;
		} else if (contents.length > 1) {
			return contents;
		} else if (contents.length === 1) {
			return contents[0];
		}
	}

	private isStringDiviConfigFlag(flagString: string): boolean {
		return flagString.charAt(0) !== '#' && flagString.includes('=');
	}

	fromString(fileContents: string): void {
		const lines = fileContents.split('\n');

		for (const line of lines) {
			if (this.isStringDiviConfigFlag(line)) {
				const [flagName, value] = line.split('=');
				this.addValueToFlag(flagName as FlagName, value);
			}
		}
	}

	toString(): string {
		let diviConfigString = '';

		for (const flag in this.flags) {
			for (const value of this.flags[flag]) {
				if (value?.toString) {
					diviConfigString += flag + '=' + value.toString() + '\n';
				} else {
					console.warn(
						'unable to parse value:',
						value,
						'for flag:',
						flag
					);
				}
			}
		}

		return diviConfigString;
	}
}
