export function formatCurrency(value, useAbbreviations = false) {
  if (value === undefined || value === null) return ''

  // On mobile, we want to be more aggressive with formatting
  if (useAbbreviations) {
    // For small numbers, just remove decimal places if they're .00
    if (value < 1000) {
      // If value has no decimal part or decimal part is .00
      if (Math.floor(value) === value || value.toFixed(2).endsWith('.00')) {
        return Math.floor(value).toString()
      }
      // For values with decimals, show only one decimal place
      return value.toFixed(1)
    }

    // For thousands (1,000 - 999,999)
    if (value < 1000000) {
      const thousands = value / 1000
      // If it's a whole number of thousands, don't show decimals
      if (Math.floor(thousands) === thousands) {
        return Math.floor(thousands) + 'K'
      }
      return thousands.toFixed(1) + 'K'
    }

    // For millions (1,000,000+)
    const millions = value / 1000000
    // If it's a whole number of millions, don't show decimals
    if (Math.floor(millions) === millions) {
      return Math.floor(millions) + 'M'
    }
    return millions.toFixed(1) + 'M'
  }

  // For desktop, show the full format with 2 decimal places
  return value.toFixed(2)
}
