export type ChipOption = {
  label: string
  value: string
  disabled?: boolean
}

export interface FilterState {
  regions: string[]
  designStyles: string[]
  shapes: string[]
  flavors: string[]
  toppings: string[]
  specialOptions: string[]
  purpose: string[]
  hotspots: string[]
}

export interface FilterTab {
  key: string
  label: string
}

export interface PriceRange {
  min: number
  max: number
}
