import { useRouteError } from "react-router";

export default function BoardErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div style={{ color: "white" }}>
      <h1>Oops!</h1>
      <p>Something unexpected happened!</p>
    </div>
  );
}
