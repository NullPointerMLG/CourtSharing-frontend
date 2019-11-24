import React from 'react';
import { SportsProvider, FavouriteSportProvider } from './SportsContext';
import { UserProvider } from './UserContext';

export const ContextProvider = (props: { children: React.ReactNode; }) => {
    return <SportsProvider>
        <UserProvider>
            <FavouriteSportProvider>
                {props.children}
            </FavouriteSportProvider>
        </UserProvider>
    </SportsProvider>
}