import { makeAnswer } from 'test/repositories/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

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
    await expect(
      sut.execute({
        authorId: 'any_author_id',
        answerId: 'answer-1',
      }),
    ).rejects.toThrow('Answer not found')
  })

  it("should not be able delete a answer that you don't own", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-id-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await answerRepository.create(newAnswer)

    await expect(
      sut.execute({
        authorId: 'any_author_id',
        answerId: 'answer-1',
      }),
    ).rejects.toThrow('You are not allowed to delete this answer')
  })
})
