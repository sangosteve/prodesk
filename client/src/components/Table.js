import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Table = ({ tickets }) => {
  let navigate = useNavigate();
  const ths = [
    { id: "10", title: "Id" },
    { id: "20", title: "Subject" },
    { id: "30", title: "Created" },
    { id: "40", title: "Requester" },
    { id: "50", title: "Group" },
  ];

  return (
    <table className="w-full bg-white p-4">
      <thead className="w-full">
        <tr className="w-full bg-white p-4 border-b">
          <th className="p-2 text-left text-lg text-gray-700">
            <input type="checkbox" className="p-2 h-4 w-4" />
          </th>
          {ths.map((head) => (
            <th key={head.id} className="p-2 text-left text-lg text-gray-700">
              {head.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tickets?.map((ticket) => (
          <tr
            key={ticket.ticket_id}
            className="border-b"
            onClick={() => navigate(`./${ticket.ticket_id}`)}
          >
            <td className="p-2 text-weight-400">
              <input type="checkbox" className="p-2 h-4 w-4" />
            </td>
            <td className="p-2 text-weight-400">{`#${ticket.ticket_id}`}</td>
            <td className="p-2">{ticket.subject}</td>
            <td className="p-2">{ticket.created}</td>
            <td className="p-2">{ticket.requester}</td>
            <td className="p-2">{ticket.group}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
