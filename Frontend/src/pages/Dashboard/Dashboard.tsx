import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const cards = [
    { cardTitle: "Today's Sales", content: 2 },
    { cardTitle: "Items Sold", content: 2 },
    { cardTitle: "Low Stock", content: 2 },
  ];
  return (
    <div>
      Dashboard
      <div className="grid gap-4.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
        {cards.map((card) => (
          <Card>
            <CardHeader>
              <CardTitle>{card.cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
            </CardContent>
          </Card>
        ))}
        
      </div>
    </div>
  );
};

export default Dashboard;
