import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        const stored = localStorage.getItem("account");
        if (stored) setIsLoggedIn(true);
        else setIsLoggedIn(false);
      }, [isLoggedIn]);
    function logout() {
        if (isLoggedIn) return (
            <>
                <Button color="inherit" component={Link} to="/">Feed</Button>
                <Button color="inherit" component={Link} to="/login" onClick={() => localStorage.removeItem("account")}>Logout</Button>
            </>
        )
    }
return (
<AppBar position="sticky"
  elevation={0}
  sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
<Toolbar variant="dense">
<Typography variant="h6" sx={{ flexGrow: 1 }}>
LedgerGram
</Typography>
{logout()}
</Toolbar>
</AppBar>
)
}