import React from "react";

const Show = ({
  children,
  when,
}: {
  children: React.ReactNode;
  when: boolean;
}) => {
  return <div>{!!when ? children : null}</div>;
};

export default Show;
