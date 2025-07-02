import { renderHook, act } from '@testing-library/react'
import { useTransactionFilters } from '@/hooks/customHooks/useTransactionFilters'

describe('useTransactionFilters', () => {
    it('should initialize with default filter values', () => {
        const { result } = renderHook(() => useTransactionFilters())
        
        expect(result.current.filters).toEqual({
            status: 'all',
            amountRange: [null, null],
            dateRange: [null, null],
            merchant: 'all',
            paymentMethod: 'all'
        })
    })

    it('should update filters when setFilters is called', () => {
        const { result } = renderHook(() => useTransactionFilters())
        
        const newFilters = {
            status: 'completed',
            amountRange: [10, 100],
            dateRange: ['2025-01-01', '2025-12-31'],
            merchant: 'mcht_001',
            paymentMethod: 'credit_card-visa'
        }
        
        act(() => {
            result.current.setFilters(newFilters)
        })
        
        expect(result.current.filters).toEqual(newFilters)
    })

    it('should apply filters when applyFilters is called', () => {
        const { result } = renderHook(() => useTransactionFilters())
        
        act(() => {
            result.current.setFilters({
                status: 'completed',
                amountRange: [10, 100],
                dateRange: ['2025-01-01', '2025-12-31'],
                merchant: 'mcht_001',
                paymentMethod: 'credit_card-visa'
            })
        })
        
        act(() => {
            result.current.applyFilters()
        })
        
        expect(result.current.appliedFilters).toEqual({
            status: 'completed',
            amountRange: [10, 100],
            dateRange: ['2025-01-01', '2025-12-31'],
            merchant: 'mcht_001',
            paymentMethod: 'credit_card-visa'
        })
    })

    it('should reset applied filters when filters are reset', () => {
        const { result } = renderHook(() => useTransactionFilters())
        
        act(() => {
            result.current.setFilters({
                status: 'completed',
                amountRange: [10, 100],
                dateRange: ['2025-01-01', '2025-12-31'],
                merchant: 'mcht_001',
                paymentMethod: 'credit_card-visa'
            })
        })
        
        act(() => {
            result.current.applyFilters()
        })
        
        act(() => {
            result.current.setFilters({
                status: 'all',
                amountRange: [null, null],
                dateRange: [null, null],
                merchant: 'all',
                paymentMethod: 'all'
            })
        })
        
        expect(result.current.filters).toEqual({
            status: 'all',
            amountRange: [null, null],
            dateRange: [null, null],
            merchant: 'all',
            paymentMethod: 'all'
        })
    })
}) 