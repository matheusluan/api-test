import Realm from "realm";

class UserSchema extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "User",
    properties: {
      _id: "string",
      firstName: "string",
      lastName: "string",
      streetName: "string",
      streetNumber: "string",
      poBox: "string",
      city: "string",
      country: "string",
      email: "string",
      password: "string",
    },
    primaryKey: "_id",
  };
}

export default UserSchema;
