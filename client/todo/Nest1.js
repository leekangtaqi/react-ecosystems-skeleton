import React from 'react';

class Nest1 extends React.Component {
    onEnter(){
        console.warn('!!!!!!!!!!!')
    }
    render(){
        return (
            <div>nest1</div>
        )
    }
}

export { Nest1 as default }