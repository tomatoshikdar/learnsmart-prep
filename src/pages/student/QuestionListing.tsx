import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { subjectsData, sampleQuestions } from "@/data/questionBankData";
import {
  ArrowLeft, Search, ChevronDown, ChevronLeft, ChevronRight,
  Info, BarChart3, Flag, Bookmark, CheckCircle, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

const filterTabs = [
  { id: "all", label: "All" },
  { id: "board", label: "Board" },
  { id: "admission", label: "Admission" },
  { id: "practice", label: "অনুশীলনী প্রশ্ন" },
  { id: "test", label: "Test Exam" },
];

const QuestionListing = () => {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedAnswer, setExpandedAnswer] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(subjectId || "");
  const [selectedChapter, setSelectedChapter] = useState(chapterId || "");

  const subject = subjectsData.find((s) => s.id === selectedSubject);
  const chapter = subject?.chapters.find((c) => c.id === selectedChapter);

  // Filter questions (using sample data, in real app would fetch from API)
  const questions = sampleQuestions.filter((q) => {
    if (selectedSubject && q.subjectId !== selectedSubject) return false;
    if (selectedChapter && q.chapterId !== selectedChapter) return false;
    if (activeFilter !== "all" && q.type !== activeFilter) return false;
    if (search && !q.questionBn.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5 font-bangla">
      {/* Top Filters */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <select
            value={selectedSubject}
            onChange={(e) => { setSelectedSubject(e.target.value); setSelectedChapter(""); }}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
          >
            <option value="">বিষয় নির্বাচন করুন</option>
            {subjectsData.map((s) => (
              <option key={s.id} value={s.id}>{s.nameBn}</option>
            ))}
          </select>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={!selectedSubject}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-success/40 disabled:opacity-50"
          >
            <option value="">অধ্যায় নির্বাচন করুন</option>
            {subject?.chapters.map((c) => (
              <option key={c.id} value={c.id}>{c.nameBn}</option>
            ))}
          </select>
          <select className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-success/40">
            <option value="">টপিক নির্বাচন করুন</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
            <input
              type="text"
              placeholder="প্রশ্ন খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-success/40"
            />
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border-2 border-success text-success text-sm font-medium hover:bg-success/5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          পিছনে
        </button>
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === tab.id
                ? "bg-success text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-success/10 hover:text-success"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Question Count */}
      <p className="text-sm text-muted-foreground">
        মোট <span className="font-bold text-foreground">{questions.length}</span> টি প্রশ্ন
      </p>

      {/* Warning Note */}
      <div className="flex items-start gap-3 bg-destructive/5 border border-destructive/20 rounded-xl px-4 py-3">
        <Info className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
        <p className="text-xs text-destructive">
          প্রশ্নে কোনো ভুল পেলে রিপোর্ট বাটনে ক্লিক করে জানান। আমরা যত দ্রুত সম্ভব সংশোধন করবো।
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-muted/30 rounded-xl border border-border p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-muted-foreground">
                    প্রশ্ন {idx + 1}
                  </span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                    {q.examTag}
                  </span>
                </div>
                <p className="text-foreground font-medium leading-relaxed">{q.questionBn}</p>
              </div>
            </div>

            {/* Options */}
            {q.options && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 rounded-lg border border-border bg-card text-sm hover:border-success/50 hover:bg-success/5 transition-all cursor-pointer"
                  >
                    <span className="font-bold text-muted-foreground mr-2">
                      {String.fromCharCode(2453 + i)}.
                    </span>
                    {opt}
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <Button
                size="sm"
                onClick={() => setExpandedAnswer(expandedAnswer === q.id ? null : q.id)}
                className="bg-success hover:bg-success/90 text-white rounded-lg text-xs"
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                {expandedAnswer === q.id ? "উত্তর লুকান" : "উত্তর ও সমাধান দেখুন"}
              </Button>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                  <Info className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                  <BarChart3 className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                  <Flag className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Answer Expand */}
            <AnimatePresence>
              {expandedAnswer === q.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 p-4 bg-success/5 border border-success/20 rounded-xl">
                    <p className="text-sm font-bold text-success mb-1">সঠিক উত্তর: {q.correctAnswer}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">কোনো প্রশ্ন পাওয়া যায়নি</p>
            <p className="text-sm mt-1">অনুগ্রহ করে ফিল্টার পরিবর্তন করুন</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {questions.length > 0 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition-all ${
                currentPage === p
                  ? "bg-success text-white shadow-sm"
                  : "border border-border hover:bg-muted"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            Go
          </button>
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionListing;
