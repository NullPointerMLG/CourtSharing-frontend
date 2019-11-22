export const loadUserFromLocalStorage = () => {
    const storageUser = localStorage.getItem("loggedUser");

    if(storageUser !== null) {
        const parsedUser = JSON.parse(storageUser);
        const expirationDate = parsedUser["stsTokenManager"]["expirationTime"];
        const currentDate = new Date().getTime();

        if(currentDate > expirationDate)
            localStorage.removeItem("loggedUser");
        else
            return parsedUser;
    }
    return null;
}