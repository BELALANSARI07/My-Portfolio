import { NextResponse } from 'next/server';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    // 1. Fetch GitHub Stats
    let githubData = {
      username: 'BELALANSARI07',
      public_repos: 10,
      followers: 2,
      following: 2,
      avatar_url: 'https://avatars.githubusercontent.com/u/144673673?v=4',
      repos: [] as Array<{ name: string; description: string | null; language: string | null; stars: number; url: string }>,
    };

    try {
      const [ghUser, ghRepos] = await Promise.all([
        fetch('https://api.github.com/users/BELALANSARI07', {
          headers: { 'User-Agent': 'BelalPortfolio/1.0' },
          next: { revalidate: 300 },
        }).then((r) => (r.ok ? r.json() : null)),
        fetch('https://api.github.com/users/BELALANSARI07/repos?sort=updated&per_page=6', {
          headers: { 'User-Agent': 'BelalPortfolio/1.0' },
          next: { revalidate: 300 },
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
    };

    try {
      const cfRes = await fetch('https://codeforces.com/api/user.info?handles=belal_ansari', {
        next: { revalidate: 300 },
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
        };
      }
    } catch (err) {
      console.warn('Codeforces fetch note:', err);
    }

    // 3. Fetch LeetCode Stats
    let leetcodeData = {
      username: 'Belal_Ansari',
      totalSolved: 12,
      easySolved: 8,
      mediumSolved: 4,
      hardSolved: 0,
      ranking: '5,000,000+',
      acceptanceRate: '68.5%',
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
            }
          }`,
          variables: { username: 'Belal_Ansari' },
        }),
        next: { revalidate: 300 },
      }).then((r) => r.json());

      if (lcRes.data?.matchedUser) {
        const stats = lcRes.data.matchedUser.submitStatsGlobal?.acSubmissionNum;
        if (Array.isArray(stats)) {
          const total = stats.find((s: any) => s.difficulty === 'All')?.count ?? 0;
          const easy = stats.find((s: any) => s.difficulty === 'Easy')?.count ?? 0;
          const medium = stats.find((s: any) => s.difficulty === 'Medium')?.count ?? 0;
          const hard = stats.find((s: any) => s.difficulty === 'Hard')?.count ?? 0;

          leetcodeData.totalSolved = Math.max(total, leetcodeData.totalSolved);
          leetcodeData.easySolved = Math.max(easy, leetcodeData.easySolved);
          leetcodeData.mediumSolved = Math.max(medium, leetcodeData.mediumSolved);
          leetcodeData.hardSolved = Math.max(hard, leetcodeData.hardSolved);
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
