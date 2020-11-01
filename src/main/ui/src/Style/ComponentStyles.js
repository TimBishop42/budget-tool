import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { makeStyles } from "@material-ui/core";

// Colour guide
export const COLOUR_PANTONE_185 = "rgb(203,32,39)"; //Primary Button red "rgb(117,47,145)", seekers color
export const COLOUR_PANTONE_172 = "rgb(244,120,54)"; //Secondary Button Orange "rgb(228/10/68)", seekers color
export const COLOUR_PANTONE_403 = "rgb(128,130,133)";
export const COLOUR_PANTONE_BLACK = "rgb(35,31,32)";


export const buttonCustomStyles = createMuiTheme({
    overrides: {
        MuiButton: {

            root: {
                borderRadius: "4px !important",
                padding: "6px 16px !important",
            }
        }
    }
});

export const loginStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));