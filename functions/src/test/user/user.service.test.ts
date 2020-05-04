import {UserRepository} from "../../users/user.repository";
import {UserService} from "../../users/user.service";
import {IMock, Mock, Times} from "moq.ts";
import {User} from "../../models/user";

describe('UserService', () => {

  let userRepository: IMock<UserRepository>;
  let userService: UserService;

  const user: User = {uid: 'special', name: 'HP', email: 'jenshansen@gmail.com'};

  beforeEach(() => {
    userRepository = new Mock<UserRepository>()
      .setup(instance => instance.deleteUser(user.uid))
      .returns(Promise.resolve())

    userService = new UserService(userRepository.object());
  });

  it('UserService needs a UserRepository', () => {
    const userServiceDefined = new UserService(userRepository.object());
    expect(userServiceDefined).toStrictEqual(userService);
  });

  it('should check if user repo has a delete function', async () => {
    await userService.deleteUser(user.uid);
    userRepository.verify(userRepo => userRepo.deleteUser(user.uid), Times.Exactly(1))
  });

  it('should delete the user and check if the user is undefined', async () => {
    // @ts-ignore
    const userAfter: User = await userService.deleteUser(user);
    expect(userAfter).toBeUndefined();
  });

});
