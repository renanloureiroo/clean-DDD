import { AnswersRepository } from '../repositories/answers-repository'

import { makeAnswer } from 'test/repositories/factories/make-answer'

import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

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

    expect(response.answerComment.id).toBeTruthy()
  })

  it('should not be able to create comment on a non-existing answer', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'fake-author-id',
        answerId: 'fake-answer-id',
        content: 'fake-content',
      }),
    ).rejects.toThrow('Answer not found')
  })
})
