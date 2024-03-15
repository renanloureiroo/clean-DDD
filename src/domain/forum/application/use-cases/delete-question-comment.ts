import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseDTO {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {
  questionComment: QuestionComment
}

class DeleteQuestionCommentUseCase {
  constructor(private commentRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseDTO): Promise<DeleteQuestionCommentUseCaseResponse> {
    const comment = await this.commentRepository.findById(questionCommentId)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('You are not allowed to delete this comment')
    }

    await this.commentRepository.delete(questionCommentId)

    return {
      questionComment: comment,
    }
  }
}

export { DeleteQuestionCommentUseCase }
