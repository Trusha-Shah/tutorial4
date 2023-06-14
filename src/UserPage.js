import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Avatar, Grid, Card, CardContent, List, ListItem, ListItemText } from '@material-ui/core';
import { useLocation } from "react-router-dom";

const UserPage = () => {
    const location = useLocation();
    const [user, setUser] = useState(location.state);
    const userId = user._id;

    useEffect(() => {
        axios
            .get(`https://express-t4.onrender.com/api/users/${userId}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <Container>
            <Typography variant="h2" component="h2" gutterBottom>
                User Detail
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Avatar src={user.picture} alt={user.name} style={{ width: '200px', height: '200px', marginBottom: '10px' }} />
                            <Typography variant="h5" component="h3">
                                {user.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Age: {user.age}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Gender: {user.gender}
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
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h3">
                                About
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {user.about}
                            </Typography>
                            <Typography variant="h5" component="h3">
                                Friends
                            </Typography>
                            <List>
                                {user.friends.map((friend) => (
                                    <ListItem key={friend.id}>
                                        <ListItemText primary={friend.name} secondary={friend.email} />
                                    </ListItem>
                                ))}
                            </List>
                            <Typography variant="h5" component="h3">
                                Tags
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {user.tags.join(', ')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserPage;
