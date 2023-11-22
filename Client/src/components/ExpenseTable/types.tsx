
export interface Expense {
    _id: string;
    name: string;
    price: number;
    date: string;
  }
  
  export interface State {
    filterDate: string;
    rowsPerPage: number;
    currentPage: number;
    totalPages: number;
    expenses: Expense[];
  }
  
  export type Action =
    | { type: 'SET_FILTER_DATE'; payload: string }
    | { type: 'SET_ROWS_PER_PAGE'; payload: number }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_EXPENSES'; payload: Expense[] }
    | { type: 'SET_TOTAL_PAGES'; payload: number };
  
export interface ExpenseTableProps {
        token: string;
        showAddOverlay: (show: boolean) => void; // Callback function to show/hide the Add Budget overlay
      }