import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }


async findOne(id: string): Promise<User> {
  const user = await this.userRepo.findOneBy({ id });
  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }
  return user;
}


  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

 async update(id: string, dto: UpdateUserDto): Promise<User> {
  const user = await this.userRepo.findOneBy({ id });
  if (!user) {
    throw new Error("User topilmadi");
  }

  // eski user ma'lumotlarini dto bilan birlashtiramiz
  this.userRepo.merge(user, dto);

  return this.userRepo.save(user);
}


  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
