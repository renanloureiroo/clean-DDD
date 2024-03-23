import { Either, left, right } from '@/core/either'

import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteQuestionCommentUseCaseDTO {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

class DeleteQuestionCommentUseCase {
  constructor(private commentRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseDTO): Promise<DeleteQuestionCommentUseCaseResponse> {
    const comment = await this.commentRepository.findById(questionCommentId)

    if (!comment) {
      return left(new ResourceNotFoundError())
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.commentRepository.delete(questionCommentId)

    return right({})
  }
}

export { DeleteQuestionCommentUseCase }
