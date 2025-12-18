import {
    Box,
    Button,
    Card,
    CardContent,
    Link,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
import { register } from "../hooks/authAPI";
import { useNavigate } from "react-router-dom";
  
  export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
    
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
      const res = await register(form);
      if (res.ok) {
        const json = await res.json();
        localStorage.setItem("account", JSON.stringify(json.result))
        navigate("/")
      }
    };
  
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card sx={{ width: 400 }}>
          <CardContent>
            <Typography variant="h5" mb={2}>
              Create Account
            </Typography>
  
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
  
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
  
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
  
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
  
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Register
            </Button>
            {/* Bottom link */}
            <Box textAlign="center" mt={1}>
              <Typography variant="body2" color="text.secondary">
                Already registered?{" "}
                <Link href="/login" underline="hover">
                  Login here
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }
  