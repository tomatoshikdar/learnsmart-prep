import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockExams, mockQuestions, mockResults } from "@/data/mockData";
import { Clock, FileText, AlertTriangle, Play, CheckCircle } from "lucide-react";

const ExamList = () => {
  const navigate = useNavigate();
  const publishedExams = mockExams.filter((e) => e.status === "published");
  const completedExamIds = mockResults.filter((r) => r.studentId === "s1").map((r) => r.examId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Available Exams</h1>
        <p className="text-muted-foreground mt-1">Take timed practice exams to test your preparation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publishedExams.map((exam) => {
          const completed = completedExamIds.includes(exam.id);
          const result = mockResults.find((r) => r.examId === exam.id && r.studentId === "s1");
          return (
            <Card key={exam.id} className="hover:shadow-card-hover transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{exam.subject}</span>
                  {completed && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-success/10 text-success flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Done</span>}
                </div>
                <CardTitle className="text-base mt-2">{exam.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {exam.duration} min</span>
                  <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {exam.questionIds.length} Q</span>
                  <span className="flex items-center gap-1">Marks: {exam.totalMarks}</span>
                </div>
                {exam.negativeMarking && (
                  <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Negative marking: -{exam.negativeMarkValue}</p>
                )}
                {completed && result ? (
                  <div className="text-sm">Score: <span className={`font-bold ${result.percentage >= 80 ? "text-success" : result.percentage >= 50 ? "text-warning" : "text-destructive"}`}>{result.percentage}%</span></div>
                ) : (
                  <Button className="w-full" onClick={() => navigate(`/exam/${exam.id}`)}>
                    <Play className="h-4 w-4 mr-1" /> Start Exam
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExamList;
