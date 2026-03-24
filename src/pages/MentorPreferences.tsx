import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOPICS, AVAILABILITY_OPTIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";

const MAX_TOPICS = 4;

const ROLE_LEVELS = [
  "Associate Product Manager",
  "Product Manager",
  "Senior Product Manager",
  "Principal Product Manager",
  "Group Product Manager",
  "Director of Product",
  "VP Product",
  "Head of Product",
  "Chief Product Officer",
  "Founder",
  "Other",
];

const INDUSTRIES = [
  "Banking/Finance/FinTech",
  "Computing/IoT/Consumer Tech",
  "Data/Analytics",
  "EdTech",
  "Enterprise Software/SaaS",
  "Healthcare/Nanotechnology/Wearable",
  "Manufacturing",
  "Media/Entertainment/Social",
  "Nonprofit/Philanthropy",
  "Real Estate Tech",
  "Retail/eCommerce",
  "Transportation/Travel/Hospitality",
  "Other",
];

const STEPS = ["Who you are", "How you can help", "Tell your story"];

interface FormData {
  name: string;
  title: string;
  roleLevel: string;
  industry: string;
  openToMentoring: boolean;
  topics: string[];
  availability: string;
  maxMentees: string;
  bio: string;
  superpower: string;
  linkedin: string;
}

const initialForm: FormData = {
  name: "",
  title: "",
  roleLevel: "",
  industry: "",
  openToMentoring: true,
  topics: [],
  availability: "",
  maxMentees: "",
  bio: "",
  superpower: "",
  linkedin: "",
};

const MentorPreferences = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof FormData, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const toggleTopic = (topic: string) => {
    const next = form.topics.includes(topic)
      ? form.topics.filter((t) => t !== topic)
      : form.topics.length < MAX_TOPICS
        ? [...form.topics, topic]
        : form.topics;
    update("topics", next);
  };

  const validate = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!form.name.trim()) errs.name = "Please enter your name";
      if (!form.title.trim()) errs.title = "Please enter your title";
      if (!form.roleLevel) errs.roleLevel = "Please select your role level";
      if (!form.industry) errs.industry = "Please select your industry";
    } else if (s === 2) {
      if (form.topics.length < 1) errs.topics = "Please select at least 1 topic";
      if (!form.availability) errs.availability = "Please select your availability";
      if (!form.maxMentees) errs.maxMentees = "Please select a mentee limit";
    } else if (s === 3) {
      if (!form.superpower.trim()) errs.superpower = "Please add your superpower";
      if (form.linkedin.trim() && !/^https?:\/\/.+/i.test(form.linkedin.trim())) {
        errs.linkedin = "Please enter a valid URL";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  const save = () => {
    if (validate(3)) setStep(4);
  };

  // Success state
  if (step === 4) {
    return (
      <div className="max-w-lg mx-auto py-24 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">You're now part of the network</h1>
        <p className="text-muted-foreground mb-2">
          Your profile is live and will help the right seekers find their way forward.
        </p>
        <p className="text-sm text-muted-foreground/60 italic mb-8">
          Every great trajectory starts with the right guidance.
        </p>
        <Button onClick={() => navigate("/")} size="lg">
          Back to home
        </Button>
      </div>
    );
  }

  const RequiredStar = () => <span className="text-destructive ml-0.5">*</span>;

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? <p className="text-sm text-destructive mt-1">{errors[field]}</p> : null;

  const SelectField = ({
    value,
    onChange,
    placeholder,
    options,
    field,
  }: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    options: string[];
    field: string;
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-lg border bg-card px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
          errors[field] ? "border-destructive" : "border-border"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <FieldError field={field} />
    </div>
  );

  return (
    <div className="max-w-lg mx-auto py-8 px-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((label, i) => {
          const num = i + 1;
          const isComplete = step > num;
          const isCurrent = step === num;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                    isComplete
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "bg-border text-muted-foreground"
                  }`}
                >
                  {isComplete ? <Check className="w-3.5 h-3.5" /> : num}
                </div>
                <span className={`text-xs whitespace-nowrap hidden sm:inline ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${isComplete ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1">Who you are</h1>
            <p className="text-sm text-muted-foreground">Help seekers understand where you are in your journey</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name<RequiredStar /></label>
            <Input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter your full name"
              className={errors.name ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground mt-1">Use the name you want seekers to see</p>
            <FieldError field="name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title<RequiredStar /></label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Enter your current title"
              className={errors.title ? "border-destructive" : ""}
            />
            <FieldError field="title" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              What best describes your current or most recent title?<RequiredStar />
            </label>
            <SelectField value={form.roleLevel} onChange={(v) => update("roleLevel", v)} placeholder="Select your role level" options={ROLE_LEVELS} field="roleLevel" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Industry<RequiredStar /></label>
            <SelectField value={form.industry} onChange={(v) => update("industry", v)} placeholder="Select your industry" options={INDUSTRIES} field="industry" />
          </div>

          <Button onClick={next} className="w-full" size="lg">Next →</Button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1">How you can help</h1>
            <p className="text-sm text-muted-foreground">Define how you can guide others forward</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-foreground">Open to mentoring</span>
              <p className="text-xs text-muted-foreground">Turn this on to appear in mentor matches</p>
            </div>
            <button
              onClick={() => update("openToMentoring", !form.openToMentoring)}
              className={`w-11 h-6 rounded-full transition-colors relative ${form.openToMentoring ? "bg-primary" : "bg-border"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${form.openToMentoring ? "translate-x-[22px]" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">What can you help with?<RequiredStar /></label>
              <span className="text-xs text-muted-foreground">{form.topics.length}/{MAX_TOPICS} selected</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Select up to 4 areas you're most comfortable supporting</p>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => {
                const selected = form.topics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                      selected ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-border"
                    } ${!selected && form.topics.length >= MAX_TOPICS ? "opacity-40 cursor-not-allowed" : ""}`}
                    disabled={!selected && form.topics.length >= MAX_TOPICS}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
            <FieldError field="topics" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Availability<RequiredStar /></label>
            <p className="text-xs text-muted-foreground mb-1.5">How often can you support mentees?</p>
            <SelectField value={form.availability} onChange={(v) => update("availability", v)} placeholder="Select availability" options={AVAILABILITY_OPTIONS} field="availability" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Max mentees<RequiredStar /></label>
            <p className="text-xs text-muted-foreground mb-1.5">Set how many mentees you want to support at one time</p>
            <SelectField value={form.maxMentees} onChange={(v) => update("maxMentees", v)} placeholder="Select max mentees" options={["1", "2", "3", "No limit"]} field="maxMentees" />
          </div>

          <div className="flex gap-3">
            <Button onClick={back} variant="ghost" size="lg" className="flex-1">Back</Button>
            <Button onClick={next} size="lg" className="flex-1">Next →</Button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1">Tell your story</h1>
            <p className="text-sm text-muted-foreground">This is what seekers will see when deciding to reach out</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
            <Textarea
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              placeholder="Share a short summary about your background and the kind of support you offer"
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-1">1–3 sentences is enough</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Your superpower<RequiredStar /></label>
            <Input
              value={form.superpower}
              onChange={(e) => update("superpower", e.target.value)}
              placeholder="What are you especially great at helping people with?"
              className={errors.superpower ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground mt-1">Example: Making career pivots less scary</p>
            <FieldError field="superpower" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">LinkedIn</label>
            <Input
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
              placeholder="Paste your LinkedIn profile URL"
              className={errors.linkedin ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground mt-1">Helps seekers learn more about you</p>
            <FieldError field="linkedin" />
          </div>

          {/* Review section */}
          <div className="border border-border rounded-2xl p-5 bg-card">
            <h2 className="text-sm font-semibold text-foreground mb-1">How seekers will see you</h2>
            <p className="text-xs text-muted-foreground mb-4">Here's a preview of your mentor profile</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="text-foreground font-medium">{form.name || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Title</span>
                <span className="text-foreground font-medium">{form.title || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role level</span>
                <span className="text-foreground font-medium">{form.roleLevel || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Industry</span>
                <span className="text-foreground font-medium">{form.industry || "—"}</span>
              </div>
              {form.topics.length > 0 && (
                <div>
                  <span className="text-muted-foreground block mb-1.5">Topics</span>
                  <div className="flex flex-wrap gap-1.5">
                    {form.topics.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span className="text-foreground font-medium">{form.availability || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max mentees</span>
                <span className="text-foreground font-medium">{form.maxMentees || "—"}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={back} variant="ghost" size="lg" className="flex-1">Back</Button>
            <Button onClick={save} size="lg" className="flex-1">Save profile →</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorPreferences;
