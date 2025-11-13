import React from "react";
import Card from "./ui/card";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note }) => (
  <Card>
    <h2 className="text-lg font-semibold">{note.title}</h2>
    <p className="text-gray-700 mt-1">{note.description}</p>
    <p className="text-sm text-gray-500 mt-2">{formatDate(note.createdAt)}</p>
  </Card>
);

export default NoteCard;
