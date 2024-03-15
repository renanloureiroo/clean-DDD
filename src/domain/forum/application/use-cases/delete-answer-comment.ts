import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseDTO {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {
  answerComment: AnswerComment
}

class DeleteAnswerCommentUseCase {
  constructor(private commentRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseDTO): Promise<DeleteAnswerCommentUseCaseResponse> {
    const comment = await this.commentRepository.findById(answerCommentId)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('You are not allowed to delete this comment')
    }

    await this.commentRepository.delete(answerCommentId)

    return {
      answerComment: comment,
    }
  }
}

export { DeleteAnswerCommentUseCase }
