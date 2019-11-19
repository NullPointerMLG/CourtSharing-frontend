import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1DA1F2",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#FFFFFF",
            light: "#AAB8C2",
            dark: "#657786",
            contrastText: "#14171A"
        },
    },
    typography: {
        fontFamily: 'Roboto'
    }
})