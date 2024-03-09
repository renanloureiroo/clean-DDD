import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestionCommentsProps extends CommentProps {
  questionId: UniqueEntityId
}

class QuestionComments extends Comment<QuestionCommentsProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(props: Optional<QuestionCommentsProps, 'createdAt'>) {
    const answerComment = new QuestionComments({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })
    return answerComment
  }
}

export { QuestionComments }
