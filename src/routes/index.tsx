import { createFileRoute } from "@tanstack/react-router";
import Jobs from "../components/jobs/Jobs";
// import App from "../App";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Jobs />
    </>
  );
}
