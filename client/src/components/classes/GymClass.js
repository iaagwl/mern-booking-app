import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function GymClass({ gymclass, deleteClass, isAdmin, isAuthenticated, applyForClass }) {
  const adminButtons = (
    <div className="extra-content">
      <div className="buttons">
        <Link to={`/admin/gymclass/${gymclass._id}`} className="button blue">Info / Edit</Link>
        <button className="ui basic button red" onClick={() => deleteClass(gymclass._id)}>Delete</button>
      </div>
    </div>
  );

  const userButtons = (
    <div className="extra-content">
      <div className="buttons">
        <button disabled={gymclass.hasapplied} className="button blue" onClick={() => applyForClass(gymclass._id)}>Apply</button>
      </div>
    </div>
  );

  const authButton = isAdmin ? adminButtons : userButtons;

  return (
    <div className="card">
      <div className="card-wrapper">
        <div className="content">
          <div className="header">
            {gymclass.title}
          </div>
          <div>{gymclass.date}</div>
          <div>Spots left: {gymclass.spots}</div>
        </div>
        { isAuthenticated ? authButton : null }
      </div>
    </div>
  )
}

GymClass.propTypes = {
  gymclass: PropTypes.object.isRequired,
  deleteClass: PropTypes.func.isRequired
}
