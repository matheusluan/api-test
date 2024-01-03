import Realm from 'realm';
import { iUser } from "../interfaces/iUser";
import { getRealm } from '../databases/realm/realm'

//Repository class for User CRUD
class UserRepository {
  realm!: Realm;

  constructor() {
    (async () => {
      this.realm = await getRealm();
    })();
  }

  // Function to create User
  async createUser(user: iUser) {
    await this.realm.write(() => {
      this.realm.create<iUser>('User', user);
    });
  }

  // Function to update User
  async updateUser(user: iUser) {
    await this.realm.write(() => {
      this.realm.create<iUser>('User', user, Realm.UpdateMode.Modified);
    });
  }

  // Function to get User by ID
  async getUserById(id: string): Promise<iUser | null> {
    const user = this.realm.objectForPrimaryKey<iUser>('User', id);
    return user ? { ...user } : null;
  }

  // Function to delete User by ID
  async deleteUser(id: string) {
    await this.realm.write(() => {
      const user = this.realm.objectForPrimaryKey<iUser>('User', id);
      if (user) {
        this.realm.delete(user);
      }
    });
  }

  // Function to get all users
  async getAllUser(): Promise<iUser[]> {
    const users = this.realm.objects<iUser>('User');
    return Array.from(users);
  }
}

export default new UserRepository();
