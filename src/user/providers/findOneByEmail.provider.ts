import {
    Injectable,
    RequestTimeoutException,
    UnauthorizedException,
  } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { User } from "../entities/user.entity";
  import { Repository } from "typeorm";
  
  @Injectable()
  export class FindOneByEmailProvider {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>
    ) {}
  
    public async findOneByEmail(email: string) {
      let user: User | undefined;
      try {
        user = await this.userRepository.findOneBy({ email });
      } catch (error) {
        throw new RequestTimeoutException(
          "There was an error fetching the user",
          {
            description: "Error fetching user",
            cause: error,
          }
        );
      }
      if (!user) {
        throw new UnauthorizedException("User does not exist");
      }
  
      return user;
    }
  }