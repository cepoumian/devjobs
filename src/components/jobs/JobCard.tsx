interface JobCardProps {
  data: {
    position: string;
    company: string;
  };
}

const JobCard = (props: JobCardProps) => {
  const {
    data: { position, company },
  } = props;

  return (
    <div
      style={{
        maxWidth: "350px",
        height: "228px",
        backgroundColor: "lightblue",
      }}
    >
      <p>{position}</p>
      <p>{company}</p>
    </div>
  );
};

export default JobCard;
