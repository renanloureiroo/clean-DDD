import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/repositories/factories/make-answer-comment'

let answerCommentsRepository: AnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentUseCase(answerCommentsRepository)
  })

  it('should be able to delete a comment', async () => {
    const answerComment = makeAnswerComment()

    await answerCommentsRepository.create(answerComment)

    const response = await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(response.answerComment).toEqual(answerComment)
  })

  it('should not be able to delete a non-existing comment', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'fake-author-id',
        answerCommentId: 'fake-comment-id',
      }),
    ).rejects.toThrow('Comment not found')
  })
})
