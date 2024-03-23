import { makeAnswer } from 'test/repositories/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { AnswersRepository } from '../repositories/answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

let answerRepository: AnswersRepository
let sut: DeleteAnswerUseCase

describe('UseCases => Delete Answer', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(answerRepository)
  })

  it('should be able delete a answer', async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId('answer-1'))

    await answerRepository.create(newAnswer)

    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: 'answer-1',
    })

    const answer = await answerRepository.findById('answer-1')
    expect(answer).toBeNull()
  })

  it("should not be able delete a answer that doesn't exist", async () => {
    const response = await sut.execute({
      authorId: 'any_author_id',
      answerId: 'answer-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it("should not be able delete a answer that you don't own", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-id-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await answerRepository.create(newAnswer)

    const response = await sut.execute({
      authorId: 'any_author_id',
      answerId: 'answer-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(NotAllowedError)
  })
})
