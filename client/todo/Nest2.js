import React from 'react';
import { connect } from 'react-redux';

class Nest2Origin extends React.Component {
    constructor(props, context){
        super(props, context);
        console.log(context)
    }
    render(){
        return (
            <div>nest2</div>
        )
    }
}
Nest2Origin.contextTypes = {
    store: React.PropTypes.object.isRequired
};

var Nest2 = connect(
    (state, ownProps)=>({query: ownProps.location.query})
)(Nest2Origin);

export { Nest2 as default }