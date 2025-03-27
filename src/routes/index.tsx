import { createFileRoute } from "@tanstack/react-router";
import Jobs from "../components/jobs/Jobs";

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
