// ═══════════════════════════════════════════════
//   VotePath — Static Data
// ═══════════════════════════════════════════════

window.STEPS = [
  {
    num: 1, icon: "✅", tag: "First Step",
    title: "Check Your Eligibility",
    body: "Before participating in any U.S. election you must be a U.S. citizen, at least 18 years old on or before Election Day, a resident of the state where you wish to vote, and not currently incarcerated for a felony (rules vary by state). Some states require party affiliation to vote in primaries. Checking eligibility early prevents surprises on Election Day."
  },
  {
    num: 2, icon: "📋", tag: "Registration",
    title: "Register to Vote",
    body: "Most states require registration 15–30 days before an election, though 20+ states offer same-day registration. Register online at vote.gov, by mail using the National Voter Registration Form, or in person at your local election office or DMV. You will need your name, address, date of birth, and a government ID number. Re-register if you move or change your name."
  },
  {
    num: 3, icon: "🗓️", tag: "Stay Informed",
    title: "Research Candidates & Issues",
    body: "Before Election Day, research candidates, ballot measures, and local races. Review candidate websites, attend town halls, read nonpartisan voter guides from your state's League of Women Voters, and check your sample ballot available from your county election office. Cross-check information with multiple credible sources and avoid relying solely on social media."
  },
  {
    num: 4, icon: "📬", tag: "Voting Options",
    title: "Choose How to Vote",
    body: "American voters have several ways to cast ballots. In-person voting on Election Day at your assigned polling place is traditional. Early in-person voting is available in most states, typically 1–3 weeks before Election Day. Vote by mail lets you request and return a ballot through the postal service — some states send ballots automatically. Check your state's rules and deadlines."
  },
  {
    num: 5, icon: "🗳️", tag: "Cast Your Vote",
    title: "Vote on Election Day",
    body: "Bring valid ID (requirements vary by state). Go to your assigned polling location — find it on your registration confirmation or county election website. You will check in, receive a ballot, make your selections privately, and submit. If you encounter problems such as long lines or ID issues, ask for assistance. You have the right to vote if you are in line before polls close."
  },
  {
    num: 6, icon: "🔢", tag: "Results",
    title: "Votes Are Counted",
    body: "After polls close, election officials count in-person ballots, mail-in ballots, and provisional ballots. States certify results anywhere from a few days to a few weeks after Election Day. Media project winners based on data, but official results come from certified state tallies. Recounts are possible when margins fall below state-defined thresholds."
  },
  {
    num: 7, icon: "🏛️", tag: "Certification",
    title: "Certification & Inauguration",
    body: "By mid-December, each state's winning electors meet to cast Electoral College votes. In early January, Congress convenes to count and certify Electoral College results. The winner is inaugurated as President on January 20th. For other offices, state and local certification timelines vary. Courts may hear election challenges and recounts can be requested within legal windows."
  }
];

window.TIMELINE = [
  { date: "January–June", title: "Primary Season", desc: "State primaries and caucuses determine each party's presidential nominee.", phase: "phase-primary", icon: "🗳️" },
  { date: "Spring", title: "Voter Registration Opens", desc: "States open online and mail-in registration portals for the general election.", phase: "phase-reg", icon: "📋" },
  { date: "Late Summer", title: "Party Conventions", desc: "Republicans and Democrats formally nominate their presidential candidates.", phase: "phase-campaign", icon: "🎪" },
  { date: "September–October", title: "Campaign Season Peaks", desc: "Presidential and congressional debates air; candidates campaign across the country.", phase: "phase-campaign", icon: "📣" },
  { date: "~30 Days Before", title: "Registration Deadlines", desc: "Most states require voter registration by this date. Check your state's exact deadline.", phase: "phase-reg", icon: "⏰" },
  { date: "2–3 Weeks Before", title: "Early Voting Begins", desc: "In-person early voting opens in most states, giving flexibility before Election Day.", phase: "phase-vote", icon: "📅" },
  { date: "First Tuesday in November", title: "Election Day", desc: "Polling locations open across the country. Most close by 7–8 PM local time.", phase: "phase-vote", icon: "⭐" },
  { date: "After Election Day", title: "Vote Counting", desc: "Networks project winners; official counts continue as all ballots are verified.", phase: "phase-cert", icon: "🔢" },
  { date: "Mid-December", title: "Electoral College Meets", desc: "Electors from each state cast their official presidential votes in state capitals.", phase: "phase-cert", icon: "🏛️" },
  { date: "Early January", title: "Congress Certifies", desc: "Joint session of Congress counts Electoral College votes and certifies the winner.", phase: "phase-cert", icon: "📜" },
  { date: "January 20th", title: "Inauguration Day", desc: "The newly elected President is sworn in and officially takes office.", phase: "phase-inaug", icon: "🎊" }
];

window.FAQS = [
  {
    q: "What is a provisional ballot and when do I need one?",
    a: "A provisional ballot is a safeguard for voters whose eligibility cannot be immediately verified at the polling place. You will receive one if your name does not appear on voter rolls, if you have recently moved, if you do not have required ID, or if records incorrectly show you already voted. The ballot is counted only after officials verify your eligibility — typically within a few days of Election Day. Always ask for a provisional ballot if you are turned away."
  },
  {
    q: "How does secret ballot work? Can anyone see how I voted?",
    a: "Your vote is kept entirely secret through a two-step process. First, your identity is verified and recorded so officials know you voted. Then your marked ballot is separated from any identifying information before it is counted. No official, candidate, or observer can connect your specific choices back to you. This anonymity is a fundamental pillar of democratic elections, protected by law in all 50 states."
  },
  {
    q: "What is voter suppression, and what should I do if I experience it?",
    a: "Voter suppression refers to efforts to discourage or prevent eligible voters from casting ballots — such as excessive ID requirements, reduced polling locations, misinformation about dates or locations, or intimidating behavior near polling places. If you experience suppression, document what happened, report it to your state election authority, and call the Election Protection hotline at 1-866-OUR-VOTE."
  },
  {
    q: "Can I vote if I do not have a photo ID?",
    a: "It depends on your state. About 35 states have voter ID laws, but requirements vary widely — some accept utility bills or bank statements, others require a specific government-issued photo ID. States with strict photo ID laws must provide free IDs to eligible voters who need them. If you lack required ID, you can often cast a provisional ballot and provide documentation later. Check vote.gov for your state's exact requirements."
  },
  {
    q: "What is the Electoral College and why does it exist?",
    a: "The Electoral College is the system used to elect the U.S. President. Each state gets electors equal to its congressional representation (senators plus House members), plus 3 for D.C., totaling 538 electors. A candidate needs 270 to win. Most states award all electors to whoever wins the state's popular vote. The framers created this system as a compromise between election by Congress and direct national popular vote."
  },
  {
    q: "How do I track my mail-in ballot after I send it?",
    a: "Most states offer ballot tracking tools — check your state election website or use USPS Informed Delivery at informeddelivery.usps.com. You can see when your ballot was received and accepted by officials. If there is a problem such as a missing signature, many states have a curing process to fix the issue before the deadline. Always mail your ballot at least one week before Election Day to be safe."
  }
];
