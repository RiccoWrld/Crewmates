import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase.js';
import CrewmateCard from '../components/CrewmateCard';

export default function SummaryPage() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCrewmates() {
    setLoading(true);
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert('Error fetching crewmates: ' + error.message);
    } else {
      setCrewmates(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCrewmates();
  }, []);

  if (loading) return <p>Loading crewmates...</p>;
  if (crewmates.length === 0) return <p>No crewmates found. Add some!</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Crewmates</h1>
      {crewmates.map(c => (
        <CrewmateCard key={c.id} crewmate={c} />
      ))}
    </div>
  );
}
