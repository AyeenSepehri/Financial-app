import { renderHook, act } from '@testing-library/react'
import { usePagination } from '@/hooks/customHooks/usePagination'

describe('usePagination', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => usePagination())
        
        expect(result.current.page).toBe(1)
        expect(result.current.pageSize).toBe(5)
    })

    it('should initialize with custom values', () => {
        const { result } = renderHook(() => usePagination(3, 10))
        
        expect(result.current.page).toBe(3)
        expect(result.current.pageSize).toBe(10)
    })

    it('should update page when setPage is called', () => {
        const { result } = renderHook(() => usePagination())
        
        act(() => {
            result.current.setPage(5)
        })
        
        expect(result.current.page).toBe(5)
    })

    it('should update pageSize when setPageSize is called', () => {
        const { result } = renderHook(() => usePagination())
        
        act(() => {
            result.current.setPageSize(20)
        })
        
        expect(result.current.pageSize).toBe(20)
    })

    it('should reset pagination to page 1 when resetPagination is called', () => {
        const { result } = renderHook(() => usePagination(5, 10))
        
        act(() => {
            result.current.resetPagination()
        })
        
        expect(result.current.page).toBe(1)
        expect(result.current.pageSize).toBe(10) // pageSize should remain unchanged
    })
}) 