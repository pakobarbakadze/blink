import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserQL } from '../../../common/models/user.model';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';

@Resolver(() => UserQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserQL], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserQL, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserQL)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserQL)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
