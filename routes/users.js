import express from 'express';

import {  getUsers, createUser, getUserID, deleteUser, updateUser } from '../controllers/users.js';

const router = express.Router();


// all routes starting with /users
router.get('/', getUsers);

router.post('/',createUser);

router.get('/:id',getUserID);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.get('/pr_changes', async (req, res) => {
    try {
        // Get PR number from query parameters
        const prNumber = req.query.pr_number;
        if (!prNumber) {
            return res.status(400).json({ error: 'PR number is required' });
        }

        // Make API request to GitHub
        const url = `https://api.github.com/repos/owner/repo/pulls/${prNumber}/files`;
        const headers = { Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}` };
        const response = await axios.get(url, { headers });

        if (response.status === 200) {
            const prFiles = response.data;
            // Process the PR files as needed (e.g., extract filenames, additions, deletions)
            // You can return this information in the API response
            return res.json(prFiles);
        } else {
            return res.status(response.status).json({ error: 'Error fetching PR changes' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default router;