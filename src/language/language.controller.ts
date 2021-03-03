import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Language } from './entities/language.entity';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    type: Language,
    description: 'Creates new language for the courses',
  })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Language,
    isArray: true,
    description: 'List of availables languages',
  })
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Language,
    description: 'Instance of a available language',
  })
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    type: Language,
    description: 'Update a exist language',
  })
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete a exist language',
  })
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
