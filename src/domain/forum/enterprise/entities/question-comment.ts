import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentsProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

class QuestionComments extends Entity<QuestionCommentsProps> {
  get content() {
    return this.props.content
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
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
