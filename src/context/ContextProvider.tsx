import React from 'react';
import { SportsProvider, SelectedSportProvider } from './SportsContext';
import { UserProvider } from './UserContext';

export const ContextProvider = (props: { children: React.ReactNode; }) => {
    return <SportsProvider>
        <UserProvider>
            <SelectedSportProvider>
                {props.children}
            </SelectedSportProvider>
        </UserProvider>
    </SportsProvider>
}