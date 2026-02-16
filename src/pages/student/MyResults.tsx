import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockResults, mockExams } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const MyResults = () => {
  const myResults = mockResults.filter((r) => r.studentId === "s1");

  const subjectScores: Record<string, { total: number; count: number }> = {};
  myResults.forEach((r) => {
    const exam = mockExams.find((e) => e.id === r.examId);
    if (exam) {
      if (!subjectScores[exam.subject]) subjectScores[exam.subject] = { total: 0, count: 0 };
      subjectScores[exam.subject].total += r.percentage;
      subjectScores[exam.subject].count++;
    }
  });
  const subjectData = Object.entries(subjectScores).map(([name, v]) => ({ name, avg: Math.round(v.total / v.count) }));

  const pieData = [
    { name: "Correct", value: myResults.reduce((a, r) => a + r.score, 0) },
    { name: "Wrong", value: myResults.reduce((a, r) => a + r.totalMarks - r.score, 0) },
  ];
  const COLORS = ["hsl(var(--success))", "hsl(var(--destructive))"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">My Results</h1>
        <p className="text-muted-foreground mt-1">Track your exam performance over time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Subject Averages</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip />
                <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Overall Accuracy</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Exam History</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Exam</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Subject</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground">Score</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground">Percentage</th>
                  <th className="text-center py-3 px-2 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {myResults.map((r) => {
                  const exam = mockExams.find((e) => e.id === r.examId);
                  return (
                    <tr key={r.id} className="border-b border-border/50">
                      <td className="py-3 px-2 font-medium">{exam?.title}</td>
                      <td className="py-3 px-2">{exam?.subject}</td>
                      <td className="py-3 px-2 text-center">{r.score}/{r.totalMarks}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`font-bold ${r.percentage >= 80 ? "text-success" : r.percentage >= 50 ? "text-warning" : "text-destructive"}`}>{r.percentage}%</span>
                      </td>
                      <td className="py-3 px-2 text-center text-muted-foreground">{r.submittedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyResults;
