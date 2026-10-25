import { NextResponse } from 'next/server';

export const revalidate = 120; // 2 minutes cache

export async function GET() {
  try {
    // 1. Fetch GitHub Stats
    let githubData = {
      username: 'BELALANSARI07',
      public_repos: 10,
      followers: 2,
      following: 2,
      avatar_url: 'https://avatars.githubusercontent.com/u/144673673?v=4',
      profile_url: 'https://github.com/BELALANSARI07',
      repos: [] as Array<{ name: string; description: string | null; language: string | null; stars: number; url: string }>,
    };

    try {
      const [ghUser, ghRepos] = await Promise.all([
        fetch('https://api.github.com/users/BELALANSARI07', {
          headers: { 'User-Agent': 'BelalPortfolio/1.0' },
          next: { revalidate: 120 },
        }).then((r) => (r.ok ? r.json() : null)),
        fetch('https://api.github.com/users/BELALANSARI07/repos?sort=updated&per_page=6', {
          headers: { 'User-Agent': 'BelalPortfolio/1.0' },
          next: { revalidate: 120 },
        }).then((r) => (r.ok ? r.json() : [])),
      ]);

      if (ghUser) {
        githubData.public_repos = ghUser.public_repos ?? 10;
        githubData.followers = ghUser.followers ?? 2;
        githubData.following = ghUser.following ?? 2;
        githubData.avatar_url = ghUser.avatar_url || githubData.avatar_url;
      }

      if (Array.isArray(ghRepos)) {
        githubData.repos = ghRepos.map((r: any) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count,
          url: r.html_url,
        }));
      }
    } catch (err) {
      console.warn('GitHub fetch note:', err);
    }

    // 2. Fetch Codeforces Stats
    let codeforcesData = {
      handle: 'Belal_Ansari',
      rating: 401,
      maxRating: 401,
      rank: 'newbie',
      maxRank: 'newbie',
      avatar: 'https://userpic.codeforces.org/5699619/avatar/9d10d40ee89f8073.jpg',
      contribution: 0,
      profile_url: 'https://codeforces.com/profile/Belal_Ansari',
    };

    try {
      const cfRes = await fetch('https://codeforces.com/api/user.info?handles=Belal_Ansari', {
        next: { revalidate: 120 },
      }).then((r) => r.json());

      if (cfRes.status === 'OK' && cfRes.result?.[0]) {
        const u = cfRes.result[0];
        codeforcesData = {
          handle: u.handle,
          rating: u.rating ?? 401,
          maxRating: u.maxRating ?? 401,
          rank: u.rank ?? 'newbie',
          maxRank: u.maxRank ?? 'newbie',
          avatar: u.avatar || codeforcesData.avatar,
          contribution: u.contribution ?? 0,
          profile_url: `https://codeforces.com/profile/${u.handle}`,
        };
      }
    } catch (err) {
      console.warn('Codeforces fetch note:', err);
    }

    // 3. Fetch LeetCode Stats for Belal_Ansari07
    let leetcodeData = {
      username: 'Belal_Ansari07',
      totalSolved: 28,
      easySolved: 17,
      mediumSolved: 11,
      hardSolved: 0,
      ranking: '3,888,703',
      profile_url: 'https://leetcode.com/u/Belal_Ansari07/',
      calendar: {} as Record<string, number>,
    };

    try {
      const lcRes = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
        body: JSON.stringify({
          query: `query userProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile { ranking }
              submitStatsGlobal {
                acSubmissionNum { difficulty count }
              }
              submissionCalendar
            }
          }`,
          variables: { username: 'Belal_Ansari07' },
        }),
        next: { revalidate: 120 },
      }).then((r) => r.json());

      if (lcRes.data?.matchedUser) {
        const stats = lcRes.data.matchedUser.submitStatsGlobal?.acSubmissionNum;
        if (Array.isArray(stats)) {
          const total = stats.find((s: any) => s.difficulty === 'All')?.count ?? 28;
          const easy = stats.find((s: any) => s.difficulty === 'Easy')?.count ?? 17;
          const medium = stats.find((s: any) => s.difficulty === 'Medium')?.count ?? 11;
          const hard = stats.find((s: any) => s.difficulty === 'Hard')?.count ?? 0;

          leetcodeData.totalSolved = total;
          leetcodeData.easySolved = easy;
          leetcodeData.mediumSolved = medium;
          leetcodeData.hardSolved = hard;
        }

        if (lcRes.data.matchedUser.profile?.ranking) {
          leetcodeData.ranking = Number(lcRes.data.matchedUser.profile.ranking).toLocaleString();
        }

        if (lcRes.data.matchedUser.submissionCalendar) {
          try {
            leetcodeData.calendar = JSON.parse(lcRes.data.matchedUser.submissionCalendar);
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn('LeetCode fetch note:', err);
    }

    return NextResponse.json({
      success: true,
      github: githubData,
      codeforces: codeforcesData,
      leetcode: leetcodeData,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to aggregate coding telemetry' },
      { status: 500 }
    );
  }
}
