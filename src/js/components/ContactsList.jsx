import React from 'react';
import {connect} from 'react-redux';
import './styles.css';
import FormActions from '../actionCreators/actions.js';

class ContactsList extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const styles = {
            "background-color":"whitesmoke"
        }
        var self=this;
        console.log('in contatclist render'+this.props.contact);
        
        const contactsList = this.props.contact.map(function(contact,index){
            console.log('in contactslist id : '+contact.id)
            return (
                <div className="row" key={index}>
                <div className="col-md-2 text-center" style={styles}>{contact.fname}</div>
                <div className="col-md-2 text-center" style={styles}>{contact.lname}</div>
                <div className="col-md-2 text-center" style={styles}>{contact.email}</div>
                <div className="col-md-2" style={styles}>{contact.phone}</div>
                <div className="col-md-2 text-center" style={styles}>{contact.wphone}</div>
                <div className="col-md-2 text-center">
                            <input type="button" className="btn btn-success" href='#' value="Edit" id="edit2" onClick={self.props.editContact(contact.id)}/> &nbsp; &nbsp;
                    <input type="button" value="Delete" className="btn btn-danger" href='#' id="delete2" onClick={self.props.deleteContact(contact.id)} />
                
                  { /*  <input type="button" className="btn btn-success" href='#' value="Edit" id="edit2" onClick={self.props.editContact(contact.id)} /> &nbsp; &nbsp;
                    <input type="button" value="Delete" className="btn btn-danger" href='#' id="delete2" onClick={self.props.deleteContact(contact.id)}  />
            */ }
                
                
                    </div>
            </div>
            );

        });

        return(
            <div>
            Hello World {self.props.isLoading}
            <div className="contactsForm">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <input type="button" className="btn btn-default" value="Add" onClick={self.props.displayForm} />
                </div>
                <div className="col-md-4"></div>
            </div>
            <div className="row">
                <div className="col-md-2 text-center"><strong>First Name</strong></div>
                <div className="col-md-2 text-center"><strong>Last Name</strong></div>
                <div className="col-md-2 text-center"><strong>Email</strong></div>
                <div className="col-md-2 text-center"><strong>Phone</strong></div>
                <div className="col-md-2 text-center"><strong>Work Phone</strong></div>
                <div className="col-md-2 text-center"><strong>Actions</strong></div>
            </div>
        </div>
        
        
        {contactsList}
        </div>

        );
    }
}
function mapStateToProps(state){
    console.log("in con mapStateToProps", state);
    return{
        contact : state.contacts,
        isLoading : state.isLoading , 
        isSuccess : state.isSuccess ,
        failMessage : state.errorMessage,
        viewa : state.view
    }
}

function mapDispatchToProps(dispatch){
    return {
        displayForm : function(contact){
            console.log('in dispatch')
            dispatch({type : 'DISPLAY_FORM',payload: {}})
         },
        deleteContact : function(id){
          return ( 
            dispatch.bind(self,FormActions.deleteContact(id))
            );
          
        }
        ,
        editContact : function(id){
            return(
                dispatch.bind(self,FormActions.getOneContact(id))
            );
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactsList);