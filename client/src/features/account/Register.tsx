import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Card, Container, Paper } from '@mui/material';
import { toast } from 'react-toastify';


export default function Register() {

    const navigate = useNavigate();

    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onBlur',
        defaultValues: {
            username: '',
            password: '',
            email: '',
    }});

    function handleApiErrors(errors: any) {
        console.log(errors);
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', {message: error});
                } else if (error.includes('Username')) {
                    setError('username', {message: error});
                } else if (error.includes('Email')) {
                    setError('email', {message: error});
                }
            });
        }
    }


  return (
    <>
      <Container
        component={Paper}
        maxWidth="sm"
        sx={{ p: 4, display: "flex", flexDirection: "column" }}
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((data) =>
              agent.Account.register(data)
              .then(() => {
                toast.success('Registration successful');
                navigate('/login');
              })
              .catch((error) =>
                handleApiErrors(error)
              )
            )}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Username</FormLabel>
              <TextField
                type="email"
                label="Username"
                placeholder="your username"
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                type="email"
                label="Email"
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email", { 
                    required: "Email is required", 
                    pattern: { 
                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 
                        message: "Not a valid email"} })}
                error={!!errors.email}
                helperText={errors?.email?.message as string}
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
                {...register("password", { 
                    required: "Password is required", 
                    pattern: { 
                        value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/, 
                        message: "Password must be between 6 and 10 characters and contain at least one digit, one uppercase letter, one lowercase letter, and one special character"
                    } })}
                error={!!errors.password}
                helperText={errors?.password?.message as string}
                autoComplete="current-password"
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <LoadingButton
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
            >
              Register
            </LoadingButton>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?
              <span>
                <Link to="/login">Sign In</Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </Container>
    </>
  );
}