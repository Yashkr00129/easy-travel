import mongoose from 'mongoose';

export type IRole = 'Admin' | 'Customer' | 'Guide' | 'Manager';

export type IUser = {
	_id?: string;
	name: string;
	dateOfBirth: Date;
	email: string;
	phone?: string;
	companyId?: string;
	role: IRole;
	profileImage?: string;
	address?: string;
	priorityLevel: number;
	createdAt?: Date;
	updatedAt?: Date;
};

const userSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			min: 3,
			max: 30,
		},
		dateOfBirth: {
			type: Date,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		companyId: {
			type: String,
		},
		role: {
			type: String,
			enum: ["Admin", "Manager", "Guide", "Customer"],
			default: "Admin",
		},
		profileImage: {
			type: String,
		},
		address: {
			type: String,
		},
		priorityLevel: {
			type: Number,
			min: 1,
			max: 10,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
