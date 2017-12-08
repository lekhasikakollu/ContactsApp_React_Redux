import React from 'react';
import {connect} from 'react-redux';
import ContactsList from './ContactsList.jsx';
import FormDisplay from './FormDisplay.jsx';

import FormActions from '../actionCreators/actions.js';

class App extends React.Component {
    constructor(props){
        super(props);
        console.log('App'+props);
    }

    componentDidMount(){
        console.log('in componentdidmount of App');
        //this.props.dispatch(FormActions.getAllContacts());
        this.props.dispatch(FormActions.checkIfLoggedIn());
    }
    render(){
        var componentToRender = <ContactsList contact={this.props.contact}/>;
    if(this.props.viewa == 'form') {
        componentToRender=<FormDisplay/>;
    }else if(this.props.viewa == 'login'){
        componentToRender = <Login/>

    }
    //console.log(componentToRender);
    return (
        <div>
        {componentToRender}
    </div>
    );
}
}

function mapStateToProps(state){
    return {
        isLoading : state.isLoading , 
        isSuccess : state.isSuccess ,
        contact : state.contacts,
        failMessage : state.errorMessage,
        viewa : state.view
    }
}


export default connect(mapStateToProps)(App);