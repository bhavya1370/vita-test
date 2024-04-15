import { v4 as uuid } from 'uuid';

let user = [];


export const getUsers = (req, res) => {
    res.send(user);
}

export const createUser = (req, res) => {   
    const users = req.body;

    user.push({...users, id: uuid()});
    
    res.send(`Added user- [${users.Fname}]`);
};

export const getUserID = (req, res) => {
    const { id } = req.params;
    const requiredUser = user.find((user) => user.id === id);
    res.send(requiredUser);
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    user = user.filter((user) => user.id !== id);
    res.send(`User ${id} deleted`);
};

export const updateUser =  (req, res) => {
    const { id } = req.params;
    const { Fname, Lname, Age } = req.body;
    const userUpdated = user.find((user) => user.id === id);

    if(Fname) userUpdated.Fname = Fname;
    if(Lname) userUpdated.Lname = Lname;
    if(Age) userUpdated.Age = Age;

    res.send(`User ${id} updated`);
 
};