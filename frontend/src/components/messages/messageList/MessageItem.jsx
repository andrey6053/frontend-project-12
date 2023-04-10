import React from "react";

export default function MessageItem(props) {
  const { body, username } = props.msg;
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {": "}
      {body}
    </div>
  );
}
