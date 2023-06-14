import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Grid, Card, CardContent, Avatar } from '@material-ui/core';
import './Users.css';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('https://express-t4.onrender.com/api/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    const onClickUser = (user) => {
        navigate('/user-detail', { state: { ...user } });
    };

    return (
        <Container>
            <Typography variant="h2" component="h2" gutterBottom>
                Users List
            </Typography>
            <TextField
                variant="outlined"
                label="Search by name"
                value={searchQuery}
                onChange={handleSearchInputChange}
                fullWidth
                margin="normal"
            />
            <Grid container spacing={3}>
                {filteredUsers.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user._id}>
                        <div className="clickable-card" onClick={() => onClickUser(user)}>
                            <Card className="user-card">
                                <CardContent className="card-content">
                                    <Avatar src={user.picture} alt={user.name} className="avatar" />
                                    <Typography variant="h5" component="h3" className="card-title">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Email: {user.email}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Phone: {user.phone}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Address: {user.address}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Users;
