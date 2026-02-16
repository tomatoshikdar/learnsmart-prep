import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockQuestions, subjects, chapters } from "@/data/mockData";
import { Search, Filter, ChevronDown, CheckCircle, XCircle, Eye } from "lucide-react";

const QuestionBank = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [search, setSearch] = useState("");
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const filtered = mockQuestions.filter((q) => {
    if (selectedSubject && q.subject !== selectedSubject) return false;
    if (selectedChapter && q.chapter !== selectedChapter) return false;
    if (selectedDifficulty && q.difficulty !== selectedDifficulty) return false;
    if (search && !q.questionText.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleAnswer = (qId: string, opt: string) => {
    if (submitted[qId]) return;
    setAnswers({ ...answers, [qId]: opt });
  };

  const handleSubmit = (qId: string) => {
    setSubmitted({ ...submitted, [qId]: true });
  };

  const diffColors = { Easy: "bg-success/10 text-success", Medium: "bg-warning/10 text-warning", Hard: "bg-destructive/10 text-destructive" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Question Bank</h1>
        <p className="text-muted-foreground mt-1">Practice questions by subject, chapter, and difficulty</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search questions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={selectedSubject} onChange={(e) => { setSelectedSubject(e.target.value); setSelectedChapter(""); }}>
              <option value="">All Subjects</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} disabled={!selectedSubject}>
              <option value="">All Chapters</option>
              {selectedSubject && chapters[selectedSubject]?.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">{filtered.length} questions found</p>

      {/* Questions */}
      <div className="space-y-4">
        {filtered.map((q, idx) => (
          <Card key={q.id} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{q.subject}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{q.chapter}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${diffColors[q.difficulty]}`}>{q.difficulty}</span>
                  </div>
                  <p className="font-medium text-foreground">Q{idx + 1}. {q.questionText}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{q.marks} mark{q.marks > 1 ? "s" : ""}</span>
              </div>

              {q.options && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, i) => {
                    const isSelected = answers[q.id] === opt;
                    const isCorrect = submitted[q.id] && opt === q.correctAnswer;
                    const isWrong = submitted[q.id] && isSelected && opt !== q.correctAnswer;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(q.id, opt)}
                        className={`text-left p-3 rounded-lg border text-sm transition-all ${
                          isCorrect ? "border-success bg-success/10 text-success" :
                          isWrong ? "border-destructive bg-destructive/10 text-destructive" :
                          isSelected ? "border-primary bg-primary/10 text-primary" :
                          "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                        {isCorrect && <CheckCircle className="inline ml-2 h-4 w-4" />}
                        {isWrong && <XCircle className="inline ml-2 h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                {!submitted[q.id] && answers[q.id] && (
                  <Button size="sm" onClick={() => handleSubmit(q.id)}>Check Answer</Button>
                )}
                {submitted[q.id] && (
                  <Button size="sm" variant="ghost" onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}>
                    <Eye className="h-4 w-4 mr-1" /> {expandedQ === q.id ? "Hide" : "Show"} Explanation
                  </Button>
                )}
              </div>

              {expandedQ === q.id && submitted[q.id] && (
                <div className="mt-3 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Explanation:</p>
                  {q.explanation}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionBank;
