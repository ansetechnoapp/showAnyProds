import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type optionsType = {
  currency ?: 'USD' | 'EURO' | 'GBP' | 'BDT'
  notation ?: Intl.NumberFormatOptions['notation']
}

export function FormatPrice(price:string |  number, options: optionsType ={}){

  const { currency = 'USD' , notation = 'compact' } = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;


  return new Intl.NumberFormat(
    'en-uS',
    {
      style: 'currency',
      currency,
      notation,
      maximumFractionDigits: 2, 
    }
  ).format(numericPrice);
}