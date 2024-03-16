import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerCommentUseCaseDTO {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

class DeleteAnswerCommentUseCase {
  constructor(private commentRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseDTO): Promise<DeleteAnswerCommentUseCaseResponse> {
    const comment = await this.commentRepository.findById(answerCommentId)

    if (!comment) {
      return left(new ResourceNotFoundError())
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.commentRepository.delete(answerCommentId)

    return right({})
  }
}

export { DeleteAnswerCommentUseCase }
