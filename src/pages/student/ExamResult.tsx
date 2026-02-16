import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockExams, mockQuestions } from "@/data/mockData";
import { CheckCircle, XCircle, ArrowLeft, RotateCcw, Trophy } from "lucide-react";

const ExamResult = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = mockExams.find((e) => e.id === examId);
  const resultStr = sessionStorage.getItem("lastExamResult");
  const result = resultStr ? JSON.parse(resultStr) : null;

  if (!exam || !result) return (
    <div className="text-center py-20">
      <p className="text-muted-foreground mb-4">No result found</p>
      <Button onClick={() => navigate("/exams")}>Back to Exams</Button>
    </div>
  );

  const questions = exam.questionIds.map((id) => mockQuestions.find((q) => q.id === id)!).filter(Boolean);
  const correct = questions.filter((q) => result.answers[q.id] === q.correctAnswer).length;
  const wrong = questions.filter((q) => result.answers[q.id] && result.answers[q.id] !== q.correctAnswer).length;
  const skipped = questions.length - correct - wrong;

  const gradeColor = result.percentage >= 80 ? "text-success" : result.percentage >= 50 ? "text-warning" : "text-destructive";
  const grade = result.percentage >= 90 ? "A+" : result.percentage >= 80 ? "A" : result.percentage >= 70 ? "B" : result.percentage >= 60 ? "C" : result.percentage >= 50 ? "D" : "F";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Score card */}
      <Card className="text-center">
        <CardContent className="p-8">
          <Trophy className={`h-16 w-16 mx-auto mb-4 ${gradeColor}`} />
          <h1 className="text-3xl font-display font-bold mb-1">Exam Complete!</h1>
          <p className="text-muted-foreground mb-6">{exam.title}</p>

          <div className={`text-6xl font-display font-bold ${gradeColor} mb-2`}>{result.percentage}%</div>
          <div className={`text-2xl font-bold ${gradeColor}`}>Grade: {grade}</div>

          <div className="flex justify-center gap-8 mt-6 text-sm">
            <div><span className="text-success font-bold text-lg">{correct}</span><br /><span className="text-muted-foreground">Correct</span></div>
            <div><span className="text-destructive font-bold text-lg">{wrong}</span><br /><span className="text-muted-foreground">Wrong</span></div>
            <div><span className="text-muted-foreground font-bold text-lg">{skipped}</span><br /><span className="text-muted-foreground">Skipped</span></div>
          </div>

          <div className="flex gap-3 justify-center mt-6">
            <Button variant="outline" onClick={() => navigate("/exams")}><ArrowLeft className="h-4 w-4 mr-1" /> All Exams</Button>
            <Button onClick={() => navigate("/results")}> View All Results</Button>
          </div>
        </CardContent>
      </Card>

      {/* Answer review */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Answer Review</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {questions.map((q, idx) => {
            const userAns = result.answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? "border-success/30 bg-success/5" : userAns ? "border-destructive/30 bg-destructive/5" : "border-border bg-muted/30"}`}>
                <p className="font-medium text-sm mb-2">Q{idx + 1}. {q.questionText}</p>
                {userAns ? (
                  <div className="flex items-center gap-2 text-sm">
                    {isCorrect ? <CheckCircle className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-destructive" />}
                    <span>Your answer: <strong>{userAns}</strong></span>
                    {!isCorrect && <span className="text-success ml-2">Correct: <strong>{q.correctAnswer}</strong></span>}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Skipped — Correct: <strong>{q.correctAnswer}</strong></p>
                )}
                <p className="text-xs text-muted-foreground mt-2">{q.explanation}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamResult;
