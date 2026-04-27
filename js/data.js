/* ═══════════════════════════════════════════════
   VotePath — Static Data
   ═══════════════════════════════════════════════ */

const STEPS = [
    {
        num: 1, icon: "✅", tag: "First Step",
        title: "Check Eligibility",
        body: `Before you can participate in any U.S. election, you must meet basic eligibility requirements. You must be a U.S. citizen, at least 18 years old on or before Election Day, a resident of the state in which you wish to vote, and not currently incarcerated for a felony (rules vary by state). Some states also require you to declare a party affiliation when registering if you want to vote in primary elections. Verifying your eligibility early ensures no surprises on Election Day.`
    },
    {
        num: 2, icon: "📋", tag: "Registration",
        title: "Register to Vote",
        body: `Voter registration is the process of officially signing up to vote. Most states require registration at least 15–30 days before an election, though 20+ states now offer same-day registration. You can register online at vote.gov, by mail using the National Voter Registration Form, or in person at your local election office or DMV. You'll need to provide your name, address, date of birth, and government ID number. Remember to re-register if you move, change your name, or change party affiliation.`
    },
    {
        num: 3, icon: "🗓️", tag: "Stay Informed",
        title: "Learn the Candidates & Issues",
        body: `Before Election Day, take time to research candidates, ballot measures, and local races. Review candidate websites, attend town halls, read nonpartisan voter guides (such as those from your state's League of Women Voters chapter), and check your sample ballot — available from your county election office. Understanding every race on your ballot, from president to school board, helps you make fully informed choices. Avoid relying solely on social media, and cross-check information with multiple credible sources.`
    },
    {
        num: 4, icon: "📬", tag: "Voting Options",
        title: "Choose How to Vote",
        body: `American voters have several ways to cast their ballots. In-person voting on Election Day at your assigned polling place is the most traditional method. Early in-person voting is available in most states, typically 1–3 weeks before Election Day — great for avoiding long lines. Vote by mail (absentee ballots) allows you to request and return a ballot through the postal service; some states send ballots automatically. Check your state's specific rules and deadlines for each method, as they vary considerably.`
    },
    {
        num: 5, icon: "🗳️", tag: "Cast Your Vote",
        title: "Vote on Election Day",
        body: `Bring valid ID (requirements vary by state — check yours at vote.gov). Go to your assigned polling location — you can find it on your registration confirmation or at your county election website. You'll check in, receive a ballot, make your selections privately, and then submit your ballot. If you encounter problems — long lines, ID issues, a broken machine — ask for assistance. You have the right to vote if you're in line before the polls close. Poll workers are there to help, and nonpartisan observers may be present.`
    },
    {
        num: 6, icon: "🔢", tag: "Results",
        title: "Votes Are Counted",
        body: `After polls close, election officials count ballots. This process includes in-person ballots counted at polling locations or central facilities, mail-in ballots (which in some states can be processed before Election Day), and provisional ballots — given to voters whose eligibility is questioned, which are counted only after verification. States certify their results anywhere from a few days to a few weeks after Election Day. Major media call races based on projections; official results come from certified state tallies, not media calls.`
    },
    {
        num: 7, icon: "🏛️", tag: "Certification",
        title: "Certification & Inauguration",
        body: `Presidential election results follow a specific constitutional path. By mid-December, each state's winning electors meet in their state capital to cast Electoral College votes. In early January, Congress convenes in joint session to count and certify the Electoral College results. The winner is inaugurated as President on January 20th. For other offices, state and local certification timelines vary. Recounts can be requested if the margin falls below a threshold specified in state law, and courts may hear election challenges.`
    }
];

const TIMELINE = [
    { date: "January–June (Election Year)", title: "Primary Season Begins", desc: "State primaries and caucuses determine each party's presidential nominee.", phase: "phase-primary", icon: "🗳️" },
    { date: "Spring", title: "Voter Registration Opens", desc: "States open online and mail-in registration portals for the general election.", phase: "phase-reg", icon: "📋" },
    { date: "Late Summer", title: "Party Conventions", desc: "Republicans and Democrats formally nominate their presidential candidates.", phase: "phase-campaign", icon: "🎪" },
    { date: "September–October", title: "Campaign Season Peaks", desc: "Presidential and congressional debates air; candidates campaign in swing states.", phase: "phase-campaign", icon: "📣" },
    { date: "~30 Days Before Election", title: "Registration Deadlines", desc: "Most states require voter registration by this date. Check your state's exact deadline.", phase: "phase-reg", icon: "⏰" },
    { date: "2–3 Weeks Before Election", title: "Early Voting Begins", desc: "In-person early voting opens in most states, giving flexibility before Election Day.", phase: "phase-vote", icon: "📅" },
    { date: "First Tuesday in November", title: "Election Day 🗳️", desc: "Polling locations open across the country. Most close by 7–8 PM local time.", phase: "phase-vote", icon: "⭐" },
    { date: "November (After Election)", title: "Vote Counting & Projection", desc: "Networks project winners; official counts continue for days as all ballots are verified.", phase: "phase-cert", icon: "🔢" },
    { date: "Mid-December", title: "Electoral College Meets", desc: "Electors from each state cast their official presidential votes in their state capitals.", phase: "phase-cert", icon: "🏛️" },
    { date: "Early January", title: "Congress Certifies Results", desc: "Joint session of Congress counts Electoral College votes and certifies the winner.", phase: "phase-cert", icon: "📜" },
    { date: "January 20th", title: "Inauguration Day", desc: "The newly elected President is sworn in and officially takes office.", phase: "phase-inaug", icon: "🎉" }
];

const FAQS = [
    {
        q: "What is a provisional ballot and when do I need one?",
        a: "A provisional ballot is a safeguard for voters whose eligibility cannot be immediately verified at the polling place. You'll be given one if your name doesn't appear on the voter rolls, if you've recently moved, if you don't have the required ID, or if records show you already voted (which can happen due to clerical errors). After voting, the ballot is sealed and counted only after election officials verify your eligibility — typically within a few days of Election Day. Always ask for a provisional ballot if you're turned away."
    },
    {
        q: "How does secret ballot work? Can anyone see how I voted?",
        a: "Your vote is kept entirely secret through a two-step process. First, your identity is verified and recorded (so officials know you voted, preventing double voting). Then your marked ballot is separated from any identifying information before it's counted. No official, candidate, or observer can connect your specific choices back to you. This anonymity is a fundamental pillar of democratic elections and is protected by law in all 50 states."
    },
    {
        q: "What is voter suppression, and what should I do if I experience it?",
        a: "Voter suppression refers to efforts to discourage or prevent eligible voters from casting ballots. Examples include excessive ID requirements, reduced polling locations in certain communities, misinformation about dates or locations, or intimidating behavior near polling places. If you experience or witness suppression, document what happened, report it to your state's election authority, call the Election Protection hotline (1-866-OUR-VOTE), or contact the U.S. Department of Justice's Voting Section."
    },
    {
        q: "Can I vote if I don't have a photo ID?",
        a: "It depends on your state. About 35 states have some form of voter ID law, but requirements vary widely. Some states accept a wide range of documents (utility bills, bank statements, student ID). Others require a specific government-issued photo ID. States with strict photo ID laws must provide free IDs to eligible voters who need them. If you lack the required ID, you can often cast a provisional ballot and follow up afterward. Check vote.gov for your state's exact requirements."
    },
    {
        q: "What is the Electoral College and why does it exist?",
        a: "The Electoral College is the system used to elect the U.S. President. Each state is allocated electors equal to its total congressional representation (senators + representatives), plus 3 for D.C. — totaling 538. A candidate needs 270 electoral votes to win. Most states award all their electors to whoever wins the popular vote in that state (winner-take-all), though Maine and Nebraska use a proportional system. The framers created this system as a compromise between election by Congress and direct popular vote, reflecting the federal structure of the U.S."
    },
    {
        q: "How do I track my mail-in ballot after I send it?",
        a: "Most states offer ballot tracking tools — check your state election website or use the USPS Informed Delivery service (informeddelivery.usps.com). You'll typically be able to see when your ballot was received by election officials and when it was accepted. If there's a problem with your ballot (such as a missing signature), many states have a 'curing' process that allows you to fix the issue before the deadline. Always mail your ballot early — aim for at least one week before Election Day."
    }
];

// Quiz data moved to quiz.js for modularity