import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';

function SignupForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRole = location.state?.selectedRole;

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    selectedRole,
    title: '',
    bio: '',
    skills: '',
    portfolio: '',
    companyName: '',
    contactNumber: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    title: '',
    bio: '',
    skills: '',
    portfolio: '',
    companyName: '',
    contactNumber: '',
  });

  useEffect(() => {
    if (!selectedRole) {
      navigate('/signup');
    }
  }, [selectedRole, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (selectedRole === 'freelancer') {
      if (!form.title.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!form.bio.trim()) {
        newErrors.bio = 'Bio is required';
      }
      if (!form.skills.trim()) {
        newErrors.skills = 'Skills are required';
      }
      if (!form.portfolio.trim()) {
        newErrors.portfolio = 'Portfolio URL is required';
      }
    } else if (selectedRole === 'client') {
      if (!form.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      if (!form.contactNumber.trim()) {
        newErrors.contactNumber = 'Contact number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);

        const formData = { ...form, role: selectedRole };
        await axios.post('http://localhost:3000/api/user/register', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        navigate('/login-form');
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        if (error.response?.data?.errors) {
          setErrors((prev) => ({
            ...prev,
            ...error.response.data.errors,
          }));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '90%',
          boxShadow: 5,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'white',
          // marginTop: 6,
          paddingTop: 10,
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url(../../public/work_home.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: { xs: 300, md: 'auto' },
            animation: 'fadeIn 1.2s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateX(-60px)' },
              to: { opacity: 1, transform: 'translateX(0)' },
            },
          }}
        />

        <Box
          sx={{
            flex: 1.2,
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, fontSize: 35 }}>
            Sign up as {selectedRole}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={4}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Box>

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                error={!!errors.password}
                helperText={errors.password}
              />

              {selectedRole === 'freelancer' && (
                <>
                  <TextField
                    fullWidth
                    label="Title"
                    value={form.title}
                    onChange={handleChange('title')}
                    error={!!errors.title}
                    helperText={errors.title}
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    value={form.bio}
                    onChange={handleChange('bio')}
                    error={!!errors.bio}
                    helperText={errors.bio}
                  />
                  <TextField
                    fullWidth
                    label="Skills"
                    value={form.skills}
                    onChange={handleChange('skills')}
                    error={!!errors.skills}
                    helperText={errors.skills}
                  />
                  <TextField
                    fullWidth
                    label="Portfolio"
                    value={form.portfolio}
                    onChange={handleChange('portfolio')}
                    error={!!errors.portfolio}
                    helperText={errors.portfolio}
                  />
                </>
              )}

              {selectedRole === 'client' && (
                <>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={form.companyName}
                    onChange={handleChange('companyName')}
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                  />
                  <TextField
                    fullWidth
                    label="Contact Number"
                    value={form.contactNumber}
                    onChange={handleChange('contactNumber')}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                  />
                </>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  height: '60px',
                  fontSize: '16px',
                  borderRadius: 3,
                  backgroundColor: '#0c9cf5',
                  '&:hover': {
                    backgroundColor: '#0077cc',
                  },
                  boxShadow: '0 6px 8px rgba(0, 123, 255, 0.3)',
                }}
              >
                {isLoading ? 'Signing up...' : 'Sign up'}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupForm;
