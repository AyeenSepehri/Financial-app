import { fetchTransactions } from '@/features/transactions/transactionThunks'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('fetchTransactions thunk', () => {
    it('should dispatch fulfilled when API call succeeds', async () => {
        const mockData = { data: [{ id: '1' }], total: 1 }
        mockedAxios.get.mockResolvedValueOnce({ data: mockData })

        const dispatch = jest.fn()
        const thunk = fetchTransactions({ _page: 1, _limit: 5 })
        const result = await thunk(dispatch, () => ({}), undefined)

        expect(result.type).toBe('transactions/fetchAll/fulfilled')
        expect(result.payload).toEqual(mockData)
    })

    it('should dispatch rejected when API call fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'))

        const dispatch = jest.fn()
        const thunk = fetchTransactions({ _page: 1, _limit: 5 })
        const result = await thunk(dispatch, () => ({}), undefined)

        expect(result.type).toBe('transactions/fetchAll/rejected')
        expect(result.payload).toBe('Error when fetching data')
    })
}) 