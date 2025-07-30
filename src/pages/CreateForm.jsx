// src/pages/CreateForm.jsx
import React, { useState } from "react";
import { supabase } from "../supabase.js";
import { useNavigate } from "react-router-dom";

const ATTRIBUTE_OPTIONS = {
  color: ["Red", "Blue", "Green", "Yellow", "Purple"],
  skill: ["Engineer", "Pilot", "Scientist", "Medic", "Security"],
  hat: ["None", "Beanie", "Cap", "Helmet", "Bandana"],
};

export default function CreateForm() {
  const [name, setName] = useState("");
  const [color, setColor] = useState(ATTRIBUTE_OPTIONS.color[0]);
  const [skill, setSkill] = useState(ATTRIBUTE_OPTIONS.skill[0]);
  const [hat, setHat] = useState(ATTRIBUTE_OPTIONS.hat[0]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a name for your crewmate.");
      return;
    }
    setLoading(true);

    const { error } = await supabase
      .from("crewmates")
      .insert([{ name, color, skill, hat }]);

    if (error) {
      alert("Error creating crewmate: " + error.message);
    } else {
      navigate("/");
    }
    setLoading(false);
  }

  return (
    <div>
      <h1>Create a New Crewmate</h1>
      <form onSubmit={handleSubmit}>
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
          style={{ padding: "8px 16px" }}
        >
          {loading ? "Creating..." : "Create Crewmate"}
        </button>
      </form>
    </div>
  );
}
