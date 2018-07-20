/// <reference types="react" />
import * as React from 'react'

export interface ElementPanState {
  dragging: boolean
  elHeight: number
  elWidth: number
  startX: number
  startY: number
  scrollX: number
  scrollY: number
  maxX: number
  maxY: number
}

export declare class ElementPan extends React.Component<
  {
    className?: string
    onPanStart?: (e?: ElementPanState) => void
    onPan?: (
      coords?: {
        x: number
        y: number
      }
    ) => void
    onPanStop?: (
      coords?: {
        x: number
        y: number
      }
    ) => void
    startX?: number
    startY?: number
    width?: number
    height?: number
    refElem?: (el: HTMLDivElement) => void
    style?: {
      [key: string]: any
    }
  },
  ElementPanState
> {
  el: HTMLDivElement
  constructor()
  onDragStart(e: any): void
  onDragMove(e: any): void
  onDragStop(): void
  componentDidMount(): void
  getContainerStyles(): any
  ref(el: HTMLDivElement): void
  render(): JSX.Element
}
