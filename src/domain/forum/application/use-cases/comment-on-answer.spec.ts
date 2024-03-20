import { AnswersRepository } from '../repositories/answers-repository'

import { makeAnswer } from 'test/repositories/factories/make-answer'

import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

let answerRepository: AnswersRepository
let answerCommentsRepository: AnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(answerRepository, answerCommentsRepository)
  })

  it('should be able to create a new comment on answer', async () => {
    const answer = makeAnswer()
    answerRepository.create(answer)

    const response = await sut.execute({
      authorId: 'fake-author-id',
      answerId: answer.id.toString(),
      content: 'fake-content',
    })

    expect(response.isRight()).toBeTruthy()
    expect(
      response.isRight() && response.value?.answerComment.id.toString(),
    ).toBeDefined()
  })

  it('should not be able to create comment on a non-existing answer', async () => {
    const response = await sut.execute({
      authorId: 'fake-author-id',
      answerId: 'fake-answer-id',
      content: 'fake-content',
    })

    expect(response.isLeft()).toBeTruthy()

    expect(response.isLeft() && response.value).toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
