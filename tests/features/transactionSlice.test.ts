import transactionReducer from '@/features/transactions/transactionSlice'
import { fetchTransactions } from '@/features/transactions/transactionThunks'
import { Transaction } from '@/features/transactions/types'

const mockTransaction: Transaction = {
    id: 'txn_001',
    amount: 100.5,
    currency: 'USD',
    status: 'completed',
    timestamp: '2025-06-01T12:00:00Z',
    description: 'Payment for groceries',
    merchant: {
        name: 'GroceryMart',
        id: 'mcht_001'
    },
    payment_method: {
        type: 'credit_card',
        last4: '1234',
        brand: 'visa'
    },
    sender: {
        name: 'Alice',
        account_id: 'acc_001'
    },
    receiver: {
        name: 'GroceryMart',
        account_id: 'acc_101'
    },
    fees: {
        processing_fee: 2.5,
        currency: 'USD'
    },
    metadata: {
        order_id: 'ord_001',
        customer_id: 'cust_001'
    }
}

const initialState = {
    items: [],
    total: 0,
    loading: false,
    error: null,
}

describe('transactionSlice', () => {
    it('should return initial state', () => {
        const state = transactionReducer(undefined, { type: 'unknown' })
        expect(state).toEqual(initialState)
    })

    it('should handle fetchTransactions.pending', () => {
        const state = transactionReducer(initialState, fetchTransactions.pending)
        
        expect(state.loading).toBe(true)
        expect(state.error).toBe(null)
    })

    it('should handle fetchTransactions.fulfilled', () => {
        const mockPayload = {
            data: [mockTransaction],
            total: 1
        }
        
        const state = transactionReducer(
            { ...initialState, loading: true },
            fetchTransactions.fulfilled(mockPayload, 'requestId', { _page: 1, _limit: 10 })
        )
        
        expect(state.loading).toBe(false)
        expect(state.items).toEqual([mockTransaction])
        expect(state.total).toBe(1)
        expect(state.error).toBe(null)
    })

    it('should handle fetchTransactions.rejected', () => {
        const errorMessage = 'Network error'
        const state = transactionReducer(
            { ...initialState, loading: true },
            fetchTransactions.rejected(new Error(errorMessage), 'requestId', { _page: 1, _limit: 10 }, errorMessage)
        )
        
        expect(state.loading).toBe(false)
        expect(state.error).toBe(errorMessage)
    })

    it('should handle fetchTransactions.rejected with default error message', () => {
        const state = transactionReducer(
            { ...initialState, loading: true },
            fetchTransactions.rejected(new Error(), 'requestId', { _page: 1, _limit: 10 })
        )
        
        expect(state.loading).toBe(false)
        expect(state.error).toBe('Unknown error')
    })
}) 