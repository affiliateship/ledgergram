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
  import { login } from "../hooks/authAPI";
  import { useNavigate } from "react-router-dom";
  
  export default function LoginPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
      username: "",
      password: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
      const res = await login(credentials);
      if (res.ok) {
        const json = await res.json();
        localStorage.setItem("account", JSON.stringify(json.result))
        navigate("/feed")
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
              Login
            </Typography>
  
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
              Login
            </Button>
            <Box textAlign="center" mt={1}>
              <Typography variant="body2" color="text.secondary">
                Do not have an account?{" "}
                <Link href="/register" underline="hover">
                  Register here
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }
  