// tests/TransactionsContainer.test.tsx
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TransactionsContainer from '@/components/transactions/containers/TransactionsContainer'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock next/navigation to avoid errors
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

// Mock axios to prevent network calls
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({
        data: {
            data: [],
            total: 0
        }
    })),
    post: jest.fn(() => Promise.resolve({ data: {} }))
}))

// Mock all custom hooks
jest.mock('@/hooks/customHooks/useTransactionFilters', () => ({
    useTransactionFilters: () => ({
        filters: {
            status: 'all',
            amountRange: { min: '', max: '' },
            dateRange: { start: '', end: '' },
            merchant: 'all',
            paymentMethod: 'all'
        },
        setFilters: jest.fn(),
        appliedFilters: {
            status: 'all',
            amountRange: { min: '', max: '' },
            dateRange: { start: '', end: '' },
            merchant: 'all',
            paymentMethod: 'all'
        },
        applyFilters: jest.fn()
    })
}))

jest.mock('@/hooks/customHooks/usePagination', () => ({
    usePagination: () => ({
        page: 1,
        pageSize: 10,
        setPage: jest.fn(),
        setPageSize: jest.fn()
    })
}))

jest.mock('@/hooks/customHooks/useSorting', () => ({
    useSorting: () => ({
        sortBy: null,
        sortOrder: null,
        setSortBy: jest.fn(),
        setSortOrder: jest.fn()
    })
}))

jest.mock('@/hooks/customHooks/useTransactionFetcher', () => ({
    useTransactionFetcher: () => ({
        data: [],
        total: 0,
        fetch: jest.fn()
    })
}))

jest.mock('@/hooks/customHooks/useTransactionAdder', () => ({
    useTransactionAdder: () => ({
        isModalVisible: false,
        setIsModalVisible: jest.fn(),
        handleAddTransaction: jest.fn()
    })
}))

jest.mock('@/hooks/queries/useAllTransactions', () => ({
    useAllTransactions: () => ({
        data: [],
        isLoading: false
    })
}))

// Mock Redux hooks
jest.mock('@/hooks/reduxHooks/useAppSelector', () => ({
    useAppSelector: jest.fn((selector) => {
        const mockState = {
            transactions: {
                items: [],
                loading: false,
                error: null
            }
        }
        return selector(mockState)
    })
}))

jest.mock('@/hooks/reduxHooks/useAppDispatch', () => ({
    useAppDispatch: () => jest.fn()
}))

// Mock child components
jest.mock('@/components/transactions/filters/TransactionsFilter', () => {
    return function MockTransactionsFilter() {
        return <div data-testid="transactions-filter">Filters Component</div>
    }
})

jest.mock('@/components/transactions/table/TransactionsTable', () => {
    return function MockTransactionsTable() {
        return <div data-testid="transactions-table">Table Component</div>
    }
})

jest.mock('@/components/transactions/modals/AddTransactionModal', () => {
    return function MockAddTransactionModal() {
        return <div data-testid="add-transaction-modal">Modal Component</div>
    }
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

const renderWithProviders = () =>
    render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <TransactionsContainer />
            </QueryClientProvider>
        </Provider>
    )

describe('TransactionsContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the Add Transaction button', () => {
        renderWithProviders()
        const addButton = screen.getByRole('button', { name: /add transaction/i })
        expect(addButton).toBeInTheDocument()
    })

    it('renders the filter component', () => {
        renderWithProviders()
        expect(screen.getByTestId('transactions-filter')).toBeInTheDocument()
    })

    it('renders the transactions table', () => {
        renderWithProviders()
        expect(screen.getByTestId('transactions-table')).toBeInTheDocument()
    })

    it('renders the add transaction modal', () => {
        renderWithProviders()
        expect(screen.getByTestId('add-transaction-modal')).toBeInTheDocument()
    })
})
