import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let questionRepository: AnswersRepository
let sut: AnswerQuestionUseCase

describe('UseCases =>  Create Answer', () => {
  beforeEach(() => {
    questionRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(questionRepository)
  })

  it('should be able create a question', async () => {
    const { answer } = await sut.execute({
      instructorId: 'any_instructor_id',
      content: 'Conteudo da resposta',
      questionId: 'any_question_id',
    })

    expect(answer.id).toBeTruthy()
  })
})
