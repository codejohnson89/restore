import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './AccountSlice';
import { Card, Container, Paper } from '@mui/material';


export default function Login() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onBlur',
        defaultValues: {
            username: '',
            password: '',
    }});

    async function submitForm(data: FieldValues) {
        try {
          await dispatch(signInUser(data));
          navigate(location.state?.from || '/catalog');
        } catch (error: any) {
          console.log(error);
        }
    }

  return (
    <>
      <Container component={Paper} maxWidth="sm" sx={{ p: 4, display: "flex", flexDirection: "column" }}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                type="email"
                label="Username"
                placeholder="your@email.com"
                autoComplete="email"
                {...register("username", { required: "Username is required" })}
                autoFocus
                error={!!errors.username}
                helperText={errors?.username?.message as string}
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>
              <TextField
                placeholder="••••••"
                type="password"
                label="Password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors?.password?.message as string}
                autoComplete="current-password"
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <LoadingButton disabled={!isValid} loading={isSubmitting} type="submit" fullWidth variant="contained">
              Sign in
            </LoadingButton>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <span>
                <Link to="/register">Sign up</Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
        </Card>
      </Container>
    </>
  );
}