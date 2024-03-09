import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentsProps {
  authorId: UniqueEntityId
  answerId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

class AnswerComments extends Entity<AnswerCommentsProps> {
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

  get answerId() {
    return this.props.answerId
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

  static create(props: Optional<AnswerCommentsProps, 'createdAt'>) {
    const answerComment = new AnswerComments({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })
    return answerComment
  }
}

export { AnswerComments }
