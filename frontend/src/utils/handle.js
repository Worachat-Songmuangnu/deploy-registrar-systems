export const handleChange = (setValue, id, field, value) => {
  setValue((prevData) =>
    prevData.map((row) =>
      row.id === id
        ? {
            ...row,
            [field]: value,
          }
        : row
    )
  );
};

export const handleAddRow = (value, setValue, count = 1) => {
  const newRows = Array.from({ length: count }, (_, i) => {
    const newId = value.length > 0 ? value[value.length - 1].id + i + 1 : i + 1;
    return {
      id: newId,
      username: "",
      name: "",
      score: "0",
    };
  });
  setValue((prevData) => [...prevData, ...newRows]);
};

export const handleDeleteRow = (setValue, e, id) => {
  e.preventDefault();
  setValue((prevData) =>
    prevData.map((row) =>
      row.id === id
        ? { ...row, status: row.status === "delete" ? "active" : "delete" }
        : row
    )
  );
};
