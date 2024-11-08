import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true,
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider component
export function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    async function getTransaction() {
        try {
            const res = await axios.get('/api/v1/transactions');
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data,
            });
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'An error occurred'; // Fallback for error message
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: errorMsg,
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id,
            });
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'An error occurred';
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: errorMsg,
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data,
            });
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'An error occurred';
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: errorMsg,
            });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                getTransaction,
                deleteTransaction,
                addTransaction,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
