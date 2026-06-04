const problems = [
  // ========== ARRAY ==========
  {
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Array",
    description: "Find two numbers that add up to a target sum.",
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    gfgUrl: "https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/",
    tags: ["Array", "HashMap"]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Array",
    description: "Find the maximum profit from buying and selling a stock once.",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    gfgUrl: "https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/",
    tags: ["Array", "Greedy"]
  },
  {
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Array",
    description: "Find the contiguous subarray with the largest sum (Kadane's Algorithm).",
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    gfgUrl: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
    tags: ["Array", "DP"]
  },
  {
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Array",
    description: "Return array where each element is product of all other elements.",
    leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
    gfgUrl: "https://www.geeksforgeeks.org/product-of-array-except-self/",
    tags: ["Array"]
  },
  {
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Array",
    description: "Find two lines that together with x-axis forms a container with most water.",
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    gfgUrl: "https://www.geeksforgeeks.org/container-with-most-water/",
    tags: ["Array", "TwoPointers"]
  },
  {
    title: "3Sum",
    difficulty: "Medium",
    topic: "Array",
    description: "Find all unique triplets that sum to zero.",
    leetcodeUrl: "https://leetcode.com/problems/3sum/",
    gfgUrl: "https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/",
    tags: ["Array", "TwoPointers"]
  },
  {
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Array",
    description: "Calculate how much water can be trapped between bars.",
    leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
    gfgUrl: "https://www.geeksforgeeks.org/trapping-rain-water/",
    tags: ["Array", "TwoPointers", "Stack"]
  },

  // ========== STRING ==========
  {
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "String",
    description: "Check if two strings are anagrams of each other.",
    leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
    gfgUrl: "https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/",
    tags: ["String", "HashMap"]
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "String",
    description: "Check if parentheses, brackets and braces are valid.",
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    gfgUrl: "https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/",
    tags: ["String", "Stack"]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "String",
    description: "Find the length of longest substring without repeating characters.",
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    gfgUrl: "https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/",
    tags: ["String", "SlidingWindow"]
  },
  {
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "String",
    description: "Find the longest palindromic substring in a string.",
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    gfgUrl: "https://www.geeksforgeeks.org/longest-palindrome-substring/",
    tags: ["String", "DP"]
  },
  {
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "String",
    description: "Group strings that are anagrams of each other.",
    leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
    gfgUrl: "https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/",
    tags: ["String", "HashMap"]
  },
  {
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topic: "String",
    description: "Find minimum window substring containing all characters of pattern.",
    leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
    gfgUrl: "https://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/",
    tags: ["String", "SlidingWindow"]
  },

  // ========== LINKED LIST ==========
  {
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "LinkedList",
    description: "Reverse a singly linked list.",
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
    gfgUrl: "https://www.geeksforgeeks.org/reverse-a-linked-list/",
    tags: ["LinkedList"]
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topic: "LinkedList",
    description: "Merge two sorted linked lists into one sorted list.",
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
    gfgUrl: "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/",
    tags: ["LinkedList"]
  },
  {
    title: "Linked List Cycle",
    difficulty: "Easy",
    topic: "LinkedList",
    description: "Detect if a linked list has a cycle using Floyd's algorithm.",
    leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
    gfgUrl: "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/",
    tags: ["LinkedList", "TwoPointers"]
  },
  {
    title: "Remove Nth Node From End",
    difficulty: "Medium",
    topic: "LinkedList",
    description: "Remove the nth node from the end of a linked list.",
    leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    gfgUrl: "https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/",
    tags: ["LinkedList", "TwoPointers"]
  },
  {
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "LinkedList",
    description: "Merge k sorted linked lists into one sorted list.",
    leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
    gfgUrl: "https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/",
    tags: ["LinkedList", "Heap"]
  },

  // ========== TREE ==========
  {
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topic: "Tree",
    description: "Find the maximum depth of a binary tree.",
    leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/",
    tags: ["Tree", "DFS"]
  },
  {
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topic: "Tree",
    description: "Invert a binary tree (mirror image).",
    leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/",
    tags: ["Tree", "DFS"]
  },
  {
    title: "Lowest Common Ancestor of BST",
    difficulty: "Medium",
    topic: "Tree",
    description: "Find lowest common ancestor of two nodes in a BST.",
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/",
    tags: ["Tree", "BST"]
  },
  {
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Tree",
    description: "Traverse binary tree level by level (BFS).",
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    gfgUrl: "https://www.geeksforgeeks.org/level-order-tree-traversal/",
    tags: ["Tree", "BFS"]
  },
  {
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    topic: "Tree",
    description: "Serialize and deserialize a binary tree to/from string.",
    leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/",
    tags: ["Tree", "DFS", "BFS"]
  },

  // ========== GRAPH ==========
  {
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graph",
    description: "Count number of islands in a 2D grid using DFS/BFS.",
    leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
    gfgUrl: "https://www.geeksforgeeks.org/find-number-of-islands/",
    tags: ["Graph", "DFS", "BFS"]
  },
  {
    title: "Clone Graph",
    difficulty: "Medium",
    topic: "Graph",
    description: "Deep clone an undirected graph.",
    leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
    gfgUrl: "https://www.geeksforgeeks.org/clone-an-undirected-graph/",
    tags: ["Graph", "DFS", "BFS"]
  },
  {
    title: "Course Schedule",
    difficulty: "Medium",
    topic: "Graph",
    description: "Determine if you can finish all courses (cycle detection).",
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
    gfgUrl: "https://www.geeksforgeeks.org/detect-cycle-in-a-directed-graph/",
    tags: ["Graph", "TopologicalSort"]
  },
  {
    title: "Word Ladder",
    difficulty: "Hard",
    topic: "Graph",
    description: "Find shortest transformation sequence from beginWord to endWord.",
    leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
    gfgUrl: "https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/",
    tags: ["Graph", "BFS"]
  },

  // ========== DYNAMIC PROGRAMMING ==========
  {
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "DP",
    description: "Count ways to climb n stairs taking 1 or 2 steps at a time.",
    leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
    gfgUrl: "https://www.geeksforgeeks.org/count-ways-reach-nth-stair/",
    tags: ["DP"]
  },
  {
    title: "House Robber",
    difficulty: "Medium",
    topic: "DP",
    description: "Maximize money robbed from houses without robbing adjacent ones.",
    leetcodeUrl: "https://leetcode.com/problems/house-robber/",
    gfgUrl: "https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/",
    tags: ["DP"]
  },
  {
    title: "Coin Change",
    difficulty: "Medium",
    topic: "DP",
    description: "Find minimum number of coins to make a given amount.",
    leetcodeUrl: "https://leetcode.com/problems/coin-change/",
    gfgUrl: "https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/",
    tags: ["DP"]
  },
  {
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topic: "DP",
    description: "Find the length of longest strictly increasing subsequence.",
    leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    gfgUrl: "https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/",
    tags: ["DP", "BinarySearch"]
  },
  {
    title: "0/1 Knapsack Problem",
    difficulty: "Medium",
    topic: "DP",
    description: "Maximize value in knapsack with weight constraint.",
    leetcodeUrl: "https://leetcode.com/problems/ones-and-zeroes/",
    gfgUrl: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
    tags: ["DP"]
  },
  {
    title: "Word Break",
    difficulty: "Medium",
    topic: "DP",
    description: "Check if string can be segmented into dictionary words.",
    leetcodeUrl: "https://leetcode.com/problems/word-break/",
    gfgUrl: "https://www.geeksforgeeks.org/word-break-problem-dp-32/",
    tags: ["DP", "String"]
  },
  {
    title: "Edit Distance",
    difficulty: "Hard",
    topic: "DP",
    description: "Find minimum operations to convert one string to another.",
    leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
    gfgUrl: "https://www.geeksforgeeks.org/edit-distance-dp-5/",
    tags: ["DP", "String"]
  },

  // ========== STACK ==========
  {
    title: "Min Stack",
    difficulty: "Medium",
    topic: "Stack",
    description: "Design a stack that supports push, pop, top, and getMin in O(1).",
    leetcodeUrl: "https://leetcode.com/problems/min-stack/",
    gfgUrl: "https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/",
    tags: ["Stack"]
  },
  {
    title: "Daily Temperatures",
    difficulty: "Medium",
    topic: "Stack",
    description: "Find how many days until a warmer temperature.",
    leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
    gfgUrl: "https://www.geeksforgeeks.org/next-greater-element/",
    tags: ["Stack", "Array"]
  },
  {
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    topic: "Stack",
    description: "Find the largest rectangle in a histogram.",
    leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    gfgUrl: "https://www.geeksforgeeks.org/largest-rectangle-under-histogram/",
    tags: ["Stack", "Array"]
  },

  // ========== BINARY SEARCH ==========
  {
    title: "Binary Search",
    difficulty: "Easy",
    topic: "BinarySearch",
    description: "Implement binary search on a sorted array.",
    leetcodeUrl: "https://leetcode.com/problems/binary-search/",
    gfgUrl: "https://www.geeksforgeeks.org/binary-search/",
    tags: ["BinarySearch", "Array"]
  },
  {
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "BinarySearch",
    description: "Search target in a rotated sorted array.",
    leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    gfgUrl: "https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/",
    tags: ["BinarySearch", "Array"]
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "BinarySearch",
    description: "Find the minimum element in a rotated sorted array.",
    leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    gfgUrl: "https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/",
    tags: ["BinarySearch", "Array"]
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topic: "BinarySearch",
    description: "Find median of two sorted arrays in O(log(m+n)) time.",
    leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    gfgUrl: "https://www.geeksforgeeks.org/median-of-two-sorted-arrays/",
    tags: ["BinarySearch", "Array"]
  },

  // ========== HEAP ==========
  {
    title: "Kth Largest Element in Array",
    difficulty: "Medium",
    topic: "Heap",
    description: "Find the kth largest element in an unsorted array.",
    leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    gfgUrl: "https://www.geeksforgeeks.org/kth-largest-element-in-an-array/",
    tags: ["Heap", "Array"]
  },
  {
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    topic: "Heap",
    description: "Return the k most frequent elements in an array.",
    leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
    gfgUrl: "https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/",
    tags: ["Heap", "HashMap"]
  },
  {
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    topic: "Heap",
    description: "Find median from a continuously growing data stream.",
    leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
    gfgUrl: "https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/",
    tags: ["Heap", "Design"]
  },

  // ========== BACKTRACKING ==========
  {
    title: "Subsets",
    difficulty: "Medium",
    topic: "Backtracking",
    description: "Generate all possible subsets of a set of distinct integers.",
    leetcodeUrl: "https://leetcode.com/problems/subsets/",
    gfgUrl: "https://www.geeksforgeeks.org/power-set/",
    tags: ["Backtracking", "Array"]
  },
  {
    title: "Permutations",
    difficulty: "Medium",
    topic: "Backtracking",
    description: "Generate all possible permutations of distinct integers.",
    leetcodeUrl: "https://leetcode.com/problems/permutations/",
    gfgUrl: "https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/",
    tags: ["Backtracking", "Array"]
  },
  {
    title: "Combination Sum",
    difficulty: "Medium",
    topic: "Backtracking",
    description: "Find all combinations that sum to a target.",
    leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
    gfgUrl: "https://www.geeksforgeeks.org/combinational-sum/",
    tags: ["Backtracking", "Array"]
  },
  {
    title: "N-Queens",
    difficulty: "Hard",
    topic: "Backtracking",
    description: "Place N queens on NxN chessboard so no two queens attack each other.",
    leetcodeUrl: "https://leetcode.com/problems/n-queens/",
    gfgUrl: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/",
    tags: ["Backtracking"]
  },

  // ========== GREEDY ==========
  {
    title: "Jump Game",
    difficulty: "Medium",
    topic: "Greedy",
    description: "Determine if you can reach the last index.",
    leetcodeUrl: "https://leetcode.com/problems/jump-game/",
    gfgUrl: "https://www.geeksforgeeks.org/jump-game/",
    tags: ["Greedy", "Array"]
  },
  {
    title: "Meeting Rooms II",
    difficulty: "Medium",
    topic: "Greedy",
    description: "Find minimum number of meeting rooms required.",
    leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
    gfgUrl: "https://www.geeksforgeeks.org/minimum-halls-required-for-a-college/",
    tags: ["Greedy", "Array"]
  },

  // ========== TRIE ==========
  {
    title: "Implement Trie",
    difficulty: "Medium",
    topic: "Trie",
    description: "Implement a trie with insert, search, and startsWith methods.",
    leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    gfgUrl: "https://www.geeksforgeeks.org/trie-insert-and-search/",
    tags: ["Trie", "Design"]
  },
  {
    title: "Word Search II",
    difficulty: "Hard",
    topic: "Trie",
    description: "Find all words from a dictionary in a 2D board.",
    leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",
    gfgUrl: "https://www.geeksforgeeks.org/boggle-find-possible-words-board-characters/",
    tags: ["Trie", "Backtracking"]
  },

  // ========== QUEUE ==========
  {
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    topic: "Queue",
    description: "Implement a queue using two stacks.",
    leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/",
    gfgUrl: "https://www.geeksforgeeks.org/queue-using-stacks/",
    tags: ["Queue", "Stack"]
  },
  {
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    topic: "Queue",
    description: "Find maximum in every sliding window of size k.",
    leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
    gfgUrl: "https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/",
    tags: ["Queue", "SlidingWindow"]
  }
];

export default problems;