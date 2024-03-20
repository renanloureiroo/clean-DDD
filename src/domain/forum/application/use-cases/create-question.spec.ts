import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

let questionRepository: QuestionsRepository
let sut: CreateQuestionUseCase

describe('UseCases =>  Create Question', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(questionRepository)
  })

  it('should be able create a question', async () => {
    const answer = await sut.execute({
      authorId: 'any_author_id',
      content: 'Conteudo da pergunta',
      title: 'Titulo da pergunta',
    })

    expect(answer.isRight()).toBeTruthy()
    expect(answer.isRight() && answer.value.question.id).toBeTruthy()
  })
})
