import { withStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
});


function UserAdministration(props) {
    const classes = useStyles();

    return (
        <div >Use this page to grant roles to newly registered users</div>
    )

}

export default UserAdministration;