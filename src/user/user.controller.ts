import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { DuplicateEmailException } from 'exeptions';
import { RolesGuard } from 'src/role/role.guard';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof DuplicateEmailException) {
        throw new ConflictException('Email address already exists');
      }
      throw error;
    }
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
