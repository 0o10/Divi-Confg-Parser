type FlagTypes = string | number | boolean;

export default class DiviConfigParser {
	private flags: { [flagName: string]: FlagTypes[] } = {};

	constructor(fileContents: string = '') {
	}

	private convertValueArray(value: FlagTypes | FlagTypes[]): FlagTypes[] {
		if (!Array.isArray(value)) {
			return [value];
		}
		return value;
	}

	setFlag(flagName: string, value: FlagTypes | FlagTypes[]): void {
		this.flags[flagName] = this.convertValueArray(value);
	}

}
