import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CategoryRepo } from './category.repo'
import { TranslationModule } from '../translation'

@Module({
	imports: [TranslationModule],
	controllers: [CategoryController],
	providers: [CategoryService, CategoryRepo],
	exports: [CategoryService, CategoryRepo],
})
export class CategoryModule {}
