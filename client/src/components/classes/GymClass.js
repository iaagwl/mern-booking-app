import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function GymClass({ gymclass, deleteClass, isAuthenticated }) {

  const authButtons = (
    <div className="extra content">
      <div className="ui two buttons">
        <Link to={`/admin/gymclass/${gymclass._id}`} className="ui basic button green">Edit</Link>
        <div className="ui basic button red" onClick={() => deleteClass(gymclass._id)}>Delete</div>
      </div>
    </div>
  );

  return (
    <div className="ui card">
      <div className="content">
        <div className="header">
          {gymclass.title}
        </div>
        {gymclass.date}
      </div>
      { isAuthenticated ? authButtons : null }
    </div>
  )
}

GymClass.propTypes = {
  gymclass: PropTypes.object.isRequired,
  deleteClass: PropTypes.func.isRequired
}
