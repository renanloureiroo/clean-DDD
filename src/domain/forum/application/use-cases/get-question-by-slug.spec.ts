import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { QuestionsRepository } from '../repositories/questions-repository'

import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/repositories/factories/make-question'

let questionRepository: QuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('UseCases =>  Get Question By Slug', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const question = makeQuestion()

    await questionRepository.create(question)

    const { question: questionResponse } = await sut.execute({
      slug: question.slug.value,
    })

    expect(questionResponse).toBeTruthy()
  })

  it("should not be return a question if it doesn't exists", async () => {
    await expect(() =>
      sut.execute({
        slug: 'titulo-da-pergunta',
      }),
    ).rejects.toThrow('Question not found')
  })
})
