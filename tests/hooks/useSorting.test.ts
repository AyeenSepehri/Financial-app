import { renderHook, act } from '@testing-library/react'
import { useSorting } from '@/hooks/customHooks/useSorting'

describe('useSorting', () => {
    it('should initialize with null values', () => {
        const { result } = renderHook(() => useSorting())
        
        expect(result.current.sortBy).toBe(null)
        expect(result.current.sortOrder).toBe(null)
    })

    it('should set sortBy and sortOrder to asc when toggleSort is called with new column', () => {
        const { result } = renderHook(() => useSorting())
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        expect(result.current.sortBy).toBe('amount')
        expect(result.current.sortOrder).toBe('asc')
    })

    it('should change sortOrder to desc when toggleSort is called on same column with asc order', () => {
        const { result } = renderHook(() => useSorting())
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        expect(result.current.sortBy).toBe('amount')
        expect(result.current.sortOrder).toBe('desc')
    })

    it('should reset sortBy and sortOrder to null when toggleSort is called on same column with desc order', () => {
        const { result } = renderHook(() => useSorting())
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        expect(result.current.sortBy).toBe(null)
        expect(result.current.sortOrder).toBe(null)
    })

    it('should set sortBy and sortOrder to asc when toggleSort is called on same column with null order', () => {
        const { result } = renderHook(() => useSorting())
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        expect(result.current.sortBy).toBe('amount')
        expect(result.current.sortOrder).toBe('asc')
    })

    it('should update sortBy and sortOrder when setSortBy is called', () => {
        const { result } = renderHook(() => useSorting())
        
        act(() => {
            result.current.setSortBy('date')
        })
        
        expect(result.current.sortBy).toBe('date')
    })

    it('should update sortOrder when setSortOrder is called', () => {
        const { result } = renderHook(() => useSorting())
        
        act(() => {
            result.current.setSortOrder('desc')
        })
        
        expect(result.current.sortOrder).toBe('desc')
    })

    it('should reset sortBy and sortOrder to null when resetSorting is called', () => {
        const { result } = renderHook(() => useSorting())
        
        act(() => {
            result.current.toggleSort('amount')
        })
        
        act(() => {
            result.current.resetSorting()
        })
        
        expect(result.current.sortBy).toBe(null)
        expect(result.current.sortOrder).toBe(null)
    })
}) 