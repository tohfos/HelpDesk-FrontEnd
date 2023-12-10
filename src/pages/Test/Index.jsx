import React from 'react';
import Chat from './../../components/Test/TestChat';

const App = () => {
    // Replace with your actual ticket and user IDs
    const ticketId = 12;
    const userId = 1234;

    return (
        <div className="App">
            <Chat ticketId={ticketId} userId={userId} />
        </div>
    );
};

export default App;
