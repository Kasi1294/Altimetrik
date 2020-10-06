import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../redux/actions/userActions";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [password, setPassword] = useState({
    showPassword: false,
  });
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountryChange] = useState("");
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);

  const onCountryChange = (event) => {
    setCountryChange(event.target.value);
  };

  const onGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let signUpClick = (event) => {
    event.preventDefault();
    if (validateData()) {
      let savePayLoad = prepareDataToSave();
      dispatch(signUp(savePayLoad));
      setInitialState();
    }
  };

  let validateData = () => {
    if (
      userName.length === 0 ||
      email.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      country.length === 0 ||
      gender.length === 0
    ) {
      return false;
    }
    return true;
  };

  let prepareDataToSave = () => {
    let savePayLoad = {};
    savePayLoad.password = password.password;
    savePayLoad.username = userName;
    savePayLoad.email = email;
    savePayLoad.firstname = firstName;
    savePayLoad.lastname = lastName;
    savePayLoad.country = country;
    savePayLoad.gender = gender;
    return savePayLoad;
  };

  let setInitialState = () => {
    setUserName("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setCountryChange("");
    setGender("");
    setPassword({showPassword: false, password: "" })
    setOpen(false)
  };

  const signUpState = useSelector((state) => {
    return state.userReducer.signup;
  });

  React.useEffect(() => {
    signUpState ? setOpen(true) : setOpen(false)
  }, [signUpState])

  const handleSnackBarClose = () => {
    setOpen(false)
  };

  return (
    <Container component="main" maxWidth="xs">
      {signUpState ? (
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleSnackBarClose}
        message="SIGN UP SUCCESS"
        />
      ) : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={password.showPassword ? "text" : "password"}
                  value={password.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {password.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={80}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  row
                  value={gender}
                  onChange={onGenderChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="countrySelect" id="country">
                  Country
                </InputLabel>
                <Select
                  label="Country"
                  inputProps={{
                    name: "country",
                    id: "countrySelect",
                  }}
                  value={country}
                  onChange={onCountryChange}
                >
                  <MenuItem value={"India"}>India</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUpClick}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
