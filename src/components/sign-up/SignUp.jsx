import { useState, useMemo, useCallback } from "react";

// Material UI imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid2"; 
import Stack from "@mui/material/Stack";

// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Third-party libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Copyright from "../global-components/copyright";

export default function SignUp() {

      const handleClickShowPassword = useCallback(() => {
        setShowPassword((show) => !show);
      }, []);  
      
      const [errors, setErrors]             = useState(null);
      const [showPassword, setShowPassword] = useState(false);
      const navigate                        = useNavigate();
      const [loading, setLoading]           = useState(false);

      const formik = useFormik({
        initialValues: {
          first_name: "",
          last_name: "",
          password: "",
          email: "",          
          role: "",
        },
        validationSchema: Yup.object({
          first_name:   Yup.string().required("Required"),
          last_name:    Yup.string().required("Required"),
          password:     Yup.string().required("Required"),
          email:        Yup.string().email("Invalid email address").required("Required"),          
          role:         Yup.string().required("Please specify your role."),
        }),
        onSubmit: async (values) => {
          setLoading(true);
          try {
            const res = await axios.post(
              "http://localhost:3000/v1/api/auth/register",
              values
            );
            const { first_name, last_name, role, id } = res.data.user;
            localStorage.setItem(
              'user',
              JSON.stringify({ first_name, last_name, role, id })
            );        
            //navigate("/dashboard");
          } catch (err) {
            const errorMessages = err?.response?.data?.errors || [{ msg: "Something went wrong. Please try again." }];
            setErrors(errorMessages);     
          }finally {
            setLoading(false);
          }
        },
      });

      const roleTypes = useMemo(() => [
          { value: 'supplier', label: 'Supplier' },
          { value: 'buyer', label: 'Buyer' },
      ], []);

      return (
        <Container component="main" maxWidth="xs" disableGutters>
                <Box component="section" sx={{ p: 2 }}>
                  <Stack spacing={5} alignItems="center" justifyContent="center">
                        <Avatar sx={{ m: 5, bgcolor: "primary.main" }}>
                              <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                          Sign up
                        </Typography>      
                  </Stack>   
                </Box>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
                <Stack spacing={3} alignItems="center" justifyContent="center">
                      <TextField
                        id="first_name"
                        autoComplete="given-name"
                        name="first_name"
                        required
                        fullWidth
                        label="First Name"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        onBlur={formik.handleBlur}
                        error={formik.touched.first_name && formik.errors.first_name}
                        helperText={
                          formik.touched.first_name && formik.errors.first_name
                        } />
                      <TextField
                        required
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="family-name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        onBlur={formik.handleBlur}
                        error={formik.touched.last_name && formik.errors.last_name}
                        helperText={
                          formik.touched.last_name && formik.errors.last_name
                        }
                      />
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                      />


                      <TextField  
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}    
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end">
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                            ),
                          },
                        }}
                      />   

                    
                    <TextField
                      id="role"
                      required
                      fullWidth
                      select
                      defaultValue = ""
                      name="role"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.role && formik.errors.role}
                      helperText={formik.touched.role && formik.errors.role}                  
                      label="Please select your role">
                      {roleTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>                                 
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                      </Button>
                      {errors && errors.length > 0 && (
                        <Box component="ul" sx={{ color: 'red', mt: 2, listStyleType: 'none', padding: 0 }}>
                          {errors.map((err, index) => (
                            <li key={index}>{err.msg}</li>
                          ))}
                        </Box>
                      )}
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Link href="#" variant="body2">
                            Already have an account? Sign in
                          </Link>
                        </Grid>
                      </Grid>                      
                      </Stack>  
                </Box>
              <Copyright sx={{ mt: 4 }} />   
              
        </Container>  

      );
}
