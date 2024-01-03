import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import CompanyRepository from "../repositories/companyRepository";
import { iCompany } from "../interfaces/iCompany";
import { v4 as uuid } from 'uuid';

class CompanyController {
  async create(request: Request, response: Response) {
    try {
      const companyData: iCompany = request.body;

      if (!companyData) {
        throw new AppError(`Request Body Missing.`);
      }

      if (!companyData.name || !companyData.streetName || !companyData.streetNumber || !companyData.city || !companyData.state || !companyData.zipCode || !companyData.country || !companyData.email || !companyData.type || !companyData.telephone) {
        const missingFields = [];

        if (!companyData.name) missingFields.push("name");
        if (!companyData.streetName) missingFields.push("streetName");
        if (!companyData.streetNumber) missingFields.push("streetNumber");
        if (!companyData.poBox) missingFields.push("poBox");
        if (!companyData.city) missingFields.push("city");
        if (!companyData.state) missingFields.push("state");
        if (!companyData.zipCode) missingFields.push("zipCode");
        if (!companyData.country) missingFields.push("country");
        if (!companyData.email) missingFields.push("email");
        if (!companyData.type) missingFields.push("type");
        if (!companyData.telephone) missingFields.push("telephone");

        throw new AppError(`One or more fields are missing : ${missingFields.join(", ")}`);
      }

      // Generate a UUID for the company
      const CompanyId: string = uuid().toString();

      //Define a UUID for obj company
      companyData._id = CompanyId;

      const company = await CompanyRepository.createCompany(companyData);

      return response.status(201).json({ message: 'Company registered successfully', company });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const companyData: iCompany = request.body;

      // Verify if company exist
      const existingCompany = await CompanyRepository.getCompanyById(id);

      if (!existingCompany) {
        throw new AppError("Company not found!", 404);
      }

      if (!companyData.name || !companyData.streetName || !companyData.streetNumber || !companyData.city || !companyData.state || !companyData.zipCode || !companyData.country || !companyData.email || !companyData.type || !companyData.telephone) {
        const missingFields = [];

        if (!companyData.name) missingFields.push("name");
        if (!companyData.streetName) missingFields.push("streetName");
        if (!companyData.streetNumber) missingFields.push("streetNumber");
        if (!companyData.poBox) missingFields.push("poBox");
        if (!companyData.city) missingFields.push("city");
        if (!companyData.state) missingFields.push("state");
        if (!companyData.zipCode) missingFields.push("zipCode");
        if (!companyData.country) missingFields.push("country");
        if (!companyData.email) missingFields.push("email");
        if (!companyData.type) missingFields.push("type");
        if (!companyData.telephone) missingFields.push("telephone");

        throw new AppError(`One or more fields are missing : ${missingFields.join(", ")}`);
      }

      companyData._id = existingCompany._id;

      // Edit company
      await CompanyRepository.updateCompany(companyData);

      return response.status(200).json({ message: 'Company updated successfully', companyData });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }

  async findById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const Company = await CompanyRepository.getCompanyById(id);

      if (!Company) {
        throw new AppError("Company not found.", 404);
      }

      return response.status(200).json(Company);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async findAll(request: Request, response: Response) {
    try {
      const Companys = await CompanyRepository.getAllCompany();

      return response.json(Companys);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const company = await CompanyRepository.getCompanyById(id);

      if (!company) {
        throw new AppError('Company not found.', 404);
      }

      await CompanyRepository.deleteCompany(id);

      return response.status(204).json({ message: "Company Deleted." });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export default new CompanyController();
