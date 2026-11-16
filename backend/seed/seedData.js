// Source material for the synthetic seed data. The seed script combines
// these lists with random dates and statuses, and combines the base
// questions with random companies, roles, rounds, and dates to produce
// 1,000+ question documents. All of this data is synthetic.

export const COMPANIES = [
  "Wayfair",
  "HubSpot",
  "Amazon",
  "Google",
  "Microsoft",
  "Fidelity Investments",
  "State Street",
  "Liberty Mutual",
  "Toast",
  "DraftKings",
  "Klaviyo",
  "MathWorks",
  "Bose",
  "Akamai",
  "Vertex Pharmaceuticals",
  "Moderna",
  "Dell Technologies",
  "Red Hat",
  "Salesforce",
  "Datadog",
  "Rapid7",
  "CarGurus",
  "Chewy",
  "Boston Scientific",
  "iRobot",
  "Pegasystems",
  "athenahealth",
  "Capital One",
  "JPMorgan Chase",
  "Bloomberg",
  "NVIDIA",
  "Intuit",
  "Adobe",
  "IBM",
  "Raytheon",
  "Analog Devices",
  "Philips",
  "Takeda",
  "Mass General Brigham",
  "Rocket Software",
];

export const ROLES = [
  "Software Engineer Co-op",
  "Full Stack Developer Co-op",
  "Backend Engineer Co-op",
  "Frontend Engineer Co-op",
  "Data Engineer Co-op",
  "Machine Learning Co-op",
  "Data Analyst Co-op",
  "QA Automation Co-op",
  "DevOps Engineer Co-op",
  "Mobile Developer Co-op",
];

export const CONTRIBUTORS = [
  { username: "arun", displayName: "Arun Prakash" },
  { username: "kavya", displayName: "Kavya Reddy" },
  { username: "daniel", displayName: "Daniel Brooks" },
  { username: "meera.s", displayName: "Meera Shah" },
  { username: "tom.nguyen", displayName: "Tom Nguyen" },
  { username: "sofia.r", displayName: "Sofia Ramirez" },
  { username: "li.wei", displayName: "Li Wei" },
  { username: "priya.k", displayName: "Priya Krishnan" },
  { username: "jordan.m", displayName: "Jordan Miller" },
  { username: "aisha.b", displayName: "Aisha Bello" },
];

export const APPLICATION_NOTES = [
  "Applied through NUworks.",
  "Referral from a former co-op.",
  "Recruiter reached out on LinkedIn.",
  "Met the team at the career fair.",
  "Online assessment sent, due in 5 days.",
  "Phone screen scheduled with the hiring manager.",
  "Asked about my capstone project in the first call.",
  "Team works mostly in TypeScript and AWS.",
  "Follow up if no reply in two weeks.",
  "Hybrid role, 3 days a week in Boston.",
  "Remote-friendly team.",
  "Need to send transcript to the recruiter.",
  "",
  "",
];

// [question, preparation notes, typical difficulty]
export const BASE_QUESTIONS = {
  "Arrays & Strings": [
    [
      "Given an array of integers and a target, return the indices of the two numbers that add up to the target.",
      "Start with the brute-force O(n^2) answer, then improve it with a hash map from value to index for O(n). Ask whether there is always exactly one answer.",
      "Easy",
    ],
    [
      "Find the length of the longest substring without repeating characters.",
      "Classic sliding window. Keep a map of each character's last index and move the left pointer past repeats. Walk through 'abcabcbb' out loud.",
      "Medium",
    ],
    [
      "Group a list of words into sets of anagrams.",
      "Use the sorted word, or a 26-letter count, as the map key. Mention the time cost of sorting each word versus counting.",
      "Medium",
    ],
    [
      "Merge all overlapping intervals in a list of [start, end] pairs.",
      "Sort by start time, then extend the last merged interval or push a new one. Clarify whether touching intervals like [1,2] and [2,3] merge.",
      "Medium",
    ],
    [
      "Return an array where each element is the product of all other elements, without using division.",
      "Two passes: prefix products from the left, suffix products from the right. Interviewers often ask for O(1) extra space besides the output.",
      "Medium",
    ],
    [
      "Check whether a string is a palindrome, ignoring case and non-alphanumeric characters.",
      "Two pointers from both ends that skip non-alphanumeric characters. A good warm-up: write clean code and test with an empty string.",
      "Easy",
    ],
    [
      "Find the minimum window substring of S that contains every character of T.",
      "Sliding window with a need/have count. Expand right until valid, then shrink left. Practice this one; it is easy to get off-by-one errors.",
      "Hard",
    ],
    [
      "Rotate an n x n matrix 90 degrees clockwise in place.",
      "Transpose, then reverse each row. Draw a 3x3 example before coding.",
      "Medium",
    ],
    [
      "Find the maximum sum of a contiguous subarray.",
      "Kadane's algorithm. Be ready to also return the start and end indices, and handle an all-negative array.",
      "Easy",
    ],
    [
      "Given a list of stock prices by day, find the best single buy and sell profit.",
      "Track the minimum price so far and the best profit. Follow-up asked: what if you can make unlimited transactions?",
      "Easy",
    ],
    [
      "Compress a string like 'aaabbc' into 'a3b2c1', returning the original if the result is not shorter.",
      "Simple iteration, but they watched how I built the output string. Use an array and join instead of repeated concatenation.",
      "Easy",
    ],
    [
      "Find all unique triplets in an array that sum to zero.",
      "Sort first, then fix one number and use two pointers. Skipping duplicates correctly is what they were really testing.",
      "Medium",
    ],
    [
      "Rotate an array to the right by k steps in place.",
      "Reverse the whole array, then reverse the first k and the rest. Remember k can be larger than the length, so take k modulo n first.",
      "Medium",
    ],
    [
      "Move all zeros in an array to the end while keeping the order of the other elements.",
      "Two pointers: one scans, one marks where the next non-zero goes. They wanted it in place with no extra array.",
      "Easy",
    ],
    [
      "Check whether one string is a permutation of another.",
      "Compare character counts with a 26-slot array or a map. Clarify case sensitivity and whether spaces count.",
      "Easy",
    ],
    [
      "Return the longest common prefix of a list of strings.",
      "Compare character by character across all strings, or sort and compare only the first and last. Handle an empty list.",
      "Easy",
    ],
    [
      "Given a matrix, return its elements in spiral order.",
      "Track top, bottom, left and right bounds and shrink them after each side. Test with a single row and a single column.",
      "Medium",
    ],
    [
      "Find the first non-repeating character in a string.",
      "Count characters in one pass, then scan again for the first count of one. Discussed what changes for a stream of characters.",
      "Easy",
    ],
    [
      "Find the container that holds the most water, given an array of wall heights.",
      "Two pointers from both ends, always moving the shorter wall inward. Explain why moving the taller wall can never help.",
      "Medium",
    ],
    [
      "Find the kth largest element in an unsorted array.",
      "A min-heap of size k gives O(n log k). They also asked about quickselect and its average O(n).",
      "Medium",
    ],
    [
      "Given a sorted array that was rotated, search for a target value in O(log n).",
      "Binary search, but first decide which half is sorted and whether the target falls inside it.",
      "Medium",
    ],
    [
      "Count how many subarrays sum to exactly k.",
      "Prefix sums with a map of how often each sum has appeared. Negative numbers are why sliding window does not work here.",
      "Medium",
    ],
  ],
  "Linked Lists": [
    [
      "Reverse a singly linked list, iteratively and recursively.",
      "Know both versions cold. Draw the prev/curr/next pointers for three nodes.",
      "Easy",
    ],
    [
      "Detect whether a linked list has a cycle, and return the node where the cycle starts.",
      "Floyd's tortoise and hare. Be ready to explain why resetting one pointer to the head finds the cycle start.",
      "Medium",
    ],
    [
      "Merge two sorted linked lists into one sorted list.",
      "Use a dummy head node to avoid special cases. Follow-up: merge k sorted lists with a min-heap.",
      "Easy",
    ],
    [
      "Remove the nth node from the end of a linked list in one pass.",
      "Move a fast pointer n steps ahead, then move both. Dummy node handles removing the head.",
      "Medium",
    ],
    [
      "Design an LRU cache with O(1) get and put.",
      "Hash map plus a doubly linked list. They asked me to code the full class, including eviction. Very common at Boston-area companies.",
      "Medium",
    ],
    [
      "Add two numbers represented as linked lists with digits in reverse order.",
      "Walk both lists with a carry. Remember the final carry node.",
      "Medium",
    ],
    [
      "Check whether a linked list is a palindrome using O(1) extra space.",
      "Find the middle, reverse the second half, compare, then restore the list if asked.",
      "Medium",
    ],
    [
      "Copy a linked list where each node also has a random pointer.",
      "Either a hash map from old to new nodes, or interleave copies in the original list. Explain the trade-off.",
      "Hard",
    ],
    [
      "Reverse nodes of a linked list in groups of k.",
      "Count k nodes ahead before reversing. Getting the reconnection right is the hard part, so trace it on paper.",
      "Hard",
    ],
    [
      "Find the intersection node of two singly linked lists.",
      "Two pointers that switch to the other list's head when they reach the end meet at the intersection.",
      "Easy",
    ],
    [
      "Reorder a list L0, L1, ..., Ln into L0, Ln, L1, Ln-1, and so on.",
      "Split at the middle, reverse the second half, then weave the two halves together. Three helper steps keep the code readable.",
      "Medium",
    ],
    [
      "Merge k sorted linked lists.",
      "A min-heap of the current heads gives O(n log k). They also asked about merging pairs in rounds.",
      "Hard",
    ],
    [
      "Remove duplicates from a sorted linked list.",
      "One pointer is enough: skip the next node while it has the same value. A good warm-up question.",
      "Easy",
    ],
    [
      "Find the middle node of a linked list in one pass.",
      "Slow and fast pointers. Clarify which node to return when the list has an even length.",
      "Easy",
    ],
    [
      "Partition a linked list so all nodes less than x come before nodes greater than or equal to x.",
      "Build two lists with dummy heads and join them at the end. Keep the original relative order.",
      "Medium",
    ],
    [
      "Sort a linked list in O(n log n) time.",
      "Merge sort fits linked lists well: split with slow and fast pointers, sort each half, merge.",
      "Medium",
    ],
    [
      "Rotate a linked list to the right by k places.",
      "Find the length and the tail, connect the tail to the head, then break the ring at the right spot. Use k modulo length.",
      "Medium",
    ],
    [
      "Swap every two adjacent nodes in a linked list.",
      "A dummy head and careful pointer updates. Draw the three pointers before writing code.",
      "Medium",
    ],
    [
      "Remove all nodes with a given value from a linked list.",
      "A dummy head avoids a special case when the head itself must be removed.",
      "Easy",
    ],
    [
      "Flatten a multilevel doubly linked list where nodes can have child lists.",
      "Depth-first: when a node has a child, splice the child list in and continue. A stack works for an iterative version.",
      "Medium",
    ],
  ],
  "Trees & Graphs": [
    [
      "Return the level-order traversal of a binary tree.",
      "BFS with a queue, processing one level at a time by reading the queue length first.",
      "Easy",
    ],
    [
      "Check whether a binary tree is a valid binary search tree.",
      "Pass min and max bounds down the recursion. Comparing only with direct children is the common wrong answer.",
      "Medium",
    ],
    [
      "Count the number of islands in a 2D grid of '1's and '0's.",
      "DFS or BFS flood fill from each unvisited land cell. Mention union-find as an alternative.",
      "Medium",
    ],
    [
      "Given course prerequisites, determine whether all courses can be finished.",
      "Cycle detection in a directed graph: topological sort with Kahn's algorithm or DFS with three colors.",
      "Medium",
    ],
    [
      "Find the lowest common ancestor of two nodes in a binary tree.",
      "Recursive: return the node if it matches, and the current node if both sides return something.",
      "Medium",
    ],
    [
      "Serialize and deserialize a binary tree.",
      "Preorder with null markers is simplest. They asked how I would handle very deep trees.",
      "Hard",
    ],
    [
      "Find the shortest path in an unweighted grid from the top-left to the bottom-right corner.",
      "BFS gives shortest paths in unweighted graphs. Track visited cells to avoid loops.",
      "Medium",
    ],
    [
      "Return the maximum depth of a binary tree.",
      "One-line recursion, but they then asked for the iterative version with a stack.",
      "Easy",
    ],
    [
      "Find the cheapest flight price from a source to a destination with at most k stops.",
      "Bellman-Ford limited to k+1 rounds, or BFS by stops. Dijkstra needs care because of the stop limit.",
      "Hard",
    ],
    [
      "Clone an undirected graph.",
      "DFS or BFS with a map from original nodes to clones.",
      "Medium",
    ],
    [
      "Return the right side view of a binary tree.",
      "Level-order traversal, keeping the last node of each level.",
      "Medium",
    ],
    [
      "Find the kth smallest element in a binary search tree.",
      "In-order traversal visits nodes in sorted order; stop at the kth. Follow-up: what if the tree is modified often?",
      "Medium",
    ],
    [
      "Check whether a binary tree is balanced.",
      "Post-order recursion that returns the height, or -1 as soon as a subtree is unbalanced, so each node is visited once.",
      "Easy",
    ],
    [
      "Count the connected components in an undirected graph.",
      "Depth-first search from every unvisited node, or union-find. They wanted me to compare the two.",
      "Medium",
    ],
    [
      "Detect whether a directed graph has a cycle.",
      "Depth-first search with three colors: unvisited, in progress, done. Reaching an in-progress node means a cycle.",
      "Medium",
    ],
    [
      "Find the diameter of a binary tree.",
      "At each node, the longest path through it is left height plus right height. Track the best value while computing heights.",
      "Easy",
    ],
    [
      "Invert a binary tree.",
      "Swap the left and right children at every node, recursively or with a queue. A quick warm-up question.",
      "Easy",
    ],
    [
      "Build a binary tree from its preorder and inorder traversals.",
      "The first preorder value is the root; its position in inorder splits the left and right subtrees. A map of inorder positions avoids repeated searching.",
      "Medium",
    ],
    [
      "Find the number of steps for a word ladder from a start word to an end word.",
      "Breadth-first search where neighbors differ by one letter. Generating patterns like h*t speeds up finding neighbors.",
      "Hard",
    ],
    [
      "Check whether one binary tree is a subtree of another.",
      "Compare trees at every node, or serialize both and search for one string in the other.",
      "Easy",
    ],
    [
      "Find the shortest path between two cities in a weighted road network.",
      "Dijkstra's algorithm with a priority queue. Explained why it fails with negative weights.",
      "Medium",
    ],
    [
      "Return all root-to-leaf paths in a binary tree whose values add up to a target.",
      "Depth-first search with a running path and sum, and backtracking after each child.",
      "Medium",
    ],
  ],
  "Dynamic Programming": [
    [
      "Count the distinct ways to climb n stairs taking 1 or 2 steps at a time.",
      "Fibonacci-style recurrence. Show the memoized version, then the O(1) space version.",
      "Easy",
    ],
    [
      "Find the minimum number of coins needed to make a given amount.",
      "Bottom-up DP array of size amount+1. Explain why greedy fails for coins like [1, 3, 4].",
      "Medium",
    ],
    [
      "Find the length of the longest increasing subsequence.",
      "O(n^2) DP first, then the O(n log n) patience-sorting approach if time allows.",
      "Medium",
    ],
    [
      "Compute the edit distance between two words.",
      "2D DP table over prefixes. Fill in a small table by hand for 'horse' and 'ros'.",
      "Hard",
    ],
    [
      "Decide whether a string can be segmented into words from a dictionary.",
      "dp[i] is true if some dp[j] is true and s[j:i] is a word. Use a set for the dictionary.",
      "Medium",
    ],
    [
      "Find the maximum amount you can rob from houses in a row without robbing two neighbors.",
      "dp[i] = max(dp[i-1], dp[i-2] + value). Follow-up was the circular street version.",
      "Medium",
    ],
    [
      "Count the unique paths from the top-left to the bottom-right of an m x n grid.",
      "Grid DP, or combinatorics with n choose k. They asked about obstacles as a follow-up.",
      "Easy",
    ],
    [
      "Find the longest common subsequence of two strings.",
      "Standard 2D DP. Be ready to reconstruct the subsequence itself, not just its length.",
      "Medium",
    ],
    [
      "Solve the 0/1 knapsack problem for a given capacity.",
      "2D DP over items and capacity, then the 1D version iterating capacity backwards.",
      "Medium",
    ],
    [
      "Count the number of ways to decode a digit string where 'A' = 1 and 'Z' = 26.",
      "Like climbing stairs, but zeros make it tricky. Test '10', '27', and '06'.",
      "Medium",
    ],
    [
      "Decide whether an array can be split into two subsets with equal sums.",
      "Reduce it to a subset-sum problem for half the total, with a one-dimensional boolean array filled from the back.",
      "Medium",
    ],
    [
      "Find the length of the longest palindromic substring.",
      "Expand around each center, both odd and even, for O(n^2) time with O(1) space. Mention that a table works too.",
      "Medium",
    ],
    [
      "Find the minimum path sum from the top-left to the bottom-right of a grid of costs.",
      "Each cell adds its cost to the smaller of the cell above and the cell to the left. It can be done in place.",
      "Medium",
    ],
    [
      "Find the maximum product of a contiguous subarray.",
      "Track both the largest and the smallest product ending here, because a negative number can flip them.",
      "Medium",
    ],
    [
      "Count the number of ways to make change for an amount with given coins.",
      "Loop over coins on the outside so each combination is counted once, not once per order.",
      "Medium",
    ],
    [
      "Find the minimum number of jumps to reach the end of an array.",
      "A greedy breadth-first idea works: track the farthest reach of the current jump. They first wanted the DP version.",
      "Medium",
    ],
    [
      "Decide whether a string matches a pattern with '.' and '*'.",
      "Table over prefixes of the string and the pattern. The star case either skips the pair or uses it once more.",
      "Hard",
    ],
    [
      "Find the largest square of 1s in a binary matrix.",
      "Each cell is one plus the minimum of its top, left, and top-left neighbors.",
      "Medium",
    ],
    [
      "Find the minimum cost to climb stairs where each step has a cost.",
      "Each step costs its own value plus the cheaper of the two steps before it. A short warm-up.",
      "Easy",
    ],
    [
      "Count the palindromic substrings in a string.",
      "Expand around every center and count, or fill a table of which ranges are palindromes.",
      "Medium",
    ],
  ],
  "System Design": [
    [
      "Design a URL shortener like bit.ly.",
      "Cover the API, ID generation (base62 counter vs hash), database choice, caching hot links, and analytics. Estimate reads vs writes.",
      "Medium",
    ],
    [
      "Design the backend for a co-op job board where students apply to postings.",
      "Entities: students, employers, postings, applications. Talk about search, notifications, and keeping applications private.",
      "Medium",
    ],
    [
      "Design a rate limiter for a public API.",
      "Token bucket vs sliding window. Where it lives (gateway vs service) and how to share counts across servers with Redis.",
      "Medium",
    ],
    [
      "Design a real-time chat application.",
      "WebSockets, message storage, delivery receipts, and presence. How do you fan out messages to group chats?",
      "Hard",
    ],
    [
      "Design a news feed like the one on LinkedIn.",
      "Fan-out on write vs fan-out on read, and the hybrid for users with many followers. Ranking can stay high level.",
      "Hard",
    ],
    [
      "Design a parking garage reservation system.",
      "Mostly about data modeling and avoiding double bookings. Mention transactions or optimistic locking.",
      "Medium",
    ],
    [
      "How would you design a system to process millions of uploaded images into thumbnails?",
      "Object storage, a queue, worker pool, retries, and idempotency. Talk about monitoring the backlog.",
      "Medium",
    ],
    [
      "Design a simple key-value store that can run on several machines.",
      "Partitioning with consistent hashing, replication, and what happens when a node fails. CAP trade-offs at a high level.",
      "Hard",
    ],
    [
      "Design an online food ordering system for a restaurant chain.",
      "Menu service, orders, payments, and order status updates. They wanted me to talk about peak lunch traffic.",
      "Medium",
    ],
    [
      "Design a notification service that sends email, SMS, and push messages.",
      "Queue per channel, templates, user preferences, retries, and rate limits from providers.",
      "Medium",
    ],
    [
      "Design a web crawler.",
      "A URL frontier queue, politeness per domain, robots.txt, deduplication of seen URLs, and how to split work across machines.",
      "Hard",
    ],
    [
      "Design a file storage service like a simple cloud drive.",
      "Separate metadata from file blocks, chunked uploads, deduplication by hash, and syncing changes between devices.",
      "Hard",
    ],
    [
      "Design the backend for a ride-sharing app's driver matching.",
      "Location updates from drivers, a geospatial index to find nearby drivers, and handling two riders requesting the same driver.",
      "Hard",
    ],
    [
      "Design a system to collect and search application logs.",
      "Agents ship logs to a queue, a pipeline indexes them, and retention rules delete old data. Talked about cost at high volume.",
      "Medium",
    ],
    [
      "Design an online ticket booking system for concerts.",
      "Holding seats for a few minutes during checkout, preventing double booking, and handling a burst of traffic when sales open.",
      "Hard",
    ],
    [
      "Design a typeahead search suggestion service.",
      "A trie or prefix index of popular queries, updated in batches, with results cached for common prefixes.",
      "Hard",
    ],
    [
      "Design a leaderboard for an online game with millions of players.",
      "Sorted sets in Redis for the top players, and approximate ranks for everyone else.",
      "Medium",
    ],
    [
      "Design a video streaming service.",
      "Transcoding into several bitrates, a CDN for delivery, and the player switching quality as bandwidth changes.",
      "Hard",
    ],
    [
      "Design a metrics dashboard that shows service health in real time.",
      "Services push metrics to a time-series database, and the dashboard queries pre-aggregated data. Talked about alert thresholds.",
      "Medium",
    ],
    [
      "Design a system that sends a reminder email to users 24 hours before an event.",
      "Store scheduled jobs, have workers poll for due jobs, and make sending idempotent so retries do not send twice.",
      "Medium",
    ],
  ],
  "Databases & SQL": [
    [
      "Write a SQL query to find the second highest salary in an Employees table.",
      "Use DISTINCT with ORDER BY and LIMIT/OFFSET, or a subquery with MAX. Handle the case where there is no second salary.",
      "Easy",
    ],
    [
      "Write a query that returns each department's top three earners.",
      "Window functions: DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC).",
      "Medium",
    ],
    [
      "Explain the difference between an INNER JOIN and a LEFT JOIN with an example.",
      "Use customers and orders: LEFT JOIN keeps customers with no orders. Draw small tables.",
      "Easy",
    ],
    [
      "What is an index, and when can adding one make performance worse?",
      "Faster reads, slower writes, extra storage. Low-selectivity columns rarely benefit.",
      "Easy",
    ],
    [
      "Explain database normalization up to third normal form.",
      "Give a messy table and normalize it step by step. Mention when denormalizing is reasonable.",
      "Medium",
    ],
    [
      "When would you choose a document database like MongoDB over a relational database?",
      "Flexible schemas, nested data read together, horizontal scaling. Contrast with joins and strict transactions.",
      "Easy",
    ],
    [
      "Write a query to find users who logged in on three consecutive days.",
      "Use LAG/LEAD or the date-minus-row-number trick to group consecutive days.",
      "Hard",
    ],
    [
      "Explain ACID properties and give an example where isolation matters.",
      "Bank transfer example. Mention dirty reads and isolation levels.",
      "Medium",
    ],
    [
      "Design the tables for a library system with books, members, and loans.",
      "Primary and foreign keys, a loans table with due dates, and how to find overdue books.",
      "Medium",
    ],
    [
      "Write a query that computes a 7-day rolling average of daily sales.",
      "AVG() OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW). Ask what to do about missing days.",
      "Medium",
    ],
    [
      "Write a SQL query to find customers who have never placed an order.",
      "LEFT JOIN orders and keep rows where the order id is null, or use NOT EXISTS. They asked which one performs better.",
      "Easy",
    ],
    [
      "What are isolation levels, and what problems does each one prevent?",
      "Read uncommitted to serializable, with dirty reads, non-repeatable reads, and phantom reads as the problems.",
      "Medium",
    ],
    [
      "How would you find and fix a slow query?",
      "Look at the query plan, check for missing indexes or full scans, and avoid selecting columns that are not needed.",
      "Medium",
    ],
    [
      "Write a query to find duplicate email addresses in a users table.",
      "GROUP BY email with HAVING COUNT(*) > 1. Follow-up: delete the duplicates but keep the oldest row.",
      "Easy",
    ],
    [
      "What is database sharding, and what problems does it introduce?",
      "Choosing a shard key, uneven load on hot shards, and queries that need data from many shards.",
      "Medium",
    ],
    [
      "Explain what a foreign key is and what ON DELETE CASCADE does.",
      "A foreign key keeps references valid. Cascade deletes child rows automatically, which is convenient but risky.",
      "Easy",
    ],
    [
      "Write a query that shows each employee's salary next to their department's average.",
      "A window function AVG() OVER (PARTITION BY department) avoids a self-join.",
      "Medium",
    ],
    [
      "What is the difference between WHERE and HAVING?",
      "WHERE filters rows before grouping; HAVING filters groups after aggregation. Showed both in one query.",
      "Easy",
    ],
    [
      "How does database replication work, and what is replication lag?",
      "A primary sends changes to replicas. Reads from a replica can be slightly out of date, which matters right after a write.",
      "Medium",
    ],
    [
      "Write a query to find the most recent order for every customer.",
      "ROW_NUMBER() partitioned by customer and ordered by date descending, then keep row number one.",
      "Medium",
    ],
  ],
  "Object-Oriented Design": [
    [
      "Design the classes for a deck of cards that can be used for multiple games.",
      "Card, Deck, Hand, and a Game base class. Talk about which methods belong where.",
      "Easy",
    ],
    [
      "Design an elevator system for a building with several elevators.",
      "Elevator, Request, Controller, and a scheduling strategy. They pushed on how requests are assigned.",
      "Hard",
    ],
    [
      "Design a parking lot with different vehicle and spot sizes.",
      "Classic OOD. Use inheritance for vehicles and keep the fitting rules in one place.",
      "Medium",
    ],
    [
      "Explain the SOLID principles with an example of each.",
      "Have one concrete code example ready for each letter, ideally from your own projects.",
      "Medium",
    ],
    [
      "What is the difference between composition and inheritance, and when do you prefer each?",
      "Favor composition for flexibility. Give an example where inheritance caused problems.",
      "Easy",
    ],
    [
      "Design a vending machine using the state pattern.",
      "States like Idle, HasMoney, Dispensing. Show how transitions stay inside the state classes.",
      "Medium",
    ],
    [
      "Design an in-memory file system with directories and files.",
      "Composite pattern: a Directory holds files and directories. Implement mkdir, ls, and read.",
      "Medium",
    ],
    [
      "Explain interfaces vs abstract classes in Java.",
      "Default methods blurred the line. Talk about multiple inheritance of type.",
      "Easy",
    ],
    [
      "Design a movie ticket booking system.",
      "Theater, Show, Seat, Booking. Handling two users selecting the same seat is the key question.",
      "Medium",
    ],
    [
      "Which design patterns have you used, and why?",
      "Pick two or three you actually used, like Observer or Factory, and explain the problem each solved.",
      "Easy",
    ],
    [
      "Design the classes for a library management system.",
      "Book, copy, member, and loan, with rules for due dates and fines. They cared about separating a book from its copies.",
      "Medium",
    ],
    [
      "Design a chess game.",
      "Board, piece subclasses with their own move rules, and a game class that checks turns and checkmate.",
      "Hard",
    ],
    [
      "Design a hotel reservation system.",
      "Room types, reservations with date ranges, and checking availability without double booking.",
      "Medium",
    ],
    [
      "Design a logging library that supports different output targets.",
      "Logger with levels and pluggable handlers for console, file, and remote targets. Strategy pattern for formatting.",
      "Medium",
    ],
    [
      "Design a shopping cart and checkout for an online store.",
      "Cart, line item, product, and order classes, with discounts kept as separate rules that can be added later.",
      "Medium",
    ],
    [
      "Design a traffic light controller for an intersection.",
      "A state machine for each direction, with timers and a pedestrian button that requests a change.",
      "Medium",
    ],
    [
      "Explain polymorphism with an example from a project you built.",
      "Used a list of shapes that each compute their own area. Then connected it to a real project.",
      "Easy",
    ],
    [
      "Design a simple social network with users, posts, and friendships.",
      "User, post, and friendship classes, and a feed method. They asked how to avoid loading every friend's posts at once.",
      "Medium",
    ],
    [
      "Design an ATM.",
      "Account, card, and transaction classes, with a state for each step of the session. Talked about what happens if cash runs out.",
      "Medium",
    ],
    [
      "What is dependency injection, and why is it useful?",
      "Passing dependencies in instead of creating them inside a class makes code easier to test and swap.",
      "Easy",
    ],
  ],
  "JavaScript & Web": [
    [
      "Explain the JavaScript event loop and the difference between microtasks and macrotasks.",
      "Promise callbacks run before setTimeout callbacks. Walk through a small code example and predict the output.",
      "Medium",
    ],
    [
      "What happens when you type a URL into the browser and press Enter?",
      "DNS, TCP, TLS, HTTP request, server response, parsing HTML, CSS, JS, and rendering. Go as deep as they want.",
      "Medium",
    ],
    [
      "Implement a debounce function.",
      "Clear and reset a timer on each call. Follow-up: add a leading-edge option.",
      "Medium",
    ],
    [
      "Explain closures and give a practical use case.",
      "Private state and function factories. The classic var-in-a-loop bug is a good example.",
      "Easy",
    ],
    [
      "How does React decide when to re-render a component?",
      "State or props change, or the parent re-renders. Mention memo, useMemo, and keys in lists.",
      "Medium",
    ],
    [
      "Explain the difference between let, const, and var.",
      "Scope, hoisting, and the temporal dead zone. Quick question, answer it crisply.",
      "Easy",
    ],
    [
      "What is CORS and why does the browser enforce it?",
      "Same-origin policy, preflight requests, and which headers the server sends. Serving the frontend from the same origin avoids it.",
      "Medium",
    ],
    [
      "Implement Promise.all from scratch.",
      "Track results by index, resolve when the count reaches the length, reject on the first failure.",
      "Hard",
    ],
    [
      "How would you improve the load time of a slow web page?",
      "Measure first with Lighthouse. Then code splitting, image sizes, caching, and fewer blocking scripts.",
      "Medium",
    ],
    [
      "Explain how cookies, sessions, and tokens differ for authentication.",
      "Server-side sessions with a cookie vs stateless JWTs. Mention HttpOnly and SameSite.",
      "Medium",
    ],
    [
      "What are the rules of React hooks, and why do they exist?",
      "Only call hooks at the top level and only from React functions, because React tracks hooks by call order.",
      "Easy",
    ],
    [
      "Implement a function that deep clones a JavaScript object.",
      "Recursion over objects and arrays, and handling cycles with a map. Mention structuredClone as the built-in option.",
      "Medium",
    ],
    [
      "How would you make a web page accessible to keyboard and screen reader users?",
      "Semantic HTML, labels for inputs, visible focus, and not relying on color alone. Mentioned testing with axe.",
      "Medium",
    ],
    [
      "Implement a throttle function.",
      "Allow at most one call per time window and ignore or delay the rest. Compare it with debounce.",
      "Medium",
    ],
    [
      "Explain the difference between == and === in JavaScript.",
      "Type coercion versus strict comparison. Gave a few surprising examples and said I always use ===.",
      "Easy",
    ],
    [
      "What is event delegation?",
      "Attach one listener to a parent and check the event target, instead of one listener per child.",
      "Easy",
    ],
    [
      "Explain how 'this' works in JavaScript.",
      "It depends on how a function is called. Arrow functions take 'this' from where they are defined.",
      "Medium",
    ],
    [
      "What is the virtual DOM, and why does React use it?",
      "React compares a new tree with the previous one and applies only the needed changes to the real DOM.",
      "Medium",
    ],
    [
      "How would you protect a web app against cross-site scripting?",
      "Escape output, avoid inserting raw HTML, and set a Content Security Policy. React escapes text by default.",
      "Medium",
    ],
    [
      "Implement a simple event emitter with on, off, and emit.",
      "A map from event name to a list of listeners. Watch out for listeners removed while emitting.",
      "Medium",
    ],
    [
      "What are the differences between REST and GraphQL?",
      "Fixed endpoints versus one endpoint with flexible queries. Talked about over-fetching and caching.",
      "Medium",
    ],
  ],
  "Operating Systems & Networking": [
    [
      "What is the difference between a process and a thread?",
      "Memory isolation vs shared memory, cost of context switches, and an example of each.",
      "Easy",
    ],
    [
      "Explain what a deadlock is and the four conditions needed for one.",
      "Mutual exclusion, hold and wait, no preemption, circular wait. Explain how lock ordering prevents it.",
      "Medium",
    ],
    [
      "Compare TCP and UDP and give a use case for each.",
      "Reliability and ordering vs speed. Video calls and DNS often use UDP.",
      "Easy",
    ],
    [
      "How does virtual memory work?",
      "Pages, page tables, the TLB, and page faults. Why it lets processes think they have more memory.",
      "Medium",
    ],
    [
      "Implement a thread-safe bounded queue.",
      "Mutex plus two condition variables, or a semaphore pair. Explain why you loop around wait().",
      "Hard",
    ],
    [
      "What happens during a TCP three-way handshake?",
      "SYN, SYN-ACK, ACK, and why sequence numbers are exchanged. Mention connection teardown too.",
      "Easy",
    ],
    [
      "Explain the difference between a mutex and a semaphore.",
      "Ownership and counting. Give a producer-consumer example.",
      "Medium",
    ],
    [
      "How does HTTPS keep data secure?",
      "TLS handshake, certificates, and symmetric keys for the session. Keep it high level unless asked.",
      "Medium",
    ],
    [
      "What is a race condition and how do you find one?",
      "Shared state without synchronization. Talk about a real bug you have seen, plus logging and stress tests.",
      "Medium",
    ],
    [
      "How do load balancers decide which server gets a request?",
      "Round robin, least connections, and hashing for sticky sessions. Health checks remove bad servers.",
      "Easy",
    ],
    [
      "Explain how DNS resolves a domain name.",
      "Browser and OS caches, the recursive resolver, root, top-level domain, and authoritative servers.",
      "Easy",
    ],
    [
      "What happens when a program makes a system call?",
      "The CPU switches to kernel mode, the kernel does the work, and control returns to user mode with the result.",
      "Medium",
    ],
    [
      "Explain the difference between the stack and the heap.",
      "Automatic local variables versus memory you allocate yourself, and what happens when each runs out.",
      "Easy",
    ],
    [
      "What is a context switch, and why is it expensive?",
      "Saving and restoring registers, switching page tables, and losing warm caches.",
      "Medium",
    ],
    [
      "Compare common CPU scheduling algorithms.",
      "First come first served, shortest job first, and round robin, and how each affects waiting time.",
      "Medium",
    ],
    [
      "What happens when a page fault occurs?",
      "The OS finds the page on disk, picks a frame to evict if needed, loads the page, and restarts the instruction.",
      "Medium",
    ],
    [
      "Explain the layers of the OSI or TCP/IP model.",
      "Gave one example protocol for each layer and focused on where HTTP, TCP, and IP fit.",
      "Easy",
    ],
    [
      "What is the difference between HTTP/1.1 and HTTP/2?",
      "Multiplexing many requests over one connection, header compression, and fewer connections per page.",
      "Medium",
    ],
    [
      "How does a computer get an IP address when it joins a network?",
      "DHCP: discover, offer, request, and acknowledge. Mentioned what happens when the lease expires.",
      "Easy",
    ],
    [
      "What is a fork bomb, and how does an OS protect against it?",
      "A process that keeps creating copies of itself. Limits on processes per user stop it.",
      "Easy",
    ],
  ],
  Behavioral: [
    [
      "Tell me about yourself and why you want this co-op.",
      "Two minutes: background, one project you are proud of, and why this team specifically. Practice out loud.",
      "Easy",
    ],
    [
      "Describe a time you had a conflict with a teammate. How did you handle it?",
      "Use STAR. Focus on how you listened and what changed, not on who was right.",
      "Easy",
    ],
    [
      "Tell me about a project that failed or did not go as planned.",
      "Own the mistake, explain what you learned, and what you now do differently.",
      "Medium",
    ],
    [
      "Describe a time you had to learn a new technology quickly.",
      "Give the timeline, how you learned (docs, small prototypes), and the result.",
      "Easy",
    ],
    [
      "Tell me about a time you disagreed with a decision made by your manager or professor.",
      "Show that you raised it respectfully with data, and committed once the decision was made.",
      "Medium",
    ],
    [
      "What is the most technically challenging problem you have solved?",
      "Pick one with real depth. Expect follow-ups on every technical choice you mention.",
      "Medium",
    ],
    [
      "How do you prioritize when you have several deadlines at once?",
      "Concrete example from a busy semester. Mention communicating early when something will slip.",
      "Easy",
    ],
    [
      "Tell me about a time you received critical feedback.",
      "What the feedback was, how you reacted, and what you changed afterwards.",
      "Easy",
    ],
    [
      "Why are you moving into software from your previous field?",
      "Career changers get this often. Connect your past experience to strengths you bring to engineering.",
      "Easy",
    ],
    [
      "Describe a time you went beyond what was asked of you.",
      "Pick something with measurable impact, like automating a manual task for your team.",
      "Medium",
    ],
    [
      "Where do you see yourself after graduating?",
      "Be honest but connect it to growth you would get on this team.",
      "Easy",
    ],
    [
      "Describe a time you made a mistake and how you handled it.",
      "Own the mistake, explain the fix, and say what changed afterwards. They liked a concrete process change.",
      "Medium",
    ],
    [
      "Tell me about a project you are most proud of.",
      "Pick one with a clear problem and measurable result. Be ready for deep follow-up questions on technical choices.",
      "Easy",
    ],
    [
      "Tell me about a time you helped a teammate who was struggling.",
      "Focus on what you did and how it helped the team, without making the teammate look bad.",
      "Easy",
    ],
    [
      "Describe a situation where requirements changed late in a project.",
      "Explained how we re-planned, what we cut, and how we kept the client informed.",
      "Medium",
    ],
    [
      "Tell me about a time you took the lead without being asked.",
      "Picked a group project where I organized the work. Kept the answer about actions and results.",
      "Medium",
    ],
    [
      "Tell me about a time you had to explain something technical to a non-technical person.",
      "Used an analogy and checked they understood. They wanted to hear how I adjusted when it did not land.",
      "Easy",
    ],
    [
      "What is a weakness you are working on?",
      "Pick a real one and show the steps you are taking. Avoid answers like being a perfectionist.",
      "Easy",
    ],
    [
      "Do you have any questions for us?",
      "Always have two or three ready, about the team, the work co-ops do, and how success is measured.",
      "Easy",
    ],
    [
      "Tell me about a time you had to make a decision with incomplete information.",
      "Explain what you knew, what you assumed, and how you checked the decision afterwards.",
      "Medium",
    ],
    [
      "How do you work with teammates who have very different working styles?",
      "Gave an example of agreeing on how we communicate and split tasks early in a group project.",
      "Easy",
    ],
  ],
};
