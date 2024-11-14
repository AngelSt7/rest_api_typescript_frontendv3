export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(quantity)
}

export function toBoolean(string: string): boolean {
    return /^(true|1|yes)$/i.test(string);
}
