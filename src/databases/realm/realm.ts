import Realm from "realm";
import path from "path";
import UserSchema from './schemas/UserSchema';
import CompanySchema from './schemas/CompanySchema';

export const getRealm = async () => {
  const currentModulePath = path.dirname(__dirname);
  const databasePath = path.join(currentModulePath, "realmdb/api-test");

  return await Realm.open({
    path: databasePath,
    schema: [UserSchema, CompanySchema],
    schemaVersion: 1
  });
};
