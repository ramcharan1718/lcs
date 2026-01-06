import express from 'express'

const app = express()
app.use(express.json())

function longestCommonSubstring(s1, s2) {
  let m = s1.length
  let n = s2.length
  let dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0))
  let maxLen = 0
  let endIndex = 0

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j]
          endIndex = i
        }
      }
    }
  }

  return s1.substring(endIndex - maxLen, endIndex)
}


app.get('/', (req, res) => {
  const { string1, string2 } = req.query

  if (!string1 || !string2) {
    return res.json({
      message: 'Please provide string1 and string2 as query parameters'
    })
  }

  const result = longestCommonSubstring(string1, string2)

  res.json({
    longestCommonSubstring: result,
    length: result.length
  })
})

app.post('/lcs', (req, res) => {
  const { string1, string2 } = req.body

  if (!string1 || !string2) {
    return res.status(400).json({
      error: 'Both string1 and string2 are required'
    })
  }

  const result = longestCommonSubstring(string1, string2)

  res.json({
    longestCommonSubstring: result,
    length: result.length
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
