import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(LanguageRepository)
    private languageRepository: LanguageRepository,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const language = await this.languageRepository.saveLanguage(
      createLanguageDto,
    );

    if (!language) {
      throw new InternalServerErrorException(
        `We had a problem saving the language`,
      );
    }

    return language;
  }

  findAll(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  async findOne(id: number): Promise<Language> {
    const language = await this.languageRepository.findOne(id);

    if (!language) {
      throw new NotFoundException(`Language with ID "${id}" not found`);
    }

    return language;
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    let language = await this.findOne(id);

    language = await this.languageRepository.saveLanguage(
      updateLanguageDto,
      language,
    );

    return language;
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.languageRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Language with ID "${id}" not found`);
    }
  }
}
