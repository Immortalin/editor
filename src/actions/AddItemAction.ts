import { OrderedSet } from 'immutable'
import { identical } from 'ramda'
import Action from './index'
import { AppHistory, Item, ItemId, State } from '../interfaces'
import { getNextItemId } from '../utils/common'

export default class AddItemAction extends Action {
  private itemId: number
  private prevSelIdSet: OrderedSet<ItemId>

  constructor(private item: Item) {
    super()
  }

  prepare(h: AppHistory): AppHistory {
    this.itemId = getNextItemId(h.state)
    this.prevSelIdSet = h.state.selIdSet
    return h
  }

  next(state: State) {
    return state
      .update('items', items => items.set(this.itemId, this.item.set('id', this.itemId)))
      .update('zlist', zlist => zlist.push(this.itemId))
      .set('selIdSet', OrderedSet([getNextItemId(state)]))
  }

  prev(state: State) {
    return state
      .deleteIn(['items', this.itemId])
      .update('zlist', zlist => zlist.filterNot(identical(this.itemId)))
      .set('selIdSet', this.prevSelIdSet)
  }

  getMessage() {
    return `Add item ${this.itemId}`
  }
}
