import React, { useState } from "react";

type ExhibitionData = {
  title: string;
  description: string;
  date: string;
  location: string;
};

type ExhibitionFormProps = {
  onSubmit: (data: ExhibitionData) => void;
  initialData?: ExhibitionData;
};

const ExhibitionForm: React.FC<ExhibitionFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [description, setDescription] = useState(
    initialData ? initialData.description : ""
  );
  const [date, setDate] = useState(initialData ? initialData.date : "");
  const [location, setLocation] = useState(
    initialData ? initialData.location : ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const exhibitionData: ExhibitionData = {
      title,
      description,
      date,
      location,
    };
    onSubmit(exhibitionData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExhibitionForm;
