export type IUserRole = "Admin" | "Customer" | "Guide" | "Manager";

export type ICreateUser = {
	name: string;
	dateOfBirth: Date;
	email: string;
	phone?: string;
	company?: string;
	role: IUserRole;
	profileImage?: string;
	address?: string;
	priorityLevel: number;
};

export type IUser = {
	_id: string;
	name: string;
	dateOfBirth: Date;
	email: string;
	phone?: string;
	company?: string;
	role: IUserRole;
	profileImage?: string;
	address?: string;
	priorityLevel: number;
	createdAt: Date;
	updatedAt: Date;
};

export type ICompany = {
	_id: string;
	name: string;
	phone: string;
	address: string;
	priorityLevel: number;
	createdAt: Date;
	updatedAt: Date;
};

export type ICreateCompany = {
	name: string;
	phone: string;
	address: string;
	priorityLevel: number;
};
