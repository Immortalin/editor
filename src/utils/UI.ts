import xs, { Stream } from 'xstream'
import { ZIndexOp } from '../actions/ChangeZIndexAction'
import { ItemId } from '../interfaces'

export type UIIntent = UIIntent.ALL

export namespace UIIntent {
  export type ALL =
    | 'toggle-lock'
    | 'toggle-sel-mode'
    | 'reset-zoom'
    | 'undo'
    | 'redo'
    | 'clear-history'
    | Edit
    | ApplyStylePreset
    | ChangeZIndex
    | ToggleSemanticTag
    | ChangeSel
    | DeleteItems
    | ZoomToItem

  export interface Edit {
    type: 'edit'
    field: string
    value: string
  }

  export interface ApplyStylePreset {
    type: 'apply-style-preset'
    name: string
  }

  export interface ChangeZIndex {
    type: 'change-z-index'
    op: ZIndexOp
  }

  export interface ToggleSemanticTag {
    type: 'toggle-semantic-tag'
    tagName: string
  }

  export interface ChangeSel {
    type: 'change-sel'
    itemIdArray: ItemId[]
  }

  export interface DeleteItems {
    type: 'delete-items'
    itemIdArray: ItemId[]
  }

  export interface ZoomToItem {
    type: 'zoom-to-item'
    itemId: ItemId
  }
}

export default class UIClass {
  private intent$: Stream<UIIntent> = xs.create()

  intent<T>(interestedType: string): Stream<T> {
    return this.intent$.filter(intent => {
      if (typeof intent === 'string') {
        return intent === interestedType
      } else {
        return intent.type === interestedType
      }
    }) as any
  }

  imitate(intentSource$: Stream<UIIntent>) {
    this.intent$.imitate(intentSource$)
  }
}
