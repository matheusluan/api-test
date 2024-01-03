import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { iUser } from "../interfaces/iUser";

class UserController {
    async create(request: Request, response: Response) {
        try {
            const userData: iUser = request.body;

            if (!userData) {
                throw new AppError(`Request Body Missing.`);
            }

            if (!userData.firstName || !userData.lastName || !userData.streetName || !userData.streetNumber || !userData.poBox || !userData.city || !userData.country || !userData.email || !userData.password) {
                const missingFields = [];

                if (!userData.firstName) missingFields.push("First Name");
                if (!userData.lastName) missingFields.push("Last Name");
                if (!userData.streetName) missingFields.push("Street Name");
                if (!userData.streetNumber) missingFields.push("Street Number");
                if (!userData.poBox) missingFields.push("poBox");
                if (!userData.city) missingFields.push("city");
                if (!userData.country) missingFields.push("country");
                if (!userData.email) missingFields.push("email");
                if (!userData.password) missingFields.push("type");

                throw new AppError(`One or more fields are missing : ${missingFields.join(", ")}`);
            }

            // Generate UUID for user
            const userId: string = uuid().toString();

            // Encript password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Replace the original password with the hash
            userData.password = hashedPassword;

            // Set UUID to user
            userData._id = userId;

            const user = await userRepository.createUser(userData);

            return response.status(201).json({ message: 'User registered successfully', user });

        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { search } = request.query;

            const users = await userRepository.getAllUser();

            return response.json(users);

        } catch (error: any) {
            return response.status(500).json({ error: error.message });
        }
    }

    async findById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const user = await userRepository.getUserById(id);

            if (!user) {
                throw new AppError("User not found", 404);
            }

            return response.json(user);
        } catch (error: any) {
            return response.status(500).json({ error: error.message });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const userData: iUser = request.body;

            // Verify if user exist
            const existingUser = await userRepository.getUserById(id);

            if (!existingUser) {
                throw new AppError("User not found!", 404);
            }

            if (!userData.firstName || !userData.lastName || !userData.streetName || !userData.streetNumber || !userData.poBox || !userData.city || !userData.country || !userData.email || !userData.password) {
                const missingFields = [];

                if (!userData.firstName) missingFields.push("First Name");
                if (!userData.lastName) missingFields.push("Last Name");
                if (!userData.streetName) missingFields.push("Street Name");
                if (!userData.streetNumber) missingFields.push("Street Number");
                if (!userData.poBox) missingFields.push("poBox");
                if (!userData.city) missingFields.push("city");
                if (!userData.country) missingFields.push("country");
                if (!userData.email) missingFields.push("email");
                if (!userData.password) missingFields.push("type");

                throw new AppError(`One or more fields are missing : ${missingFields.join(", ")}`);
            }

            userData._id = existingUser._id;

            //IF password change
            if (userData.password != existingUser.password) {

                // Encript password
                const hashedPassword = await bcrypt.hash(userData.password, 10);

                // Replace the original password with the hash
                userData.password = hashedPassword;
            }

            //Update
            await userRepository.updateUser(userData);

            return response.status(200).json({ message: 'User updated successfully', userData });

        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }

}

export default new UserController();


