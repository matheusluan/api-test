import Realm from 'realm';
import { iCompany } from "../interfaces/iCompany";
import { getRealm } from '../databases/realm/realm'

//Repository class for Company CRUD
class CompanyRepository {
  realm!: Realm;

  constructor() {
    (async () => {
      this.realm = await getRealm();
    })();
  }

  // Function to create Company
  async createCompany(Company: iCompany) {
    await this.realm.write(() => {
      this.realm.create<iCompany>('Company', Company);
    });
  }

  // Function to update Company
  async updateCompany(Company: iCompany) {
    await this.realm.write(() => {
      this.realm.create<iCompany>('Company', Company, Realm.UpdateMode.Modified);
    });
  }

  // Function to get Company by ID
  async getCompanyById(id: string): Promise<iCompany | null> {
    const company = this.realm.objectForPrimaryKey<iCompany>('Company', id);
    return company ? { ...company } : null;
  }

  // Function to delete Company by ID
  async deleteCompany(id: string) {
    await this.realm.write(() => {
      const company = this.realm.objectForPrimaryKey<iCompany>('Company', id);
      if (company) {
        this.realm.delete(company);
      }
    });
  }

  // Function to get all Companys
  async getAllCompany(): Promise<iCompany[]> {
    const Companys = this.realm.objects<iCompany>('Company');
    return Array.from(Companys);
  }
}

export default new CompanyRepository();
