import React from 'react';
import {connect} from 'react-redux';
import getAllContacts from '../actionCreators/actions.js';
import FormActions from '../actionCreators/actions.js';

class FormDisplay  extends React.Component {

    constructor(props){
      super(props);
      console.log("ContactsForm -- Props received---", this.props);
      this.submitForm = this.submitForm.bind(this);
    }

  submitForm(e){
    var formData = {};
    e.preventDefault();

    // for (const field in this.refs){
    //   formData[field] = this.refs[field].value;
    // }
    for(var field in this.refs){
      formData[field] = this.refs[field].value;
    }
    console.log('from submit method : '+formData);
    if(this.props.theContact.id === undefined){
      console.log(typeof FormActions.addContact)
      this.props.dispatchFunc(formData);
    }else{
      formData.id = this.props.theContact.id;
      console.log('ref is not null = edit'+this.props.theContact.id);
      this.props.dispatchFunc2(formData);
      
     }
  }
    
    render(){
      var self=this;
      var maleValue = 'false';
      var femaleValue = 'false';
        console.log('length of contacts'+this.props.theContact.length);
        if(this.props.theContact.gender === 'male'){
          maleValue = 'true';
        }
        else {
          femaleValue = 'true';
        }
          return (
            <div>
            <form  name="userForm" onSubmit={this.submitForm}>
              <div className="form-group">
                <label htmlFor="fname">First Name:</label>
                <input name="fname" ref="fname" className="form-control" defaultValue={this.props.theContact.fname} placeholder="First Name" size={20} /> </div>
              <div className="form-group">
                <label htmlFor="lname">Last Name:</label>
                <input name="lname" ref="lname" className="form-control" defaultValue={this.props.theContact.lname} placeholder="Last Name" /> </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input name="email" ref="email" className="form-control" defaultValue={this.props.theContact.email} placeholder="Email" /> </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input name="phone" ref='phone' className="form-control" defaultValue={this.props.theContact.phone} placeholder="Phone Number" /> </div>
              <div className="form-group">
                <label htmlFor="wphone">Work phone:</label>
                <input name="wphone" ref='wphone' className="form-control" defaultValue={this.props.theContact.wphone} placeholder="Work Phone Number" /> </div>
              <div className="form-group">
                <label htmlFor="addr1">Address Line1:</label>
                <input name="addr1"  ref='addr1' className="form-control" defaultValue={this.props.theContact.addr1} placeholder="Address Line 1" /> </div>
              <div className="form-group">
                <label htmlFor="addr2">Address Line2:</label>
                <input name="addr2" ref='addr2' className="form-control" defaultValue={this.props.theContact.addr2} placeholder="Address Line 2" /> </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input name="city" ref='name' className="form-control" defaultValue={this.props.theContact.city} placeholder="City" /> </div>
              <label htmlFor="selectState">State:</label>
              <select ref='selectState' name="selectState">
                <option defaultValue='selected'>Select State</option>
                <option defaultValue="AL">Alabama</option>
                <option defaultValue="AK">Alaska</option>
                <option defaultValue="AZ">Arizona</option>
                <option defaultValue="AR">Arkansas</option>
                <option defaultValue="CA">California</option>
                <option defaultValue="CO">Colorado</option>
                <option defaultValue="CT">Connecticut</option>
                <option defaultValue="DE">Delaware</option>
                <option defaultValue="DC">District Of Columbia</option>
                <option defaultValue="FL">Florida</option>
                <option defaultValue="GA">Georgia</option>
                <option defaultValue="HI">Hawaii</option>
                <option defaultValue="ref">Idaho</option>
                <option defaultValue="IL">Illinois</option>
                <option defaultValue="IN">Indiana</option>
                <option defaultValue="IA">Iowa</option>
                <option defaultValue="KS">Kansas</option>
                <option defaultValue="KY">Kentucky</option>
                <option defaultValue="LA">Louisiana</option>
                <option defaultValue="ME">Maine</option>
                <option defaultValue="MD">Maryland</option>
                <option defaultValue="MA">Massachusetts</option>
                <option defaultValue="MI">Michigan</option>
                <option defaultValue="MN">Minnesota</option>
                <option defaultValue="MS">Mississippi</option>
                <option defaultValue="MO">Missouri</option>
                <option defaultValue="MT">Montana</option>
                <option defaultValue="NE">Nebraska</option>
                <option defaultValue="NV">Nevada</option>
                <option defaultValue="NH">New Hampshire</option>
                <option defaultValue="NJ">New Jersey</option>
                <option defaultValue="NM">New Mexico</option>
                <option defaultValue="NY">New York</option>
                <option defaultValue="NC">North Carolina</option>
                <option defaultValue="ND">North Dakota</option>
                <option defaultValue="OH">Ohio</option>
                <option defaultValue="OK" >Oklahoma</option>
                <option defaultValue="OR">Oregon</option>
                <option defaultValue="PA">Pennsylvania</option>
                <option defaultValue="RI">Rhode Island</option>
                <option defaultValue="SC">South Carolina</option>
                <option defaultValue="SD">South Dakota</option>
                <option defaultValue="TN">Tennessee</option>
                <option defaultValue="TX">Texas</option>
                <option defaultValue="UT">Utah</option>
                <option defaultValue="VT">Vermont</option>
                <option defaultValue="VA">Virginia</option>
                <option defaultValue="WA">Washington</option>
                <option defaultValue="WV">West Virginia</option>
                <option defaultValue="WI">Wisconsin</option>
                <option defaultValue="WY">Wyoming</option>
              </select>
              <br />
              <label htmlFor="genderRadio"> Gender:</label>
              <div className="radio" ref="genderRadio">
                <label>
                  <input type="radio" ref="Male" name="genderRadio" defaultValue="Male" checked={maleValue}/>Male </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" ref="Female" name="genderRadio" defaultValue="Female" checked={femaleValue}/>Female </label>
              </div>
              <div>
                <label>ZIP :</label>
                <input type="text" pattern="[0-9]{5}" ref="zip" title="Five digit zip code" size={5} maxLength={5} defaultValue={this.props.theContact.zip} />
              </div>
              <div>
                <label>Notes : </label>
                <textarea className="form-control" placeholder="Message" name="textarea" rows={10} cols={50} ref="textArea" defaultValue={this.props.theContact.textArea} />
              </div>
              <label>Languages :
              </label>
              <br />
              <div className="checkbox"> <label>
                  <input type="checkbox" ref="Telugu" defaultValue="Telugu" className="checkbox1" />Telugu</label>
              </div>
              <div className="checkbox">
                <label>
                  <input className="checkbox1" type="checkbox" ref="English" defaultValue="English" />English</label>
              </div>
              <div className="checkbox">
                <label>
                  <input className="checkbox1" type="checkbox" ref="Hindi" defaultValue="Hindi" />Hindi</label>
              </div>
              <div className="checkbox">
                <label>
                  <input className="checkbox1" type="checkbox" ref="Tamil" defaultValue="Tamil" />Tamil</label>
              </div>
              <p ref="messageline">
                <br />
              </p>
              <div>
                <button type="submit" className="btn btn-success" > Submit </button>
                <button type="button" className="btn btn-danger" onClick={self.props.displayAll}> Cancel </button>
                <input type="hidden" name="ref" ref='id' defaultValue={this.props.theContact.id} /> </div>
                
            </form>
          </div>
        
        );
                
    }
}

function mapStateToProps(state){
    console.log('in mapstate of formdisplay'+JSON.stringify(state));
    return{
        theContact: state.contacts || {}
      
    }
}

function mapDispatchToProps(dispatch){
  console.log('in formdisplay dispatch ');
  return {
    displayAll : function(){
      return (
        //FormActions.getAllContacts()
        
         dispatch(FormActions.getAllContacts())
      );
    },
    dispatchFunc2 : function(formData){
      return ( 
        dispatch(FormActions.updateContact(formData)));
       
      
    },
    dispatchFunc : function(formData){
      return ( 
        dispatch(FormActions.addContact(formData)));
       
      
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FormDisplay);