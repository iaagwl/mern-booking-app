import React from 'react';
import EventForm from './EventForm';

class AdminPage extends React.Component {

  render() {
    return (
      <div>
        <EventForm match={this.props.match}/>
      </div>
    );
  }
}


export default AdminPage;
