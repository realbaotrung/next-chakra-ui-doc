import { config } from 'dotenv'
import { Octokit } from 'octokit'
import fs from 'fs';

/**
 * Purpose:
 * - Build file '.all-membersrc' at root folder
 *
 * Run command:
 * - pnpm members:gen
 */

// setup env variables
config();
// setup octokit for github api
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
// filename
const FILE_NAME = '.all-membersrc'

function sortMembers(a: any, b: any) {
  // segun comes first
  if (a.login === 'segunadebayo') return -1;
  if (a.login === 'segunadebayo') return 1;

  // everything else is alphabetical by login
  return a.login.localeCompare(b.login, 'en')
}

async function getMembers() {
  // get all core members of chakra-ui organization
  const { data: members } = await octokit.rest.orgs.listMembers({ org: 'chakra-ui' });

  const membersData = await Promise.all(
    members.map(async ( member ) => {
      if (!member) {
        return null
      }

      const { data } = await octokit.rest.users.getByUsername({ username: member.login })

      const doMemberHaveBlogs = (data.blog as string).length > 0 && !(data.blog as string).startsWith('http');
      if (doMemberHaveBlogs) {
        data.blog = `http://${data.blog}`
      }

    //   {
    //     "login": "segunadebayo",
    //     "id": 6916170,
    //     "node_id": "MDQ6VXNlcjY5MTYxNzA=",
    //     "avatar_url": "https://avatars.githubusercontent.com/u/6916170?v=4",
    //     "gravatar_id": "",
    //     "url": "https://api.github.com/users/segunadebayo",
    //     "html_url": "https://github.com/segunadebayo",
    //     "followers_url": "https://api.github.com/users/segunadebayo/followers",
    //     "following_url": "https://api.github.com/users/segunadebayo/following{/other_user}",
    //     "gists_url": "https://api.github.com/users/segunadebayo/gists{/gist_id}",
    //     "starred_url": "https://api.github.com/users/segunadebayo/starred{/owner}{/repo}",
    //     "subscriptions_url": "https://api.github.com/users/segunadebayo/subscriptions",
    //     "organizations_url": "https://api.github.com/users/segunadebayo/orgs",
    //     "repos_url": "https://api.github.com/users/segunadebayo/repos",
    //     "events_url": "https://api.github.com/users/segunadebayo/events{/privacy}",
    //     "received_events_url": "https://api.github.com/users/segunadebayo/received_events",
    //     "type": "User",
    //     "site_admin": false
    // }

      return {
        login: data.login,
        avatar_url: data.avatar_url,
        url: data.html_url,
        blog: data.blog,
        name: data.name,
        bio: data.bio,
        twitter_username: data.twitter_username,
        location: data.location,
      }
    })
  )

  const result = {
    // filtering not null members
    members: membersData.filter(Boolean).sort(sortMembers)
  }

  // after get list of information of all users, write it into file
  fs.writeFileSync(FILE_NAME, JSON.stringify(result, null, 2))
}

try {
  getMembers()
} catch (error) {
  console.log(error)
}
