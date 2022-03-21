import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useHistory();

    useEffect(() => {
        fetch("http://localhost:4000/users")
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure want to delete?");
        if (proceed) {
            const url = `http://localhost:4000/users/${id}`;
            fetch(url, {
                method: "delete"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Deleted Successfully!");
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                });
        }
    }

    const handleUpdate = (id) => {
        navigate.push(`/users/update/${id}`);
    }
    return (
        <div>
            <h2>User Found : {users.length}</h2>
            <ul>
                {users.map(user => <li key={user._id}>{user.name} <button onClick={() => handleUpdate(user._id)}>Update</button> <button onClick={() => handleDelete(user._id)}>X</button></li>)}
            </ul>
        </div>
    );
};

export default Users;