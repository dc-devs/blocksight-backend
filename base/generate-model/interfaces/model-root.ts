interface Inputs {
	path: string;
}

interface Models {
	path: string;
}

interface Prisma {
	path: string;
}

interface Dto {
	path: string;
	inputs: Inputs;
	models: Models;
	prisma: Prisma;
}

interface Enums {
	path: string;
}

interface ModelRoot {
	path: string;
	dto: Dto;
	enums: Enums;
}

export default ModelRoot;
