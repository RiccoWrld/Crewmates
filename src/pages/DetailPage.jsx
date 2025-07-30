// src/pages/DetailPage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase.js';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCrewmate() {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        alert('Error fetching crewmate: ' + error.message);
        navigate('/');
        return;
      }
      setCrewmate(data);
      setLoading(false);
    }
    fetchCrewmate();
  }, [id, navigate]);

  if (loading) return <p>Loading crewmate details...</p>;
  if (!crewmate) return <p>No such crewmate found.</p>;

  return (
    <div>
      <h1>{crewmate.name}</h1>
      <p><strong>Color:</strong> {crewmate.color}</p>
      <p><strong>Skill:</strong> {crewmate.skill}</p>
      <p><strong>Hat:</strong> {crewmate.hat}</p>

      {/* Extra details */}
      <p><em>Created at: {new Date(crewmate.created_at).toLocaleString()}</em></p>

      <Link to={`/edit/${crewmate.id}`}>Edit Crewmate</Link> |{' '}
      <Link to="/">Back to Summary</Link>
    </div>
  );
}
