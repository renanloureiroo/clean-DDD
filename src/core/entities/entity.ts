import { UniqueEntityId } from './unique-entity-id'

class Entity<Props> {
  private _id: UniqueEntityId

  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  get id() {
    return this._id
  }
}

export { Entity }
