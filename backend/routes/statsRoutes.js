const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // 1. Fetch LeetCode Stats
        let leetcodeData = null;
        try {
            const leetcodeRes = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://leetcode.com/',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                body: JSON.stringify({
                    query: `
                        query userProblemsSolved($username: String!) {
                            allQuestionsCount {
                                difficulty
                                count
                            }
                            matchedUser(username: $username) {
                                submitStats {
                                    acSubmissionNum {
                                        difficulty
                                        count
                                        submissions
                                    }
                                }
                                profile {
                                    ranking
                                    reputation
                                }
                            }
                        }
                    `,
                    variables: { username: "Antony_136" }
                })
            });
            
            if (leetcodeRes.ok) {
                const rawData = await leetcodeRes.json();
                if (rawData.data && rawData.data.matchedUser) {
                    const submissions = rawData.data.matchedUser.submitStats.acSubmissionNum;
                    const questionsCount = rawData.data.allQuestionsCount;
                    
                    const getCount = (diff) => submissions.find(s => s.difficulty === diff)?.count || 0;
                    const getTotal = (diff) => questionsCount.find(q => q.difficulty === diff)?.count || 0;
                    
                    leetcodeData = {
                        totalSolved: getCount('All'),
                        totalQuestions: getTotal('All'),
                        easy: { solved: getCount('Easy'), total: getTotal('Easy') },
                        medium: { solved: getCount('Medium'), total: getTotal('Medium') },
                        hard: { solved: getCount('Hard'), total: getTotal('Hard') },
                        ranking: rawData.data.matchedUser.profile.ranking?.toLocaleString() || '124,532',
                        reputation: rawData.data.matchedUser.profile.reputation || 0
                    };
                }
            }
        } catch (err) {
            console.error('Error fetching LeetCode stats:', err.message);
        }

        // 2. Fetch GitHub Profile and Repos
        let githubData = {
            publicRepos: 24,
            stars: 18,
            totalCommits: '840+',
            pullRequests: 42,
            contributionsThisYear: 624,
            contributionGrid: []
        };

        try {
            const profileRes = await fetch('https://api.github.com/users/Antony136', {
                headers: { 'User-Agent': 'Portfolio-App' }
            });
            const reposRes = await fetch('https://api.github.com/users/Antony136/repos?per_page=100', {
                headers: { 'User-Agent': 'Portfolio-App' }
            });

            if (profileRes.ok && reposRes.ok) {
                const profile = await profileRes.json();
                const repos = await reposRes.json();
                
                const stars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
                githubData.publicRepos = profile.public_repos;
                githubData.stars = stars;
            }
        } catch (err) {
            console.error('Error fetching GitHub profile/repos:', err.message);
        }

        // 3. Fetch GitHub Pull Request Count via public Search API
        try {
            const prsRes = await fetch('https://api.github.com/search/issues?q=author:Antony136+type:pr', {
                headers: { 'User-Agent': 'Portfolio-App' }
            });
            if (prsRes.ok) {
                const prs = await prsRes.json();
                githubData.pullRequests = prs.total_count;
            }
        } catch (err) {
            console.error('Error fetching GitHub PR count:', err.message);
        }

        // 4. Fetch GitHub Contribution calendar and total commits/contributions
        try {
            const contributionsRes = await fetch('https://github-contributions-api.jogruber.de/v4/Antony136');
            if (contributionsRes.ok) {
                const data = await contributionsRes.json();
                
                // Sum up contributions from all years to get total commits/contributions
                if (data.total) {
                    const totalAllTime = Object.values(data.total).reduce((acc, curr) => acc + curr, 0);
                    githubData.totalCommits = `${totalAllTime}`;
                    
                    const currentYear = new Date().getFullYear();
                    githubData.contributionsThisYear = data.total[currentYear] || data.total[currentYear - 1] || 0;
                }
                
                // Extract contributions for 2025 and 2026
                if (data.contributions && Array.isArray(data.contributions)) {
                    const filtered = data.contributions.filter(day => 
                        day.date.startsWith('2025') || day.date.startsWith('2026')
                    );
                    githubData.contributionGrid = filtered.map(day => ({
                        count: day.count,
                        level: day.level,
                        date: day.date
                    }));
                }
            }
        } catch (err) {
            console.error('Error fetching GitHub contributions from Gruber API:', err.message);
        }

        res.json({
            success: true,
            leetcode: leetcodeData,
            github: githubData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error aggregating stats',
            error: error.message
        });
    }
});

module.exports = router;
