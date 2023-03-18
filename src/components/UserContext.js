import React from 'react';

function UserContext(props) {
    const UserContext = React.createContext();
    return (
        <div>
            <UserContext.Provider value={'this is'}>

            </UserContext.Provider>
        </div>
    );
}

export default UserContext;