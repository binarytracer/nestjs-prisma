import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOkResponse({ type: CategoryDto })
  @ApiBody({ type: () => CreateCategoryDto })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOkResponse({ type: CategoryDto, isArray: true })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOkResponse({ type: CategoryDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiOkResponse({ type: CategoryDto })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiParam({ name: 'id', description: 'category id' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: Category['id'],
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOkResponse({ type: CategoryDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
