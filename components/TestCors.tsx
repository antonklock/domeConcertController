import { useEffect, useState } from "react";

export const TestCors = () => {
  useEffect(() => {
    fetch("http://localhost:3010/test-cors")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const [testCors, setTestCors] = useState<any>("testCors");

  return (
    <div>
      <h1>{testCors}</h1>
    </div>
  );
};
