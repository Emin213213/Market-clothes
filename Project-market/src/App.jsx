import React, { useState, useEffect } from "react";

const Over = () => {
  const [comments, setComments] = useState([]);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/comments").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/albums").then((res) =>
        res.json()
      ),
    ])
      .then(([data]) => {
        setComments(data.slice(0, 20));
      })
      .catch((error) => console.error("Error fetching data:", error)); // Обработка ошибок
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selectedOption = comments.find(
      (item) => item.id.toString() === selectedId
    );
    setSelectedText(selectedOption ? selectedOption.body : "");
  };

  return (
    <>
      <select name="Shop" id="shop-select" onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {comments.map(({ id }) => (
          <option key={id} value={id}>
            Option {id}
          </option>
        ))}
      </select>

      {selectedText && <p>Selected Text: {selectedText}</p>}
    </>
  );
};

export default Over;
