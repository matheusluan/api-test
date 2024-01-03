import Realm from "realm";

class CompanySchema extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "Company",
    properties: {
      _id: "string",
      name: "string",
      streetName: "string",
      streetNumber: "string",
      poBox: "string",
      city: "string",
      state: "string",
      zipCode: "string",
      country: "string",
      email: "string",
      type: "string",
      telephone: "string",
      fax: "string",
    },
    primaryKey: "_id",
  };
}

export default CompanySchema;
