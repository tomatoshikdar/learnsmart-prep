import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { subjectsData, subjectGroups, classOptions } from "@/data/questionBankData";
import { ChevronDown, ChevronRight, BookOpen, FileText, Pencil } from "lucide-react";

const QuestionBank = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("hsc");
  const [selectedGroup, setSelectedGroup] = useState("hsc-science");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const toggleSubject = (id: string) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  const handleChapterClick = (subjectId: string, chapterId: string) => {
    navigate(`/questions/${subjectId}/${chapterId}`);
  };

  return (
    <div className="space-y-6 font-bangla">
      {/* Blue gradient announcement banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 p-6 md:p-8">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 hidden md:block">
          <div className="relative">
            <FileText className="h-20 w-20 text-white" />
            <Pencil className="h-8 w-8 text-white absolute -right-2 -bottom-1" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left md:ml-28">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              📚 প্রশ্নব্যাংক
            </h1>
            <p className="text-blue-100 mt-1 text-sm md:text-base">
              বিষয়ভিত্তিক প্রশ্ন অনুশীলন করো এবং পরীক্ষায় ভালো ফলাফল করো
            </p>
          </div>
          <button className="px-6 py-2.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-sm whitespace-nowrap shadow-lg">
            প্রশ্নব্যাংক দেখুন
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-success/40"
        >
          {classOptions.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-success/40"
        >
          {subjectGroups.map((g) => (
            <option key={g.id} value={g.id}>{g.label}</option>
          ))}
        </select>
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectsData.map((subject) => (
          <motion.div
            key={subject.id}
            layout
            className={`bg-card rounded-xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
              expandedSubject === subject.id
                ? "border-success/50 shadow-md"
                : "border-border hover:border-success/30"
            }`}
          >
            {/* Subject Header */}
            <button
              onClick={() => toggleSubject(subject.id)}
              className="w-full flex items-center gap-4 p-4 text-left"
            >
              <div className={`h-12 w-12 rounded-xl ${subject.bgColor} flex items-center justify-center text-2xl flex-shrink-0`}>
                {subject.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground text-base truncate">
                    {subject.nameBn}
                  </h3>
                  {subject.isFree && (
                    <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-[10px] font-bold rounded-full whitespace-nowrap">
                      ফ্রি
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {subject.chapters.length}টি অধ্যায়
                </p>
              </div>
              <motion.div
                animate={{ rotate: expandedSubject === subject.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </button>

            {/* Expanded Chapter List */}
            <AnimatePresence>
              {expandedSubject === subject.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <div className="border-t border-border pt-3 space-y-0.5">
                      {subject.chapters.map((chapter) => (
                        <button
                          key={chapter.id}
                          onClick={() => handleChapterClick(subject.id, chapter.id)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-success/5 transition-colors group"
                        >
                          <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-success flex-shrink-0" />
                          <span className="text-sm text-foreground group-hover:text-success flex-1 truncate">
                            {chapter.nameBn}
                          </span>
                          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                            {chapter.questionCount} টি
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuestionBank;
