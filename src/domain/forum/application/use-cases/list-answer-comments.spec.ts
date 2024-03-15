import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ListAnswerCommentsUseCase } from './list-answer-comments'
import { makeAnswerComment } from 'test/repositories/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let answerCommentsRepository: AnswerCommentsRepository
let sut: ListAnswerCommentsUseCase

describe('List Answer Comments', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new ListAnswerCommentsUseCase(answerCommentsRepository)
  })

  it("should be able to list answer's comments", async () => {
    const answerId = 'answer-id-test'

    for (let i = 0; i < 3; i++) {
      const answerComment = makeAnswerComment({
        answerId: new UniqueEntityId('answer-id-test'),
      })

      await answerCommentsRepository.create(answerComment)
    }

    const { answerComments } = await sut.execute({ answerId })

    expect(answerComments).toHaveLength(3)
  })

  it('should return an empty array if there are no comments', async () => {
    const answerId = 'answer-id-test'

    const { answerComments } = await sut.execute({ answerId })

    expect(answerComments).toHaveLength(0)
  })

  it('should be able to paginate the comments', async () => {
    const answerId = 'answer-id-test'

    for (let i = 0; i < 30; i++) {
      const answerComment = makeAnswerComment({
        answerId: new UniqueEntityId('answer-id-test'),
      })

      await answerCommentsRepository.create(answerComment)
    }

    const { answerComments: firstPageComments } = await sut.execute({
      answerId,
      page: 1,
    })

    const { answerComments: secondPageComments } = await sut.execute({
      answerId,
      page: 2,
    })

    expect(firstPageComments).toHaveLength(20)
    expect(secondPageComments).toHaveLength(10)
  })
})
