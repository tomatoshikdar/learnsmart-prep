import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockExams, mockQuestions, mockResults } from "@/data/mockData";
import { Clock, FileText, AlertTriangle, Play, CheckCircle, Radio, History, Users, Calendar, Trophy, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ExamList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"live" | "previous">("live");

  const publishedExams = mockExams.filter((e) => e.status === "published");
  const completedExamIds = mockResults.filter((r) => r.studentId === "s1").map((r) => r.examId);

  const liveExams = publishedExams.filter((e) => !completedExamIds.includes(e.id));
  const previousExams = publishedExams.filter((e) => completedExamIds.includes(e.id));

  const tabs = [
    { id: "live" as const, label: "লাইভ পরীক্ষা", icon: Radio, count: liveExams.length },
    { id: "previous" as const, label: "পূর্ববর্তী পরীক্ষা", icon: History, count: previousExams.length },
  ];

  const displayExams = activeTab === "live" ? liveExams : previousExams;

  return (
    <div className="space-y-6 font-bengali">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/5" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold font-display">📝 পরীক্ষা কেন্দ্র</h1>
          <p className="mt-1 text-sm text-white/80">লাইভ পরীক্ষায় অংশগ্রহণ করুন এবং আপনার ফলাফল দেখুন</p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${
              activeTab === tab.id ? "bg-white/20" : "bg-primary/10 text-primary"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Exam Grid */}
      {displayExams.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            {activeTab === "live" ? (
              <>
                <Radio className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground font-medium">কোন লাইভ পরীক্ষা নেই</p>
                <p className="text-sm text-muted-foreground/60 mt-1">নতুন পরীক্ষা শীঘ্রই আসবে</p>
              </>
            ) : (
              <>
                <History className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground font-medium">কোন পূর্ববর্তী পরীক্ষা নেই</p>
                <p className="text-sm text-muted-foreground/60 mt-1">লাইভ পরীক্ষায় অংশগ্রহণ করুন</p>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayExams.map((exam, index) => {
            const completed = completedExamIds.includes(exam.id);
            const result = mockResults.find((r) => r.examId === exam.id && r.studentId === "s1");

            return (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card className="group relative overflow-hidden rounded-2xl border hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  {/* Status indicator */}
                  {!completed && (
                    <div className="absolute top-3 right-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                      </span>
                    </div>
                  )}

                  <CardContent className="p-5 space-y-4">
                    {/* Subject badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-primary/10 text-primary">
                        {exam.subject}
                      </span>
                      {completed && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> সম্পন্ন
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base leading-snug">{exam.title}</h3>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary/60" /> {exam.duration} মিনিট
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-primary/60" /> {exam.questionIds.length} প্রশ্ন
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Trophy className="h-4 w-4 text-primary/60" /> {exam.totalMarks} নম্বর
                      </span>
                    </div>

                    {exam.negativeMarking && (
                      <p className="text-xs text-destructive flex items-center gap-1.5 bg-destructive/5 rounded-lg px-3 py-1.5">
                        <AlertTriangle className="h-3.5 w-3.5" /> নেগেটিভ মার্কিং: -{exam.negativeMarkValue}
                      </p>
                    )}

                    {/* Action / Result */}
                    {completed && result ? (
                      <div className="flex items-center justify-between bg-muted/50 rounded-xl p-3">
                        <div>
                          <p className="text-xs text-muted-foreground">আপনার স্কোর</p>
                          <p className={`text-xl font-bold ${
                            result.percentage >= 80 ? "text-emerald-600" :
                            result.percentage >= 50 ? "text-amber-500" : "text-destructive"
                          }`}>
                            {result.percentage}%
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/exam-result/${exam.id}`)} className="rounded-xl">
                          বিস্তারিত <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full rounded-xl bg-primary hover:bg-primary/90 gap-2"
                        onClick={() => navigate(`/exam/${exam.id}`)}
                      >
                        <Play className="h-4 w-4" /> পরীক্ষা শুরু করুন
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExamList;
