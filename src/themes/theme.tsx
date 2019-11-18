import { createMuiTheme } from '@material-ui/core/styles';

export const Theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1DA1F2",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#14171A",
            light: "#AAB8C2",
            dark: "#657786",
            contrastText: "#FFFFFF"
        }
    }
})