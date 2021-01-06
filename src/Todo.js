import React from 'react'
import { Card, CardContent, Typography, Chip } from '@material-ui/core';
import './Todo.css'
import 'fontsource-roboto';
import firebase from 'firebase'


function Todo(props) {
    const handleDelete = async () => {
        const db = firebase.firestore();
        db.collection('todos').doc(props.id).delete()
    };

    return (
        <div >
            <Card className="todo__card" variant="outlined">
                <CardContent className="todo_cardContent">
                    <div className="todo_deleteButton">
                        <Chip label="X" color="primary" onClick={() => handleDelete(props.id)} />
                    </div>
                    <Typography color="primary" variant="h5"><span className="todo__boldText">TODO: </span>{props.text} </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Todo
