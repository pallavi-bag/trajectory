const BrowseMentors = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">Browse mentors</h1>
      <p className="text-muted-foreground mb-8">Find the right match for your career goals.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { name: "Priya Sharma", role: "Senior PM at Stripe", focus: "Career transitions" },
          { name: "Lena Okafor", role: "Director of Product at Figma", focus: "Leadership" },
          { name: "Mei Chen", role: "Staff PM at Airbnb", focus: "Data-driven PM" },
          { name: "Rachel Torres", role: "VP Product at Notion", focus: "Scaling teams" },
        ].map((mentor) => (
          <div
            key={mentor.name}
            className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-coral-tint flex items-center justify-center text-primary font-semibold text-sm">
                {mentor.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{mentor.name}</p>
                <p className="text-muted-foreground text-xs">{mentor.role}</p>
              </div>
            </div>
            <span className="inline-block text-xs bg-coral-tint text-primary px-2 py-0.5 rounded-full font-medium">
              {mentor.focus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseMentors;
