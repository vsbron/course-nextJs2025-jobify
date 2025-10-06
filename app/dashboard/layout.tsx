function layout({ children }: { children: React.ReactNode }) {
  // Returned JSX
  return (
    <>
      <h2>Dashboard layout</h2>
      <div>{children}</div>
    </>
  );
}

export default layout;
