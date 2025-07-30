import React from 'react';
import { Link } from 'react-router-dom';

export default function CrewmateCard({ crewmate }) {
  return (
    <div className="card">
      <h3>{crewmate.name}</h3>
      <p>Color: {crewmate.color}</p>
      <p>Skill: {crewmate.skill}</p>
      <p>Hat: {crewmate.hat}</p>
      <Link to={`/crewmate/${crewmate.id}`} style={{ marginRight: 10 }}>Details</Link>
      <Link to={`/edit/${crewmate.id}`}>Edit</Link>
    </div>
  );
}
