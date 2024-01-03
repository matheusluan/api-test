
import Realm from "realm";
import UserSchema  from './schemas/UserSchema';
import CompanySchema  from './schemas/CompanySchema';

export const getRealm = async () => await Realm.open({
  path: "/DevelopementTest/realmdb/api-test",
  schema: [
    UserSchema,
    CompanySchema,
  ],
  schemaVersion: 1
});