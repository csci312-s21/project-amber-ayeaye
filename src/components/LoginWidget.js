import Button from "@material-ui/core/Button";
//import { positions } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  login: {
    color: "white",
    backgroundColor: "#e390bd",
    position: "absolute",
    top: 20,
    right: 20,
  },
}));

import { signIn, signOut, useSession } from "next-auth/client";

export default function LoginWidget() {
  const [session] = useSession();
  const classes = useStyles();

  if (session) {
    return (
      <div style={{ position: "absolute", top: 70, right: 20 }}>
        <span style={{ padding: 10 }}>Signed in as {session.user.name}</span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={signOut}
          padding={50}
        >
          Sign out
        </Button>
      </div>
    );
  } else {
    return (
      <Button
        className={classes.login}
        variant="contained"
        color="primary"
        onClick={signIn}
      >
        Login as a Dj
      </Button>
    );
  }
}
