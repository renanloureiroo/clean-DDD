import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { ListQuestionAnswersUseCase } from './list-question-answers'
import { makeAnswer } from 'test/repositories/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let answersRepository: AnswersRepository
let sut: ListQuestionAnswersUseCase

describe('List Questions Answers', async () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new ListQuestionAnswersUseCase(answersRepository)
  })

  it('should list question answers', async () => {
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('list-question-answers-id'),
      }),
    )

    const response = await sut.execute({
      questionId: 'list-question-answers-id',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.answers).toHaveLength(1)
    expect(
      response.isRight() && response.value.answers[0].questionId.toString(),
    ).toBe('list-question-answers-id')
  })

  it('should list question answers with pagination', async () => {
    for (let i = 0; i < 26; i++) {
      await answersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('list-question-answers-id'),
        }),
      )
    }

    const response = await sut.execute({
      questionId: 'list-question-answers-id',
      page: 2,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.answers).toHaveLength(6)
  })
})
