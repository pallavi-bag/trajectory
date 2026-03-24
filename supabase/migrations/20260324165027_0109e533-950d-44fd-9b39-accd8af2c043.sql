CREATE TABLE public.mentors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  seniority_label TEXT NOT NULL,
  seniority_level INTEGER NOT NULL,
  industry TEXT NOT NULL,
  availability TEXT NOT NULL,
  topics TEXT[] NOT NULL,
  bio TEXT DEFAULT '',
  superpower TEXT NOT NULL,
  linkedin TEXT DEFAULT '',
  transition_note TEXT DEFAULT '',
  created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT),
  open_to_mentoring BOOLEAN DEFAULT TRUE,
  max_mentees TEXT DEFAULT '',
  role_level TEXT DEFAULT ''
);

ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read mentors" ON public.mentors
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert mentors" ON public.mentors
  FOR INSERT WITH CHECK (true);

INSERT INTO public.mentors (id, name, title, seniority_label, seniority_level, industry, availability, topics, bio, superpower, linkedin, transition_note, created_at, open_to_mentoring) VALUES
('riya-kapoor', 'Riya Kapoor', 'Senior PM', 'Senior PM · IC3', 3, 'Fintech', '1–2/month', ARRAY['Career transition','Interview prep','FAANG / big tech'], '7 yrs in Fintech, moved from IC to manager at a Series B startup.', 'Making career pivots less scary.', 'https://linkedin.com/in/', 'moved from IC3 to Manager at a Series B fintech startup', 1710000001, true),
('maya-johnson', 'Maya Johnson', 'Group PM', 'Group PM · IC4', 4, 'B2B SaaS', 'Weekly', ARRAY['Leadership development','Stakeholder management','Roadmap strategy'], 'Led cross-functional product teams of 30+ across three business units. Passionate about growing the next generation of PM leaders.', 'Turning messy stakeholder dynamics into clear roadmaps.', 'https://linkedin.com/in/', 'grew from IC PM to managing a team of 8 PMs across 3 product lines', 1710000002, true),
('sara-lin', 'Sara Lin', 'PM', 'PM · IC2', 2, 'Health Tech', 'As needed', ARRAY['Interview prep','Career transition','Work-life balance'], 'Broke into PM from a non-traditional background. Now building patient-facing products at a digital health startup.', 'Helping underrepresented candidates break into PM.', 'https://linkedin.com/in/', 'transitioned into PM from a non-traditional background with no CS degree', 1710000003, true),
('priya-nair', 'Priya Nair', 'Director of Product', 'Director · Dir+', 6, 'Consumer / E-commerce', 'Async only', ARRAY['Salary negotiation','Promotion strategy','Leadership development'], '15 years in consumer product. Two-time Director. Known for negotiation coaching.', 'Helping PMs get paid what they''re worth.', 'https://linkedin.com/in/', 'went from Senior PM to Director twice at two different consumer companies', 1710000004, true),
('anika-patel', 'Anika Patel', 'Principal PM', 'Principal PM · IC5', 5, 'Enterprise SaaS', '1–2/month', ARRAY['Building in public','Roadmap strategy','Entrepreneurship / founding'], 'Currently advising early-stage founders on product-market fit.', 'Translating vision into execution.', 'https://linkedin.com/in/', 'moved from IC5 at a public company to advising 3 early-stage startups', 1710000005, true);