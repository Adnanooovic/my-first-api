const users = [
    {
        id: 1,
        email: 'helloworld@dududu.lulu',
        password: 'Helloworld123*',
    },

    {
        id: 2,
        email: 'helloitsmeee@dududu.lulu',
        password: 'Helloitsmeee123*',
    },

    {
        id: 3,
        email: 'hellocimbom@dududu.lulu',
        password: 'Hellocimbom123*',
    },
];

export const userRepository = {

    getUser: async (id) => {
        const user = users.find(post => user.id === id);
        if(!user){
            throw new Error('User not found');
        }
        return user;
    },

    createUser: async (user) => {
        const id = users.length + 1;
        const newUser = {id, ...user};
        users.push(newUser);
        return newUser;
    },

}