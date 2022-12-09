const router = require("express").Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.get("/:platform/:gamertag", async (req, res) => {
    try {
        const headers = { "TRN-Api-Key": process.env.TRACKER_API_KEY }

        const { platform, gamertag } = req.params;

        const rawData = await
            fetch(
                `${process.env.TRACKER_API_BASE}/profile/${platform}/${gamertag}`,
                {
                    headers
                },
            );

        const jsonData = await rawData.json();

        if (jsonData.errors && jsonData.errors.length > 0) {
            return res.status(404).json({ error: "Profile doesn't exist" });
        }

        console.log("SUP");
        return res.json({ data: jsonData });

    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
});

module.exports = router;