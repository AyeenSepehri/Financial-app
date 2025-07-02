import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TransactionsFilter from '@/components/transactions/filters/TransactionsFilter'

// Mock child filter components
jest.mock('@/components/transactions/filters/partials/StatusFilter', () => {
    return function MockStatusFilter({ value, onChange }: any) {
        return (
            <div data-testid="status-filter">
                <select value={value} onChange={(e) => onChange(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                </select>
            </div>
        )
    }
})

jest.mock('@/components/transactions/filters/partials/AmountRangeFilter', () => {
    return function MockAmountRangeFilter({ value, onChange }: any) {
        return (
            <div data-testid="amount-range-filter">
                <input
                    data-testid="min-amount"
                    type="number"
                    value={value.min}
                    onChange={(e) => onChange({ ...value, min: e.target.value })}
                    placeholder="Min"
                />
                <input
                    data-testid="max-amount"
                    type="number"
                    value={value.max}
                    onChange={(e) => onChange({ ...value, max: e.target.value })}
                    placeholder="Max"
                />
            </div>
        )
    }
})

jest.mock('@/components/transactions/filters/partials/DateRangeFilter', () => {
    return function MockDateRangeFilter({ value, onChange }: any) {
        return (
            <div data-testid="date-range-filter">
                <input
                    data-testid="start-date"
                    type="date"
                    value={value.start}
                    onChange={(e) => onChange({ ...value, start: e.target.value })}
                />
                <input
                    data-testid="end-date"
                    type="date"
                    value={value.end}
                    onChange={(e) => onChange({ ...value, end: e.target.value })}
                />
            </div>
        )
    }
})

jest.mock('@/components/transactions/filters/partials/MerchantFilter', () => {
    return function MockMerchantFilter({ merchantId, options, onChange }: any) {
        return (
            <div data-testid="merchant-filter">
                <select value={merchantId} onChange={(e) => onChange(e.target.value)}>
                    <option value="all">All Merchants</option>
                    {options.map((option: any) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
})

jest.mock('@/components/transactions/filters/partials/PaymentMethodFilter', () => {
    return function MockPaymentMethodFilter({ value, options, onChange }: any) {
        return (
            <div data-testid="payment-method-filter">
                <select value={value} onChange={(e) => onChange(e.target.value)}>
                    <option value="all">All Payment Methods</option>
                    {options.map((group: any) => (
                        <optgroup key={group.label} label={group.label}>
                            {group.options.map((option: any) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>
        )
    }
})

const mockFilters = {
    status: 'all',
    amountRange: { min: '', max: '' },
    dateRange: { start: '', end: '' },
    merchant: 'all',
    paymentMethod: 'all'
}

const mockMerchantOptions = [
    { label: 'GroceryMart', value: 'mcht_001' },
    { label: 'TechWorld', value: 'mcht_002' }
]

const mockPaymentMethodOptions = [
    {
        label: 'CREDIT CARD',
        options: [
            { label: 'CREDIT CARD (VISA)', value: 'credit_card-visa' },
            { label: 'CREDIT CARD (MASTERCARD)', value: 'credit_card-mastercard' }
        ]
    }
]

describe('TransactionsFilter', () => {
    const mockOnChange = jest.fn()
    const mockOnApply = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders filter toggle button', () => {
        render(
            <TransactionsFilter
                filters={mockFilters}
                merchantOptions={mockMerchantOptions}
                paymentMethodOptions={mockPaymentMethodOptions}
                onChange={mockOnChange}
                onApply={mockOnApply}
            />
        )

        expect(screen.getByRole('button', { name: /filters/i })).toBeInTheDocument()
    })

    it('shows filter components when toggle button is clicked', () => {
        render(
            <TransactionsFilter
                filters={mockFilters}
                merchantOptions={mockMerchantOptions}
                paymentMethodOptions={mockPaymentMethodOptions}
                onChange={mockOnChange}
                onApply={mockOnApply}
            />
        )

        const toggleButton = screen.getByRole('button', { name: /filters/i })
        fireEvent.click(toggleButton)

        expect(screen.getByTestId('status-filter')).toBeInTheDocument()
        expect(screen.getByTestId('amount-range-filter')).toBeInTheDocument()
        expect(screen.getByTestId('date-range-filter')).toBeInTheDocument()
        expect(screen.getByTestId('merchant-filter')).toBeInTheDocument()
        expect(screen.getByTestId('payment-method-filter')).toBeInTheDocument()
    })

    it('shows apply button when filters are expanded', () => {
        render(
            <TransactionsFilter
                filters={mockFilters}
                merchantOptions={mockMerchantOptions}
                paymentMethodOptions={mockPaymentMethodOptions}
                onChange={mockOnChange}
                onApply={mockOnApply}
            />
        )

        const toggleButton = screen.getByRole('button', { name: /filters/i })
        fireEvent.click(toggleButton)

        expect(screen.getByRole('button', { name: /apply filters/i })).toBeInTheDocument()
    })

    it('calls onApply when apply button is clicked', () => {
        render(
            <TransactionsFilter
                filters={mockFilters}
                merchantOptions={mockMerchantOptions}
                paymentMethodOptions={mockPaymentMethodOptions}
                onChange={mockOnChange}
                onApply={mockOnApply}
            />
        )

        const toggleButton = screen.getByRole('button', { name: /filters/i })
        fireEvent.click(toggleButton)

        const applyButton = screen.getByRole('button', { name: /apply filters/i })
        fireEvent.click(applyButton)

        expect(mockOnApply).toHaveBeenCalledTimes(1)
    })
}) 