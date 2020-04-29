import {UserController} from './users/user.controller';
import {UserRepository} from './users/user.repository';
import {UserRepositoryFirebase} from './users/user.repository.firebase';
import {UserService} from './users/user.service';

export class DependencyFactory {

  getUserController(): UserController{
    const repo: UserRepository = new UserRepositoryFirebase();
    const service: UserService = new UserService(repo);
    return new UserController(service)
  }

}
