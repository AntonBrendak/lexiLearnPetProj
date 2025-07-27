import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";

export default function UiKit() {
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">UI Kit</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Buttons</h2>
        <Button>Click me</Button>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-2">Input</h2>
        <Input placeholder="Enter text..." />
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-2">Loader</h2>
        <Loader />
      </Card>
    </div>
  );
}