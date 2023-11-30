import React, { createContext, useContext, useState } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [itemData, setItemData] = useState(null);

    const itemDetails = response => {
        setItemData(response);
    };

    return (
        <ItemContext.Provider value={{ itemData, itemDetails }}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItemDetails = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw Error;
    }
    return context;
};