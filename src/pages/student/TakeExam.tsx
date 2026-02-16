import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockExams, mockQuestions } from "@/data/mockData";
import { Clock, ChevronLeft, ChevronRight, Flag, AlertTriangle } from "lucide-react";

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = mockExams.find((e) => e.id === examId);
  const questions = exam ? exam.questionIds.map((id) => mockQuestions.find((q) => q.id === id)!).filter(Boolean) : [];

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState((exam?.duration || 0) * 60);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!exam || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timer); handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [exam, submitted]);

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score += q.marks;
      else if (answers[q.id] && exam?.negativeMarking) score -= exam.negativeMarkValue;
    });
    const totalMarks = exam?.totalMarks || 0;
    const percentage = totalMarks > 0 ? Math.round((Math.max(0, score) / totalMarks) * 100) : 0;
    // Store result in sessionStorage for result page
    sessionStorage.setItem("lastExamResult", JSON.stringify({ examId, score: Math.max(0, score), totalMarks, percentage, answers, timeTaken: (exam?.duration || 0) * 60 - timeLeft }));
    navigate(`/exam-result/${examId}`);
  }, [answers, exam, questions, submitted, timeLeft, examId, navigate]);

  if (!exam) return <div className="text-center py-20 text-muted-foreground">Exam not found</div>;

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const q = questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const isUrgent = timeLeft < 60;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Timer bar */}
      <div className={`flex items-center justify-between p-4 rounded-xl ${isUrgent ? "bg-destructive/10 border border-destructive/30" : "bg-card border border-border"}`}>
        <div>
          <p className="font-display font-bold text-lg">{exam.title}</p>
          <p className="text-sm text-muted-foreground">{answeredCount}/{questions.length} answered</p>
        </div>
        <div className={`flex items-center gap-2 text-lg font-mono font-bold ${isUrgent ? "text-destructive animate-pulse-soft" : "text-foreground"}`}>
          <Clock className="h-5 w-5" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question navigation pills */}
      <div className="flex flex-wrap gap-2">
        {questions.map((qq, i) => (
          <button
            key={qq.id}
            onClick={() => setCurrentQ(i)}
            className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
              currentQ === i ? "bg-primary text-primary-foreground" :
              answers[qq.id] ? "bg-success/20 text-success border border-success/30" :
              flagged.has(qq.id) ? "bg-warning/20 text-warning border border-warning/30" :
              "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      {q && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
              <button onClick={() => { const n = new Set(flagged); flagged.has(q.id) ? n.delete(q.id) : n.add(q.id); setFlagged(n); }}
                className={`flex items-center gap-1 text-sm ${flagged.has(q.id) ? "text-warning" : "text-muted-foreground hover:text-warning"}`}>
                <Flag className="h-4 w-4" /> {flagged.has(q.id) ? "Flagged" : "Flag"}
              </button>
            </div>

            <p className="text-lg font-medium mb-6">{q.questionText}</p>

            {q.options && (
              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      answers[q.id] === opt ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <span className="font-bold mr-3">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" disabled={currentQ === 0} onClick={() => setCurrentQ(currentQ - 1)}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              {currentQ < questions.length - 1 ? (
                <Button onClick={() => setCurrentQ(currentQ + 1)}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button className="bg-success hover:bg-success/90" onClick={() => setShowConfirm(true)}>Submit Exam</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4">
          <Card className="max-w-sm w-full">
            <CardContent className="p-6 text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-warning mx-auto" />
              <h3 className="text-lg font-display font-bold">Submit Exam?</h3>
              <p className="text-sm text-muted-foreground">
                You answered {answeredCount} of {questions.length} questions.
                {answeredCount < questions.length && " Unanswered questions will be marked as skipped."}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>Go Back</Button>
                <Button className="flex-1" onClick={handleSubmit}>Submit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TakeExam;
