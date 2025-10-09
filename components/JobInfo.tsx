// Props type
type JobInfoProps = {
  icon: React.ReactNode;
  text: string;
};

// The component
function JobInfo({ icon, text }: JobInfoProps) {
  // Returned JSX
  return (
    <div className="flex gap-x-2 items-center">
      {icon} {text}
    </div>
  );
}

export default JobInfo;
