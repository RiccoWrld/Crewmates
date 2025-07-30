// src/pages/EditForm.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase.js";
import { useNavigate, useParams } from "react-router-dom";

const ATTRIBUTE_OPTIONS = {
  color: ["Red", "Blue", "Green", "Yellow", "Purple"],
  skill: ["Engineer", "Pilot", "Scientist", "Medic", "Security"],
  hat: ["None", "Beanie", "Cap", "Helmet", "Bandana"],
};

export default function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [crewmate, setCrewmate] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [skill, setSkill] = useState("");
  const [hat, setHat] = useState("");

  useEffect(() => {
    async function fetchCrewmate() {
      setLoading(true);
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("Error fetching crewmate: " + error.message);
        navigate("/");
        return;
      }
      setCrewmate(data);
      setName(data.name);
      setColor(data.color);
      setSkill(data.skill);
      setHat(data.hat);
      setLoading(false);
    }
    fetchCrewmate();
  }, [id, navigate]);

  async function handleUpdate(e) {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a name.");
      return;
    }
    setLoading(true);

    const { error } = await supabase
      .from("crewmates")
      .update({ name, color, skill, hat })
      .eq("id", id);

    if (error) {
      alert("Error updating crewmate: " + error.message);
    } else {
      alert("Crewmate updated!");
      // Refresh crewmate data immediately to reflect changes
      const { data } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();
      setCrewmate(data);
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this crewmate?"))
      return;

    setLoading(true);
    const { error } = await supabase.from("crewmates").delete().eq("id", id);

    if (error) {
      alert("Error deleting crewmate: " + error.message);
      setLoading(false);
    } else {
      alert("Crewmate deleted!");
      navigate("/");
    }
  }

  if (loading && !crewmate) return <p>Loading crewmate data...</p>;
  if (!crewmate) return null;

  return (
    <div>
      <h1>Edit Crewmate</h1>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Name: <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
              style={{ padding: 5, width: "100%" }}
            />
          </label>
        </div>

        {Object.entries(ATTRIBUTE_OPTIONS).map(([attr, options]) => (
          <div key={attr} style={{ marginBottom: 10 }}>
            <label>{attr.charAt(0).toUpperCase() + attr.slice(1)}:</label>
            <div style={{ marginTop: 5 }}>
              {options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={
                    (attr === "color" && color === option) ||
                    (attr === "skill" && skill === option) ||
                    (attr === "hat" && hat === option)
                      ? "attribute-selected"
                      : ""
                  }
                  onClick={() => {
                    if (attr === "color") setColor(option);
                    if (attr === "skill") setSkill(option);
                    if (attr === "hat") setHat(option);
                  }}
                  disabled={loading}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "8px 16px", marginRight: 10 }}
        >
          {loading ? "Updating..." : "Update Crewmate"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="delete-btn"
        >
          Delete Crewmate
        </button>
      </form>
    </div>
  );
}
