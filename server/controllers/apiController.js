const { exec } = require("child_process");
const path = require("path");

exports.searchAPI = (req, res) => {
    const inputData = req.query.query; 
    console.log(inputData)
    const inputJson = JSON.stringify({ query: inputData });

    const scriptPath = path.join(__dirname, "..", "models", "APISearch.py");

    exec(`python "${scriptPath}" '${inputJson}'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: "Error executing Python script" });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        try {
            const result = JSON.parse(stdout);
            console.log(result)
            return res.json({ result });
        } catch (parseError) {
            console.error("Error parsing Python output:", parseError);
            return res.status(500).json({ error: "Error parsing Python output" });
        }
    });
};