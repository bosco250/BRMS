import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../data/checkoutTypes";
import { calculateOrderTotals } from "../data/checkoutTypes";
import { toast } from "react-toastify";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "SET_CART"; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  getCart: () => CartItem[]; // Fixed: Cart is not defined, should return CartItem[]
  getItemCount: () => number;
  getTotalPrice: () => number;
  setCart: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        updatedItems[existingItemIndex].totalPrice =
          updatedItems[existingItemIndex].price *
          updatedItems[existingItemIndex].quantity;
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: action.payload.quantity,
              totalPrice: item.price * action.payload.quantity,
            }
          : item
      );
      return { ...state, items: updatedItems };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "SET_CART":
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });

    // Show success toast
    toast.success(
      <div>
        <div className="font-medium">Added to Cart!</div>
        <div className="text-sm text-gray-600">{item.name}</div>
      </div>,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const removeItem = (id: string) => {
    const itemToRemove = state.items.find((item) => item.id === id);
    dispatch({ type: "REMOVE_ITEM", payload: id });

    if (itemToRemove) {
      toast.info(
        <div>
          <div className="font-medium">Removed from Cart</div>
          <div className="text-sm text-gray-600">{itemToRemove.name}</div>
        </div>,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      const item = state.items.find((item) => item.id === id);
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

      if (item) {
        toast.success(
          <div>
            <div className="font-medium">Quantity Updated</div>
            <div className="text-sm text-gray-600">
              {item.name} - Qty: {quantity}
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });

    toast.warning(
      <div>
        <div className="font-medium">Cart Cleared</div>
        <div className="text-sm text-gray-600">All items have been removed</div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const setCart = (items: CartItem[]) => {
    dispatch({ type: "SET_CART", payload: items });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  const getCart = (): CartItem[] => {
    // The function is supposed to return CartItem[], not an order object.
    // So just return the items array from state.
    return state.items;
  };

  const getItemCount = (): number => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    if (state.items.length === 0) return 0;
    const totals = calculateOrderTotals(state.items, 0);
    return totals.total;
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    getCart,
    getItemCount,
    getTotalPrice,
    setCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
