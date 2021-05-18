import { useState, useEffect } from "react";

export default function ShowsSample() {
  const [shows, setShows] = useState(null);

  useEffect(() => {
    const getShows = async () => {
      const response = await fetch("/api/shows/");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const showResults = await response.json();
      setShows(showResults);
    };
    getShows();
  }, []);

  const showVisuals = shows
    ? shows.map((show) => (
        <li key={show.id}>
          <h3> {show.title} </h3>
          <p> {show.id} </p>
          <p> {show.dj_name} </p>
          <p> {show.schedule} </p>
          <p> {show.schedule.split("T").pop()} </p>
        </li>
      ))
    : "";

  return shows ? (
    <div>
      <h1> Shows </h1>
      <ul>{showVisuals}</ul>
    </div>
  ) : (
    <h3> Loading Shows </h3>
  );
}
