import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

function Home() {
  // Returned JSX
  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <Button>default button</Button>
      <Button variant="outline" size="icon">
        <Camera />
      </Button>
    </div>
  );
}

export default Home;
