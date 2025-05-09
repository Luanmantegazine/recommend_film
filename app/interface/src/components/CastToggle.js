import React, { useState } from "react";

const CastToggle = ({ photo, bio }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-center">
      <img
        src={photo || "/img/avatar-placeholder.png"}
        alt="cast"
        className="w-32 h-44 object-cover rounded-xl mx-auto shadow"
      />
      <button
        className="mt-2 text-sky-600 text-xs"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Hide" : "Show"} More
      </button>
      {open && <p className="text-xs mt-1 max-h-40 overflow-auto">{bio}</p>}
    </div>
  );
};

export default CastToggle;
