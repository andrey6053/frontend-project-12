import React from "react";
import filter from "leo-profanity"

export default function MessageItem(props) {
  const { body, username } = props.msg;
  filter.loadDictionary("en")
  const filterBody = filter.clean(body)
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {": "}
      {filterBody}
    </div>
  );
}
