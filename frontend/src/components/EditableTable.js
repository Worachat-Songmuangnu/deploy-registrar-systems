import { TrashIcon } from "@heroicons/react/24/outline";
export default function EditableTable(props) {
  return (
    <div className="">
      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 w-1/6">
              Student ID
            </th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2 w-32">
              Score ({props.maxScore})
            </th>
            <th className="border border-gray-300 px-4 py-2 w-20 text-center">
              Result
            </th>
            <th className="border border-gray-300 px-4 py-2 w-12 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {props.scores &&
            props.scores
              .filter((row) => row.status !== "hdelete")
              .map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-100 ${
                    row.status === "delete" && "bg-red-100 hover:bg-red-200"
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {props.edit ? (
                      <input
                        type="text"
                        placeholder="Enter student id"
                        value={row.username}
                        onChange={(e) =>
                          props.handleChange(row.id, "username", e.target.value)
                        }
                        className="border border-gray-400 px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <p>{row.username}</p>
                    )}{" "}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {props.edit ? (
                      <input
                        type="text"
                        placeholder="Enter student name"
                        value={row.name}
                        onChange={(e) =>
                          props.handleChange(row.id, "name", e.target.value)
                        }
                        className="border border-gray-400 px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <p>{row.name}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {props.edit ? (
                      <input
                        type="number"
                        value={row.score}
                        onChange={(e) =>
                          props.handleChange(row.id, "score", e.target.value)
                        }
                        className="border border-gray-400 px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <p>{row.score}</p>
                    )}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 text-center ${
                      row.score > props.maxScore / 2
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {row.score > props.maxScore / 2 ? "Pass" : "Fail"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={(e) => props.handleDeleteRow(e, row.id)}
                      className=" px-4 py-2 rounded"
                    >
                      <TrashIcon className="size-6 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {props.edit && (
        <div className="flex flex-row justify-end gap-4">
          <button
            type="button"
            onClick={() => props.handleAddRow(1)}
            className=" mt-4 border-gray-800 border-[1px]  text-black px-4 py-2 rounded"
          >
            + Add 1 Row
          </button>
          <button
            type="button"
            onClick={() => props.handleAddRow(10)}
            className=" mt-4 border-gray-800 border-[1px]  text-black px-4 py-2 rounded"
          >
            + Add 10 Row
          </button>
        </div>
      )}
    </div>
  );
}
