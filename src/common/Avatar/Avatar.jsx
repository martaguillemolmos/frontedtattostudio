import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    
  }
}));

export const LetterAvatars = ({initial}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar>{initial}</Avatar>
    </div>
  );
}