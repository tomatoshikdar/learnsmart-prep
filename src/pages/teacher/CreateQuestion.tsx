import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { subjects, chapters } from "@/data/mockData";
import { PlusCircle, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateQuestion = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    subject: "",
    chapter: "",
    difficulty: "Easy" as "Easy" | "Medium" | "Hard",
    type: "MCQ" as "MCQ" | "CQ" | "Written",
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
    marks: 1,
  });

  const updateOption = (idx: number, val: string) => {
    const opts = [...form.options];
    opts[idx] = val;
    setForm({ ...form, options: opts });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.questionText || !form.correctAnswer) {
      toast({ title: "Missing fields", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Question Created! ✅", description: `Added to ${form.subject} - ${form.chapter}` });
    setForm({ subject: "", chapter: "", difficulty: "Easy", type: "MCQ", questionText: "", options: ["", "", "", ""], correctAnswer: "", explanation: "", marks: 1 });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Create Question</h1>
        <p className="text-muted-foreground mt-1">Add a new question to the bank</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Subject *</Label>
                <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value, chapter: "" })}>
                  <option value="">Select</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <Label>Chapter</Label>
                <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.chapter} onChange={(e) => setForm({ ...form, chapter: e.target.value })} disabled={!form.subject}>
                  <option value="">Select</option>
                  {form.subject && chapters[form.subject]?.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Difficulty</Label>
                <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as any })}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <Label>Type</Label>
                <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })}>
                  <option value="MCQ">MCQ</option>
                  <option value="CQ">CQ</option>
                  <option value="Written">Written</option>
                </select>
              </div>
              <div>
                <Label>Marks</Label>
                <Input type="number" min={1} className="mt-1" value={form.marks} onChange={(e) => setForm({ ...form, marks: Number(e.target.value) })} />
              </div>
            </div>

            <div>
              <Label>Question Text *</Label>
              <textarea className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px]" value={form.questionText} onChange={(e) => setForm({ ...form, questionText: e.target.value })} placeholder="Enter your question..." />
            </div>

            {form.type === "MCQ" && (
              <div>
                <Label>Options</Label>
                <div className="space-y-2 mt-1">
                  {form.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm font-medium w-6">{String.fromCharCode(65 + i)}.</span>
                      <Input value={opt} onChange={(e) => updateOption(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + i)}`} />
                      <button type="button" onClick={() => setForm({ ...form, correctAnswer: opt })} className={`p-2 rounded-lg ${form.correctAnswer === opt && opt ? "text-success bg-success/10" : "text-muted-foreground hover:text-success"}`}>
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Click ✓ to mark the correct answer</p>
              </div>
            )}

            {form.type !== "MCQ" && (
              <div>
                <Label>Correct Answer *</Label>
                <textarea className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[60px]" value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })} />
              </div>
            )}

            <div>
              <Label>Explanation</Label>
              <textarea className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[60px]" value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} placeholder="Explain the answer..." />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <PlusCircle className="h-4 w-4 mr-2" /> Create Question
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuestion;
