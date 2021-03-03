import { EntityRepository, Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';

@EntityRepository(Language)
export class LanguageRepository extends Repository<Language> {
  async saveLanguage(
    saveLanguageDto: CreateLanguageDto | CreateLanguageDto,
    language = new Language(),
  ) {
    const { name, locale } = saveLanguageDto;

    language.name = name;
    language.locale = locale;

    await language.save();

    return language;
  }
}
